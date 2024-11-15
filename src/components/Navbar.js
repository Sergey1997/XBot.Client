import { useState } from 'react';
import { Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Import useAuth from AuthContext
import { useLocation, Link } from 'react-router-dom'; // Import useLocation and Link to access URL
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup } from './ui/dropdown-menu';
import { AvatarIcon } from "@radix-ui/react-icons";
import { Button } from './ui/button';

const Navbar = () => {
    const stripeIsConfigured = process.env.NEXT_PUBLIC_STRIPE_IS_ENABLED === "true";
    const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";
    const credits = null;
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
        <div className="flex w-full px-4 lg:px-40 py-4 items-center border-b text-center gap-8 justify-between">
        <div className="flex gap-2 h-full">
          <Link to="/">
            <h2 className="font-bold">Polywood AI</h2>
          </Link>
        </div>
        {user && (
          <div className="hidden lg:flex flex-row gap-2">
            <Link to="/overview">
              <Button variant={"ghost"}>Home</Button>
            </Link>
            {packsIsEnabled && (
              <Link to="/overview/packs">
                <Button variant={"ghost"}>Packs</Button>
              </Link>
            )}
            {stripeIsConfigured && (
              <Link to="/get-credits">
                <Button variant={"ghost"}>Get Credits</Button>
              </Link>
            )}
          </div>
        )}
        <div className="flex gap-4 lg:ml-auto">
          {!user && (
            <Link onClick={handleGoogleSignIn}>
              <Button variant={"ghost"}>Login / Signup </Button>
            </Link>
          )}
          {user && (
            <div className="flex flex-row gap-4 text-center align-middle justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Avatar alt={user.displayName} src={user.photoURL}  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 z-50 mt-3">
                  <DropdownMenuLabel className="text-primary text-center overflow-hidden text-ellipsis" onClick={handleClose}>
                    Settings
                  </DropdownMenuLabel>
                  <DropdownMenuLabel className="text-primary text-center overflow-hidden text-ellipsis" onClick={() => { handleLogout(); handleClose(); }} >
                    Log Out
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    );
};

export default Navbar;