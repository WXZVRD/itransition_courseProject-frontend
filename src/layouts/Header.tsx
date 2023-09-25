import React, { useState } from 'react';
import {AppBar, Hidden, Toolbar, Typography, IconButton} from "@mui/material";

import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from "@mui/icons-material/Menu";

import Search from "../components/Search";
import AuthButton from "../components/authButton";
import SideBar from "../components/SideBar";
import UserMenu from "../components/UserMenu";

import {Link} from "react-router-dom";
import {useAppSelector} from "../redux/hooks";
import {selectIsAuth, selectUser} from "../redux/selectors"

const Header = () => {
    const isAuth = useAppSelector(selectIsAuth);
    const user = useAppSelector(selectUser);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
            <AppBar position="sticky" sx={{display:'flex', flexWrap:'wrap', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Link to={'/'} style={{textDecoration:'none'}}>
                    <Typography variant="h6" sx={{ml:'20px'}}>
                        WXZVRD
                    </Typography>
                </Link>
                <Toolbar>
                    <Search/>
                    <Hidden mdDown>
                        {!isAuth && <AuthButton socialIcon={<GoogleIcon/>} socialTitle={'google'}/>}
                        {!isAuth && <AuthButton socialIcon={<GitHubIcon/>} socialTitle={'github'}/>}
                    </Hidden>
                    {!isAuth
                    ? (
                            <IconButton
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{ display: { md: "none" }, ml:'20px' }}>
                                <MenuIcon />
                            </IconButton>
                        )
                    : (
                        user && <UserMenu user={user}/>
                        )}
                </Toolbar>
                <SideBar isOpen={isDrawerOpen} setDrawer={setIsDrawerOpen}/>
            </AppBar>
    );
};

export default Header;
