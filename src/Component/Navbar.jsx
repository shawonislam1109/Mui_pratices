import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };
  return (
    <Stack mb={"2rem"}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
            <Typography sx={{ ml: "2rem" }} variant="h5">
              News
            </Typography>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Stack direction="row" spacing={3}>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Login</Button>
            <Button
              onClick={handleClick}
              aria-controls={open ? "resources-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              color="inherit"
              id="resources-Button"
            >
              menu
            </Button>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Login</Button>
          </Stack>
          <Menu
            id="resources-menu"
            anchorEl={anchorEl}
            open={open}
            MenuListProps={{
              "aria-labelledby": "resources-Button",
            }}
            onClose={handleClose}
          >
            <MenuItem>Blog</MenuItem>
            <MenuItem >Section</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Stack>
  );
};

export default Navbar;
