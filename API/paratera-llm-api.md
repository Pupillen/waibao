# 并行智算云 - 大模型平台 API 文档

> 文档来源: https://ai.paratera.com/document/llm/modalAbility/text

## 概述

语言大模型具备文本理解和文字对话的能力。当您传入文本信息时，大模型可以理解信息，并结合这些信息进行回复。通过此 API，您可以调用模型理解文本，生成文本内容，并基于此 API 构建或扩展自己的应用或自动化任务。

---

## 1. 模型系列

### DeepSeek 系列

| 模型名称 | 上下文长度 | RPM | TPM | Tokens计费 |
|---------|-----------|-----|-----|-----------|
| DeepSeek-R1-Distill-Qwen-7B | 32K | 3w | 500w | **限时免费** |
| DeepSeek-R1 | 64K | - | - | 输入：4元/M Tokens<br>输出：16元/M Tokens |
| DeepSeek-V3 | 64K | - | - | 输入：2元/M Tokens<br>输出：8元/M Tokens |
| DeepSeek-R1-Distill-Qwen-32B | 32K | - | - | 输入：1.5元/M Tokens<br>输出：6元/M Tokens |
| DeepSeek-R1-Distill-Qwen-14B | 32K | - | - | 输入：1元/M Tokens<br>输出：3元/M Tokens |
| DeepSeek-R1-Distill-Llama-8B | 32K | - | - | 输入：0.6元/M Tokens<br>输出：2.4元/M Tokens |
| DeepSeek-R1-N011-Distill-Llama-70B | 32K | - | - | 输入：2元/M Tokens<br>输出：8元/M Tokens |

### Qwen 系列

| 模型名称 | 上下文长度 | QPM | TPM | Tokens计费 |
|---------|-----------|-----|-----|-----------|
| QwQ-32B | 32K | 600 | 100w | 输入：￥1.5/M Tokens<br>输出：￥6/M Tokens |
| Qwen3-235B-A22B | 128K | 600 | 100w | 输入：￥4/M Tokens<br>输出：￥40/M Tokens |
| Qwen3-32B | 128K | 600 | 100w | 输入：￥2/M Tokens<br>输出：￥20/M Tokens |

### MiniMax 系列

| 模型名称 | 上下文长度 | RPM | TPM | Tokens计费 |
|---------|-----------|-----|-----|-----------|
| MiniMax-M1-80K | 1M | 120 | 72w | 输入：￥4/M Tokens<br>输出：￥16/M Tokens |
| MiniMax-Text-01 | 1M | 120 | 72w | 输入：￥1/M Tokens<br>输出：￥8/M Tokens |

### GLM-Z1 系列

| 模型名称 | 上下文长度 | 并发数 | Tokens计费 |
|---------|-----------|-------|-----------|
| GLM-Z1-Flash | 32K | 40 | **免费** |
| GLM-Z1-Air | 32K | 40 | 输入：¥0.5/M Tokens<br>输出：¥0.5/M Tokens |
| GLM-Z1-AirX | 32K | 40 | 输入：￥5/M Tokens<br>输出：￥5/M Tokens |

### GLM-4 系列

| 模型名称 | 上下文长度 | 并发数 | Tokens计费 |
|---------|-----------|-------|-----------|
| GLM-4-Flash | 128K | 1000 | **免费** |
| GLM-4-9B | 128K | 10 | 输入：¥2/M Tokens<br>输出：¥2/M Tokens |
| GLM-4-Plus | 128K | 100 | 输入：￥5/M Tokens<br>输出：￥5/M Tokens |
| GLM-4-Air | 128K | 30 | 输入：￥0.5/M Tokens<br>输出：￥0.5/M Tokens |
| GLM-4-Long | 1M | 30 | 输入：￥1/M Tokens<br>输出：￥1/M Tokens |
| GLM-4-AirX | 8K | 30 | 输入：￥10/M Tokens<br>输出：￥10/M Tokens |
| GLM-4-FlashX | 128K | 100 | 输入：￥0.1/M Tokens<br>输出：￥0.1/M Tokens |

