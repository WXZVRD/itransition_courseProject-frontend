import { Drawer, Hidden, List, ListItem, ListItemText } from "@mui/material";
import React, { FC } from "react";
import AuthButton from "./authButton";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import {useAppSelector} from "../redux/hooks";

interface ISideBarProps {
    isOpen: boolean;
    setDrawer: (value: boolean) => void;
}

const SideBar: FC<ISideBarProps> = ({isOpen, setDrawer }) => {
    const isAuth = useAppSelector(state => state.auth.isAuth);

    return (
        <Drawer anchor="left" open={isOpen} onClose={() => setDrawer(false)}>
            <Hidden mdUp>
                <List>
                    {isAuth ? (
                        <>
                            <ListItem>
                                <ListItemText primary="Profile" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem>
                                <AuthButton socialIcon={<GoogleIcon />} socialTitle={"google"} />
                            </ListItem>
                            <ListItem>
                                <AuthButton socialIcon={<GitHubIcon />} socialTitle={"github"} />
                            </ListItem>
                        </>
                    )}
                </List>
            </Hidden>
        </Drawer>
    );
}

export default SideBar;
