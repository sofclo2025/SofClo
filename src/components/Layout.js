import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Badge,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  LayoutDashboard,
  Wand2,
  Target,
  CalendarDays,
  Users,
  UserCircle,
  FileBarChart,
  AlertTriangle,
  Sliders,
  Link,
  BarChart3,
  Download,
  Settings,
  HelpCircle,
  Settings2 as OperatingModelIcon,
  Search as SearchIcon,
  ChevronLeft as ChevronLeftIcon,
  LogOut as LogOutIcon,
  Bell as BellIcon,
  ChevronDown as ChevronDownIcon,
} from 'lucide-react';
import { auth } from '../config/firebase';

const drawerWidth = 280;
const minimizedDrawerWidth = 80;

const mainMenuItems = [
  { text: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
];

const menuItems = [
  { text: 'Wizard', icon: Wand2, path: '/dashboard/wizard' },
  { text: 'Program Scope', icon: Target, path: '/dashboard/samprogramscope' },
  { text: 'Operating Model', icon: OperatingModelIcon, path: '/dashboard/operating-model' },
  { text: 'Planner', icon: CalendarDays, path: '/dashboard/planner' },
  { text: 'Organization', icon: Users, path: '/dashboard/organization' },
  { text: 'Stakeholders', icon: UserCircle, path: '/dashboard/stakeholders' },
  { text: 'Reports', icon: FileBarChart, path: '/dashboard/reports' },
  { text: 'Risk Assessment', icon: AlertTriangle, path: '/dashboard/risk' },
  { text: 'Variables', icon: Sliders, path: '/dashboard/variables/form' },
  { text: 'Connectors', icon: Link, path: '/dashboard/connectors' },
  { text: 'Graphics', icon: BarChart3, path: '/dashboard/graphics' },
  { text: 'Exports', icon: Download, path: '/dashboard/exports' },
];

const bottomMenuItems = [
  { text: 'Settings', icon: Settings, path: '/settings' },
  { text: 'Help', icon: HelpCircle, path: '/help' },
];

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [minimized, setMinimized] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationEl, setNotificationEl] = React.useState(null);
  const [notifications] = React.useState([
    { id: 1, text: 'New report available', time: '5m ago' },
    { id: 2, text: 'Project milestone reached', time: '1h ago' },
    { id: 3, text: 'Team meeting in 30 minutes', time: '2h ago' },
  ]);
  const theme = useTheme();
  const [user] = React.useState(auth.currentUser);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    // Add your logout logic here
    navigate('/login');
  };

  const handleMinimizeDrawer = () => {
    setMinimized(!minimized);
  };

  const handleDrawerToggle = React.useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const drawer = (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      pt: 2,
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: minimized ? 'center' : 'space-between', 
        px: 2, 
        mb: 2 
      }}>
        {!minimized && <Typography variant="h6" color="text.primary">SofClo</Typography>}
        <IconButton onClick={handleMinimizeDrawer}>
          <ChevronLeftIcon style={{ transform: minimized ? 'rotate(180deg)' : 'none' }} />
        </IconButton>
      </Box>
      <List sx={{ 
        px: minimized ? 1 : 2,
        display: 'flex', 
        flexDirection: 'column', 
        gap: 0.5 
      }}>
        {mainMenuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              minHeight: 44,
              justifyContent: minimized ? 'center' : 'flex-start',
              px: minimized ? 1.5 : 2,
              '&.Mui-selected': {
                backgroundColor: 'primary.lighter',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.lighter',
                },
              },
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: minimized ? 'auto' : 40,
                mr: minimized ? 0 : 2
              }}
            >
              <item.icon
                size={20}
                color={location.pathname === item.path ? 'currentColor' : undefined}
              />
            </ListItemIcon>
            {!minimized && <ListItemText primary={item.text} />}
          </ListItemButton>
        ))}

        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              minHeight: 44,
              justifyContent: minimized ? 'center' : 'flex-start',
              px: minimized ? 1.5 : 2,
              '&.Mui-selected': {
                backgroundColor: 'primary.lighter',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.lighter',
                },
              },
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: minimized ? 'auto' : 40,
                mr: minimized ? 0 : 2
              }}
            >
              <item.icon
                size={20}
                color={location.pathname === item.path ? 'currentColor' : undefined}
              />
            </ListItemIcon>
            {!minimized && <ListItemText primary={item.text} />}
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <List sx={{ 
        p: minimized ? 1 : 2,
        display: 'flex', 
        flexDirection: 'column', 
        gap: 0.5 
      }}>
        {bottomMenuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              minHeight: 44,
              justifyContent: minimized ? 'center' : 'flex-start',
              px: minimized ? 1.5 : 2,
              '&.Mui-selected': {
                backgroundColor: 'primary.lighter',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.lighter',
                },
              },
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: minimized ? 'auto' : 40,
                mr: minimized ? 0 : 2
              }}
            >
              <item.icon
                size={20}
                color={location.pathname === item.path ? 'currentColor' : undefined}
              />
            </ListItemIcon>
            {!minimized && <ListItemText primary={item.text} />}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box 
      sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: `${minimized ? minimizedDrawerWidth : drawerWidth}px 1fr`
        },
        gridTemplateRows: 'auto 1fr',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          gridColumn: { xs: '1', sm: '2' },
          width: { xs: '100%', sm: `calc(100% - ${minimized ? minimizedDrawerWidth : drawerWidth}px)` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
              '&:hover': {
                backgroundColor: 'primary.lighter',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* Search Bar */}
          <Box sx={{ 
            position: 'relative',
            ml: 3,
            borderRadius: 1,
            backgroundColor: (theme) => alpha(theme.palette.common.black, 0.05),
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.common.black, 0.1),
            },
            width: { xs: '100%', md: 'auto' },
            maxWidth: '500px'
          }}>
            <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
              <SearchIcon size={20} style={{ marginRight: '8px', color: theme.palette.text.secondary }} />
              <InputBase
                placeholder="Search..."
                sx={{ width: '100%' }}
              />
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Right side icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton
                onClick={(e) => setNotificationEl(e.currentTarget)}
                size="small"
              >
                <Badge color="error" variant="dot">
                  <BellIcon size={20} />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 } 
              }}
              onClick={handleProfileMenuOpen}
            >
              <Avatar 
                src={user?.photoURL || undefined}
                sx={{ 
                  width: 32, 
                  height: 32, 
                  bgcolor: 'primary.main',
                  '& img': {
                    objectFit: 'cover'
                  }
                }}
              >
                {user?.displayName ? user.displayName[0].toUpperCase() : 'U'}
              </Avatar>
              <Box sx={{ 
                display: { xs: 'none', sm: 'block' },
                lineHeight: 1.2
              }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {user?.displayName || 'User'}
                </Typography>
                <Typography variant="caption" sx={{ color: 'white' }}>
                  {user?.email}
                </Typography>
              </Box>
              <ChevronDownIcon size={16} />
            </Box>
          </Box>

          {/* Notifications Menu */}
          <Menu
            anchorEl={notificationEl}
            open={Boolean(notificationEl)}
            onClose={() => setNotificationEl(null)}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: { width: 320, maxHeight: 400, overflow: 'auto' }
            }}
          >
            <Typography variant="subtitle1" sx={{ px: 2, py: 1.5, fontWeight: 600 }}>
              Notifications
            </Typography>
            <Divider />
            {notifications.map((notification) => (
              <MenuItem key={notification.id} sx={{ py: 1.5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="body2">{notification.text}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            onClick={handleProfileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => navigate('/profile')}>
              <UserCircle size={16} style={{ marginRight: 8 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={() => navigate('/settings')}>
              <Settings size={16} style={{ marginRight: 8 }} />
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogOutIcon size={16} style={{ marginRight: 8 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          gridColumn: { xs: 'none', sm: '1' },
          gridRow: { xs: 'none', sm: '1 / -1' },
          position: { xs: 'fixed', sm: 'relative' },
          zIndex: { xs: theme.zIndex.drawer, sm: 'auto' },
          height: '100%',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.standard,
              }),
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            width: minimized ? minimizedDrawerWidth : drawerWidth,
            '& .MuiDrawer-paper': {
              width: minimized ? minimizedDrawerWidth : drawerWidth,
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.standard,
              }),
              borderRight: `1px solid ${theme.palette.divider}`,
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
          gridColumn: { xs: '1', sm: '2' },
          gridRow: '2',
          width: '100%',
          minHeight: 0,
          overflow: 'auto',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        <Toolbar /> {/* Spacer for fixed AppBar */}
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
