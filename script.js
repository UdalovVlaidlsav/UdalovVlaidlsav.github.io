// Плавное появление страницы
document.body.classList.add('ready');

// ===== ТАЙМЕР =====
const weddingDate = new Date("Aug 15, 2026 16:00:00").getTime();

function updateTimer() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance < 0) {
        document.getElementById("days").innerText = "0";
        document.getElementById("hours").innerText = "0";
        document.getElementById("minutes").innerText = "0";
        document.getElementById("seconds").innerText = "0";
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
}

updateTimer();
setInterval(updateTimer, 1000);

// ===== ФОРМА =====
const form = document.getElementById("weddingForm");
if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Спасибо! Ваш ответ сохранен ❤");
        form.reset();
    });
}

// ===== ЛЕПЕСТКИ =====
const petalsContainer = document.querySelector(".petals");
if (petalsContainer) {
    function createPetal() {
        const petal = document.createElement("span");
        petal.className = "petal";
        const petals_types = ["🌸", "🌼", "🌺", "🌸", "🌸"];
        petal.innerHTML = petals_types[Math.floor(Math.random() * petals_types.length)];
        petal.style.left = Math.random() * 100 + "%";
        petal.style.animationDuration = (3 + Math.random() * 5) + "s";
        petal.style.fontSize = (15 + Math.random() * 25) + "px";
        petal.style.opacity = (0.3 + Math.random() * 0.4);
        petalsContainer.appendChild(petal);
        setTimeout(() => petal.remove(), 8000);
    }
    setInterval(createPetal, 300);
    for (let i = 0; i < 20; i++) setTimeout(createPetal, i * 100);
}

// ===== МУЗЫКА =====
const music = document.getElementById("bg-music");

if (music) {
    console.log("Музыка найдена");
    
    // Пытаемся включить автоматически
    music.volume = 0.3; // Потише
    
    music.play().catch(e => {
        console.log("Автозапуск не сработал, создаем кнопку");
        
        // Создаем кнопку
        const btn = document.createElement('button');
        btn.innerHTML = '🎵 Включить музыку';
        btn.style.position = 'fixed';
        btn.style.bottom = '90px';
        btn.style.right = '20px';
        btn.style.zIndex = '9999';
        btn.style.background = '#a67c73';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '50px';
        btn.style.padding = '12px 24px';
        btn.style.fontSize = '16px';
        btn.style.cursor = 'pointer';
        
        btn.addEventListener('click', () => {
            music.play();
            btn.remove();
        });
        
        document.body.appendChild(btn);
    });
}