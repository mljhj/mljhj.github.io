// 编辑本文件即可更新作品集；使用相对路径可兼容 GitHub Pages 与直接打开。
// prototype / prd / demo / repository 可填写 https 链接或 assets/ 下的文件路径。
window.PORTFOLIO_DATA = {
  profile: { name: '马良杰', email: '1051283734@qq.com', phone: '18159390763', city: '湖南 · 长沙', resume: 'assets/maliangjie-resume.pdf' },
  projects: [
    {
      id: 'team-ai', category: 'product', categoryLabel: 'AI 产品探索', title: '团长 AI · 营销助手',
      subtitle: '把好商品，变成好内容。', label: '内容生成 / 社区团购', image: 'assets/team-ai.png',
      imageAlt: '团长 AI 营销助手工作台，展示商品信息转社群文案与海报的界面',
      description: '围绕社区团购的内容制作场景，探索从商品信息到社群文案与海报的创作体验，让经营者把时间留给经营。',
      tags: ['AIGC', '内容工作流', '产品界面'],
      context: '社区团购中，同一份商品信息需要被组织成不同形式的分享内容。项目界面将文案与海报放在同一条制作流程中。',
      approach: ['统一录入商品信息，减少文案与海报之间的重复填写。', '通过工作台、制作素材与本地草稿组织创作路径。', '用可视化预览呈现社群表达与商品海报。'],
      note: '本案例基于提供的项目截图展示；具体技术方案、职责与验证结果可在后续 PRD 中补充。',
      resources: { prototype: '', prd: '', demo: '', repository: '' }
    },
    {
      id: 'legal-rag', category: 'engineering', categoryLabel: 'RAG + Agent', title: '法律法规智能问答系统',
      subtitle: '让复杂法规，成为有据可循的回答。', label: '自主项目 / 2026.03 — 2026.06', image: '',
      description: '从零构建法律法规场景的 RAG + Agent 系统，围绕长文本检索、多轮咨询与引用质量，打通知识处理、意图路由和评估流程。',
      tags: ['LangGraph', 'Milvus', 'RAGAS', 'React'],
      context: '法律文本具有编、章、节、条的层级结构，长上下文检索与多轮咨询需要更精细的知识组织与任务路由。',
      approach: ['按编 / 章 / 节 / 条切分法规，结合 Qwen3-Embedding、Milvus 与 Cross Encoder 重排序。', '设计五路意图分类，结合 LLM 分类与规则兜底，按任务选择处理路径。', '构建文件、向量、情景三层记忆，支持跨会话召回与空闲总结。', '集成 RAGAS 评估、日志脱敏和 JWT 双令牌认证；前端支持问答、法规差异对比、案例分析与知识库管理。'],
      note: '技术栈：Python、FastAPI、React + TypeScript + Vite、Milvus、SQLAlchemy、vLLM / Ollama、Transformers。页面中的流程图为能力示意。',
      resources: { prototype: '', prd: '', demo: '', repository: '' }
    },
    {
      id: 'audit-ai', category: 'engineering', categoryLabel: '实习项目', title: '本地化智能审计助手',
      subtitle: '让知识可检索，让数据更可控。', label: '湘江实验室 / 2025.06 — 2025.11', image: 'assets/audit-ai.png',
      imageAlt: '本地化智能审计助手的知识问答界面，包含知识库选择、回答与参考文档',
      description: '基于 RAG 的本地化智能审计助手，集成知识问答、知识库管理、文档差异对比、问答对生成与 Text2SQL 五大模块。',
      tags: ['RAG', 'Text2SQL', 'LangGraph', '本地部署'],
      context: '审计场景需要处理多类型文档与数据库查询，同时兼顾知识抽取、答案依据和数据本地可控。',
      approach: ['设计多类型文档解析管道：对简单 PDF 采用规则布局分析，对复杂表格采用多模态视觉大模型解析，并构建审计知识分块策略。', '基于 LangGraph 编排意图理解、SQL 生成、预验证、增强验证、执行、纠错和响应格式化节点。', '集成 Oracle 元数据与权限校验，检查表与字段、类型与约束，并进行注入检测。', '使用 SQLite 存储预加载的数据库表结构，支持本地长期记忆与查询流程。'],
      note: '技术栈：Python、LangChain、Chroma、Transformers、LangGraph。项目内容与职责来自简历。',
      resources: { prototype: '', prd: '', demo: '', repository: '' }
    }
  ]
};
