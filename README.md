# 英语教学助手 - AI 英语学习伙伴

一个基于 DeepSeek AI 的英语学习助手，支持语法纠错、词汇解释和作文批改。部署在 Vercel 上，无需服务器，零成本运行。

## 功能

- **语法纠错**：输入英文句子，自动检测并纠正语法错误
- **词汇解释**：查询英文单词/短语的中文释义和用法
- **作文批改**：提交短文，获得综合评价和改进建议

## 一键部署到 Vercel

### 第一步：Fork 本项目

点击右上角 Fork 按钮，将项目复制到你的 GitHub 账号。

### 第二步：获取 DeepSeek API Key

1. 访问 [platform.deepseek.com](https://platform.deepseek.com)
2. 注册/登录账号
3. 充值（最低 10 元）
4. 在 API Keys 页面创建新的 API Key
5. 复制保存（格式：`sk-xxxxxxxx`）

### 第三步：部署到 Vercel

1. 访问 [vercel.com](https://vercel.com) 并用 GitHub 账号登录
2. 点击 **Add New → Project**
3. 选择你刚 Fork 的 `english-tutor` 仓库
4. 点击 **Deploy**
5. 在 Environment Variables 中添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `DEEPSEEK_API_KEY` | `sk-你的API密钥` | 必填 |
| `SYSTEM_PROMPT` | （可选）自定义提示词 | 不填则使用默认提示词 |

6. 点击 **Deploy**，等待部署完成

### 第四步：测试验证

1. 访问 Vercel 生成的网址（`https://你的项目名.vercel.app`）
2. 输入测试问题验证功能：
   - `He go to school yesterday` → 测试语法纠错
   - `challenge是什么意思` → 测试词汇解释
   - 发一篇 3 句以上的英语短文 → 测试作文批改

### 第五步：可选配置

1. **设置访问密码**：Vercel → Settings → Authentication → Protect with Password
2. **绑定自定义域名**：Vercel → Settings → Domains → 添加你的域名
3. **修改系统提示词**：Vercel → Settings → Environment Variables → 编辑 `SYSTEM_PROMPT`

## 本地运行

```bash
# 安装依赖
npm install

# 创建 .env 文件
cp .env.example .env
# 编辑 .env 填入你的 DEEPSEEK_API_KEY

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可使用。

## 常见问题

**部署失败？** 检查是否 Fork 了正确的仓库，尝试重新部署。

**API Key 无效？** 确认 DeepSeek 账户有余额，重新生成 Key 并复制。

**回复格式不对？** 检查 `SYSTEM_PROMPT` 环境变量是否正确设置。

**访问慢？** Vercel 有亚洲节点，国内访问通常正常。如确实慢可考虑绑定自定义域名。

## 后续扩展

当前版本为学生端 MVP。后续可扩展：
- **教师端**：需要数据库（如腾讯云开发）+ 后台管理界面
- **作业系统**：教师布置作业，学生在线提交
- **学习记录**：保存学生历史对话，跟踪进步

如需教师端开发，欢迎继续咨询。

## 费用说明

- **Vercel**：免费套餐足够个人使用
- **DeepSeek API**：按量计费，约 1 元/百万 token，一个学生一个月几毛钱
- 建议在 DeepSeek 平台设置每日消费限额
