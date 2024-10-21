async function fetchRepos(username) {
    const repoGallery = document.getElementById('repo-gallery');
    repoGallery.innerHTML = '';
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        alert('GitHub user not found!');
        return;
    }
    const repos = await response.json();
    for (const repo of repos) {
        await addRepoDetails(repo);
    }
}

async function addRepoDetails(repo) {
    const languagesUrl = repo.languages_url;
    const languagesResponse = await fetch(languagesUrl);
    const languages = await languagesResponse.json();

    const commitsUrl = repo.commits_url.split('{')[0];
    const commitsResponse = await fetch(commitsUrl);
    const commits = await commitsResponse.json();

    const repoCard = document.createElement('div');
    repoCard.className = 'repo-card';
    repoCard.innerHTML = `
    <h2><i class="fab fa-github"></i> ${repo.name}</h2>
    <p>${repo.description}</p>
    <p>Created: ${new Date(repo.created_at).toLocaleDateString()}</p>
    <p>Last Updated: ${new Date(repo.updated_at).toLocaleDateString()}</p>
    <p>Commits: ${commits.length}</p>
    <p>Languages: ${Object.keys(languages).join(', ')}</p>
    <p>Watchers: ${repo.watchers_count}</p>
    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
`;

    document.getElementById('repo-gallery').appendChild(repoCard);
}

document.getElementById('search-btn').addEventListener('click', function() {
    const username = document.getElementById('username-input').value;
    fetchRepos(username);
});

// Load my GitHub repos by default
fetchRepos('krwaheed');
