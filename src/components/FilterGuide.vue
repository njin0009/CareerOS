<template>
  <details class="card guide">
    <summary>筛选和匹配分是怎么算的？点击查看完整规则</summary>
    <div class="guide-body">
      <section>
        <h3>先分清两件事</h3>
        <p><b>筛选</b>像一道门：不符合你选的条件，公司就暂时不显示。<b>匹配分</b>像考试分数：公司仍然存在，只是按更适合你的程度排序。</p>
      </section>
      <section class="formula-box">
        <h3>完整数学公式</h3>
        <code>匹配分 = clamp(优先级分 + Melbourne分 + 签证分 + 战略行业分, 0, 100)</code>
        <p><code>clamp</code> 的意思很简单：低于0分就按0分，高于100分就按100分。</p>
      </section>
      <div class="rule-grid">
        <section><h3>① 优先级分</h3><p><b>P1 = 40分</b>：背景、岗位和行业整体最贴近，本周先看。</p><p><b>P2 = 24分</b>：值得投，但地点、竞争或岗位入口稍弱。</p><p><b>P3 = 10分</b>：长线或挑战目标，不占核心投递时间。</p></section>
        <section><h3>② Melbourne分</h3><p><b>包含 Melbourne = +30分</b></p><p><b>不包含 = +0分</b></p><p>因为你目前以Melbourne为主要生活和求职地点。它不是在评价公司好坏，只是在计算可达性。</p></section>
        <section><h3>③ 签证适配分</h3><p><b>主申请池 = +25分</b></p><p><b>逐条核对 = +8分</b></p><p><b>通常受限 = −20分</b></p><p>这是时间分配建议，不是法律结论。最终必须看职位广告和VEVO。</p></section>
        <section><h3>④ 战略行业分</h3><p><b>高匹配行业 = +5分</b></p><p>包括银行金融、咨询、Enterprise Tech、Cloud、数字平台、能源公用事业、医疗科技、新能源与智能出行。</p><p>这些行业更容易同时使用商业、IT、产品、测试和项目能力。</p></section>
      </div>
      <section class="example">
        <h3>算一个例子</h3>
        <p>某公司是P1、包含Melbourne、属于主申请池，而且是高匹配行业：</p>
        <code>40 + 30 + 25 + 5 = 100分</code>
        <p>另一个公司是P2、不在Melbourne、需要逐条核对、也不是战略加分行业：</p>
        <code>24 + 0 + 8 + 0 = 32分</code>
      </section>
      <section>
        <h3>其他筛选字段为什么这样排？</h3>
        <ol>
          <li><b>关键词</b>放第一：当你已经知道公司或岗位名称时，这是最快入口。</li>
          <li><b>城市</b>放第二：先解决“能不能去上班”。</li>
          <li><b>行业</b>放第三：再决定想进入哪个职业环境。</li>
          <li><b>优先级</b>放第四：决定本周花多少时间。</li>
          <li><b>签证适配</b>放第五：防止把大量时间投入明显受限岗位。</li>
          <li><b>申请状态</b>放最后：它管理你的工作进度，不评价公司。</li>
        </ol>
        <p><b>注意：</b>关键词、行业筛选、申请状态都不会偷偷改变匹配分；筛选结果默认按匹配分从高到低排列，同分时按公司名称排列。</p>
      </section>
    </div>
  </details>
</template>
