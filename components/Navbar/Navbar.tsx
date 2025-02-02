import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  LinearProgress,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SortIcon from "@mui/icons-material/Sort";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { signIn, signOut, useSession } from "next-auth/react";

import Sidebar from "../Sidebar/Sidebar";
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
  const router = useRouter();
  const { data: sessionData } = useSession();
  // console.log("sessionData: ", sessionData);

  const isPageLoading = usePageLoading();
  const { customRedirect } = useCustomRedirect();

  const [searchVal, setSearchVal] = useState<string>();
  const [isResultsVisible, setIsResultsVisible] = useState<boolean>(false);
  const [isMobileSearch, setIsMobileSearch] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

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

  const handleOpenNavMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setSidebarOpen(false);
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

  const handleCloseMenuLinks = () => {
    setAnchorElLinks(null);
    setOpenLinksMenu(null);
  };

  return (
    <>
      {isPageLoading && <Loader />}
      <AppBar position="static">
        <Container maxWidth="xl" sx={{ color: "secondary.main" }} id="app-nav">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  md: "none",
                  "@media (max-width: 980px)": {
                    display: "flex",
                  },
                },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="secondary"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={classes.logo}>
              <Link href="/" passHref>
                <Image
                  src="/icon.svg"
                  alt="Icon"
                  layout="responsive"
                  width={50}
                  height={50}
                  style={{
                    margin: "0 6px",
                  }}
                />
              </Link>
            </Box>
            <Typography
              noWrap
              variant="h6"
              component={Link}
              href="/"
              sx={classes.logoTxt}
            >
              MonkeyFlix
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={classes.logoTxtMob}
            >
              MonkeyFlix
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  md: "flex",
                  "@media (max-width: 980px)": {
                    display: "none",
                  },
                },
              }}
            >
              {/* desktop btn links */}
              {appRoutes.map(({ title, path }) => (
                <Box key={title}>
                  <Button
                    onClick={(e) => {
                      if (path) {
                        customRedirect(path);
                      } else {
                        handleClickMenuLinks(e, title);
                      }
                    }}
                    sx={{ my: 2, color: "secondary.main", display: "block" }}
                  >
                    {title}
                  </Button>
                </Box>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <Box sx={{ m: "5px 20px 0 0" }}>
                <Link href={"https://discord.com/"} target="_blank">
                  <Image
                    src="assets/discord.svg"
                    alt="Discord"
                    width={30}
                    height={30}
                  />
                </Link>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  display: {
                    md: "block",
                    "@media (max-width: 980px)": {
                      display: "none",
                    },
                  },
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

                  {isFetching && (
                    <LinearProgress
                      color="secondary"
                      sx={{
                        backgroundColor: "primary.main",
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "100%",
                        zIndex: 2,
                      }}
                    />
                  )}
                </Search>
                <SearchAuto
                  searchVal={searchVal}
                  searchData={searchData}
                  isResultsVisible={isResultsVisible}
                  isError={isError}
                />
              </Box>
              <Box
                sx={{
                  ml: 1,
                  display: {
                    md: "flex",
                    "@media (max-width: 980px)": {
                      display: "none",
                    },
                  },
                }}
              >
                {sessionData?.user ? (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={`/assets/${
                          sessionData.user?.user?.propic ?? 1
                        }.png`}
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
                <Menu
                  sx={{
                    mt: "45px",
                    "& .MuiMenu-list, & .MuiMenu-paper": {
                      background: "#333",
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      sx={{
                        "&:hover": {
                          backgroundColor: "secondary.main",
                          color: "#303030",
                        },
                      }}
                      key={setting}
                      onClick={(e) => handleCloseUserMenu(e, setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Box
                sx={{
                  display: {
                    md: "none",
                    "@media (max-width: 980px)": {
                      display: "flex",
                    },
                  },
                }}
              >
                <IconButton
                  onClick={() => setIsMobileSearch((prev) => !prev)}
                  aria-label="upload picture"
                  sx={{ color: isMobileSearch ? "#fff" : "secondary.main" }}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>

          {isMobileSearch && (
            <Box
              sx={{
                mb: 1,
                position: "relative",
                display: {
                  md: "none",
                  "@media (max-width: 980px)": {
                    display: "block",
                  },
                },
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  autoFocus
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchVal || ""}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onFocus={() => setIsResultsVisible(true)}
                  onBlur={() => setIsResultsVisible(false)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                      customRedirect("/search?q=" + (searchVal ?? ""));
                    }
                  }}
                />

                {isFetching && (
                  <LinearProgress
                    color="secondary"
                    sx={{
                      backgroundColor: "primary.main",
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      width: "100%",
                      zIndex: 2,
                    }}
                  />
                )}
              </Search>
              <SearchAuto
                searchVal={searchVal}
                searchData={searchData}
                isResultsVisible={isResultsVisible}
                isError={isError}
              />
            </Box>
          )}
        </Container>
      </AppBar>
      <Sidebar
        sidebarOpen={sidebarOpen}
        handleCloseNavMenu={handleCloseNavMenu}
      />
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
