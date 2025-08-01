async function getLatestCommitTime() {
    // Replace with your GitHub username and repository name
    const owner = "qirimtatartili";
    const repo = "qirimtatartili.github.io";

    try {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const commits = await response.json();
        if (!commits || commits.length === 0) {
            throw new Error("No commits found");
        }

        const lastCommitDate = new Date(commits[0].commit.committer.date);
        return lastCommitDate;
    } catch (error) {
        console.error("Failed to fetch commit time:", error);
        return null;
    }
}
function formatDate(date) {
    // Format as YYYY-MM-DD HH:MM:SS in local time
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Update the HTML element with the commit time
getLatestCommitTime().then(date => {
    const element = document.getElementById("timeUpdateSite");
    if (date) {
        element.textContent = formatDate(date)
    } else {
        element.textContent = "xxxx.xx.xx xx:xx";
    }
});

document.addEventListener("DOMContentLoaded", getLatestCommitTime);
