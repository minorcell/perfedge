export const getContributors = async () => {
    const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    try {
        const response = await fetch(
            'https://api.github.com/repos/minorcell/perfedge/contributors',
            { headers, next: { revalidate: 3600 } },
        );

        if (!response.ok) {
            console.warn(`GitHub API request failed: ${response.status}`);
            return [];
        }

        const data = await response.json();
        return data;
    } catch {
        console.warn('Failed to fetch contributors');
        return [];
    }
};
