function startSimulation() {
    const checkboxes = document.querySelectorAll("#setup input:checked");
    selectedTopics = Array.from(checkboxes).map(cb => cb.value);

    document.getElementById("setup").style.display = "none";
    document.getElementById("controls").style.display = "block";

    initChart();
    renderNews();
}

function renderNews() {
    const container = document.getElementById("app");
    container.innerHTML = "";

    const sorted = [...newsData].sort((a, b) => {
        return calculateScore(b) - calculateScore(a);
    });

    sorted.forEach(news => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${news.title}</h3>
            <p>${explainChoice(news)}</p>

            <button onclick="likeNews(${news.id}, 1)">👍 P1</button>
            <button onclick="likeNews(${news.id}, 2)">👍 P2</button>
        `;

        container.appendChild(card);
    });
}

function likeNews(id, user) {
    const news = newsData.find(n => n.id === id);
    processLike(news, user);
    renderNews();
}

function breakBubble() {
    userBias = 0;
    userBias2 = 0;
    renderNews();
    updateChart();
}

function randomEvent() {
    const shock = (Math.random() - 0.5) * 1.2;

    userBias += shock;
    userBias2 -= shock;

    renderNews();
    updateChart();
}

function toggleDebug() {
    debugMode = !debugMode;
    renderNews();
}