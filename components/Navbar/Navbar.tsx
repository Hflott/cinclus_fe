import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import {
  AppBar,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SortIcon from "@mui/icons-material/Sort";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCustomRedirect, usePageLoading } from "../../hooks/app.hooks";
import SearchAuto from "../SearchAuto/SearchAuto";
import { styles as classes } from "./navbar.styles";
import { useQuery } from "@tanstack/react-query";
import { MovieQueryKey } from "../../hooks/movies.hooks";
import { getSearchQuery } from "../../apis/search.api";
import Loader from "../Loader/Loader";
import { useRouter } from "next/router";
import Image from "next/image";

export const appRoutes = [
  {
    title: "Movies",
    icon: <OndemandVideoIcon />,
    path: "/movie",
  },
  {
    title: "TV Shows",
    icon: <LiveTvIcon />,
    path: "/tv",
  },
  {
    title: "Browse",
    icon: <SortIcon />,
    path: "/browse",
  },
  {
    title: "Watchlist",
    icon: <SubscriptionsIcon />,
    path: "/watchlist",
  },
];

const settings = ["Profile", "Logout"];

const Navbar = () => {
  const theme = useTheme();
  const router = useRouter();
  const currentPath = router.pathname;
  const { data: sessionData } = useSession();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detect mobile view
  // console.log("sessionData: ", sessionData);

  const navItems = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    { label: "Movies", icon: <OndemandVideoIcon />, path: "/movie" },
    { label: "TV Shows", icon: <LiveTvIcon />, path: "/tv" },
    { label: "Discover", icon: <ExploreOutlinedIcon />, path: "/browse" },
    { label: "Watchlist", icon: <SubscriptionsIcon />, path: "/watchlist" },
    // Add other navigation items here
  ];

  const bottomNavValue = navItems.findIndex(
    (item) => item.path === currentPath
  );

  const isPageLoading = usePageLoading();
  const { customRedirect } = useCustomRedirect();

  const [searchVal, setSearchVal] = useState<string>();
  const [isResultsVisible, setIsResultsVisible] = useState<boolean>(false);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElLinks, setAnchorElLinks] = useState<null | HTMLElement>(null);
  const [openLinksMenu, setOpenLinksMenu] = useState<null | string>(null);

  const {
    data: searchData,
    isFetching,
    isError,
  } = useSearchQuery(searchVal ? searchVal : "");

  // console.log("QueryErrorxx: ", error);
  // console.log("isLoading: ", isLoading);
  // console.log("isFetching: ", isFetching);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async (
    event: React.MouseEvent<HTMLElement>,
    btnKey?: string
  ) => {
    if (btnKey == "Logout") await signOut({ redirect: false });
    if (btnKey == settings[0]) customRedirect("/profile");
    setAnchorElUser(null);
  };

  const handleClickMenuLinks = (
    event: React.MouseEvent<HTMLElement>,
    title: string
  ) => {
    setAnchorElLinks(event.currentTarget);
    setOpenLinksMenu(title);
  };

  return (
    <>
      {isPageLoading && <Loader />}
      <AppBar position="fixed" sx={{ width: "100%", zIndex: 1000 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "secondary.main",
            gap: 2,
            padding: { xs: "0 16px", sm: "0 24px" },
          }}
        >
          {/* Left Section - Logo + Desktop Links */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0, md: 4 },
              flexShrink: 0,
            }}
          >
            <Box sx={classes.logo}>
              <Link href="/">
                <Image
                  src="/icon.svg"
                  alt="Icon"
                  width={35}
                  height={35}
                  style={{ display: "block" }}
                  quality={100}
                />
              </Link>
            </Box>

            {/* Desktop Links */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  ml: 2,
                }}
              >
                {appRoutes.map(({ title, path }) => (
                  <Button
                    key={title}
                    onClick={() => customRedirect(path)}
                    sx={{
                      color: "secondary.main",
                      whiteSpace: "nowrap",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    {title}
                  </Button>
                ))}
              </Box>
            )}
          </Box>

          {/* Search Bar - Position changes based on viewport */}
          <Box
            sx={{
              position: "relative",
              flexGrow: 1,
              maxWidth: 600,
              marginLeft: { xs: 0, md: 4 },
              marginRight: { xs: 0, md: 4 },
              display: isMobile ? "none" : "block",
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchVal || ""}
                onChange={(e) => setSearchVal(e.target.value)}
                onFocus={() => setIsResultsVisible(true)}
                onBlur={() => setIsResultsVisible(false)}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    e.currentTarget.blur();
                    customRedirect("/search?q=" + (searchVal ?? ""));
                  }
                }}
              />
            </Search>
            <SearchAuto
              searchVal={searchVal}
              searchData={searchData}
              isResultsVisible={isResultsVisible}
              isError={isError}
            />
          </Box>

          {/* Mobile Search Bar */}
          {isMobile && (
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: "100%",
                display: { xs: "block", md: "none" },
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchVal || ""}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onFocus={() => setIsResultsVisible(true)}
                  onBlur={() => setIsResultsVisible(false)}
                  onKeyUp={(e) => {
                    if (e.key == "Enter") {
                      e.currentTarget.blur();
                      customRedirect("/search?q=" + (searchVal ?? ""));
                    }
                  }}
                />
              </Search>
              <SearchAuto
                searchVal={searchVal}
                searchData={searchData}
                isResultsVisible={isResultsVisible}
                isError={isError}
              />
            </Box>
          )}

          {/* Right Section - Discord + Profile */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexShrink: 0,
              ml: "auto",
            }}
          >
            {/* Discord Link */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Link href="https://discord.com/" target="_blank">
                <Image
                  src="assets/discord.svg"
                  alt="Discord"
                  width={30}
                  height={30}
                  quality={100}
                />
              </Link>
            </Box>

            {/* Profile Section */}
            <Box sx={{ display: "block" }}>
              {sessionData?.user ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User avatar"
                      src={`/assets/${sessionData.user?.user?.propic ?? 1}.png`}
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() =>
                    router.pathname !== "/login" ? signIn() : null
                  }
                >
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Bottom Navbar (Only for Mobile) */}
      {isMobile && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            paddingY: "12px",
            backgroundColor: "transparent",
          }}
          elevation={3}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: `rgba(0, 0, 0, 0.8)`, // Semi-transparent background
              backdropFilter: "blur(30px)", // Strong blur effect
              zIndex: -1, // Place the background behind the BottomNavigation
            }}
          />
          <BottomNavigation
            showLabels
            value={bottomNavValue === -1 ? false : bottomNavValue} // Set to false if not found
            onChange={(event, newValue) => {
              router.push(navItems[newValue].path);
            }}
            sx={{
              backgroundColor: "transparent",
              color: theme.palette.text.primary,
            }}
          >
            {navItems.map((item, index) => (
              <BottomNavigationAction
                key={index}
                label={item.label}
                icon={item.icon}
                sx={{
                  whiteSpace: "nowrap",
                  minWidth: "70px",
                  paddingY: "24px",
                  color: theme.palette.text.primary,
                  "& .MuiSvgIcon-root": {
                    fontSize: "32px",
                  },
                  "&.Mui-selected": {
                    color: theme.palette.secondary.main,
                    "& .MuiSvgIcon-root": {
                      color: theme.palette.secondary.main,
                    },
                  },
                }}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
};

export const useSearchQuery = (searchQuery?: string | string[]) => {
  return useQuery(
    [MovieQueryKey.SearchQuery, searchQuery],
    () => getSearchQuery(1, searchQuery),
    { enabled: !!searchQuery }
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default Navbar;