### ERNIE 4.5 Turbo 系列

| 模型名称 | 上下文长度 | RPM | TPM | Tokens计费 |
|---------|-----------|-----|-----|-----------|
| ERNIE-4.5-Turbo-32K | 32K | 5k | 40w | 输入：¥1.14/M Tokens<br>输出：¥4.57/M Tokens |
| ERNIE-4.5-Turbo-128K | 128K | 5k | 40w | 输入：¥1.14/M Tokens<br>输出：¥4.57/M Tokens |

> **注：所有模型总赠送体验额度为40元。**

---

## 2. 使用前提

您已创建大模型平台 API_Key，用于模型调用。

- 若您还未申请，请前往 [并行智算云平台-大模型平台-模型广场](https://ai.paratera.com/#/lms/model)

---

## 3. API 接入方式

### 3.1 本地客户端接入

支持三种主流工具：
- **Chatbox**
- **Cherry Studio**
- **AnythingLLM**

### 3.2 代码接入

#### Base URL

```
https://$BASE_URL/v1/chat/completions
```

或

```
https://$BASE_URL/chat/completions
```

#### 认证方式

```
Header: Authorization: Bearer {your_api_key}
Header: Content-Type: application/json
```

---

## 4. DeepSeek/GLM-Z1/GLM-4/MiniMax-M1/ERNIE4.5 调用方式

### cURL

```bash
# 推理请求
curl --request POST \
  --url https://$BASE_URL/v1/chat/completions \
  --header 'authorization: Bearer 申请到的key' \
  --header 'content-type: application/json' \
  --data '{
    "model": "模型ID",
    "messages": [
      {
        "role": "user",
        "content": "Hello World"
      }
    ]
  }'
```

### Python

```python
import openai

client = openai.OpenAI(
    api_key="申请到的key",
    base_url="https://$BASE_URL/v1/"
)

response = client.chat.completions.create(
    model="模型ID",  # model to send to the proxy
    messages=[{"role": "user", "content": "Hello World"}],
)

print(response)
```

### Go

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    url := "https://$BASE_URL/v1/chat/completions"

    // Define and marshal the payload
    payload, _ := json.Marshal(map[string]interface{}{
        "model": "模型ID",
        "messages": []map[string]string{{
            "role":    "user",
            "content": "Hello World",
        }},
        "stream":      false,
        "max_tokens":  512,
        "temperature": 0.6,
    })

    // Create and send the request
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(payload))
    req.Header.Set("Authorization", "Bearer 申请的api-key")
    req.Header.Set("Content-Type", "application/json")

    res, err := http.DefaultClient.Do(req)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    defer res.Body.Close()

    // Read and print the response
    body, _ := ioutil.ReadAll(res.Body)
    fmt.Println("Response:", string(body))
}
```

### Java

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import org.json.JSONObject;
import org.json.JSONArray;

public class Test {
    public static void main(String[] args) throws Exception {
        JSONObject body = new JSONObject()
            .put("model", "模型ID")
            .put("messages", new JSONArray().put(new JSONObject().put("role", "user").put("content", "Hello World")))
            .put("stream", false)
            .put("max_tokens", 512)
            .put("temperature", 0.6);

        HttpResponse<String> response = Unirest.post("https://$BASE_URL/v1/chat/completions")
            .header("Authorization", "Bearer 申请的api-key")
            .header("Content-Type", "application/json")
            .body(body.toString())
            .asString();

        System.out.println(response.getBody());
    }
}
```

### Node.js

```javascript
const axios = require('axios');

const url = 'https://$BASE_URL/v1/chat/completions';

const payload = {
    model: '模型ID',
    messages: [
        {
            role: 'user',
            content: 'Hello world',
        },
    ],
    stream: false,
    max_tokens: 512,
    temperature: 0.6,
};

axios
    .post(url, payload, {
        headers: {
            Authorization: 'Bearer 申请的api-key',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        console.log('Response Status:', response.status);
        console.log('Response Body:', response.data.choices[0].message.content);
    })
    .catch((err) => {
        console.error('Error:', err);
    });
```

