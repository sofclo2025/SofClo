import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as TasksIcon,
  Inventory as InventoryIcon,
  Security as ComplianceIcon,
  AttachMoney as FinOpsIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { auth } from '../config/firebase';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Tasks', icon: <TasksIcon />, path: '/tasks' },
  { text: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
  { text: 'Compliance', icon: <ComplianceIcon />, path: '/compliance' },
  { text: 'FinOps', icon: <FinOpsIcon />, path: '/finops' },
];

const bottomMenuItems = [
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { text: 'Help', icon: <HelpIcon />, path: '/help' },
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth.currentUser;

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo and App Name */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>S</Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>SofClo</Typography>
          <Typography variant="caption" color="text.secondary">Software Asset Management</Typography>
        </Box>
      </Box>

      {/* Main Navigation */}
      <List sx={{ px: 2, py: 1, flex: 1 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: isSelected ? 'primary.light' : 'transparent',
                color: isSelected ? 'primary.main' : 'text.primary',
                '&:hover': {
                  bgcolor: isSelected ? 'primary.light' : 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: isSelected ? 600 : 400,
                }}
              />
              {item.text === 'Tasks' && (
                <Chip 
                  label="5" 
                  size="small" 
                  color={isSelected ? "primary" : "default"}
                  sx={{ ml: 1 }}
                />
              )}
            </ListItem>
          );
        })}
      </List>

      {/* Bottom Navigation */}
      <List sx={{ px: 2, py: 1 }}>
        {bottomMenuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mb: 1,
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '0.95rem',
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* User Profile Section */}
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Button
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            px: 2,
            py: 1.5,
            bgcolor: 'background.default',
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <Avatar
            src={user?.photoURL}
            alt={user?.displayName || 'User'}
            sx={{ width: 32, height: 32, mr: 1.5 }}
          />
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {user?.displayName || 'User'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            bgcolor: 'background.paper',
            boxShadow: 1,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: '#F7F9FC',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
