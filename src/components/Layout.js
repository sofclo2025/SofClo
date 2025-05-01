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
import logoImage from '../assets/images/image.png';
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
  ChevronRight as ChevronRightIcon,
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
        justifyContent: minimized ? 'center' : 'flex-start', 
        px: minimized ? 1 : 3,
        py: 2,
        mb: 1,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        minHeight: minimized ? 80 : 140,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}>
        <Box
          component="img"
          src={logoImage}
          alt="SofClo"
          sx={{
            width: minimized ? 60 : 250,
            height: minimized ? 60 : 150,
            display: 'block',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: `scale(${minimized ? 1.08 : 1.05}) translateY(-${minimized ? 1 : 2}px)`,
              filter: 'drop-shadow(0px 6px 12px rgba(32, 156, 238, 0.2))'
            },
            filter: 'drop-shadow(0px 4px 8px rgba(32, 156, 238, 0.15))',
            objectFit: 'contain',
            cursor: 'pointer'
          }}
        />
      </Box>
      <List sx={{ 
        px: minimized ? 1 : 2,
        py: 2,
        flex: 1,
        '& .MuiListItemButton-root': {
          borderRadius: '12px',
          mb: 1,
          px: 2,
          py: 1,
          color: '#1B2559',
          '&.Mui-selected': {
            backgroundColor: '#F4F7FE',
            color: '#1B2559',
            '&:hover': {
              backgroundColor: '#F4F7FE',
            },
            '& .MuiListItemIcon-root': {
              color: '#1B2559',
            }
          },
          '&:hover': {
            backgroundColor: alpha('#F4F7FE', 0.8),
          },
          '& .MuiListItemIcon-root': {
            minWidth: minimized ? 'auto' : 40,
            color: '#1B2559',
          }
        }
      }}>
        {mainMenuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: minimized ? 'auto' : 40,
                mr: minimized ? 0 : 2,
              }}
            >
              <item.icon
                size={20}
                color={location.pathname === item.path ? '#1B2559' : undefined}
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
          >
            <ListItemIcon 
              sx={{ 
                minWidth: minimized ? 'auto' : 40,
                mr: minimized ? 0 : 2,
              }}
            >
              <item.icon
                size={20}
                color={location.pathname === item.path ? '#1B2559' : undefined}
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
          >
            <ListItemIcon 
              sx={{ 
                minWidth: minimized ? 'auto' : 40,
                mr: minimized ? 0 : 2
              }}
            >
              <item.icon
                size={20}
                color={location.pathname === item.path ? '#1B2559' : undefined}
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
          backgroundColor: '#00ADEF',
          boxShadow: '0 2px 4px rgba(0, 123, 191, 0.15)',
          backgroundImage: 'linear-gradient(to right, #00ADEF, #007BBF)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* Search Bar */}
          <Box sx={{ 
            position: 'relative',
            backgroundColor: '#FFFFFF',
            borderRadius: 2,
            marginRight: 2,
            width: { xs: '100%', sm: 'auto' },
            flex: { xs: 1, sm: 0.4 },
            border: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.12)',
            '&:hover': {
              backgroundColor: '#F4F7FE',
              boxShadow: '0 2px 4px rgba(0, 122, 191, 0.1)',
            },
          }}>
            <Box sx={{ 
              padding: '8px 12px', 
              height: '100%', 
              position: 'absolute', 
              pointerEvents: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#003A5D',
            }}>
              <SearchIcon size={20} />
            </Box>
            <InputBase
              placeholder="Search..."
              sx={{
                color: '#003A5D',
                width: '100%',
                '& .MuiInputBase-input': {
                  padding: '10px 10px 10px 40px',
                  fontSize: '0.875rem',
                  '&::placeholder': {
                    color: alpha('#003A5D', 0.7),
                    opacity: 1,
                  },
                  '&:focus': {
                    backgroundColor: '#F4F7FE',
                    boxShadow: '0 0 0 2px #00ADEF',
                  },
                },
              }}
            />
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
        <IconButton
          onClick={handleMinimizeDrawer}
          sx={{
            position: 'absolute',
            right: -20,
            top: 72,
            width: 20,
            height: 40,
            borderRadius: '0 4px 4px 0',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
            boxShadow: '4px 0 8px rgba(0, 0, 0, 0.1)',
            zIndex: theme.zIndex.drawer + 1,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          {minimized ? <ChevronRightIcon size={18} /> : <ChevronLeftIcon size={18} />}
        </IconButton>

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
            '& .MuiDrawer-paper': {
              width: minimized ? minimizedDrawerWidth : drawerWidth,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.standard,
              }),
              overflowX: 'hidden',
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              backgroundColor: '#FFFFFF',
              color: '#1B2559',
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
