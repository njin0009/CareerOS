<script setup lang="ts">
import { companies, activeCount } from '../stores/career';
import { fitScore, visaFit } from '../services/recommendations';
import metadata from '../data/metadata.json';
import ActionDashboard from '../components/ActionDashboard.vue';
import { ref } from 'vue';
import { profile, safeLink } from '../stores/profile';

const layout = ref<'personal' | 'overview'>('personal');

const sectors = new Set(companies.map((company) => company.industry)).size;
const top = [...companies].sort((a, b) => fitScore(b) - fitScore(a)).slice(0, 8);
</script>

<template>
  <main>
    <div class="dashboard-switch" role="group" aria-label="切换 Dashboard 布局">
      <button type="button" :class="{ selected: layout === 'personal' }" :aria-pressed="layout === 'personal'" aria-controls="personal-dashboard" @click="layout = 'personal'">个人档案与工作台</button>
      <button type="button" :class="{ selected: layout === 'overview' }" :aria-pressed="layout === 'overview'" aria-controls="overview-dashboard" @click="layout = 'overview'">完整数据概览</button>
    </div>
    <section id="personal-dashboard" v-show="layout === 'personal'" aria-label="个人档案与工作台">
      <section class="card panel dashboard-profile">
        <div class="section-head"><h2>{{ profile.name || '我的个人档案' }}</h2><RouterLink to="/profile">编辑档案与简历 →</RouterLink></div>
        <div class="dashboard-profile-grid">
          <div><span>所在地与教育</span><p>{{ profile.city }} · {{ profile.education }}</p></div>
          <div><span>经验与优势</span><p>{{ profile.strengths }}</p></div>
          <div><span>职业目标</span><p>{{ profile.goal }}</p></div>
          <div><span>身份与工作权自述</span><p>{{ profile.visa }}</p></div>
        </div>
        <div class="actions">
          <span class="pill">{{ profile.resumeName ? '已保存简历：' + profile.resumeName : '尚未保存简历' }}</span>
          <a v-for="key in (['linkedin', 'seek', 'portfolio'] as const)" :key="key" v-show="safeLink(profile[key])" :href="safeLink(profile[key])" target="_blank" rel="noopener noreferrer" class="button">{{ key }}</a>
        </div>
      </section>
    <ActionDashboard />
    </section>
    <section id="overview-dashboard" v-show="layout === 'overview'" aria-label="完整数据概览">
      <p class="meta">完整数据概览与原有 Dashboard 内容（全部保留）</p>
    <section class="hero">
      <div class="eyebrow">CAREER DECISION SYSTEM</div>
      <h1>从“会做 IT”到<br>能推动业务转型</h1>
      <p>面向 Melbourne、Economics + Master of IT、测试/产品/项目背景的持续投递工作台。</p>
    </section>

    <section class="data-status" aria-labelledby="data-status-title">
      <div class="data-status-heading">
        <div>
          <span class="status-dot" aria-hidden="true"></span>
          <span class="eyebrow">DATA STATUS</span>
          <h2 id="data-status-title">数据状态</h2>
        </div>
        <RouterLink to="/sources" class="data-status-link">查看数据来源与核验规则 →</RouterLink>
      </div>

      <div class="data-status-grid">
        <div class="data-status-item data-status-primary">
          <span>最后更新</span>
          <strong><time :datetime="metadata.dataDate">{{ metadata.dataDate }}</time></strong>
          <small>{{ metadata.timezone }}</small>
        </div>
        <div class="data-status-item">
          <span>公司目录</span>
          <strong>{{ metadata.companyCount }}</strong>
          <small>家目标公司</small>
        </div>
        <div class="data-status-item">
          <span>已核实信号</span>
          <strong>{{ metadata.verifiedSignalCount }}</strong>
          <small>条近期公开信息</small>
        </div>
        <div class="data-status-item data-status-wide">
          <span>数据边界</span>
          <p>{{ metadata.vacancyDisclaimer }}</p>
        </div>
      </div>
      <p class="data-method"><b>怎样更新：</b>{{ metadata.method }}</p>
    </section>

    <section class="stats">
      <RouterLink to="/companies" class="card stat"><strong>{{ companies.length }}</strong><span>目标公司</span></RouterLink>
      <RouterLink to="/companies?priority=P1" class="card stat"><strong>{{ companies.filter(x => x.priority === 'P1').length }}</strong><span>P1 优先</span></RouterLink>
      <RouterLink to="/companies?city=Melbourne" class="card stat"><strong>{{ companies.filter(x => x.cities.includes('Melbourne')).length }}</strong><span>含 Melbourne</span></RouterLink>
      <RouterLink to="/industries" class="card stat"><strong>{{ sectors }}</strong><span>行业赛道</span></RouterLink>
      <RouterLink to="/tracker" class="card stat"><strong>{{ activeCount }}</strong><span>投递流程中</span></RouterLink>
    </section>

    <section class="section-head"><h2>当前最适合</h2><RouterLink to="/companies">查看全部 →</RouterLink></section>
    <div class="grid">
      <article v-for="company in top" :key="company.id" class="card compact">
        <div><b>{{ company.name }}</b><p>{{ company.industry }} · {{ company.cities[0] }}</p></div>
        <span>{{ fitScore(company) }}分 · {{ visaFit(company)[0] }}</span>
        <RouterLink :to="`/companies/${company.id}`">查看</RouterLink>
      </article>
    </div>

    <section class="card panel weekly">
      <h2>每周更新流程</h2>
      <ol><li>周一核实P1公司官方职位。</li><li>周二至周四完成8–12份定制申请。</li><li>每投5份完善一个作品集证据模块。</li><li>周五检查回复率并调整定位。</li><li>导出追踪CSV并备份本地数据。</li></ol>
    </section>
    </section>
  </main>
</template>
