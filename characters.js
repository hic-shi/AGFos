const charactersData = [
    {
        id: "AG",
        img: "img/AG.png",
        name: "AG",
        subName: "アージー",
        fullName: "Argie christophe",
        profile: "区分/術師 団員 学生<br>性別/男<br>誕生日/不明",
        description: "施設にいた頃は空も、水も、星も見たことがなかった。",
        moreUrl: "Lore.html#AG"
    },
    {
        id: "Fos",
        img: "img/Fossis.png",
        name: "Fos",
        subName: "フォス",
        fullName: "Fossis Crane",
        profile: "区分/術師 団員<br>性別/男<br>誕生日/3月16日",
        description: "AGの面倒を見ている...ように見えて、少し子供っぽい<br>",
        moreUrl: "Lore.html#Fos"
    },
    {
        id: "Dummy1",
        img: "",
        name: "Ciel",
        subName: "シエル",
        fullName: "Ciel Vesper",
        profile: "区分/騎士 隊長<br>性別/女<br>身長/168cm",
        description: "ダミーキャラクター1の説明文です。",
        moreUrl: "#"
    },
    {
        id: "Dummy2",
        img: "",
        name: "Nox",
        subName: "ノックス",
        fullName: "Nox Umbrella",
        profile: "区分/研究員<br>性別/その他<br>身長/160cm",
        description: "ダミーキャラクター2の説明文です。",
        moreUrl: "#"
    },
    {
        id: "Dummy3",
        img: "",
        name: "Nox",
        subName: "ノックス",
        fullName: "Nox Umbrella",
        profile: "区分/研究員<br>性別/その他<br>身長/160cm",
        description: "ダミーキャラクター3の説明文です。",
        moreUrl: "#"
    }
];

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
                <div class="more-wrapper">
                    <a class="more-link" href="${char.moreUrl}">more→</a>
                </div>
            </div>
        `;

        sliderContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCharacterCards();
});
