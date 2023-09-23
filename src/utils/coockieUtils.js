import React from 'react';
import { useCookies } from 'react-cookie';

function getTokenFromCookie() {
    console.log("Getting token")

  const [cookies] = useCookies(['jwt']);
    console.log(cookies)
  return cookies.jwt || null;
}

function getUserDataFromCookie() {
  const [cookies] = useCookies(['user']);
  return cookies.user || null;
}

function clearCookies() {
  const [, removeJwt] = useCookies(['jwt']);
  const [, removeUser] = useCookies(['user']);

  removeJwt('jwt');
  removeUser('user');
}

export { getTokenFromCookie, getUserDataFromCookie, clearCookies };

