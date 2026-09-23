<script setup lang="ts">
const paths=[
{tier:'主投',roles:'Technical / Digital / IT Business Analyst',evidence:'Symphony3：需求、验收标准、网站迁移；ECARX：变更影响、发布决策。',gap:'补充被采用的需求成果与决策结果。'},
{tier:'主投',roles:'Implementation Analyst / Systems BA / Integration BA',evidence:'接口、系统集成、测试、AWS 原型与跨团队交付。',gap:'核对广告要求的平台经验；项目经验不等于生产运维。'},
{tier:'选择性主投',roles:'Automation BA / AI Workflow Analyst',evidence:'多代理迁移需求、Discovery 原型、LLM 集成。',gap:'明确原型和生产边界；补充评估、人工复核与失败处理。'},
{tier:'保留路径',roles:'UAT / Release Analyst / Product Operations / PMO',evidence:'Python 测试、Go/No-Go、产品优先级、PMP。',gap:'按广告核对商业责任与职级，不自动归为 graduate 或 senior。'},
{tier:'挑战方向',roles:'Product Manager / Cloud Architect / Senior AI Consultant',evidence:'产品和云项目提供基础，但不覆盖所有高级职责。',gap:'需证明商业结果、架构责任或企业 AI 落地经验。'}];
</script>
<template><section class="card panel"><div class="section-head"><h2>新版简历 → 岗位证据地图</h2><RouterLink to="/roles">完整岗位目录 →</RouterLink></div><p>定位：连接业务需求、技术原型与数字交付的 BA。依据 Nora 新版简历；不是当前职位或录用概率。</p><div class="stack"><article v-for="p in paths" :key="p.roles"><span class="pill">{{p.tier}}</span><b> {{p.roles}}</b><p>{{p.evidence}}</p><p class="meta">下一步：{{p.gap}}</p></article></div><details><summary>公司研究与真实岗位匹配有什么区别？</summary><p>公司目录分数仅用于研究排序。真实岗位必须先核对工作权、合同期限和职级，再列出广告任务 → 简历证据 → 缺口 → 下一步。没有真实广告时不生成精确匹配分。</p><p>优先研究：TechnologyOne / MYOB / Telstra Health 的实施与 BA；银行、保险、能源的系统变更与 UAT；汽车公司的数字系统与交付。BYD / Polestar 的本地商业岗位不等于总部软件研发。</p><p>市场统计尚未建立去重样本，因此不展示虚构数量、薪资或“实时空缺”。</p></details></section></template>
