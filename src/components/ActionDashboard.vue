<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { companies,state } from '../stores/career';
import { profile } from '../stores/profile';
import { fitScore,visaFit } from '../services/recommendations';
import metadata from '../data/metadata.json';
import ResumeStrategy from './ResumeStrategy.vue';
import DailyApplications from './DailyApplications.vue';
const tasks=[{id:'rights',title:'核对工作权',detail:'查自己的签证批准信 / VEVO，再对照真实职位广告。不要把过桥签证自动当成 485 已获批。',to:'/visa-strategy',action:'查看资格策略'},{id:'profile',title:'准备申请材料',detail:'保存简历和作品集链接，写出测试、产品或项目经历的一个可量化成果。',to:'/profile',action:'完善个人档案'},{id:'select',title:'选择 1 个真实职位',detail:'打开推荐公司的官方职业页，确认地点、经验、工作权与截止日。公司推荐不是当前空缺。',to:'/companies?priority=P1',action:'选择目标公司'},{id:'apply',title:'定制并提交简历',detail:'根据职位广告调整简历证据；在雇主网站提交后，回到追踪区记录真实状态。',to:'/tracker',action:'记录申请'},{id:'learn',title:'补齐 1 个证据缺口',detail:'QA：API 测试报告；BA：流程图与需求；产品：指标与用户故事；Cloud/AI：小型演示与成本说明。',to:'/roles',action:'查看岗位与技能'}];
const done=reactive<Record<string,boolean>>({});
const message=reactive({text:''});
try{const saved=JSON.parse(localStorage.getItem('career-os-checklist')||'{}');for(const task of tasks)done[task.id]=saved[task.id]===true;}catch{message.text='清单读取失败';}
watch(done,()=>{try{localStorage.setItem('career-os-checklist',JSON.stringify(done));}catch{message.text='清单未能保存';}},{deep:true});
const next=computed(()=>tasks.find(t=>!done[t.id]));
const completed=computed(()=>tasks.filter(t=>done[t.id]).length);
const top=computed(()=>[...companies].filter(c=>visaFit(c)[0]!=='通常受限').sort((a,b)=>fitScore(b)-fitScore(a)).slice(0,3));
const submitted=computed(()=>state.applications.filter(a=>['已投递','面试中','Offer','拒绝'].includes(a.status)));
const interviews=computed(()=>state.applications.filter(a=>a.status==='面试中').length);
const recent=computed(()=>state.applications.slice(0,3));
const followups=computed(()=>state.applications.filter(a=>a.status==='已投递'&&/^\d{4}-\d{2}-\d{2}$/.test(a.date)&&Date.now()-new Date(a.date+'T00:00:00').getTime()>=7*86400000).slice(0,3));
const funnelStatuses=['研究中','已投递','面试中','Offer'] as const;
const funnelCount=(status:string)=>state.applications.filter(a=>a.status===status).length;
</script>
<template><section class="action-home">
<div class="command-heading"><div><div class="eyebrow">YOUR NEXT MOVE</div><h1>{{profile.name?profile.name+'，':''}}今天，先完成一步。</h1><p class="lede">少看目录，多推进一次真实申请。</p></div><RouterLink class="button" to="/profile">我的档案 →</RouterLink></div>
<div class="update-strip"><time :datetime="metadata.dataDate">数据更新：{{metadata.dataDate}}</time><span>{{metadata.timezone}} · {{companies.length}} 公司 · {{metadata.verifiedSignalCount}} 条核实信号</span><RouterLink to="/sources">查看来源 →</RouterLink></div>
<DailyApplications />
<div class="command-grid"><section class="card panel next-card"><div class="eyebrow">01 · NEXT STEP</div><h2>{{next?.title||'本轮清单完成，开始下一轮'}}</h2><p>{{next?.detail||'检查未回复申请、选择新职位，并保留上一轮投递记录。'}}</p><RouterLink v-if="next" :to="next.to" class="button primary">{{next.action}} →</RouterLink><button v-else class="button" @click="tasks.forEach(t=>done[t.id]=false)">重置行动清单</button><p class="meta">“完成”是你手动确认，不代表系统已代你完成核验或提交。</p></section>
<section class="card panel"><div class="eyebrow">02 · APPLICATION PROGRESS</div><div class="progress-grid"><div><strong>{{submitted.length}}</strong><span>已提交记录</span></div><div><strong>{{interviews}}</strong><span>面试中</span></div><div><strong>{{completed}} / {{tasks.length}}</strong><span>行动完成</span></div></div><p class="meta">提交数 = 状态为已投递、面试中、Offer 或拒绝的追踪记录数；不是公司数，也不是自动读取的提交数。</p><RouterLink to="/tracker">更新投递追踪 →</RouterLink><p v-if="!recent.length">还没有记录。提交第一份后，在追踪区登记。</p><div v-for="a in recent" :key="a.id" class="recent-line"><b>{{a.company}}</b><span>{{a.role}} · {{a.status}}</span></div><p v-if="followups.length">建议检查（已投递 ≥ 7 天）：{{followups.map(a=>a.company).join('、')}}。是否跟进仍以招聘方说明为准。</p></section></div>
<section class="card panel funnel-panel"><div class="section-head"><h2>申请漏斗</h2><RouterLink to="/tracker">打开看板 →</RouterLink></div><div class="funnel"><div v-for="status in funnelStatuses" :key="status"><strong>{{funnelCount(status)}}</strong><span>{{status}}</span></div></div><p class="meta">根据你手动保存的当前状态统计；不是招聘网站自动同步结果。</p></section>
<ResumeStrategy />
<div class="section-head"><h2>三个优先研究目标</h2><RouterLink to="/companies">全部公司与筛选 →</RouterLink></div><p class="meta">公司研究分：沿用原优先级与地点规则，已将品牌竞争难度从签证分类移除。非录用概率、非真实职位匹配；新版简历岗位主线见上方证据地图。</p>
<div class="focus-grid"><article v-for="c in top" :key="c.id" class="card panel"><div class="tags"><span class="pill priority">{{c.priority}}</span><span class="pill">{{fitScore(c)}} 分</span></div><h3>{{c.name}}</h3><p>{{c.recommendedRoles.slice(0,2).join(' / ')}}</p><p class="meta">{{c.fitReason}}</p><RouterLink :to="'/companies/'+c.id">原因、发展信号与官方职位 →</RouterLink></article></div>
<div class="command-grid lower-grid"><section class="card panel"><h2>行动清单与知识补齐</h2><label v-for="task in tasks" :key="task.id" class="task-line"><input type="checkbox" v-model="done[task.id]"><span>{{task.title}}<RouterLink :to="task.to">{{task.action}} →</RouterLink></span></label><p role="status">{{message.text}}</p></section><section class="card panel"><h2>当前策略：材料 → 核验 → 定制 → 投递</h2><p>主线：QA / Business Analyst / Project Coordinator；产品与 Cloud/AI 作为证据驱动的扩展方向。先看真实广告是否接受你的工作权，再比较技能。</p><div class="actions"><RouterLink to="/visa-strategy" class="button">签证策略</RouterLink><RouterLink to="/roles" class="button">岗位与知识</RouterLink><RouterLink to="/industries" class="button">行业探索</RouterLink></div><p class="meta">这是画像策略，不是移民建议或实时招聘结论。数据日期代表现有资料更新时间，本次界面改版没有重新核实全部公司。</p></section></div>
</section></template>
