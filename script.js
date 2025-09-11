// Scroll

const orderBtns = document.querySelectorAll('.order-btn');
const popupOverlay = document.getElementById('popup-overlay');
const popupClose = document.getElementById('popup-close');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// popup
orderBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        popupOverlay.style.display = 'flex';
        lucide.createIcons();
    });
});

popupClose.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
});

popupOverlay.addEventListener('click', e => {
    if (e.target === popupOverlay) {
        popupOverlay.style.display = 'none';
    }
});

const navBar = document.getElementById('navBar');
let hue = 0;

function animateNavBar() {
  hue = (hue + 0.2) % 360; 

  navBar.style.background = `linear-gradient(270deg,
    hsl(${hue}, 100%, 50%),
    hsl(${(hue + 60) % 360}, 100%, 50%),
    hsl(${(hue + 120) % 360}, 100%, 50%),
    hsl(${(hue + 180) % 360}, 100%, 50%),
    hsl(${(hue + 240) % 360}, 100%, 50%))`;

  navBar.style.backgroundSize = '600% 600%';
  navBar.style.backgroundPosition = `${(hue*1.5) % 600}% 50%`; 

  requestAnimationFrame(animateNavBar);
}

animateNavBar();

// Particles

const canvas = document.getElementById('heroParticles');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const particleCount = 200; 
const particles = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(0, width);
    this.y = random(height, height + 100);
    this.size = random(2, 8);
    this.speed = random(0.5, 2);
    this.hue = random(0, 360);
    this.alpha = random(0.3, 0.8);
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.size) {
      this.reset();
    }
  }

  draw() {
   
    ctx.shadowBlur = this.size * 3;
    ctx.shadowColor = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
    ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  
  ctx.fillStyle = 'rgba(17, 17, 17, 0.2)'; 
  ctx.fillRect(0, 0, width, height);

  for (let p of particles) {
    p.update();
    p.draw();
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();


window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});




const bg1 = document.getElementById('bg1');
let hue1 = 0;

function animateBg1() {
  hue1 = (hue1 + 0.2) % 360;

  bg1.style.background = `linear-gradient(270deg,
    hsl(${hue1}, 100%, 50%),
    hsl(${(hue1 + 60) % 360}, 100%, 50%),
    hsl(${(hue1 + 120) % 360}, 100%, 50%),
    hsl(${(hue1 + 180) % 360}, 100%, 50%),
    hsl(${(hue1 + 240) % 360}, 100%, 50%))`;

  bg1.style.backgroundSize = '600% 600%';
  bg1.style.backgroundPosition = `${(hue1 * 1.5) % 600}% 50%`;

  requestAnimationFrame(animateBg1);
}

animateBg1();


window.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.querySelector('#about');
  const skillBars = document.querySelectorAll('.skill-bar');

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      skillBars.forEach(bar => {
        const fill = bar.querySelector('.fill');
        fill.style.width = bar.dataset.width;
      });
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(aboutSection);

  const spotlight = document.createElement('div');
  spotlight.style.position = 'absolute';
  spotlight.style.width = '200px';
  spotlight.style.height = '200px';
  spotlight.style.borderRadius = '50%';
  spotlight.style.pointerEvents = 'none';
  spotlight.style.background = 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)';
  spotlight.style.transform = 'translate(-50%, -50%)';
  spotlight.style.mixBlendMode = 'screen';
  spotlight.style.display = 'none';
  aboutSection.appendChild(spotlight);

  aboutSection.addEventListener('mousemove', e => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
    spotlight.style.display = 'block';
  });

  aboutSection.addEventListener('mouseleave', () => {
    spotlight.style.display = 'none';
  });
});


const aboutCanvas = document.getElementById('aboutCanvas')
const aboutCtx = aboutCanvas.getContext('2d')

function resizeAboutCanvas() {
  aboutCanvas.width = window.innerWidth
  aboutCanvas.height = 200
}
resizeAboutCanvas()

let t = 0
let mouseX = window.innerWidth / 2
let mouseY = 100

aboutCanvas.addEventListener('mousemove', e => {
  mouseX = e.clientX
  mouseY = e.offsetY
})

