import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Drawer,
  Collapse,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { appRoutes } from "../Navbar/Navbar";
import { useCustomRedirect } from "../../hooks/app.hooks";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";

type SidebarProps = {
  sidebarOpen: boolean;
  handleCloseNavMenu: (path: string) => void;
};

const Sidebar = ({ sidebarOpen, handleCloseNavMenu }: SidebarProps) => {
  const { customRedirect } = useCustomRedirect();

  const [isDropped, setIsDropped] = useState(appRoutes[0].title);

  const list = () => (
    <Box
      sx={{ width: 250, background: "#222", height: "100%" }}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* mobile btn links */}
        {appRoutes.map(({ title, path, childRoutes }, index) => (
          <ListItem
            key={title}
            disablePadding
            onClick={() => path ? customRedirect(path) : setIsDropped(title)}
            sx={{ display: 'block' }}
          >
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={title} />
              {!path && (isDropped == title ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            <Collapse in={isDropped == title} timeout="auto" unmountOnExit>
              {childRoutes && childRoutes.map(({ childTitle, childPath }) => (

                <List component="div" disablePadding key={childPath}>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => {
                    customRedirect(childPath);
                    handleCloseNavMenu(childPath);
                  }}>
                    <ListItemIcon>
                      <StarBorder color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary={childTitle} />
                  </ListItemButton>
                </List>
              ))}
            </Collapse>

          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {["Signin", "Signout", "Signup"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon color="secondary" />
                ) : (
                  <MailIcon color="secondary" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="left" open={sidebarOpen} onClose={handleCloseNavMenu}>
        {list()}
      </Drawer>
    </div>
  );
};

export default Sidebar;
