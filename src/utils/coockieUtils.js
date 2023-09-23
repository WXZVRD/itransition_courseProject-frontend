import Cookies from 'js-cookie';

export function getTokenFromCookie() {
    const token = Cookies.get('jwt');
    // return token || null;
    return Cookies.get();
}

export function getUserDataFromCookie() {
    const userData = Cookies.get('user');
    return userData || null;
}

export function clearCookies() {
    Cookies.remove('jwt');
    Cookies.remove('user');
}
