// === Mobile Navigation Toggle ===
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeMobileMenu = document.querySelector('.close-mobile-menu');
const mobileNav = document.querySelector('.mobile-nav');

mobileMenuBtn?.addEventListener('click', () => {
  mobileNav.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeMobileMenu?.addEventListener('click', () => {
  mobileNav.classList.remove('active');
  document.body.style.overflow = '';
});

document.querySelectorAll('.mobile-nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// === Header Scroll Effect ===
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 50);
});

// === Smooth Anchor Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      history.pushState?.(null, null, targetId);
    }
  });
});

// === Back to Top Button ===
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('active', window.scrollY > 300);
});

backToTop?.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Stats Counter ===
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  let startTime = null;
  const step = timestamp => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue('projects-count', 0, 150, 2000);
        animateValue('clients-count', 0, 120, 2000);
        animateValue('experience-count', 0, 8, 2000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(statsSection);
}

// === FAQ Accordion ===
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question')?.addEventListener('click', () => {
    item.classList.toggle('active');
    document.querySelectorAll('.faq-item').forEach(other => {
      if (other !== item) other.classList.remove('active');
    });
  });
});

// === Portfolio Filter ===
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.getAttribute('data-filter');
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) ? 'block' : 'none';
    });
  });
});

// === Contact Form Submission ===
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const successMsg = document.createElement('div');
  successMsg.innerHTML = `
    <div style="background:#d4edda;color:#155724;padding:15px;border-radius:5px;margin-top:20px;">
      <strong>Thank you, ${name}!</strong> We'll contact you at ${email}.
    </div>`;
  contactForm.appendChild(successMsg);
  contactForm.reset();
  setTimeout(() => successMsg.scrollIntoView({ behavior: 'smooth' }), 100);
});

// === Intersection Animation ===
const fadeElements = document.querySelectorAll('.fade-in');
const animationObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  animationObserver.observe(el);
});

// === Pricing Card Hover and Currency Toggle ===
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.pricing-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('featured')) card.style.borderColor = 'rgba(49,120,115,0.3)';
    });
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('featured')) card.style.borderColor = 'rgba(0,0,0,0.05)';
    });
  });

  const toggle = document.createElement('div');
  toggle.className = 'currency-toggle';
  toggle.innerHTML = `
    <span class="active" data-currency="usd">USD</span>
    <span data-currency="eur">EUR</span>
    <span data-currency="gbp">GBP</span>`;
  const section = document.querySelector('.pricing .container');
  if (section) {
    section.insertBefore(toggle, document.querySelector('.pricing-grid'));

    const style = document.createElement('style');
    style.textContent = `
      .currency-toggle {
        display: flex; justify-content: center; margin-bottom: 30px; gap: 10px;
      }
      .currency-toggle span {
        padding: 5px 15px; border-radius: 20px; cursor: pointer;
        font-size: 14px; font-weight: 500;
        background: rgba(0,0,0,0.05); transition: all 0.3s ease;
      }
      .currency-toggle span.active {
        background: linear-gradient(135deg, #317873 0%, #FF6F61 100%);
        color: white;
      }`;
    document.head.appendChild(style);

    const rates = {
      usd: { starter: 100, pro: 180, premium: 300 },
      eur: { starter: 90, pro: 160, premium: 270 },
      gbp: { starter: 80, pro: 140, premium: 240 }
    };
    const symbols = { usd: '$', eur: '€', gbp: '£' };

    document.querySelectorAll('.currency-toggle span').forEach(span => {
      span.addEventListener('click', function () {
        document.querySelector('.currency-toggle .active').classList.remove('active');
        this.classList.add('active');
        const currency = this.dataset.currency;
        const symbol = symbols[currency];
        document.querySelectorAll('.pricing-card').forEach((card, i) => {
          const plan = ['starter', 'pro', 'premium'][i];
          const price = card.querySelector('.price');
          const start = parseInt(price.textContent.replace(/\D/g, ''));
          const end = rates[currency][plan];
          const duration = 500;
          let startTime = null;

          const step = timestamp => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            price.innerHTML = `${symbol}${value}`;
            if (progress < 1) window.requestAnimationFrame(step);
          };
          window.requestAnimationFrame(step);
        });
      });
    });
  }
});