---

## 5. Qwen3 调用方式

> **重要说明：**
> - 仅支持流式输出，通过 `stream=true` 来打开
> - 通过 `enable_thinking` 参数来控制是否有推理过程：`true` 有，`false` 没有

### cURL

```bash
curl --location 'https://$BASE_URL/chat/completions' \
  --header 'Authorization: Bearer 申请到的key' \
  --header 'Content-Type: application/json' \
  --data '{
    "stream": true,
    "model": "Qwen3-235B-A22B",
    "messages": [
      {
        "role": "user",
        "content": "飞机怎么会飞?"
      }
    ],
    "enable_thinking": true
  }'
```

### Python (带思考过程)

```python
from openai import OpenAI

# 初始化OpenAI客户端
client = OpenAI(
    api_key="申请到的key",
    base_url="https://$BASE_URL",
)

messages = [{"role": "user", "content": "你是谁"}]

completion = client.chat.completions.create(
    model="Qwen3-235B-A22B",
    messages=messages,
    # enable_thinking 参数开启思考过程，该参数对 QwQ 模型无效
    extra_body={"enable_thinking": True},
    stream=True,
)

reasoning_content = ""  # 完整思考过程
answer_content = ""     # 完整回复
is_answering = False    # 是否进入回复阶段

print("\n" + "=" * 20 + "思考过程" + "=" * 20 + "\n")

for chunk in completion:
    if not chunk.choices:
        print("\nUsage:")
        print(chunk.usage)
        continue

    delta = chunk.choices[0].delta

    # 只收集思考内容
    if hasattr(delta, "reasoning_content") and delta.reasoning_content is not None:
        if not is_answering:
            print(delta.reasoning_content, end="", flush=True)
            reasoning_content += delta.reasoning_content

    # 收到content，开始进行回复
    if hasattr(delta, "content") and delta.content:
        if not is_answering:
            print("\n" + "=" * 20 + "完整回复" + "=" * 20 + "\n")
            is_answering = True
        print(delta.content, end="", flush=True)
        answer_content += delta.content
```

---

## 6. 请求参数说明

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| `model` | string | 是 | 模型标识符 |
| `messages` | array | 是 | 对话历史，包含 role 和 content |
| `stream` | boolean | 否 | 是否启用流式响应 (Qwen3 必须为 true) |
| `enable_thinking` | boolean | 否 | Qwen3 专用，控制是否输出推理过程 |
| `max_tokens` | integer | 否 | 响应长度限制 |
| `temperature` | float | 否 | 输出随机性 (通常为 0.6) |

---

## 7. 响应格式

### 非流式响应

```json
{
  "id": "chatcmpl-xxx",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "模型ID",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "回复内容"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  }
}
```

### 流式响应

```
data: {"id":"xxx","choices":[{"delta":{"content":"部分内容"},"index":0}]}

data: {"id":"xxx","choices":[{"delta":{"content":"更多内容"},"index":0}]}

data: [DONE]
```

---

## 8. 相关链接

- [产品介绍](https://ai.paratera.com/document/llm/quickStart)
- [快速入门 - API使用文档](https://ai.paratera.com/document/llm/quickStart/useApi)
- [API密钥管理](https://ai.paratera.com/document/llm/quickStart/apiKeys)
- [费用管理](https://ai.paratera.com/document/llm/billing/billing)
- [视觉理解](https://ai.paratera.com/document/llm/modalAbility/vision)
- [图像生成](https://ai.paratera.com/document/llm/modalAbility/image)
- [向量化模型](https://ai.paratera.com/document/llm/modalAbility/embedding)
- [视频生成](https://ai.paratera.com/document/llm/modalAbility/video)
- [重排序模型](https://ai.paratera.com/document/llm/modalAbility/reRanking)

---

## 9. 常见问题

如遇问题，请参考 [常见问题](https://ai.paratera.com/document/llm/support/qa)

---

*文档抓取时间: 2025-12-04*
*来源: 并行智算云产品文档中心*
