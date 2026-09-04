const charactersData = [
    {
        id: "AG",
        img: "img/AG.png",
        name: "AG",
        subName: "アージー",
        fullName: "Argie christophe",
        profile: "区分/術師 団員 学生<br>性別/男<br>誕生日/不明",
        description: "施設にいた頃は空も、水も、星も見たことがなかった。"
    },
    {
        id: "Fos",
        img: "img/Fossis.png",
        name: "Fos",
        subName: "フォス",
        fullName: "Fossis Crane",
        profile: "区分/術師 団員<br>性別/男<br>誕生日/3月16日",
        description: "AGの面倒を見ている...ように見えて、少し子供っぽい<br>"
    }
];

let currentIndex = 0;
let startX = 0;
let isDragging = false;
let currentTranslate = 0;

function updateSlider() {
    const cards = document.querySelectorAll('.char-card');
    if (cards.length === 0) return;

    cards.forEach((card, index) => {
        card.classList.remove('active', 'prev-1', 'next-1', 'hidden');

        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
            card.classList.add('prev-1');
        } else if (index === (currentIndex + 1) % cards.length) {
            card.classList.add('next-1');
        } else {
            card.classList.add('hidden');
        }
    });
}

function nextCard() {
    currentIndex = (currentIndex + 1) % charactersData.length;
    updateSlider();
}

function prevCard() {
    currentIndex = (currentIndex - 1 + charactersData.length) % charactersData.length;
    updateSlider();
}

function setupDragAndClick() {
    const sliderWrapper = document.getElementById('sliderWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) prevBtn.onclick = (e) => { e.stopPropagation(); prevCard(); };
    if (nextBtn) nextBtn.onclick = (e) => { e.stopPropagation(); nextCard(); };

    if (!sliderWrapper) return;

    sliderWrapper.addEventListener('contextmenu', (e) => e.preventDefault());

    const handleStart = (clientX) => {
        isDragging = true;
        startX = clientX;
        currentTranslate = 0;
    };

    const handleMove = (clientX) => {
        if (!isDragging) return;
        currentTranslate = clientX - startX;
    };

    const handleEnd = () => {
        if (!isDragging) return;
        isDragging = false;

        if (currentTranslate < -50) {
            nextCard();
        } else if (currentTranslate > 50) {
            prevCard();
        }
        currentTranslate = 0;
    };

    sliderWrapper.addEventListener('mousedown', (e) => {
        if (e.button === 0) handleStart(e.clientX);
    });
    window.addEventListener('mousemove', (e) => handleMove(e.clientX));
    window.addEventListener('mouseup', handleEnd);

    sliderWrapper.addEventListener('touchstart', (e) => handleStart(e.touches[0].clientX), { passive: true });
    sliderWrapper.addEventListener('touchmove', (e) => handleMove(e.touches[0].clientX), { passive: true });
    sliderWrapper.addEventListener('touchend', handleEnd);

    const slider = document.getElementById('slider');
    if (slider) {
        slider.addEventListener('click', (e) => {
            const card = e.target.closest('.char-card');
            if (!card || Math.abs(currentTranslate) > 10) return;

            if (card.classList.contains('prev-1')) {
                prevCard();
            } else if (card.classList.contains('next-1')) {
                nextCard();
            }
        });
    }
}

function renderCharacterCards() {
    const sliderContainer = document.getElementById('slider');
    if (!sliderContainer) return;

    sliderContainer.innerHTML = '';

    charactersData.forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.id = char.id;

        card.innerHTML = `
            <div class="card-header">
                <img src="${char.img}" alt="${char.name}">
                <div class="card-header-info">
                    <div class="c_name">
                        <h1 class="name">${char.name}</h1>
                        <h3 class="sub_name">${char.subName}</h3>
                    </div>
                    <p class="full_name">${char.fullName}</p>
                    <p class="profile-summary">${char.profile}</p>
                </div>
            </div>
            <hr>
            <div class="card-body">
                <p class="c_description">${char.description}</p>
            </div>
        `;

        sliderContainer.appendChild(card);
    });

    updateSlider();
    setupDragAndClick();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCharacterCards);
} else {
    renderCharacterCards();
}
