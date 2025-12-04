/**
 * LLM API 服务层
 * 封装 Paratera 并行智算云大模型 API 调用
 */

import type { Competition, RankedCompetition, UserProfile } from '@/types';

// API 配置
const API_CONFIG = {
  baseUrl: 'https://ai.paratera.com/v1',
  apiKey: 'sk-EmDNR3qxQi0yWxSPXMy7Kw',
  model: 'GLM-4-Flash', // 免费模型，128K 上下文
};

// 消息类型
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// API 响应类型
interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// 流式响应 chunk 类型
interface StreamChunk {
  id: string;
  choices: {
    index: number;
    delta: {
      content?: string;
      role?: string;
    };
    finish_reason: string | null;
  }[];
}

// 推荐结果类型
export interface RecommendationResult {
  competitions: RankedCompetition[];
  summary: string;
}

/**
 * 非流式聊天调用
 */
export async function chat(
  messages: ChatMessage[],
  systemPrompt?: string
): Promise<string> {
  const allMessages: ChatMessage[] = systemPrompt
    ? [{ role: 'system', content: systemPrompt }, ...messages]
    : messages;

  const response = await fetch(`${API_CONFIG.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_CONFIG.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: API_CONFIG.model,
      messages: allMessages,
      stream: false,
      max_tokens: 2048,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LLM API Error: ${response.status} - ${error}`);
  }

  const data: ChatCompletionResponse = await response.json();
  return data.choices[0]?.message?.content || '';
}

/**
 * 流式聊天调用 (异步生成器)
 */
