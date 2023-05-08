import * as React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { Album, ChevronLeft, Favorite, Home, Inbox, LibraryMusic, Mail, Menu, People, QueueMusic, Recommend } from "@mui/icons-material";
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
      icon: <Home />
    },
  ];
  switch (userRole) {
    case "admin":
      return [
        { text: "Home", href: '/admin', icon: <Home /> },
        { text: "Users", href: '/admin/users', icon: <People /> },
        { text: "Tracks", href: "/admin/tracks", icon: <LibraryMusic /> },
        { text: "Albums", href: "/admin/albums", icon: <Album /> },
        { text: "Recommends", href: "/admin/recommends", icon: <Recommend /> },
      ];
    case "user":
      return [
        ...defaultRoutes,
        { text: "Playlists", href: "/playlists", icon: <QueueMusic /> },
        { text: "Favorites", href: "/favorites", icon: <Favorite /> },
        { text: "Albums", href: "/albums", icon: <Album /> },
      ]
    case "artist":
      return [
        { text: "Home", href: "/artist", icon: <Home /> },
        { text: "Albums", href: "/artist/albums", icon: <Album /> }
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
          {menuItems.map(({ text, href, icon }, index) => (
            <ListItem button key={href} onClick={() => router.push(href)}>
              <ListItemIcon>
                {icon}
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
