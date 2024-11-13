import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, Avatar, MenuList } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../context/AuthContext'; // Import useAuth from AuthContext
import { useLocation } from 'react-router-dom'; // Import useLocation to access URL

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, handleLogout, handleGoogleSignIn } = useAuth(); // Get user and auth methods from AuthContext
    const location = useLocation(); // Get the current location

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Check if the URL has a session_id
    const hasSessionId = new URLSearchParams(location.search).has('session_id');
    console.log(hasSessionId);

    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Twitter(X) Bot
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Button color="inherit" href="/">Home</Button>
                    {hasSessionId && <Button color="inherit" href="/dashboard">Dashboard</Button>} {/* Show Dashboard only if session_id is present */}
                    {user ? (
                        <>
                            <IconButton onClick={handleMenu} sx={{ marginLeft: 2 }}>
                                <Avatar alt={user.displayName} src={user.photoURL} />
                            </IconButton>
                        </>
                    ) : (
                        <Button color="inherit" onClick={handleGoogleSignIn}>Log in</Button>
                    )}
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    {user ? (
                        <>
                            <IconButton onClick={handleMenu} sx={{ marginLeft: 2 }}>
                                <Avatar alt={user.displayName} src={user.photoURL} />
                            </IconButton>
                        </>
                    ) : (
                        <Button color="inherit" onClick={handleGoogleSignIn}>Log in</Button>
                    )}
                    <IconButton color="inherit" aria-label="menu" onClick={handleMenu}>
                        <MenuIcon />
                    </IconButton>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {user && (
                        <MenuList>
                            <MenuItem onClick={handleClose} component="a" href="/dashboard">Settings</MenuItem>
                            <MenuItem onClick={() => { handleLogout(); handleClose(); }} component="a" href="/">
                                Logout
                            </MenuItem>
                        </MenuList>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;