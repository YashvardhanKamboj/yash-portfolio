/* ==========================================================================
   YASH — Portfolio JS (clean + modular)
   Edit CONFIG values to tweak texts, speeds, etc.
   ========================================================================== */

   const CONFIG = {
    email: "contact@yashkamboj.com",
    resumePath: "assets/Yash-Kamboj-Resume.pdf",
    matrix: { size: 14, color: "#1eff8e", fade: "rgba(0,12,12,0.12)" },
    typing: {
      lines: [
        "$ init sequence: forging runes ▒▒▒ binding daemons ▒▒▒ hardening gateways",
        "$ compiling spells… optimizing wards… sealing artifacts",
        "$ health: systems nominal ✓  latency: low  throughput: high",
        "$ deploy: yashkamboj.com ✓",
      ],
      writeMs: 22,
      deleteMs: 18,
      pauseEnd: 1200,
      pauseSwap: 250,
    },
    breach: {
      terminalLines: [
        "> injecting payload... ███",
        "> breach confirmed ✓",
        "> siphoning system data...",
        "> exporting report to yashkamboj.com",
      ],
      popupSteps: [
        { text: "you’re hacked.", html: false, delay: 800 },
        { text: "retrieving data…", html: false, delay: 900 },
        { text: "fingerprints matched. integrity intact.", html: false, delay: 800 },
        { text: "data collected.", html: false, delay: 800 },
        {
          text: `contact Yash for assistance: <a href="mailto:${"contact@yashkamboj.com"}">${"contact@yashkamboj.com"}</a>`,
          html: true,
          delay: 1100,
        },
      ],
    },
    marqueeTexts: [
      "Yash • Systems • Security • Web • Cloud • Arduino C++ • C# • PHP & SQL • Bootstrap • Figma • Excel • Premiere Pro • ",
      "Building reliable systems • JavaScript that dazzles • Clean code • Observability • Performance • ",
      "Featured Projects • Music Forge • Vector Winds • Arcane Bazaar • ",
      "Tools • Tips • Shortcuts • Tricks • ",
    ],
    paletteCommands: [
      { label: "Go: Gate", action: () => jump("#gate") },
      { label: "Go: Origin", action: () => jump("#origin") },
      { label: "Go: Artifacts", action: () => jump("#artifacts") },
      { label: "Go: Quests", action: () => jump("#quests") },
      { label: "Go: Spells", action: () => jump("#spells") },
      { label: "Go: Resume", action: () => jump("#resume") },
      { label: "Toggle: CRT Overlay", action: () => document.body.classList.toggle("crt") },
      { label: "Open: Admin", action: () => document.getElementById("admin")?.classList.remove("hide") },
    ],
  };
  
  /* Utils */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const on = (el, ev, fn, opt) => el && el.addEventListener(ev, fn, opt);
  function jump(sel){ const el=$(sel); if(el) el.scrollIntoView({behavior:"smooth", block:"start"}); }
  
  /* Simple audio */
  const audio = (() => {
    let ctx, hum;
    const ensure = () => (ctx ||= new (window.AudioContext || window.webkitAudioContext)());
    return {
      beep(f=220,d=0.05){ const c=ensure(), o=c.createOscillator(), g=c.createGain();
        o.type="square"; o.frequency.value=f; g.gain.value=0.04; o.connect(g).connect(c.destination);
        o.start(); setTimeout(()=>o.stop(), d*1000);
      },
      humStart(){ const c=ensure(); if(hum) return; hum=c.createOscillator(); const g=c.createGain();
        hum.type="sine"; hum.frequency.value=60; g.gain.value=0.015; hum.connect(g).connect(c.destination); hum.start();
      }
    };
  })();
  const beep = (f,d)=>audio.beep(f,d);
  const startHum = ()=>audio.humStart();
  
  /* 1) Smooth scroll + footer year */
  $$('a[href^="#"]').forEach(a => on(a, "click", e => {
    const id=a.getAttribute("href"); if(!id || id==="#") return;
    const el=$(id); if(el){ e.preventDefault(); el.scrollIntoView({behavior:"smooth", block:"start"}); }
  }));
  $("#year").textContent = new Date().getFullYear();
  
  /* 2) Typing */
  (function typing(){
    const el=$("#typed"); if(!el) return;
    const L=CONFIG.typing.lines; let li=0,ci=0,del=false,pause=0;
    function tick(){
      if(pause>0){ pause-=16; return requestAnimationFrame(tick); }
      const cur=L[li];
      if(!del){ ci++; el.textContent=cur.slice(0,ci); if(ci>=cur.length){ del=true; pause=CONFIG.typing.pauseEnd; } }
      else { ci--; el.textContent=cur.slice(0,ci); if(ci<=0){ del=false; li=(li+1)%L.length; pause=CONFIG.typing.pauseSwap; } }
      setTimeout(()=>requestAnimationFrame(tick), del?CONFIG.typing.deleteMs:CONFIG.typing.writeMs);
    }
    el.textContent=""; requestAnimationFrame(tick);
  })();
  
  /* 3) Matrix */
  (function matrix(){
    const c=$("#matrix"); if(!c) return; const ctx=c.getContext("2d");
    const size=CONFIG.matrix.size, chars="アァカサタナハマヤャラワン0123456789$#*+<>|=~";
    let cols=0, drops=[];
    function resize(){ c.width=innerWidth; c.height=innerHeight; cols=Math.ceil(c.width/size); drops=Array(cols).fill(1); }
    resize(); on(window,"resize",resize);
    (function draw(){
      ctx.fillStyle=CONFIG.matrix.fade; ctx.fillRect(0,0,c.width,c.height);
      ctx.fillStyle=CONFIG.matrix.color; ctx.font=size+"px JetBrains Mono, monospace";
      for(let i=0;i<drops.length;i++){ const t=chars[(Math.random()*chars.length)|0]; ctx.fillText(t,i*size,drops[i]*size);
        if(drops[i]*size>c.height && Math.random()>0.975) drops[i]=0; drops[i]++; }
      requestAnimationFrame(draw);
    })();
  })();
  
  /* 4) Skills reveal + tilt */
  (function skills(){
    const cards=$$(".skill-card"); if(!cards.length) return;
    const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }),{threshold:.2});
    cards.forEach((c,i)=>{ c.style.transitionDelay=(i*60)+"ms"; io.observe(c); });
    const max=10, depth=600;
    cards.forEach(card=>{
      card.style.perspective=depth+"px";
      const move=e=>{
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width; const y=(e.clientY-r.top)/r.height;
        const rx=(.5-y)*2*max, ry=(x-.5)*2*max;
        card.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`;
      };
      const leave=()=>card.style.transform="rotateX(0deg) rotateY(0deg)";
      on(card,"mousemove",move); on(card,"mouseleave",leave);
      on(card,"touchmove",e=>e.touches[0]&&move(e.touches[0]),{passive:true}); on(card,"touchend",leave);
    });
  })();
  
  /* 5) Projects tilt + modal + ripple */
  (function projects(){
    const cards=$$(".project-card"); if(!cards.length) return;
    const modal=$("#projectModal"), closeBtn=$("#closeProject"), titleEl=$("#projectTitle"),
          descEl=$("#projectDesc"), tagsEl=$("#projectTags"), openEl=$("#projectOpen");
  
    const move=(card,e)=>{
      const r=card.getBoundingClientRect();
      const x=((e.clientX-r.left)/r.width)*100, y=((e.clientY-r.top)/r.height)*100;
      card.style.setProperty("--mx",x+"%"); card.style.setProperty("--my",y+"%");
      const rx=(.5-((e.clientY-r.top)/r.height))*10, ry=(((e.clientX-r.left)/r.width)-.5)*10;
      card.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
  
    cards.forEach(card=>{
      on(card,"mousemove",e=>move(card,e));
      on(card,"mouseleave",()=>card.style.transform="rotateX(0deg) rotateY(0deg)");
  
      const cta=card.querySelector(".project-cta");
      on(cta,"click",e=>{
        // ripple
        const rect=cta.getBoundingClientRect();
        const x=((e.clientX-rect.left)/rect.width)*100+"%", y=((e.clientY-rect.top)/rect.height)*100+"%";
        const r=document.createElement("span"); r.className="ripple"; r.style.setProperty("--x",x); r.style.setProperty("--y",y);
        cta.appendChild(r); setTimeout(()=>r.remove(),700);
  
        // modal
        titleEl.textContent=card.dataset.title||"Project";
        descEl.textContent=card.dataset.desc||"";
        tagsEl.innerHTML="";
        (card.dataset.tags||"").split(",").filter(Boolean).forEach(t=>{
          const s=document.createElement("span"); s.className="chip"; s.textContent=t.trim(); tagsEl.appendChild(s);
        });
        openEl.setAttribute("href", card.dataset.link||"#");
        modal.classList.add("open");
      });
    });
  
    const hide=()=>modal.classList.remove("open");
    on(closeBtn,"click",hide);
    on(modal,"click",e=>{ if(e.target===modal) hide(); });
    on(window,"keydown",e=>{ if(e.key==="Escape") hide(); });
  })();
  
  /* 6) Resume force download */
  (function resume(){
    const btn=$("#dl-resume"); if(!btn) return;
    on(btn,"click",async e=>{
      e.preventDefault();
      try{
        const r=await fetch(CONFIG.resumePath,{cache:"no-store"});
        const b=await r.blob(); const u=URL.createObjectURL(b);
        const a=document.createElement("a"); a.href=u; a.download="Yash-Kamboj-Resume.pdf";
        document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(u),500);
      }catch{ location.href=CONFIG.resumePath; }
    });
  })();
  
  /* 7) Spellbook: hover glow + copy + particles + beep */
  (function runes(){
    $$(".rune-card").forEach(card=>{
      on(card,"mousemove",e=>{
        const r=card.getBoundingClientRect();
        card.style.setProperty("--x", e.clientX-r.left+"px");
        card.style.setProperty("--y", e.clientY-r.top+"px");
      });
      on(card,"click",async()=>{
        try{ await navigator.clipboard.writeText(card.dataset.cmd); }catch{}
        card.classList.add("copied"); setTimeout(()=>card.classList.remove("copied"),800);
  
        const rect=card.getBoundingClientRect();
        for(let i=0;i<10;i++){
          const p=document.createElement("div"); p.className="particle"; document.body.appendChild(p);
          let x=rect.left+rect.width/2, y=rect.top+rect.height/2;
          p.style.left=x+"px"; p.style.top=y+"px";
          const ang=Math.random()*Math.PI*2, sp=1+Math.random()*3;
          let vx=Math.cos(ang)*sp, vy=Math.sin(ang)*sp, life=600;
          (function step(){
            life-=16; x+=vx; y+=vy; vy+=.05;
            p.style.left=x+"px"; p.style.top=y+"px"; p.style.opacity=life/600;
            if(life>0) requestAnimationFrame(step); else p.remove();
          })();
        }
        beep(220,.05);
      });
    });
  })();
  
  /* 8) Section active spy */
  (function sectionSpy(){
    const links=$$("nav a.navlink"); const map=new Map(links.map(a=>[a.getAttribute("href").slice(1),a]));
    const obs=new IntersectionObserver(es=>es.forEach(e=>{
      const id=e.target.id, link=map.get(id); if(!link) return;
      if(e.isIntersecting){ links.forEach(l=>l.classList.remove("active")); link.classList.add("active");
        document.body.classList.add("blip"); setTimeout(()=>document.body.classList.remove("blip"),220); }
    }),{rootMargin:"-40% 0px -50% 0px", threshold:.1});
    ["gate","origin","artifacts","quests","spells","resume","summon"].map(id=>document.getElementById(id)).filter(Boolean).forEach(sec=>obs.observe(sec));
  })();
  
  /* 9) Terminal intro → Breach popup */
  (function terminalIntro(){
    const box=$("#terminal"), feed=$("#terminalFeed"); if(!box||!feed) return;
    const lines=CONFIG.breach.terminalLines.slice(); let i=0;
    box.classList.add("show");
    function next(){
      if(i<lines.length){ feed.textContent+=lines[i++]+"\n"; setTimeout(next,900); }
      else { setTimeout(()=>{ box.classList.remove("show"); startBreach(); },500); }
    }
    next();
  })();
  
  function startBreach(){
    const ov=$("#breach"); if(!ov) return;
    const line=$("#breachLine"); const prog=ov.querySelector(".breach-progress span"); const btn=$("#breachClose");
    ov.classList.add("show"); let idx=0;
    function step(){
      const it=CONFIG.breach.popupSteps[idx]; if(!it) return;
      if(it.html) line.innerHTML=it.text; else line.textContent=it.text;
      prog.style.width=Math.round(((idx+1)/CONFIG.breach.popupSteps.length)*100)+"%";
      idx++; if(idx<CONFIG.breach.popupSteps.length) setTimeout(step,it.delay); else btn.textContent="Proceed";
    }
    prog.style.width="0%"; setTimeout(step, CONFIG.breach.popupSteps[0].delay); beep(140,.1);
    on(btn,"click",()=>{ ov.classList.remove("show"); ov.setAttribute("aria-hidden","true"); startHum(); });
  }
  
  /* 10) Reticle cursor */
  (function reticle(){
    const ret=document.getElementById("reticle");
    on(window,"mousemove",e=>{ ret.style.left=e.clientX+"px"; ret.style.top=e.clientY+"px"; });
    $$("a,.project-cta,.rune-card,.skill-card,.btn,.dl-btn").forEach(el=>{
      on(el,"mouseenter",()=>ret.classList.add("hot"));
      on(el,"mouseleave",()=>ret.classList.remove("hot"));
    });
  })();
  
  /* 11) Divider marquee text */
  (function marqueeDividers(){
    const dividers=$$(".divider"); if(!dividers.length) return;
    dividers.forEach((div,i)=>{
      const txt=(div.getAttribute("data-stream")||CONFIG.marqueeTexts[i%CONFIG.marqueeTexts.length]||"Yash • Portfolio • ").replace(/\s+/g," ").trim();
      const wrap=document.createElement("div");
      wrap.className="divider-stream";
      wrap.innerHTML=`<span>${txt}</span><span aria-hidden="true">${txt}</span><span aria-hidden="true">${txt}</span>`;
      div.appendChild(wrap);
    });
  })();
  
  /* 12) Command Palette (Bootstrap) with cleanup */
  (function palette(){
    const modal=$("#paletteModal") ? new bootstrap.Modal("#paletteModal",{keyboard:true,focus:true}) : null;
    const input=$("#paletteInput"), list=$("#paletteList"), cmds=CONFIG.paletteCommands.slice();
  
    function cleanupBackdrop(){ document.body.classList.remove("modal-open"); $$(".modal-backdrop").forEach(b=>b.remove()); }
    function render(q){
      const s=String(q||"").toLowerCase(); list.innerHTML="";
      cmds.filter(c=>c.label.toLowerCase().includes(s)).forEach(c=>{
        const li=document.createElement("li");
        li.className="p-3 rounded-lg cursor-pointer d-flex justify-content-between align-items-center";
        li.innerHTML=`<span>${c.label}</span>`;
        on(li,"click",()=>{ c.action(); modal?.hide(); cleanupBackdrop(); });
        on(li,"mouseenter",()=>li.classList.add("palette-hover"));
        on(li,"mouseleave",()=>li.classList.remove("palette-hover"));
        list.appendChild(li);
      });
    }
    on($("#openPalette"),"click",()=>{ render(""); setTimeout(()=>input?.focus(),200); });
    on(input,"input",e=>render(e.target.value));
    on(window,"keydown",e=>{
      const k=e.key.toLowerCase();
      if((e.ctrlKey||e.metaKey)&&k==="k"){ e.preventDefault(); render(""); modal?.show(); setTimeout(()=>input?.focus(),200); }
      if(k==="escape"){ modal?.hide(); cleanupBackdrop(); }
    });
  })();
  
  /* 13) Self Destruct + Admin toggle */
  (function selfDestruct(){
    const btn=$("#purgeBtn"), off=$("#offline"); if(!btn||!off) return;
    on(btn,"click",()=>{ off.classList.add("show"); setTimeout(()=>off.querySelector(".offline-inner").textContent="SYSTEM OFFLINE",200); });
  })();
  (function adminToggle(){
    on(window,"keydown",e=>{
      if((e.ctrlKey||e.metaKey) && e.shiftKey && e.key.toLowerCase()==="y"){
        $("#admin")?.classList.toggle("hide"); beep(440,.06);
        // Load admin stats if available
        if(!$("#admin")?.classList.contains("hide")){
          import('./api.js').then(({getDashboardStats})=>{
            getDashboardStats().then(data=>{
              if(data?.success && data?.data?.overview){
                const o=data.data.overview;
                $("#m-daemons").textContent=o.projects?.published||0;
                $("#m-blocked").textContent=o.visitors?.unique||0;
                $("#m-backdoors").textContent=o.contacts?.pending||0;
              }
            }).catch(()=>{});
          });
        }
      }
    });
  })();

  /* 14) Contact Form Integration */
  (function contactForm(){
    const form=$("#contactForm"); if(!form) return;
    const submitBtn=$("#contactSubmit"), submitText=$("#contactSubmitText"), 
          submitLoader=$("#contactSubmitLoader"), messageDiv=$("#contactMessageDisplay");
    
    on(form,"submit",async e=>{
      e.preventDefault();
      const formData=new FormData(form);
      const data=Object.fromEntries(formData);
      
      submitBtn.disabled=true;
      submitText.classList.add("hide");
      submitLoader.classList.remove("hide");
      messageDiv.textContent="";
      messageDiv.className="contact-message mt-3";
      
      try{
        const {submitContact}=await import('./api.js');
        const result=await submitContact(data);
        if(result.success){
          messageDiv.textContent="Message sent successfully! You'll receive a confirmation email shortly.";
          messageDiv.className="contact-message mt-3 success";
          form.reset();
          beep(440,.05);
        }
      }catch(error){
        messageDiv.textContent=error.message||"Failed to send message. Please try again.";
        messageDiv.className="contact-message mt-3 error";
        beep(140,.1);
      }finally{
        submitBtn.disabled=false;
        submitText.classList.remove("hide");
        submitLoader.classList.add("hide");
      }
    });
  })();

  /* 15) Load Projects from API */
  (function loadProjects(){
    import('./api.js').then(({getProjects})=>{
      getProjects({status:'published'}).then(data=>{
        if(data?.success && data?.data?.length){
          const grid=$(".projects-grid"); if(!grid) return;
          grid.innerHTML="";
          data.data.forEach(proj=>{
            const card=document.createElement("article");
            card.className="project-card";
            card.dataset.title=proj.title;
            card.dataset.desc=proj.longDescription||proj.description;
            card.dataset.tags=proj.tags?.join(",")||"";
            card.dataset.link=proj.liveUrl||proj.githubUrl||"#";
            card.innerHTML=`
              <div class="project-body">
                <h3 class="project-title">${proj.title}</h3>
                <p class="project-sub text-muted">${proj.description}</p>
                <div class="chips">${(proj.tags||[]).map(t=>`<span class="chip">${t}</span>`).join("")}</div>
              </div>
              <div class="project-cta-wrap"><button class="project-cta">View</button></div>
            `;
            grid.appendChild(card);
          });
          // Re-initialize project handlers
          setTimeout(()=>{
            const cards=$$(".project-card");
            const modal=$("#projectModal"), closeBtn=$("#closeProject"),
                  titleEl=$("#projectTitle"), descEl=$("#projectDesc"),
                  tagsEl=$("#projectTags"), openEl=$("#projectOpen");
            const move=(card,e)=>{
              const r=card.getBoundingClientRect();
              const x=((e.clientX-r.left)/r.width)*100, y=((e.clientY-r.top)/r.height)*100;
              card.style.setProperty("--mx",x+"%"); card.style.setProperty("--my",y+"%");
              const rx=(.5-((e.clientY-r.top)/r.height))*10, ry=(((e.clientX-r.left)/r.width)-.5)*10;
              card.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`;
            };
            cards.forEach(card=>{
              on(card,"mousemove",e=>move(card,e));
              on(card,"mouseleave",()=>card.style.transform="rotateX(0deg) rotateY(0deg)");
              const cta=card.querySelector(".project-cta");
              on(cta,"click",e=>{
                const rect=cta.getBoundingClientRect();
                const x=((e.clientX-rect.left)/rect.width)*100+"%", y=((e.clientY-rect.top)/rect.height)*100+"%";
                const r=document.createElement("span"); r.className="ripple";
                r.style.setProperty("--x",x); r.style.setProperty("--y",y);
                cta.appendChild(r); setTimeout(()=>r.remove(),700);
                titleEl.textContent=card.dataset.title||"Project";
                descEl.textContent=card.dataset.desc||"";
                tagsEl.innerHTML="";
                (card.dataset.tags||"").split(",").filter(Boolean).forEach(t=>{
                  const s=document.createElement("span"); s.className="chip"; s.textContent=t.trim(); tagsEl.appendChild(s);
                });
                openEl.setAttribute("href",card.dataset.link||"#");
                modal.classList.add("open");
              });
            });
            const hide=()=>modal.classList.remove("open");
            on(closeBtn,"click",hide);
            on(modal,"click",e=>{if(e.target===modal) hide();});
          },100);
        }
      }).catch(()=>{});
    });
  })();

  /* 16) Initialize Visitor Tracking */
  (function initTracking(){
    import('./api.js').then(({initVisitorTracking})=>{
      initVisitorTracking();
    });
  })();
  