function drawWave() {
  aboutCtx.clearRect(0, 0, aboutCanvas.width, aboutCanvas.height)
  for (let i = 0; i < 3; i++) {
    aboutCtx.beginPath()
    aboutCtx.moveTo(0, aboutCanvas.height / 2)
    for (let x = 0; x <= aboutCanvas.width; x++) {
      const waveHeight = 20 + i*10 + (mouseX / aboutCanvas.width) * 30
      const verticalShift = (mouseY / aboutCanvas.height - 0.5) * 40
      const y = aboutCanvas.height/2 + verticalShift + Math.sin((x + t + i*100) * 0.01) * waveHeight
      aboutCtx.lineTo(x, y)
    }
    const gradient = aboutCtx.createLinearGradient(0, 0, aboutCanvas.width, 0)
    gradient.addColorStop(0, `hsla(${(t+i*60)%360}, 80%, 60%, 0.6)`)
    gradient.addColorStop(1, `hsla(${(t+i*60+120)%360}, 80%, 60%, 0.6)`)
    aboutCtx.strokeStyle = gradient
    aboutCtx.lineWidth = 2 + i
    aboutCtx.stroke()
  }
  t += 2
  requestAnimationFrame(drawWave)
}
drawWave()

window.addEventListener('resize', resizeAboutCanvas)




