<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Services — Reimagined</title>
  <meta name="description" content="Improved Services page — interactive showcase of 12 services. Single-file HTML/CSS/JS." />
  <style>
    /* Reset and useful defaults */
    :root{
      --bg:#0f1724; --card:#0b1320; --accent:#5eead4; --muted:#94a3b8; --glass: rgba(255,255,255,0.04);
      --maxw:1200px;
      --radius:18px;
      --ff:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0; font-family:var(--ff); background:linear-gradient(180deg,#071020 0%, #081024 50%, #081728 100%); color:#e6eef8; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
    }
    .container{max-width:var(--maxw);margin:0 auto;padding:48px 20px}

    /* Header */
    header{display:flex;align-items:center;justify-content:space-between;gap:16px}
    .brand{display:flex;align-items:center;gap:12px}
    .logo{width:46px;height:46px;border-radius:10px;background:linear-gradient(135deg,var(--accent),#60a5fa);display:flex;align-items:center;justify-content:center;font-weight:700;color:#052;}
    nav a{color:var(--muted);text-decoration:none;margin-left:18px;font-weight:600}
    nav a.cta{background:linear-gradient(90deg,#60a5fa,#7c3aed);padding:10px 14px;border-radius:12px;color:white}

    /* Hero */
    .hero{display:grid;grid-template-columns:1fr 420px;gap:36px;align-items:center;margin-top:36px}
    .hero-left h1{font-size:48px;line-height:1;margin:0 0 12px}
    .hero-left p{color:var(--muted);margin:0 0 18px}
    .actions{display:flex;gap:12px}
    .btn{padding:12px 16px;border-radius:12px;font-weight:700;border:0;cursor:pointer}
    .btn.ghost{background:transparent;border:1px solid rgba(255,255,255,0.06);color:var(--accent)}
    .btn.primary{background:linear-gradient(90deg,var(--accent),#60a5fa);color:#042}

    /* Showcase - replaced cards with interactive horizontal panels */
    .showcase{margin-top:40px}
    .showcase-intro{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
    .filters{display:flex;gap:8px;align-items:center}
    .chip{padding:8px 12px;border-radius:999px;background:var(--glass);color:var(--muted);cursor:pointer;font-weight:600}

    /* Horizontal snapping scroller */
    .scroller-wrap{position:relative;padding:18px 0}
    .scroller{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:12px}
    .scroller::-webkit-scrollbar{height:10px}
    .scroller::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:8px}
    .panel{min-width:320px;flex:0 0 320px;scroll-snap-align:center;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border-radius:16px;padding:18px;border:1px solid rgba(255,255,255,0.03);backdrop-filter:blur(6px);position:relative}
    .panel .eyebrow{font-size:13px;color:var(--muted);font-weight:700}
    .panel h3{margin:8px 0 10px;font-size:20px}
    .panel p{color:var(--muted);font-size:14px;line-height:1.45}
    .panel .meta{position:absolute;right:12px;top:12px;color:var(--muted);font-weight:700}

    /* Large hero panel for featured service */
    .feature{display:grid;grid-template-columns:1fr 340px;gap:20px;margin-top:36px;background:linear-gradient(90deg, rgba(95,234,212,0.04), rgba(96,165,250,0.02));padding:22px;border-radius:16px;border:1px solid rgba(255,255,255,0.03)}
    .art{height:220px;border-radius:12px;background:linear-gradient(135deg,#0ea5a4 0%, #60a5fa 100%);display:flex;align-items:center;justify-content:center;font-size:48px;color:#042}

    /* Services grid fallback for smaller screens */
    @media (max-width:900px){
      .hero{grid-template-columns:1fr;}
      .feature{grid-template-columns:1fr}
      .scroller{padding:12px}
      .panel{min-width:260px;flex:0 0 260px}
    }

    footer{margin-top:56px;padding:28px;border-radius:12px;background:linear-gradient(180deg, rgba(0,0,0,0.08), transparent);display:flex;justify-content:space-between;align-items:center}

    /* small interactive helpers */
    .kbd{background:#021827;padding:6px 8px;border-radius:8px;border:1px solid rgba(255,255,255,0.03);font-weight:700;color:var(--muted)}
    .dot{width:8px;height:8px;border-radius:99px;background:var(--accent);display:inline-block;margin-right:8px}
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="brand"><div class="logo">DT</div><div>
        <div style="font-weight:800">Design — Reimagined</div>
        <div style="font-size:12px;color:var(--muted)">Services showcase</div>
      </div></div>
      <nav>
        <a href="#">Home</a>
        <a href="#services" style="margin-left:12px">Services</a>
        <a href="#work">Work</a>
        <a href="#contact" class="cta">Get a Demo</a>
      </nav>
    </header>

    <section class="hero">
      <div class="hero-left">
        <h1>Services crafted for growth</h1>
        <p>We replaced tired cards with a tactile, scroll‑snapped showcase — explore 12 curated services, preview work and read quick outcomes.</p>
        <div class="actions">
          <button class="btn primary" id="demoBtn">Book demo</button>
          <button class="btn ghost">Browse portfolio</button>
        </div>
      </div>

      <div class="hero-right" aria-hidden="true">
        <div style="background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));padding:16px;border-radius:14px;">
          <strong style="display:block">Why this layout?</strong>
          <p style="color:var(--muted);margin:8px 0 0">Large, tactile panels help convey service outcomes at a glance. Users swipe, explore and focus on what matters.</p>
        </div>
      </div>
    </section>

    <section id="services" class="showcase">
      <div class="showcase-intro">
        <h2 style="margin:0">Our Services (12)</h2>
        <div class="filters">
          <div class="chip" data-filter="all">All</div>
          <div class="chip" data-filter="design">Design</div>
          <div class="chip" data-filter="dev">Development</div>
          <div class="chip" data-filter="growth">Growth</div>
        </div>
      </div>

      <div class="scroller-wrap">
        <div class="scroller" id="scroller">

          <!-- Each "panel" replaces a card. Panels are larger, tactile modules. -->
          <article class="panel" data-tags="design">
            <div class="eyebrow">Branding</div>
            <h3>Identity & logo systems</h3>
            <div class="meta">Featured</div>
            <p>Create memorable brands with flexible identity systems, logo families and usage guidelines for web and print.</p>
          </article>

          <article class="panel" data-tags="design">
            <div class="eyebrow">UX</div>
            <h3>Product & UX design</h3>
            <p>User flows, low/high fidelity prototypes and research-led design that reduces friction and improves conversion.</p>
          </article>

          <article class="panel" data-tags="design">
            <div class="eyebrow">Visuals</div>
            <h3>Illustration & graphics</h3>
            <p>Custom illustration systems, iconography and expressive graphics to support storytelling.</p>
          </article>

          <article class="panel" data-tags="dev">
            <div class="eyebrow">Web</div>
            <h3>Web Design & Frontend</h3>
            <p>Responsive websites, accessible interactions and performance-first frontend engineering.</p>
          </article>

          <article class="panel" data-tags="dev">
            <div class="eyebrow">Apps</div>
            <h3>Mobile Apps & PWA</h3>
            <p>Native-like progressive web apps and cross-platform interfaces with smooth animations.</p>
          </article>

          <article class="panel" data-tags="dev">
            <div class="eyebrow">E‑commerce</div>
            <h3>Commerce & Checkout</h3>
            <p>Conversion-focused product pages, fast checkouts and integrations (Shopify, BigCommerce, custom).</p>
          </article>

          <article class="panel" data-tags="growth">
            <div class="eyebrow">Content</div>
            <h3>Content Strategy</h3>
            <p>Content pillars, editorial calendars and on-page content that drives search and engagement.</p>
          </article>

          <article class="panel" data-tags="growth">
            <div class="eyebrow">SEO</div>
            <h3>SEO & Performance</h3>
            <p>Technical SEO, speed audits and structured data to improve visibility and reduce bounce.</p>
          </article>

          <article class="panel" data-tags="growth">
            <div class="eyebrow">Marketing</div>
            <h3>Growth Marketing</h3>
            <p>Acquisition strategy, paid social campaigns and analytics-driven creative testing.</p>
          </article>

          <article class="panel" data-tags="design">
            <div class="eyebrow">Motion</div>
            <h3>Motion & Video</h3>
            <p>Short form video, hero animations and explainer motion to lift your storytelling.</p>
          </article>

          <article class="panel" data-tags="dev">
            <div class="eyebrow">Integrations</div>
            <h3>API & Platform Integrations</h3>
            <p>Connect tools, build webhooks and automate processes to streamline product operations.</p>
          </article>

          <article class="panel" data-tags="growth">
            <div class="eyebrow">Support</div>
            <h3>Retainer & Support</h3>
            <p>Ongoing creative and dev support with predictable SLAs and a dedicated strategic partner.</p>
          </article>

        </div>

        <!-- simple controls -->
        <div style="display:flex;gap:12px;align-items:center;margin-top:12px">
          <button class="kbd" id="prev">◀</button>
          <button class="kbd" id="next">▶</button>
          <div style="margin-left:12px;color:var(--muted)"><span class="dot"></span>Drag or use arrows to explore</div>
        </div>
      </div>

      <!-- Feature/preview area that updates when panels are focused -->
      <div class="feature" id="feature">
        <div style="padding:8px">
          <h3 id="featureTitle">Featured Service</h3>
          <p id="featureDesc" style="color:var(--muted);">Hover or focus a panel to preview a richer description and suggested outcomes.</p>
          <div style="margin-top:12px;display:flex;gap:10px;align-items:center">
            <button class="btn primary">Start Project</button>
            <button class="btn ghost">View Case Study</button>
          </div>
        </div>
        <div class="art">★</div>
      </div>

    </section>

    <footer>
      <div>© 2025 Your Agency — Built with ❤️</div>
      <div style="color:var(--muted)">Questions? <a href="#contact">Contact us</a></div>
    </footer>
  </div>

  <script>
    // Minimal interactive JS: controls, filters and feature preview
    (function(){
      const scroller = document.getElementById('scroller');
      const panels = Array.from(document.querySelectorAll('.panel'));
      const prev = document.getElementById('prev');
      const next = document.getElementById('next');
      const featureTitle = document.getElementById('featureTitle');
      const featureDesc = document.getElementById('featureDesc');
      const chips = Array.from(document.querySelectorAll('.chip'));

      let idx = 0;
      function scrollToIndex(i){
        const p = panels[i];
        if(!p) return;
        p.scrollIntoView({behavior:'smooth',inline:'center'});
        panels.forEach(el=>el.style.boxShadow='');
        p.style.boxShadow='0 8px 30px rgba(2,6,23,0.6)';
        // update feature
        featureTitle.textContent = p.querySelector('h3').textContent;
        featureDesc.textContent = p.querySelector('p').textContent;
      }

      prev.addEventListener('click', ()=>{ idx = Math.max(0, idx-1); scrollToIndex(idx);});
      next.addEventListener('click', ()=>{ idx = Math.min(panels.length-1, idx+1); scrollToIndex(idx);});

      panels.forEach((p, i)=>{
        p.addEventListener('mouseenter', ()=>{ idx=i; scrollToIndex(i); });
        p.addEventListener('focus', ()=>{ idx=i; scrollToIndex(i); });
        p.tabIndex = 0;
      });

      // Filtering
      chips.forEach(ch=>{
        ch.addEventListener('click', ()=>{
          const filter = ch.dataset.filter;
          chips.forEach(x=>x.classList.remove('active'));
          ch.classList.add('active');
          panels.forEach((p)=>{
            if(filter==='all') p.style.display='block';
            else{
              p.style.display = p.dataset.tags.includes(filter)?'block':'none';
            }
          });
        });
      });

      // Keyboard arrows for accessibility
      window.addEventListener('keydown', (e)=>{
        if(e.key==='ArrowRight') next.click();
        if(e.key==='ArrowLeft') prev.click();
      });

      // Initial focus
      scrollToIndex(0);

    })();
  </script>
</body>
</html>