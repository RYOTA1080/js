let userBias = 0;
let userBias2 = 0; // второй пользователь

let bubbleStrength = 0;
let debugMode = false;

let selectedTopics = [];

function calculateScore(news, user = 1) {
    const bias = user === 1 ? userBias : userBias2;

    const similarity = 1 - Math.abs(news.opinion - bias);
    const topicBoost = selectedTopics.includes(news.topic) ? 0.3 : 0;

    return similarity + topicBoost;
}

function explainChoice(news) {
    if (!debugMode) return "";

    return `
    <small>
    score: ${calculateScore(news).toFixed(2)} |
    bias diff: ${(1 - Math.abs(news.opinion - userBias)).toFixed(2)} |
    topic boost: ${selectedTopics.includes(news.topic) ? "+0.3" : "0"}
    </small>
    `;
}

function processLike(news, user = 1) {
    if (user === 1) {
        userBias += news.opinion * 0.15;
    } else {
        userBias2 += news.opinion * 0.15;
    }

    bubbleStrength++;
    updateChart();
}

function breakBubble() {
    userBias = 0;
    userBias2 = 0;
    renderNews();
    updateChart();
}

function randomEvent() {
    const shock = (Math.random() - 0.5) * 1.5;

    userBias += shock;
    userBias2 -= shock;

    updateChart();
}