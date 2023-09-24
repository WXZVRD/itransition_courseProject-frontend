import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useEffect} from "react";

import ReviewMaker from './pages/ReviewMaker';
import Profile from './pages/Profile';
import Review from './pages/Review';
import Admin from './pages/Admin';
import Home from './pages/Home';

import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './Themes';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import {fetchMe, setUserData} from "./redux/slices/authSlice";

function App() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(state => state.app.theme);

    useEffect(() => {
        const user = localStorage.getItem("userData")
        const jwt = localStorage.getItem("jwt_user_token")
        if (!jwt || !user){
            dispatch(fetchMe())
        } else {
            dispatch(setUserData(JSON.parse(user)))
        }

    }, [dispatch]);

    return (
        <div className="App">
            <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/post/edit/:id" element={<ReviewMaker />} />
                        <Route path="/post/create" element={<ReviewMaker />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/post/:id" element={<Review />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;