import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { theme } from "../theme/index";
import AddTasksModal from "../models/addTasks";
import { Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slices/user.slice";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function HeaderDrawer(props) {
  const dispatch = useDispatch();

  const {
    userSlice: { user },
  } = useSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const [taskOpen, setTaskOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userData");
    navigate("/login");
  };
  return (
    <>
      <AddTasksModal open={taskOpen} setOpen={setTaskOpen} />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          sx={{
            background: theme.palette.primary.main,
          }}
          position="fixed"
          open={open}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 0.95,
              }}
            >
              TASK MANAGER
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "flex" },
              }}
            >
              {user && user?.name ? (
                <>
                  <Typography
                    sx={{
                      borderRadius: "20px",
                      background: "green",
                      mr: 1,
                      color: "white",
                      fontSize: "18px",
                      p: 0.7,
                      textTransform: "capitalize",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    {user?.name && user.name.length > 6
                      ? `${user.name.slice(0, 6)}...`
                      : user.name}
                  </Typography>
                  <Button
                    sx={{
                      borderRadius: "20px",
                      background: "green",
                      mr: 1,
                      color: "white",
                      fontSize: "16px",
                      padding: "5px 14px",
                      textTransform: "capitalize",
                      "&:hover": {
                        background: "green",
                      },
                    }}
                    onClick={() => setTaskOpen(true)}
                  >
                    <AddIcon
                      sx={{
                        fontSize: "20px ",
                        mr: 1,
                        p: 0.1,
                        backgroundColor: "#fff",
                        color: "green",
                        borderRadius: "50%",
                      }}
                    />
                    Add new
                  </Button>
                  <Button
                    sx={{
                      borderRadius: "20px",
                      background: "green",
                      mr: 1,
                      color: "white",
                      fontSize: "16px",
                      padding: "5px 14px",
                      textTransform: "capitalize",
                      "&:hover": {
                        background: "green",
                      },
                    }}
                    onClick={handleLogout}
                  >
                    <LogoutIcon
                      sx={{
                        fontSize: "20px ",
                        mr: 1,
                        p: 0.1,
                        backgroundColor: "#fff",
                        color: "green",
                        borderRadius: "50%",
                      }}
                    />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{
                      borderRadius: "20px",
                      background: "green",
                      color: "white",
                      fontSize: "16px",
                      padding: "5px 14px",
                      textTransform: "capitalize",
                      "&:hover": {
                        background: "green",
                      },
                    }}
                    onClick={() => navigate("/login")}
                  >
                    <LoginIcon
                      sx={{
                        fontSize: "20px ",
                        mr: 1,
                        p: 0.1,
                        backgroundColor: "#fff",
                        color: "green",
                        borderRadius: "50%",
                      }}
                    />
                    Login
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton
              sx={{
                background: theme.palette.primary.main,
                color: theme.palette.secondary.main,
                "&:hover": {
                  background: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                  border: `2px solid ${theme.palette.primary.main}`,
                },
              }}
              onClick={handleDrawerClose}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Divider />

          <List>
            {(user && user.name
              ? [
                  {
                    text: (
                      <Typography
                        sx={{
                          fontWeight:"bold",
                          textTransform: "capitalize",
                        }}
                      >
                        {user.name.length > 12
                          ? `${user.name.slice(0, 12)}...`
                          : user.name}
                      </Typography>
                    ),
                    icon: <AccountCircleIcon />,
                  },
                  {
                    text: "Add Task",
                    onClick: () => setTaskOpen(true),
                    icon: <AddTaskIcon />,
                  },
                  {
                    text: "Logout",
                    onClick: handleLogout,
                    icon: <ExitToAppIcon />,
                  },
                ]
              : [
                  {
                    text: "Login",
                    onClick: () => navigate("/login"),
                    icon: <LoginIcon />,
                  },
                ]
            ).map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={item.onClick}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item?.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item?.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Container maxWidth="xlg">{props.children}</Container>
        </Box>
      </Box>
    </>
  );
}
