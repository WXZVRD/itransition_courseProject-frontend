export function getTokenFromCookie() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'jwt') {
            return value;
        }
    }
    return null;
}

export function getUserDataFromCookie() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'user') {
            const decodedValue = decodeURIComponent(value);
            try {
                return JSON.parse(decodedValue);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }
    return null;
}

export function clearCookies() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, _] = cookie.split('=');
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}