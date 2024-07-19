import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Toolbar, Divider, Tooltip } from '@mui/material';
import { Instagram, YouTube, MusicNote, Twitter, Reddit, AccountCircle, Favorite, Dashboard } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'; // Ajouter l'icône pour Jailbreak

const Sidebar = ({ onLogin }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <Box sx={{ display: 'flex', position: 'fixed', left: '20px', top: '0', height: '100vh' }}>
      <Drawer
        variant="permanent"
        open={open}
        onClose={toggleDrawer(false)}
        onMouseEnter={toggleDrawer(true)}
        onMouseLeave={toggleDrawer(false)}
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 240 : 60,
            transition: 'width 0.3s',
            backgroundColor: 'rgba(44, 44, 44, 0.8)',
            color: '#fff',
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Tooltip title="Login" placement="right">
            <IconButton component={Link} to="/login" sx={{ color: '#fff' }}>
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Divider />
        <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ListItem button component={Link} to="/" sx={{ my: 3, justifyContent: 'center' }}>
            <ListItemIcon sx={{ justifyContent: 'center', color: '#fff', minWidth: 0 }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ display: open ? 'block' : 'none', pl: 2 }} />
          </ListItem>
          <ListItem button component={Link} to="/agency" sx={{ my: 3, justifyContent: 'center' }}>
            <ListItemIcon sx={{ justifyContent: 'center', color: '#fff', minWidth: 0 }}>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Agency" sx={{ display: open ? 'block' : 'none', pl: 2 }} />
          </ListItem>
          <ListItem button component={Link} to="/instagram" sx={{ my: 3, justifyContent: 'center' }}>
            <ListItemIcon sx={{ justifyContent: 'center', color: '#fff', minWidth: 0 }}>
              <Instagram />
            </ListItemIcon>
            <ListItemText primary="Instagram" sx={{ display: open ? 'block' : 'none', pl: 2 }} />
          </ListItem>
          <ListItem button component={Link} to="/youtube" sx={{ my: 3, justifyContent: 'center' }}>
            <ListItemIcon sx={{ justifyContent: 'center', color: '#fff', minWidth: 0 }}>
              <YouTube />
            </ListItemIcon>
            <ListItemText primary="YouTube" sx={{ display: open ? 'block' : 'none', pl: 2 }} />
          </ListItem>
          <ListItem button component={Link} to="/music" sx={{ my: 3, justifyContent: 'center' }}>
            <ListItemIcon sx={{ justifyContent: 'center', color: '#fff', minWidth: 0 }}>
              <MusicNote />
            </ListItemIcon>
            <ListItemText primary="Music" sx={{ display: open ? 'block' : 'none', pl: 2 }} />
          </ListItem>
          <ListItem button component={Link} to="/twitter" sx={{ my: 3, justifyContent: 'center' }}>
            <ListItemIcon sx={{ justifyContent: 'center', color: '#fff', minWidth: 0 }}>
              <Twitter />
            </ListItemIcon>
            <ListItemText primary="Twitter" sx={{ display: open ? 'block' : 'none', pl: 2 }} />
          </ListItem>
          <ListItem button component={Link} to="/reddit" sx={{ my: 3, justifyContent: 'center' }}>
            <ListItemIcon sx={{ justifyContent: 'center', color: '#fff', minWidth: 0 }}>
              <Reddit />
            </ListItemIcon>
            <ListItemText primary="Reddit" sx={{ display: open ? 'block' : 'none', pl: 2 }} />
          </ListItem>
          <ListItem button component={Link} to="/onlyfans" sx={{ my: 3, justifyContent: 'center' }}>
            <ListItemIcon sx={{ justifyContent: 'center', color: '#fff', minWidth: 0 }}>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary="OnlyFans" sx={{ display: open ? 'block' : 'none', pl: 2 }} />
          </ListItem>
          <ListItem button component={Link} to="/jailbreak" sx={{ my: 3, justifyContent: 'center' }}>
            <ListItemIcon sx={{ justifyContent: 'center', color: '#fff', minWidth: 0 }}>
              <PhoneIphoneIcon />
            </ListItemIcon>
            <ListItemText primary="Jailbreak" sx={{ display: open ? 'block' : 'none', pl: 2 }} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
