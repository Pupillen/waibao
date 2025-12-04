import React, { useState, useEffect, useRef } from 'react';
import { 
  Layout, 
  Compass, 
  Lightbulb, 
  Users, 
  KanbanSquare, 
  FileText, 
  Video, 
  BarChart3, 
  Bell, 
  Search, 
  Sparkles, 
  Plus, 
  MoreHorizontal, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Mic,
  StopCircle,
  Play,
  UserPlus,
  ArrowRight,
  Send,
  PenTool
} from 'lucide-react';

/**
 * 模拟数据与常量
 */
const COMPETITIONS = [
  { id: 1, title: '第九届中国国际“互联网+”大学生创新创业大赛', level: 'S+', tags: ['教育部', '创新创业'], match: 98, deadline: '5天后' },
  { id: 2, title: '第十八届“挑战杯”全国大学生课外学术科技作品竞赛', level: 'S', tags: ['团中央', '学术科技'], match: 92, deadline: '12天后' },
  { id: 3, title: '全国大学生数学建模竞赛', level: 'A', tags: ['数学', '建模'], match: 85, deadline: '1个月后' },
];

const TEAM_MEMBERS = [
  { id: 1, name: '林一', role: '全栈开发', skills: { code: 90, design: 40, write: 60 }, avatar: 'L' },
  { id: 2, name: '苏苏', role: 'UI设计师', skills: { code: 20, design: 95, write: 50 }, avatar: 'S' },
  { id: 3, name: '陈同学', role: '产品经理', skills: { code: 30, design: 60, write: 90 }, avatar: 'C' },
];

const TASKS = {
  todo: [{ id: 1, title: '完成竞品分析报告', tag: '文档' }, { id: 2, title: '联系指导老师签字', tag: '外联' }],
  doing: [{ id: 3, title: '核心算法代码复现', tag: '开发' }],
  done: [{ id: 4, title: '组建核心团队', tag: '管理' }]
};

/**
 * 通用组件：卡片
 */
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
    {children}
  </div>
);

/**
 * 通用组件：AI 按钮
 */
const AIButton = ({ onClick, children, loading }) => (
  <button 
    onClick={onClick}
    disabled={loading}
    className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all disabled:opacity-70 shadow-lg shadow-violet-200"
  >
    {loading ? <span className="animate-spin">✨</span> : <Sparkles size={16} />}
    {children}
  </button>
);

/**
 * 模块 1: 赛事认知与选择
 */
const ModuleDiscovery = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">赛事探索</h2>
          <p className="text-slate-500 mt-1">基于您的“计算机科学”专业画像推荐</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input type="text" placeholder="搜索竞赛..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none w-64" />
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 p-6 rounded-xl flex items-start gap-4">
        <div className="bg-white p-2 rounded-full shadow-sm text-violet-600">
          <Sparkles size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-violet-900">AI 智能分析建议</h3>
          <p className="text-violet-700 text-sm mt-1">
            根据您过去一年的 GitHub 活跃度与课程成绩，建议您重点关注 <strong>“互联网+”</strong> 大赛的 <strong>“产业命题赛道”</strong>。该赛道目前竞争烈度较“主赛道”低 15%，且与您的全栈开发能力高度匹配。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMPETITIONS.map(comp => (
          <Card key={comp.id} className="p-5 flex flex-col justify-between h-48 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
              匹配度 {comp.match}%
            </div>
            <div>
              <div className="flex gap-2 mb-3">
                {comp.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">{tag}</span>
                ))}
              </div>
              <h3 className="font-bold text-lg text-slate-800 group-hover:text-violet-600 transition-colors line-clamp-2">
                {comp.title}
              </h3>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm text-slate-500">
              <span className="flex items-center gap-1"><Clock size={14} /> {comp.deadline}</span>
              <span className="font-semibold text-orange-500 bg-orange-50 px-2 py-0.5 rounded">Level {comp.level}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

/**
 * 模块 2: 选题头脑风暴 (Chat UI)
 */
