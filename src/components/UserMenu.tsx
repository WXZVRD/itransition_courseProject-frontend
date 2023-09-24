import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import MySwitch from "./Switch";
import {FC} from "react";
import {useAppDispatch} from "../redux/hooks";
import {logout} from "../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";
import {IUser} from "../types/user/User";
import {switchTheme} from "../redux/slices/appSlice";
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

interface IUserMenu {
    user: IUser
}

const UserMenu: FC<IUserMenu> = ({ user }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleGoToProfile = (event: any) => {
        navigate(`/profile/${user.id}`)
    };
    const handleGoToAdmin = (event: any) => {
        navigate(`/admin`)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout())
    };

    const handleCreateReview = () => {
        navigate(`/post/create`)
    };

    const handleSwitchTheme = () => {
        dispatch(switchTheme())
    }

    const handleSwitchLang = () => {

    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleOpen}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={anchorEl ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorEl ? 'true' : undefined}
                    >
                        <Avatar src={user.avatar} sx={{ width: 32, height: 32 }}></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleGoToProfile}>
                    <Avatar src={user.avatar} /> Profile
                </MenuItem>
                <MenuItem onClick={handleCreateReview}>
                    <ListItemIcon>
                        <AddIcon fontSize="medium" />
                    </ListItemIcon>
                    New Review
                </MenuItem>
                { user.isAdmin && (
                    <MenuItem onClick={handleGoToAdmin}>
                        <ListItemIcon>
                            <AdminPanelSettingsIcon fontSize="medium" />
                        </ListItemIcon>
                        Admin Panel
                    </MenuItem>
                )}
                <MenuItem onClick={handleSwitchTheme}>
                    <MySwitch /> Dark Theme
                </MenuItem>
                <MenuItem onClick={handleSwitchLang}>
                    <MySwitch /> Switch Language
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default UserMenu;
