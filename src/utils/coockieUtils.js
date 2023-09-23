import Cookies from 'js-cookie';

export function getTokenFromCookie() {
    console.log("Getting token")
    const token = Cookies.get('jwt');
    console.log(token)
    return token || null;
}

export function getUserDataFromCookie() {
    const userData = Cookies.get('user');
    return userData || null;
}

export function clearCookies() {
    Cookies.remove('jwt');
    Cookies.remove('user');
}
