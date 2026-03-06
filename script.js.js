// Ждём загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
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
            petal.innerHTML = "🌸";
            petal.style.left = Math.random() * 100 + "%";
            petal.style.animationDuration = (3 + Math.random() * 5) + "s";
            petal.style.fontSize = (15 + Math.random() * 25) + "px";
            petal.style.opacity = "0.5";
            petalsContainer.appendChild(petal);
            setTimeout(() => petal.remove(), 8000);
        }
        setInterval(createPetal, 300);
    }

    // ===== МУЗЫКА (ПРОСТО И НАДЁЖНО) =====
    const music = document.getElementById("bg-music");
    
    if (music) {
        // Создаём кнопку СРАЗУ
        const musicBtn = document.createElement('button');
        musicBtn.innerHTML = '🎵 Включить музыку';
        musicBtn.style.position = 'fixed';
        musicBtn.style.bottom = '90px';
        musicBtn.style.right = '20px';
        musicBtn.style.zIndex = '9999';
        musicBtn.style.background = '#a67c73';
        musicBtn.style.color = 'white';
        musicBtn.style.border = 'none';
        musicBtn.style.borderRadius = '50px';
        musicBtn.style.padding = '12px 24px';
        musicBtn.style.fontSize = '16px';
        musicBtn.style.cursor = 'pointer';
        musicBtn.style.fontFamily = 'Cormorant Garamond, serif';
        
        musicBtn.addEventListener('click', function() {
            music.play();
            musicBtn.innerHTML = '🎵 Играет';
            musicBtn.style.opacity = '0.7';
            musicBtn.disabled = true;
        });
        
        document.body.appendChild(musicBtn);
    }
});