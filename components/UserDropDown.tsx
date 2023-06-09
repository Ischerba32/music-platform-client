import React from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { AccountCircle, ExitToApp } from "@mui/icons-material";
import { useRouter } from "next/router";
import { playerStore, userStore } from "../store/store";
import { observer } from "mobx-react";

const UserDropDown = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [username, setUsername] = React.useState(userStore.username)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    playerStore.active = null;
    playerStore.collapsed = false;
    await userStore.logout();
    router.push('/signIn');
  }

  React.useEffect(() => {
    setUsername(userStore.username)
  }, [userStore.username])

  return (
    <div>
      <span>{username}</span>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default observer(UserDropDown);
