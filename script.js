// ===== Перехід між екранами =====
const screens = document.querySelectorAll('.screen');
let current = 0;

function goTo(index) {
  screens[current].classList.remove('active');
  current = index;
  screens[current].classList.add('active');

  // на фінальному екрані запускаємо сердечка після появи напису
  if (screens[current].classList.contains('final')) {
    setTimeout(startPhotoHearts, 3800);
  }
}

// ===== Сердечки при натисканні =====
const layer = document.getElementById('hearts');

function burstHearts(x, y) {
  for (let i = 0; i < 14; i++) {
    const h = document.createElement('span');
    h.className = 'heart burst';
    h.textContent = '♥';

    const angle = Math.random() * Math.PI * 2;
    const dist = 70 + Math.random() * 110;

    h.style.left = x + 'px';
    h.style.top = y + 'px';
    h.style.fontSize = (14 + Math.random() * 18) + 'px';
    h.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    h.style.setProperty('--dy', Math.sin(angle) * dist - 40 + 'px');
    h.style.setProperty('--rot', (Math.random() * 60 - 30) + 'deg');

    layer.appendChild(h);
    setTimeout(() => h.remove(), 1400);
  }
}

// ===== Легкі сердечка навколо фото =====
function startPhotoHearts() {
  const box = document.getElementById('photoHearts');
  if (box.dataset.started) return;
  box.dataset.started = '1';

  for (let i = 0; i < 12; i++) {
    const h = document.createElement('span');
    h.className = 'heart float';
    h.textContent = '♥';

    // розкидаємо по периметру фото
    h.style.left = Math.random() * 100 + '%';
    h.style.top = (Math.random() < 0.5 ? Math.random() * 25 : 75 + Math.random() * 25) + '%';
    h.style.fontSize = (10 + Math.random() * 12) + 'px';
    h.style.setProperty('--dur', (4 + Math.random() * 3) + 's');
    h.style.setProperty('--delay', (Math.random() * 4) + 's');

    box.appendChild(h);
  }
}

// ===== Кнопки =====
document.querySelectorAll('[data-next]').forEach(btn => {
  btn.addEventListener('click', e => {
    if (btn.hasAttribute('data-burst')) {
      const r = btn.getBoundingClientRect();
      burstHearts(r.left + r.width / 2, r.top + r.height / 2);
    }
    // невелика пауза, щоб встигла зіграти анімація
    const delay = btn.hasAttribute('data-burst') ? 900 : 0;
    btn.disabled = true;
    setTimeout(() => goTo(current + 1), delay);
  });
});

// Якщо photo.jpg ще не додано — показуємо м'яку заглушку
const photo = document.querySelector('.photo');
photo.addEventListener('error', () => {
  photo.removeAttribute('src');
  photo.style.height = '300px';
  photo.style.background = 'rgba(247,234,216,.1)';
});