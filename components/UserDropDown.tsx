import React from "react";
import {
  Avatar,
  Button,
  ClickAwayListener,
  Grow,
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
import { userStore } from "../store/store";
import { observer } from "mobx-react";

const UserDropDown = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await userStore.logout();
    router.push('/signIn');
  }

  return (
    <div>
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
    // <div>
    //   <div>
    //     <Button
    //       ref={anchorRef}
    //       aria-controls={open ? "menu-list-grow" : undefined}
    //       aria-haspopup="true"
    //       onClick={handleToggle}
    //       startIcon={
    //         <Avatar>
    //           <AccountCircle />
    //         </Avatar>
    //       }
    //     >
    //       User
    //     </Button>
    //     <Popper
    //       open={open}
    //       anchorEl={anchorRef.current}
    //       role={undefined}
    //       transition
    //       disablePortal
    //     >
    //       {({ TransitionProps, placement }) => (
    //         <Grow
    //           {...TransitionProps}
    //           style={{
    //             transformOrigin:
    //               placement === "bottom" ? "center top" : "center bottom",
    //           }}
    //         >
    //           <Paper>
    //             <ClickAwayListener onClickAway={handleClose}>
    //               <MenuList
    //                 autoFocusItem={open}
    //                 id="menu-list-grow"
    //                 onKeyDown={handleListKeyDown}
    //               >
    //                 <MenuItem onClick={handleClose}>
    //                   <ListItemIcon>
    //                     <AccountCircle />
    //                   </ListItemIcon>
    //                   <ListItemText primary="View Profile" />
    //                 </MenuItem>
    //                 <MenuItem onClick={handleClose}>
    //                   <ListItemIcon>
    //                     <ExitToApp />
    //                   </ListItemIcon>
    //                   <ListItemText primary="Logout" />
    //                 </MenuItem>
    //               </MenuList>
    //             </ClickAwayListener>
    //           </Paper>
    //         </Grow>
    //       )}
    //     </Popper>
    //   </div>
    // </div>
  );
};

export default observer(UserDropDown);
