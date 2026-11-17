(() => {
  'use strict';
  const data = window.PORTFOLIO_DATA;
  if (!data) return;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // 仅允许网页、邮件、电话或站内相对路径，避免配置被解析为可执行协议。
  const safeUrl = value => {
    if (typeof value !== 'string' || !value.trim()) return '';
    const url = value.trim();
    if (/^(https?:\/\/|mailto:|tel:)/i.test(url)) return url;
    if (/^[a-z][a-z\d+.-]*:/i.test(url) || /^[\\/]{2}/.test(url)) return '';
    return url;
  };
  const projectDialog = document.querySelector('#project-dialog');
  const imageDialog = document.querySelector('#image-dialog');
  const flow = `<div class="legal-flow"><div class="flow-top"><span>LEGAL KNOWLEDGE ENGINE</span><span>RAG + AGENT</span></div><div class="flow-title">复杂的问题，<span>有序地回答。</span></div><div class="flow-query">如何在多轮咨询中找到对应的法规依据？</div><div class="flow-arrow" aria-hidden="true">↓</div><div class="flow-nodes"><span>意图路由</span><span>知识检索</span><span>重排序</span></div><div class="flow-arrow" aria-hidden="true">↓</div><div class="flow-result"><span>引用依据 · 质量评估</span><p>法规问答 / 差异对比 / 案例分析</p></div><div class="flow-caption">系统能力示意 · 非实际产品截图</div></div>`;
  function renderProjects() {
    document.querySelector('#project-list').innerHTML = data.projects.map(project => `<article class="project-card ${escape(project.id)}" data-category="${escape(project.category)}">
      ${project.image ? `<button class="project-visual" data-image="${escape(project.id)}" aria-label="查看${escape(project.title)}截图大图"><img src="${escape(safeUrl(project.image))}" alt="${escape(project.imageAlt || project.title)}" loading="lazy" width="${project.id === 'team-ai' ? 1859 : 1225}" height="${project.id === 'team-ai' ? 835 : 625}"></button>` : `<div class="project-visual" role="img" aria-label="法律问答系统能力示意：意图路由、知识检索、重排序与引用评估">${flow}</div>`}
      <div class="project-info"><div class="project-meta"><span class="category-badge">${escape(project.categoryLabel)}</span><span>${escape(project.label)}</span></div><h3>${escape(project.title)}</h3><p>${escape(project.description)}</p><div class="tags">${project.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div><div class="project-bottom"><button class="text-button" data-project="${escape(project.id)}">查看项目 <span aria-hidden="true">↗</span></button><span class="resource-hint">案例 · 原型 · PRD</span></div></div></article>`).join('');
    document.querySelector('[data-filter="all"] span').textContent = String(data.projects.length).padStart(2, '0');
  }
  function syncModalState() { document.body.classList.toggle('modal-open', !!document.querySelector('dialog[open]')); }
  function openProject(id) {
    const p = data.projects.find(item => item.id === id);
    if (!p) return;
    const resources = [['prototype','产品原型'],['prd','PRD 文档'],['demo','在线演示'],['repository','项目源码']];
    document.querySelector('#dialog-content').innerHTML = `<span class="category-badge">${escape(p.categoryLabel)}</span><h2 id="dialog-title" class="dialog-title">${escape(p.title)}</h2><p class="dialog-subtitle">${escape(p.subtitle)}</p><div class="tags">${p.tags.map(tag=>`<span>${escape(tag)}</span>`).join('')}</div>${p.image?`<img class="dialog-cover" src="${escape(safeUrl(p.image))}" alt="${escape(p.imageAlt || p.title)}">`:''}<section class="dialog-section"><h3>从什么问题出发</h3><p>${escape(p.context)}</p></section><section class="dialog-section"><h3>如何拆解与实现</h3><ul>${p.approach.map(item=>`<li>${escape(item)}</li>`).join('')}</ul></section><p class="dialog-note">${escape(p.note)}</p><section class="dialog-section"><h3>项目材料</h3><div class="resource-grid">${resources.map(([key,label])=>{const url=safeUrl(p.resources?.[key]);return url?`<a class="resource-link available" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${label}<span aria-hidden="true">↗</span></a>`:`<span class="resource-link unavailable">${label}<small>待补充</small></span>`;}).join('')}</div><p class="resource-section-note">项目材料陆续补充，欢迎通过邮件交流项目细节。</p></section>`;
    projectDialog.showModal();
    projectDialog.scrollTop = 0;
    syncModalState();
  }
  function openImage(id) {
    const p=data.projects.find(item=>item.id===id);
    if (!p?.image) return;
    const img=document.querySelector('#large-image'); img.src=safeUrl(p.image);img.alt=p.imageAlt || p.title;
    imageDialog.showModal();syncModalState();
  }
  renderProjects();
  document.addEventListener('click', event => {
    const project = event.target.closest('[data-project]');
    if (project) openProject(project.dataset.project);
    const img = event.target.closest('[data-image]');
    if (img) openImage(img.dataset.image);
    const close=event.target.closest('.close-dialog');
    if (close) close.closest('dialog').close();
    const filter=event.target.closest('[data-filter]');
    if (filter) {
      document.querySelectorAll('[data-filter]').forEach(btn=>{const active=btn===filter;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));});
      document.querySelectorAll('.project-card').forEach(card=>card.hidden=filter.dataset.filter!=='all'&&card.dataset.category!==filter.dataset.filter);
    }
  });
  document.querySelectorAll('dialog').forEach(dialog=>{
    dialog.addEventListener('close',syncModalState);
    dialog.addEventListener('click',event=>{if(event.target===dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();}});
  });
  const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('#navigation');
  function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','打开导航');nav.classList.remove('is-open');}
  menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(expanded));menu.setAttribute('aria-label',expanded?'关闭导航':'打开导航');nav.classList.toggle('is-open',expanded);});
  nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
  document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMenu();});
  window.matchMedia('(min-width:821px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
  let toastTimer;
  function toast(message){const box=document.querySelector('.toast');box.textContent=message;box.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.classList.remove('show'),4000);}
  document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
    const value=button.dataset.copy;
    try { if(!navigator.clipboard?.writeText)throw new Error('no clipboard');await navigator.clipboard.writeText(value);toast('邮箱已复制，期待与你交流。'); }
    catch { const area=document.createElement('textarea');area.value=value;area.style.cssText='position:fixed;left:-9999px';document.body.append(area);area.select();let success=false;try{success=document.execCommand('copy');}catch{}area.remove();button.focus();toast(success?'邮箱已复制，期待与你交流。':`请长按或选择邮箱复制：${value}`); }
  }));
  document.querySelector('#year').textContent=new Date().getFullYear();
  const backToTop=document.querySelector('.back-to-top');
  function updateBackToTop(){backToTop.dataset.visible=String(window.scrollY>500);}
  window.addEventListener('scroll',updateBackToTop,{passive:true});
  backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'}));
  updateBackToTop();
  if ('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){document.querySelectorAll('#navigation a').forEach(link=>{const current=link.hash===`#${entry.target.id}`;link.classList.toggle('current',current);if(current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}}},{rootMargin:'-15% 0px -60% 0px'});
    document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
  }
})();
