export function getTokenFromCookie() {
    console.log("Utils token start...")
    const cookies = document.cookie.split('; ');
    console.log("Cookie is ready!")
    console.log(cookies)
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'jwt') {
            console.log("Whe found JWT")
            return value;
        }
    }
    console.log("Nothing was founded")
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
