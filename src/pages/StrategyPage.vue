<script setup lang="ts">
import { ref } from 'vue';
import { strategy,interpretStrategy } from '../stores/strategy';
const draft=ref(strategy.naturalLanguage),message=ref('');
const cityOptions=['Melbourne','Sydney','Brisbane','Perth'];
const roleOptions=['Technical Business Analyst','Business Analyst','Systems Analyst','Implementation Analyst','AI Workflow Analyst','Product Analyst','Test / UAT Analyst'];
const industryOptions=['GovTech','Enterprise Software','Automotive Technology','Banking','Energy','HealthTech','Consulting'];
function apply(){interpretStrategy(draft.value);message.value='策略已解释并保存。请检查结构化结果，再到匹配页查看变化。';}
function toggle(list:string[],value:string){const index=list.indexOf(value);index>=0?list.splice(index,1):list.push(value);}
</script>
<template><main class="strategy-page"><div class="eyebrow">MY JOB SEARCH STRATEGY</div><h1>告诉 CareerOS 你怎么选工作</h1><p class="lede">写一句话，或直接调整下面的策略。系统只使用明确选择，不会把“跳过”解释成拒绝。</p>
<section class="strategy-input card"><label for="strategy-text"><b>自然语言策略</b></label><textarea id="strategy-text" v-model="draft" rows="4" placeholder="例如：Melbourne优先，可以去Sydney；我想找Technical BA，不想投Senior或短期合同。"></textarea><div class="actions"><button class="button primary" @click="apply">解释并应用策略</button><RouterLink class="button" to="/match">查看匹配结果</RouterLink></div><p role="status" class="meta">{{message}}</p></section>
<div class="strategy-grid"><section class="card panel"><h2>1 · 城市策略</h2><p>决定地点得分，不自动排除其他城市。</p><div class="choice-grid"><button v-for="item in cityOptions" :key="item" :class="['choice',strategy.cities.includes(item)&&'selected']" @click="toggle(strategy.cities,item)">{{item}}</button></div></section>
<section class="card panel"><h2>2 · 行业策略</h2><p>用于决定优先研究的业务场景。</p><div class="choice-grid"><button v-for="item in industryOptions" :key="item" :class="['choice',strategy.industries.includes(item)&&'selected']" @click="toggle(strategy.industries,item)">{{item}}</button></div></section>
<section class="card panel"><h2>3 · 岗位策略</h2><p>选择你愿意申请的角色，不代表已经具备全部资格。</p><div class="choice-grid"><button v-for="item in roleOptions" :key="item" :class="['choice',strategy.roles.includes(item)&&'selected']" @click="toggle(strategy.roles,item)">{{item}}</button></div></section>
<section class="card panel"><h2>4 · 资格与排除</h2><label>工作权状态<select v-model="strategy.workRights"><option value="verify">需要逐条核验</option><option value="confirmed">已经自行确认</option><option value="unknown">暂不确定</option></select></label><p><b>排除：</b>{{strategy.exclusions.join('、')||'没有设置'}}</p><p class="meta">工作权自述不会自动变成法律或招聘资格结论。</p></section></div></main></template>