const ModuleBrainstorm = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: '你好！我是你的选题助手。请告诉我你感兴趣的领域（如：乡村振兴、智慧医疗、碳中和），我来为你生成几个有竞争力的选题方向。' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: `基于“${userMsg}”和当前热点，我为你构思了以下三个方向：\n\n1. **基于多模态大模型的${userMsg}辅助诊断系统**\n   创新点：结合CV与NLP技术，解决传统痛点。\n\n2. **“${userMsg}”全产业链溯源与价值评估平台**\n   创新点：区块链技术应用，数据透明化。\n\n3. **面向老龄化社区的${userMsg}智能监护终端**\n   创新点：边缘计算，低功耗，适老化设计。`
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-violet-600 text-white rounded-br-none' 
                : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-none'
            }`}>
              {msg.role === 'ai' && <div className="flex items-center gap-2 mb-2 text-violet-600 font-semibold"><Sparkles size={16}/> AI 助手</div>}
              <div className="whitespace-pre-line leading-relaxed">{msg.content}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-2">
               <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
               <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
               <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
             </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-white border-t border-slate-100 flex gap-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="输入关键词，例如：智慧农业..." 
          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 focus:ring-2 focus:ring-violet-500 focus:outline-none"
        />
        <button onClick={handleSend} className="bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-lg transition-colors">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

/**
 * 模块 3: 组队广场
 */
const ModuleTeam = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">寻找队友</h2>
        <div className="flex gap-3">
            <button className="px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">发布招募</button>
            <AIButton>AI 智能匹配</AIButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEAM_MEMBERS.map(member => (
          <Card key={member.id} className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl">
                {member.avatar}
              </div>
              <div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">{member.role}</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-12">代码</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{width: `${member.skills.code}%`}}></div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-12">设计</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500 rounded-full" style={{width: `${member.skills.design}%`}}></div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-12">文案</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{width: `${member.skills.write}%`}}></div>
                </div>
              </div>
            </div>

            <button className="w-full py-2 border border-violet-600 text-violet-600 rounded-lg hover:bg-violet-50 font-medium flex items-center justify-center gap-2 transition-colors">
              <UserPlus size={16} /> 邀请组队
            </button>
          </Card>
        ))}
        {/* Empty State / Add New */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 p-6 hover:border-violet-300 hover:bg-violet-50 transition-all cursor-pointer">
            <Search size={48} className="mb-4 opacity-50" />
            <p>查看更多候选人</p>
        </div>
      </div>
    </div>
  );
};

/**
 * 模块 4: 协作空间
 */
const ModuleWorkspace = () => {
  return (
    <div className="h-full flex flex-col space-y-6">
       <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">项目：智慧养老监护系统</h2>
           <p className="text-slate-500 text-sm mt-1">距离省赛截止还有 15 天</p>
        </div>
        <div className="flex -space-x-2">
            {['L','S','C'].map((av,i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">{av}</div>
            ))}
            <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-400 hover:bg-slate-200 cursor-pointer">+</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-6 overflow-hidden">
        {Object.entries(TASKS).map(([status, items]) => (
            <div key={status} className="bg-slate-50 rounded-xl p-4 flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-600 uppercase text-xs tracking-wider">
                        {status === 'todo' ? '待处理' : status === 'doing' ? '进行中' : '已完成'}
                    </h3>
                    <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full">{items.length}</span>
                </div>
                <div className="space-y-3 overflow-y-auto">
                    {items.map(task => (
                        <Card key={task.id} className="p-3 cursor-move hover:shadow-md">
                            <div className="flex gap-2 mb-2">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                    task.tag === '文档' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                    task.tag === '开发' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                    'bg-green-50 text-green-600 border-green-100'
                                }`}>{task.tag}</span>
                            </div>
                            <p className="text-slate-700 font-medium text-sm">{task.title}</p>
                            <div className="mt-3 flex justify-between items-center">
                                <div className="w-5 h-5 bg-slate-200 rounded-full text-[10px] flex items-center justify-center text-slate-500">L</div>
                                <MoreHorizontal size={14} className="text-slate-400" />
                            </div>
                        </Card>
                    ))}
                    <button className="w-full py-2 text-slate-400 text-sm hover:bg-slate-200 rounded-lg border border-dashed border-slate-300 flex items-center justify-center gap-1">
                        <Plus size={14} /> 新建任务
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 模块 5 & 6: 智能编辑器 (仿 Tiptap)
 * 包含：多轮合稿、导师协同、智能润色
 */
