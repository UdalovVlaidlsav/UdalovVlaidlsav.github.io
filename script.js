// ===== КОНВЕРТ-ЗАСТАВКА =====
document.addEventListener('DOMContentLoaded', function() {
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const openBtn = document.getElementById('openInvitationBtn');
    const container = document.querySelector('.container');
    
    // Скрываем основной контент сначала
    if (container) {
        container.style.opacity = '0';
    }
    
    // Создаем конфетти
    function createConfetti() {
        const confettiContainer = document.getElementById('confettiContainer');
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = `hsl(${Math.random() * 60 + 20}, 80%, 60%)`;
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
                confettiContainer.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 100);
        }
    }
    
    // Запускаем конфетти при загрузке
    createConfetti();
    setInterval(createConfetti, 4000);
    
    // Открытие приглашения
    if (openBtn) {
        openBtn.addEventListener('click', function() {
            envelopeOverlay.classList.add('hidden');
            if (container) {
                container.style.opacity = '1';
            }
            // Финальный взрыв конфетти
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    createConfetti();
                }, i * 10);
            }
        });
    }
});
// ===== ТАЙМЕР =====
const weddingDate = new Date("Aug 15, 2026 00:00:00").getTime();

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

// ===== ПАДАЮЩИЕ ЛЕПЕСТКИ =====
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
    music.volume = 0.3;
    music.play().catch(() => {
        const musicButton = document.createElement('button');
        musicButton.innerHTML = '🎵 Включить музыку';
        musicButton.style.position = 'fixed';
        musicButton.style.bottom = '90px';
        musicButton.style.right = '20px';
        musicButton.style.zIndex = '9999';
        musicButton.style.background = '#a67c73';
        musicButton.style.color = 'white';
        musicButton.style.border = 'none';
        musicButton.style.borderRadius = '50px';
        musicButton.style.padding = '12px 24px';
        musicButton.style.fontSize = '16px';
        musicButton.style.cursor = 'pointer';
        musicButton.style.fontFamily = 'Cormorant Garamond, serif';
        musicButton.addEventListener('click', () => {
            music.play();
            musicButton.remove();
        });
        document.body.appendChild(musicButton);
    });
}

// ===== ОТПРАВКА ФОРМЫ В GOOGLE TABLES =====
const form = document.getElementById("weddingForm");

if (form) {
    // Показываем поле "Другое" при клике на чекбокс
    const otherCheckbox = document.getElementById('otherCheckbox');
    const otherText = document.getElementById('otherText');
    
    if (otherCheckbox && otherText) {
        otherCheckbox.addEventListener('change', function() {
            otherText.style.display = this.checked ? 'block' : 'none';
            if (!this.checked) otherText.value = '';
        });
    }
    
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Собираем данные из формы
        const nameInput = document.getElementById('name');
        
        // Получаем выбранную радио-кнопку
        const attendanceInput = document.querySelector('input[name="attendance"]:checked');
        
        // Собираем все отмеченные чекбоксы
        const companionCheckboxes = document.querySelectorAll('input[name="companions"]:checked');
        let companions = [];
        companionCheckboxes.forEach(cb => {
            if (cb.value === 'Другое' && otherText && otherText.value) {
                companions.push(`Другое: ${otherText.value}`);
            } else {
                companions.push(cb.value);
            }
        });
        
        const formData = {
            name: nameInput ? nameInput.value : "не указано",
            attendance: attendanceInput ? attendanceInput.value : "не указано",
            companions: companions.join(', ') || "не указано"
        };
        
        // Отправка на твой скрипт
        fetch('https://script.google.com/macros/s/AKfycbzSKAElDoZYWFsH4BfPfkIBq-14maRCi3flEZrDfYip2rOOWAUTREwvuu0Z6z-FMVK5pw/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(() => {
            alert('Спасибо! Ваш ответ отправлен ❤');
            form.reset();
            if (otherText) otherText.style.display = 'none';
        })
        .catch((error) => {
            console.error('Ошибка:', error);
            alert('Спасибо! Ваш ответ получен');
            form.reset();
            if (otherText) otherText.style.display = 'none';
        });
    });
}