export async function* streamChat(
  messages: ChatMessage[],
  systemPrompt?: string
): AsyncGenerator<string, void, unknown> {
  const allMessages: ChatMessage[] = systemPrompt
    ? [{ role: 'system', content: systemPrompt }, ...messages]
    : messages;

  const response = await fetch(`${API_CONFIG.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_CONFIG.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: API_CONFIG.model,
      messages: allMessages,
      stream: true,
      max_tokens: 2048,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LLM API Error: ${response.status} - ${error}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('Response body is not readable');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;

        const data = trimmed.slice(6);
        if (data === '[DONE]') return;

        try {
          const chunk: StreamChunk = JSON.parse(data);
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            yield content;
          }
        } catch {
          // 忽略解析错误的行
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * 构建用户画像描述
 */
function buildUserProfileDescription(profile: Partial<UserProfile>): string {
  const parts: string[] = [];

  if (profile.major) {
    parts.push(`专业：${profile.major}`);
  }
  if (profile.grade) {
    parts.push(`年级：大${['一', '二', '三', '四'][profile.grade - 1]}`);
  }
  if (profile.interests && profile.interests.length > 0) {
    parts.push(`兴趣方向：${profile.interests.join('、')}`);
  }
  if (profile.experience) {
    if (profile.experience.hasCompetitionExp) {
      parts.push('有参赛经历');
      if (profile.experience.competitionTypes?.length) {
        parts.push(`参加过：${profile.experience.competitionTypes.join('、')}`);
      }
      if (profile.experience.achievements?.length) {
        parts.push(`获奖：${profile.experience.achievements.join('、')}`);
      }
    } else {
      parts.push('无参赛经历，初次参赛');
    }
  }
  if (profile.preferences) {
    const prefParts: string[] = [];
    if (profile.preferences.preferTeam) prefParts.push('偏好团队赛');
    if (profile.preferences.preferIndividual) prefParts.push('偏好个人赛');
    if (profile.preferences.timeCommitment) {
      const timeMap = { low: '较少', medium: '中等', high: '较多' };
      prefParts.push(`时间投入意愿：${timeMap[profile.preferences.timeCommitment]}`);
    }
    if (prefParts.length > 0) {
      parts.push(prefParts.join('，'));
    }
  }

  return parts.join('；');
}

/**
 * 构建赛事简要列表
 */
function buildCompetitionList(competitions: Competition[]): string {
  return competitions.map((c, i) => {
    return `${i + 1}. ${c.title}
   - 主办方：${c.organizer}
   - 学科：${c.tags.discipline} | 难度：${c.tags.difficulty} | 含金量：${c.tags.value}
   - 简介：${c.description.slice(0, 100)}...
   - 关键词：${c.keywords.join('、')}`;
  }).join('\n\n');
}

/**
 * AI 赛事推荐
 * 根据用户画像从赛事库中推荐最匹配的赛事
 */
export async function getCompetitionRecommendation(
  userProfile: Partial<UserProfile>,
  competitions: Competition[],
  topN: number = 10
): Promise<RecommendationResult> {
  const profileDesc = buildUserProfileDescription(userProfile);
  const competitionList = buildCompetitionList(competitions);

  const systemPrompt = `你是一位大学生竞赛指导专家，擅长根据学生的专业背景、兴趣爱好和参赛经历，为他们推荐最适合的竞赛。

你的任务是分析用户画像，从赛事列表中选出最匹配的${topN}项赛事，并说明推荐理由。

请严格按照以下 JSON 格式返回结果：
{
  "recommendations": [
    {
      "competitionId": 数字ID,
      "matchScore": 0-100的匹配度分数,
      "reason": "简短的推荐理由（20字以内）"
    }
  ],
  "summary": "整体推荐总结（50字以内）"
}

注意：
1. matchScore 基于专业匹配度、兴趣契合度、难度适配度综合评估
2. 优先推荐与用户专业和兴趣高度相关的赛事
3. 对于无经历的新手，优先推荐入门和进阶难度的赛事
4. 返回纯 JSON，不要有任何其他文字`;

  const userMessage = `用户画像：
${profileDesc}

赛事列表：
${competitionList}

请为该用户推荐${topN}个最适合的赛事。`;

  try {
    const response = await chat(
      [{ role: 'user', content: userMessage }],
      systemPrompt
    );

    // 解析 JSON 响应
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }

    const result = JSON.parse(jsonMatch[0]);

    // 构建带匹配度的赛事列表
    const rankedCompetitions: RankedCompetition[] = [];
    for (const rec of result.recommendations) {
      const competition = competitions.find(c => c.id === rec.competitionId);
      if (competition) {
        rankedCompetitions.push({
          ...competition,
          match: rec.matchScore,
          matchReason: rec.reason,
        });
      }
    }

    return {
      competitions: rankedCompetitions,
      summary: result.summary || '根据您的画像为您精选了以下赛事',
    };
  } catch (error) {
    console.error('Recommendation error:', error);
    // 降级处理：返回默认推荐
    return {
      competitions: competitions.slice(0, topN).map(c => ({
        ...c,
        match: 70,
        matchReason: '热门推荐',
      })),
      summary: '为您推荐了热门赛事（AI推荐暂时不可用）',
    };
  }
}

/**
 * AI 问答引导对话
 * 用于逐步收集用户画像信息
 */
export async function* guidanceChat(
  currentProfile: Partial<UserProfile>,
  userMessage: string,
  chatHistory: ChatMessage[]
): AsyncGenerator<string, void, unknown> {
  const systemPrompt = `你是一位友好的大学生竞赛指导助手，正在通过对话了解用户的背景和偏好，以便为他们推荐合适的竞赛。

当前已收集的用户信息：
${buildUserProfileDescription(currentProfile) || '暂无'}

你的任务：
1. 友好地回应用户的输入
2. 如果用户信息还不完整，自然地引导用户提供更多信息
3. 需要收集的信息包括：专业、年级、兴趣方向、参赛经历、团队/个人偏好、时间投入意愿
4. 如果已收集足够信息（至少有专业和兴趣），可以表示准备好推荐了
5. 保持对话简短亲切，每次只问1-2个问题
6. 用中文回复，语气轻松友好

重要：直接回复用户，不要有多余的格式或标记。`;

  const messages: ChatMessage[] = [
    ...chatHistory,
    { role: 'user', content: userMessage },
  ];

  yield* streamChat(messages, systemPrompt);
}

/**
 * 生成单个赛事的 AI 深度分析
 */
export async function analyzeCompetition(
  competition: Competition,
  userProfile?: Partial<UserProfile>
): Promise<string> {
  const profileContext = userProfile
    ? `\n\n用户背景：${buildUserProfileDescription(userProfile)}`
    : '';

  const systemPrompt = `你是一位大学生竞赛分析专家。请为用户详细分析这个赛事，包括：
1. 赛事特点和含金量
2. 参赛建议和准备方向
3. 适合什么样的学生参加
4. 获奖难度和技巧
${userProfile ? '5. 针对该用户的个性化建议' : ''}

保持回复简洁有价值，200字以内。`;

  const userMessage = `请分析这个赛事：

${competition.title}
主办方：${competition.organizer}
学科：${competition.tags.discipline} | 难度：${competition.tags.difficulty} | 含金量：${competition.tags.value}
简介：${competition.description}
关键词：${competition.keywords.join('、')}
${competition.requirements ? `参赛要求：${competition.requirements.join('、')}` : ''}
${competition.awards ? `奖项设置：${competition.awards.join('、')}` : ''}${profileContext}`;

  return chat([{ role: 'user', content: userMessage }], systemPrompt);
}

// 导出配置（用于调试）
export const LLM_CONFIG = API_CONFIG;