const ModuleEditor = () => {
  const [content, setContent] = useState(`<h2>1. 项目背景与意义</h2><p>随着人口老龄化趋势的加剧，空巢老人的健康监护问题日益凸显。传统的养老模式主要依赖人工看护，存在成本高、响应慢、覆盖面窄等问题。</p><p>本项目旨在开发一套基于物联网与边缘计算的智能监护系统。</p>`);
  const [showAI, setShowAI] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: '王导师', text: '这部分数据支撑不足，建议引用《2024中国老龄化发展报告》。', highlight: '人口老龄化趋势' }
  ]);
  const editorRef = useRef(null);

  // 模拟文本选择触发 AI 菜单
  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString());
      setShowAI(true);
    } else {
      setShowAI(false);
    }
  };

  const applyAIPolish = () => {
    // 简单的替换逻辑演示
    const polished = content.replace(
      '传统的养老模式主要依赖人工看护，存在成本高、响应慢、覆盖面窄等问题。',
      '<span class="bg-violet-100 text-violet-900 px-1 rounded">传统养老模式受限于人力资源短缺，普遍面临边际成本递增、应急响应滞后及服务半径受限等结构性痛点。</span>'
    );
    setContent(polished);
    setShowAI(false);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] gap-6">
      {/* Main Editor Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col relative overflow-hidden">
        {/* Toolbar */}
        <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
          <div className="flex gap-1 border-r border-slate-200 pr-3 mr-1">
             <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 font-bold">B</button>
             <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 italic">I</button>
             <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 underline">U</button>
          </div>
          <div className="flex gap-1">
             <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 flex gap-1 items-center text-sm"><PenTool size={14}/> 标题 1</button>
          </div>
          <div className="ml-auto text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span> 自动保存于 10:42
          </div>
        </div>
        
        {/* Editor Canvas */}
        <div 
            className="flex-1 p-12 overflow-y-auto outline-none prose prose-slate max-w-none"
            contentEditable
            suppressContentEditableWarning
            onMouseUp={handleSelection}
            dangerouslySetInnerHTML={{ __html: content }}
            ref={editorRef}
        ></div>

        {/* Floating AI Menu (Simulated Tiptap Bubble Menu) */}
        {showAI && (
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 bg-white shadow-xl border border-violet-100 rounded-lg p-2 flex gap-2 animate-in zoom-in duration-200 z-10">
                <button 
                    onClick={applyAIPolish}
                    className="flex items-center gap-2 px-3 py-1.5 bg-violet-600 text-white text-sm rounded hover:bg-violet-700 transition-colors"
                >
                    <Sparkles size={14} /> AI 学术润色
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm rounded hover:bg-slate-50">
                    <MessageSquare size={14} /> 添加批注
                </button>
            </div>
        )}
      </div>

      {/* Sidebar: Comments & Collaboration */}
      <div className="w-80 flex flex-col gap-4">
         {/* Collaborators */}
         <Card className="p-4">
            <h4 className="text-sm font-bold text-slate-700 mb-3">当前在线</h4>
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">我</div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold text-xs">导</div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
            </div>
         </Card>

         {/* Comments List */}
         <div className="bg-slate-50 rounded-xl p-4 flex-1 overflow-y-auto">
            <h4 className="text-sm font-bold text-slate-700 mb-3 flex justify-between">
                导师批注 <span className="bg-slate-200 text-slate-600 px-1.5 rounded text-xs">1</span>
            </h4>
            {comments.map(comment => (
                <div key={comment.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm mb-3 cursor-pointer hover:border-violet-300">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-xs text-slate-800">{comment.user}</span>
                        <span className="text-[10px] text-slate-400">刚刚</span>
                    </div>
                    <div className="text-xs text-slate-500 mb-2 border-l-2 border-slate-200 pl-2 italic truncate">
                        "{comment.highlight}"
                    </div>
                    <p className="text-sm text-slate-700">{comment.text}</p>
                    <div className="mt-2 flex gap-2">
                        <button className="text-xs text-violet-600 font-medium">采纳建议</button>
                        <button className="text-xs text-slate-400">回复</button>
                    </div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
};

/**
 * 模块 9: 答辩演练
 */
const ModuleDefense = () => {
    const [status, setStatus] = useState('idle'); // idle, recording, analyzing, done
    const [feedback, setFeedback] = useState([]);

    const startRecording = () => {
        setStatus('recording');
        setFeedback([]);
        // Simulate real-time feedback
        setTimeout(() => setFeedback(prev => [...prev, { type: 'warn', text: '语速稍快 (240字/分)' }]), 2000);
        setTimeout(() => setFeedback(prev => [...prev, { type: 'good', text: '逻辑连接词清晰' }]), 5000);
        setTimeout(() => setFeedback(prev => [...prev, { type: 'warn', text: '眼神接触不足' }]), 8000);
    };

    return (
        <div className="h-[calc(100vh-100px)] flex gap-6">
            {/* Left: Camera / Video Area */}
            <div className="flex-1 bg-black rounded-2xl relative overflow-hidden flex flex-col items-center justify-center group">
                {status === 'idle' ? (
                     <div className="text-center">
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-700 transition-colors cursor-pointer">
                            <Video size={32} className="text-slate-400" />
                        </div>
                        <p className="text-slate-500">点击下方按钮开始模拟答辩</p>
                     </div>
                ) : (
                    <>
                        <div className="absolute top-4 right-4 bg-red-500/20 backdrop-blur text-red-500 px-3 py-1 rounded-full flex items-center gap-2 text-sm animate-pulse">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div> REC 00:12
                        </div>
                        {/* Simulated Waveform */}
                        <div className="flex items-end gap-1 h-12">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="w-1.5 bg-violet-500 rounded-full animate-bounce" style={{height: `${Math.random() * 40 + 10}px`, animationDelay: `${i * 0.1}s`}}></div>
                            ))}
                        </div>
                        <p className="mt-8 text-slate-400 font-light text-lg">"我们的项目主要解决了三个核心痛点..."</p>
                    </>
                )}

                <div className="absolute bottom-8 flex gap-4">
                    {status === 'idle' || status === 'done' ? (
                        <button onClick={startRecording} className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all shadow-lg shadow-red-500/30">
                            <Mic size={24} />
                        </button>
                    ) : (
                        <button onClick={() => setStatus('done')} className="w-14 h-14 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-white transition-all border-2 border-white">
                            <StopCircle size={24} />
                        </button>
                    )}
                </div>
            </div>

            {/* Right: AI Analysis Panel */}
            <div className="w-96 bg-slate-900 text-slate-100 rounded-2xl p-6 flex flex-col">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Sparkles size={18} className="text-violet-400"/> 实时 AI 教练
                </h3>

                {status === 'idle' && (
                    <div className="flex-1 flex items-center justify-center text-slate-600 text-sm">
                        准备就绪，等待开始...
                    </div>
                )}

                <div className="space-y-4 flex-1">
                    {feedback.map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-xl border-l-4 animate-in slide-in-from-right duration-500 ${
                            item.type === 'good' ? 'bg-green-500/10 border-green-500' : 'bg-yellow-500/10 border-yellow-500'
                        }`}>
                            <div className={`font-bold text-sm mb-1 ${item.type === 'good' ? 'text-green-400' : 'text-yellow-400'}`}>
                                {item.type === 'good' ? '表现优秀' : '改进建议'}
                            </div>
                            <div className="text-slate-300 text-sm">{item.text}</div>
                        </div>
                    ))}
                </div>

                {status === 'done' && (
                     <button className="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-xl mt-4 text-white font-medium flex justify-center items-center gap-2">
                        生成完整评估报告 <ArrowRight size={16}/>
                     </button>
                )}
            </div>
        </div>
    );
};

/**
 * 模块 10: 复盘与沉淀
 */
const ModuleReview = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">赛后复盘与成果沉淀</h2>
            
            <div className="grid grid-cols-3 gap-6">
                 <Card className="p-6 bg-gradient-to-br from-violet-500 to-indigo-600 text-white border-none">
                    <div className="mb-4 opacity-80"><Users size={24}/></div>
                    <div className="text-3xl font-bold mb-1">92.5</div>
                    <div className="text-sm opacity-80">团队协作评分</div>
                 </Card>
                 <Card className="p-6 bg-white">
                    <div className="mb-4 text-orange-500"><FileText size={24}/></div>
                    <div className="text-3xl font-bold text-slate-800 mb-1">12</div>
                    <div className="text-sm text-slate-500">文档版本迭代</div>
                 </Card>
                 <Card className="p-6 bg-white">
                    <div className="mb-4 text-green-500"><CheckCircle2 size={24}/></div>
                    <div className="text-3xl font-bold text-slate-800 mb-1">4</div>
                    <div className="text-sm text-slate-500">核心技能提升</div>
                 </Card>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-4">能力成长雷达</h3>
                    <div className="h-48 flex items-center justify-center bg-slate-50 rounded-lg text-slate-400 text-sm">
                        [雷达图可视化区域 - 模拟]
                        {/* 简单 CSS 模拟雷达图背景 */}
                        <div className="relative w-32 h-32 border border-slate-300 rounded-full flex items-center justify-center">
                            <div className="w-20 h-20 border border-slate-300 rounded-full"></div>
                            <div className="absolute w-full h-full bg-violet-500/20 rounded-full transform scale-75 skew-x-12"></div>
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-4">AI 建议转化路径</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">1</div>
                            <div>
                                <h4 className="font-bold text-slate-700">申报大创项目</h4>
                                <p className="text-sm text-slate-500 mt-1">项目成熟度符合国家级大创申报标准，建议重点完善商业计划书。</p>
                            </div>
                        </li>
                         <li className="flex gap-3">
                            <div className="mt-1 w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">2</div>
                            <div>
                                <h4 className="font-bold text-slate-700">软著申请</h4>
                                <p className="text-sm text-slate-500 mt-1">核心算法模块代码量已达标，建议立即整理源程序说明书。</p>
                            </div>
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
    );
};

/**
 * 主程序外壳
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('discovery');
  const [notification, setNotification] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'discovery': return <ModuleDiscovery />;
      case 'brainstorm': return <ModuleBrainstorm />;
      case 'team': return <ModuleTeam />;
      case 'workspace': return <ModuleWorkspace />;
      case 'editor': return <ModuleEditor />; // Module 5 & 6
      case 'defense': return <ModuleDefense />; // Module 9
      case 'review': return <ModuleReview />; // Module 10
      default: return <ModuleDiscovery />;
    }
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        activeTab === id 
          ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-4 flex-shrink-0">
        <div className="flex items-center gap-2 px-2 mb-8 mt-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-violet-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <Compass size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">UniCompete AI</span>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem id="discovery" icon={Compass} label="赛事探索 (1)" />
          <NavItem id="brainstorm" icon={Lightbulb} label="智能选题 (2)" />
          <NavItem id="team" icon={Users} label="组队广场 (3)" />
          <NavItem id="workspace" icon={KanbanSquare} label="协作空间 (4)" />
          <NavItem id="editor" icon={FileText} label="智能创作 (5/6)" />
          <NavItem id="defense" icon={Video} label="答辩演练 (9)" />
          <NavItem id="review" icon={BarChart3} label="复盘沉淀 (10)" />
        </nav>

        <div className="bg-slate-800 rounded-xl p-4 mt-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center">L</div>
            <div>
              <div className="text-sm font-bold">林同学</div>
              <div className="text-xs text-slate-400">计算机科学学院</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
          <div className="text-slate-400 text-sm flex items-center gap-2">
             首页 <ChevronRight size={14}/> {
                activeTab === 'discovery' ? '赛事探索' : 
                activeTab === 'editor' ? '智能创作' : 
                activeTab === 'defense' ? '答辩演练' : '当前模块'
             }
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              {notification && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>}
            </button>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800">
                升级 Pro 版
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-6xl mx-auto h-full">
                 {renderContent()}
            </div>
        </div>
      </main>
    </div>
  );
}