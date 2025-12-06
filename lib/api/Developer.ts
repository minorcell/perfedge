export const getContributors = async () => {
    try {
        const response = await fetch(
            'https://api.github.com/repos/minorcell/perfedge/contributors',
            {
                next: {
                    revalidate: 60 * 60, // revalidate hourly to reduce build-time fetches
                },
            },
        );

        if (!response.ok) {
            console.error(
                `GitHub API request failed: ${response.status} ${response.statusText}`,
            );
            return [];
        }
        return (await response.json()) ?? [];
    } catch (error) {
        console.error('Failed to fetch GitHub contributors', error);
        return [];
    }
};
