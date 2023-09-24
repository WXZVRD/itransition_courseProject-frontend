import { Drawer, Hidden, List, ListItem } from "@mui/material";
import React, { FC } from "react";
import AuthButton from "./authButton";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

interface ISideBarProps {
    isOpen: boolean;
    setDrawer: (value: boolean) => void;
}

const SideBar: FC<ISideBarProps> = ({isOpen, setDrawer }) => {

    return (
        <Drawer anchor="left" open={isOpen} onClose={() => setDrawer(false)}>
            <Hidden mdUp>
                <List>
                    <ListItem>
                        <AuthButton socialIcon={<GoogleIcon />} socialTitle={"google"} />
                    </ListItem>
                    <ListItem>
                        <AuthButton socialIcon={<GitHubIcon />} socialTitle={"github"} />
                    </ListItem>
                </List>
            </Hidden>
        </Drawer>
    );
}

export default SideBar;
