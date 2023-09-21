import React, {useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import ReviewMaker from './pages/ReviewMaker';
import Profile from './pages/Profile';
import Review from './pages/Review';
import Admin from './pages/Admin';
import Home from './pages/Home';

import { ThemeProvider } from '@mui/material/styles';
import {darkTheme, lightTheme} from './Themes'

import {getTokenFromCookie, getUserDataFromCookie} from "./utils/coockieUtils";
import {getAuthData} from "./redux/slices/authSlice";
import {useAppDispatch, useAppSelector} from "./redux/hooks";

function App() {
    const dispatch = useAppDispatch()
    const theme = useAppSelector(state => state.app.theme)

    useEffect(() => {
        const token = getTokenFromCookie()
        if (token){
            const user = getUserDataFromCookie()
            dispatch(getAuthData(user))
        }
    }, [])

    return (
        <div className="App">
               <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
                   <BrowserRouter>
                           <Routes>
                               <Route path="/post/edit/:id" element={<ReviewMaker />}/>
                               <Route path="/post/create" element={<ReviewMaker/>}/>
                               <Route path="/profile/:id" element={<Profile/>}/>
                               <Route path="/post/:id" element={<Review/>}/>
                               <Route path="/admin" element={<Admin/>}/>
                               <Route path="/" element={<Home />} />
                           </Routes>
                   </BrowserRouter>
               </ThemeProvider>
        </div>
    );
}

export default App;
