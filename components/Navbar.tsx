import * as React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { ChevronLeft, Inbox, Mail, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import UserDropDown from "./UserDropDown";
import { observer } from "mobx-react";
import { userStore } from "../store/store";

// const menuItems = [
//   { text: "Home", href: "/" },
//   { text: "Tracks", href: "/tracks" },
//   { text: "Albums", href: "/albums" },
//   { text: "Playlists", href: "/playlists" },
// ];

const getRoutesByRole = (userRole: string) => {
  const defaultRoutes = [
    {
      text: "Home",
      href: "/",
    },
  ];
  switch (userRole) {
    case "admin":
      return [
        ...defaultRoutes,
        { text: "Tracks", href: "/tracks" },
        { text: "Albums", href: "/albums" },
        { text: "Playlists", href: "/playlists" },
      ];
    case "user":
      return [
        ...defaultRoutes,
        { text: "Playlists", href: "/playlists" },
      ]
    case "artist":
      return [
        ...defaultRoutes,
        { text: "Albums", href: "/albums" }
      ];
    default:
      return defaultRoutes
  }
};

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const menuItems = React.useMemo(() => getRoutesByRole(userStore.userRole), [userStore.userRole]);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Musify
          </Typography>
          <UserDropDown />
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="left" open={open}>
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <List>
          {menuItems.map(({ text, href }, index) => (
            <ListItem button key={href} onClick={() => router.push(href)}>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default observer(Navbar);
