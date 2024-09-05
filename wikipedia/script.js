function searchWikipedia() {
    const searchTerm = document.getElementById('searchInput').value;
    const endpoint = 'https://en.wikipedia.org/w/api.php';
    const params = new URLSearchParams({
        action: 'query',
        list: 'search',
        srsearch: searchTerm,
        format: 'json',
        origin: '*'
    });

    fetch(`${endpoint}?${params}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data.query.search);
        })
        .catch(error => console.error('Error:', error));
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    results.forEach(result => {
        const article = document.createElement('div');
        article.className = 'article';
        article.innerHTML = `
            <h2>${result.title}</h2>
            <p>${result.snippet}</p>
            <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read more</a>
        `;
        resultsDiv.appendChild(article);
    });
}

function getPageSummary(title) {
    const endpoint = 'https://en.wikipedia.org/w/api.php';
    const params = new URLSearchParams({
        action: 'query',
        format: 'json',
        prop: 'extracts',
        exintro: true,
        explaintext: true,
        titles: title,
        origin: '*'
    });

    return fetch(`${endpoint}?${params}`)
        .then(response => response.json())
        .then(data => {
            const pages = data.query.pages;
            const pageId = Object.keys(pages)[0];
            return pages[pageId].extract;
        });
}

// Enhance displayResults to show summaries on click
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    results.forEach(result => {
        const article = document.createElement('div');
        article.className = 'article';
        article.innerHTML = `
            <h2>${result.title}</h2>
            <p>${result.snippet}</p>
            <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read more</a>
            <button onclick="showSummary('${result.title}', this)">Show Summary</button>
            <div class="summary" style="display: none;"></div>
        `;
        resultsDiv.appendChild(article);
    });
}

function showSummary(title, button) {
    const summaryDiv = button.nextElementSibling;
    if (summaryDiv.style.display === 'none') {
        getPageSummary(title).then(summary => {
            summaryDiv.textContent = summary;
            summaryDiv.style.display = 'block';
            button.textContent = 'Hide Summary';
        });
    } else {
        summaryDiv.style.display = 'none';
        button.textContent = 'Show Summary';
    }
}

function goBack() {
    window.history.back();
}