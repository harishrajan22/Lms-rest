import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Typography,
  Toolbar,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const drawerWidth = 240;

const operations = [
  { id: 1, name: "View Books", logo: <AutoStoriesIcon />, url: "/viewbooks" },
  { id: 2, name: "Add Book", logo: <PostAddIcon />, url: "/addbook" },
  {
    id: 3,
    name: "View Members",
    logo: <RememberMeIcon />,
    url: "/viewmembers",
  },
  {
    id: 4,
    name: "Add Members",
    logo: <PersonAddAltIcon />,
    url: "/addmembers",
  },
  {
    id: 5,
    name: "collectbook",
    logo: <CollectionsBookmarkIcon />,
    url: "/collectbook",
  },
];

function ResponsiveDrawer({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {operations.map((operation) => (
          <ListItem key={operation.id} disablePadding>
            <ListItemButton onClick={() => navigate(operation.url)}>
              <ListItemIcon>{operation.logo}</ListItemIcon>
              <ListItemText primary={operation.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "black" }} />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            sx={{ color: "black" }}
            component="div"
          >
            BAssure Library
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