;(function(){
  const cards = Array.from(document.querySelectorAll('.service-card'))
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target
        const idx = Number(el.dataset.index || 0)
        el.style.transition = `transform 0.6s cubic-bezier(.2,.9,.2,1), opacity 0.6s ease ${idx * 0.08}s`
        el.classList.add('in-view')
      }
    })
  }, { threshold: 0.2 })

  cards.forEach(card => {
    observer.observe(card)
    const inner = card.querySelector('.card-inner')
    const rectUpdate = () => card.getBoundingClientRect()
    let rect = rectUpdate()
    let requestId = null

    const onMove = (e) => {
      rect = rectUpdate()
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
      const rotY = Math.max(Math.min(x * 8, 12), -12)
      const rotX = Math.max(Math.min(-y * 7, 10), -10)
      const transZ = 1 + Math.abs(x * 6)
      card.style.setProperty('--bg-x', `${(e.clientX - rect.left) / rect.width * 100}%`)
      card.style.setProperty('--bg-y', `${(e.clientY - rect.top) / rect.height * 100}%`)
      if (requestId) cancelAnimationFrame(requestId)
      requestId = requestAnimationFrame(() => {
        inner.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${transZ}px)`
        requestId = null
      })
    }

    const onLeave = () => {
      if (requestId) cancelAnimationFrame(requestId)
      inner.style.transform = ''
      card.style.removeProperty('--bg-x')
      card.style.removeProperty('--bg-y')
    }

    const onEnter = (e) => onMove(e)

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    card.addEventListener('mouseenter', onEnter)

    const toggleFlip = (e) => {
      const isFlipped = inner.classList.toggle('flipped')
      card.setAttribute('aria-pressed', String(isFlipped))
    }

    card.addEventListener('click', (e) => {
      if (e.target.closest('.service-cta') || e.target.closest('.service-contact')) return
      toggleFlip()
    })

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleFlip()
      }
    })

    card.querySelectorAll('.service-cta').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        inner.classList.add('flipped')
        card.setAttribute('aria-pressed', 'true')
      })
    })
    card.querySelectorAll('.service-contact').forEach(link => {
      link.addEventListener('click', (e) => {
        inner.classList.remove('flipped')
        card.setAttribute('aria-pressed', 'false')
      })
    })
  })
})()


//pricing

;(function(){
  const slider = document.querySelector('.pricing-slider')
  const billingBtns = Array.from(document.querySelectorAll('.billing-btn'))
  const priceFigure = document.querySelector('.price-figure')
  const periodLabel = document.querySelector('.price-period')
  const spotlight = document.querySelector('.spotlight')
  const sliderLabels = Array.from(document.querySelectorAll('.slider-label'))
  const planFeaturesList = document.querySelector('.plan-features')
  const planPreviewTier = document.querySelector('.plan-tier')
  const planPreviewPrice = document.querySelector('.plan-price')
  const planPreviewBadge = document.querySelector('.plan-badge')
  const pricingData = [
    { id:0, name:'Basic', monthly:59.99, features:['1 Page site','Responsive layout','Basic SEO'] },
    { id:1, name:'Pro', monthly:129.99, features:['Multi-page site','Performance tuning','SEO & analytics','CMS integration'] },
    { id:2, name:'Enterprise', monthly:249.99, features:['E-commerce','API integration','Advanced security','SLA & support'] }
  ]
  let billingPeriod = 'monthly'
  let currentIndex = Number(slider.value)
  function formatPrice(v){
    return '£' + v.toFixed(2)
  }
  function animateNumber(el, from, to, dur){
    const start = performance.now()
    function step(now){
      const t = Math.min(1, (now - start)/dur)
      const val = from + (to - from) * (1 - Math.cos(Math.PI * t))/2
      el.textContent = formatPrice(val)
      if (t < 1) requestAnimationFrame(step)
      else el.textContent = formatPrice(to)
    }
    requestAnimationFrame(step)
  }
  function updateUI(index, immediate){
    const plan = pricingData[index]
    const base = plan.monthly
    const yearlyBase = Math.round(base * 12 * 0.8 * 100)/100
    const target = billingPeriod === 'monthly' ? base : yearlyBase
    const from = parseFloat(priceFigure.textContent.replace('£','')) || target
    animateNumber(priceFigure, from, target, immediate ? 0 : 380)
    periodLabel.textContent = billingPeriod === 'monthly' ? 'month' : 'year'
    planPreviewTier.textContent = plan.name
    planPreviewPrice.textContent = formatPrice(target)
    planPreviewBadge.style.display = index === 1 ? 'inline-block' : 'none'
    planFeaturesList.innerHTML = ''
    plan.features.forEach(f => {
      const li = document.createElement('li')
      li.textContent = f
      planFeaturesList.appendChild(li)
    })
    sliderLabels.forEach((lab,i) => lab.style.opacity = i === index ? '1' : '0.6')
    const pct = index / (slider.max - slider.min)
    const sliderRect = slider.getBoundingClientRect()
    const left = sliderRect.left + pct * sliderRect.width
    spotlight.style.left = left + 'px'
    spotlight.style.setProperty('--x', pct * 100 + '%')
    spotlight.style.setProperty('--y', '50%')
  }
  billingBtns.forEach(b => {
    b.addEventListener('click', () => {
      billingBtns.forEach(x => x.classList.remove('active'))
      billingBtns.forEach(x => x.setAttribute('aria-pressed','false'))
      b.classList.add('active')
      b.setAttribute('aria-pressed','true')
      billingPeriod = b.dataset.period
      updateUI(currentIndex)
    })
  })
  slider.addEventListener('input', (e) => {
    currentIndex = Number(e.target.value)
    updateUI(currentIndex)
  })
  slider.addEventListener('mousemove', (e) => {
    const rect = slider.getBoundingClientRect()
    const pct = (e.clientX - rect.left)/rect.width
    spotlight.style.setProperty('--x', pct*100 + '%')
    spotlight.style.left = (rect.left + pct * rect.width) + 'px'
  })
  slider.addEventListener('touchmove', (e) => {
    const rect = slider.getBoundingClientRect()
    const touch = e.touches[0]
    const pct = (touch.clientX - rect.left)/rect.width
    spotlight.style.setProperty('--x', pct*100 + '%')
    spotlight.style.left = (rect.left + pct * rect.width) + 'px'
  }, { passive: true })
  updateUI(currentIndex, true)
  window.addEventListener('resize', () => updateUI(currentIndex,true))
  const orderButtons = Array.from(document.querySelectorAll('.order-btn'))
  orderButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const popup = document.getElementById('popup-overlay')
      if (popup) {
        popup.style.display = 'flex'
        if (typeof lucide !== 'undefined') lucide.createIcons()
      }
    })
  })
})()



const contactSection = document.getElementById('Contact');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      contactSection.classList.add('show-contact');
      observer.unobserve(contactSection);
    }
  });
}, { threshold: 0.3 });

observer.observe(contactSection);



