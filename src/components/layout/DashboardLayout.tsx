import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'Overview', icon: '⌗', path: '/dashboard' },
  { text: 'Wizard', icon: '⚡', path: '/dashboard/wizard' },
  { text: 'Program Scope', icon: '◎', path: '/dashboard/program-scope' },
  { text: 'Operating Model', icon: '⚙', path: '/dashboard/operating-model' },
  { text: 'Planner', icon: '📅', path: '/dashboard/planner' },
  { text: 'Organization', icon: '👥', path: '/dashboard/organization' },
  { text: 'Stakeholders', icon: '👤', path: '/dashboard/stakeholders' },
  { text: 'Reports', icon: '📊', path: '/dashboard/reports' },
  { text: 'Risk Assessment', icon: '⚠', path: '/dashboard/risk-assessment' },
  { text: 'Variables', icon: '⋮', path: '/dashboard/variables' },
  { text: 'Connectors', icon: '🔗', path: '/dashboard/connectors' },
  { text: 'Graphics', icon: '📈', path: '/dashboard/graphics' },
  { text: 'Exports', icon: '⤓', path: '/dashboard/exports' },
];

const bottomMenuItems = [
  { text: 'Settings', icon: '⚙', path: '/dashboard/settings' },
  { text: 'Help', icon: '?', path: '/dashboard/help' },
];

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledDrawer variant="permanent">
        <Box sx={{ overflow: 'auto', mt: 8, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  mb: 0.5,
                  mx: 1,
                  borderRadius: 1,
                  backgroundColor: location.pathname === item.path ? 
                    'rgba(0, 0, 255, 0.08)' : 'transparent',
                  color: location.pathname === item.path ? 
                    'primary.main' : 'text.primary',
                  '&:hover': {
                    backgroundColor: location.pathname === item.path ?
                      'rgba(0, 0, 255, 0.08)' :
                      'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon 
                  sx={{
                    minWidth: '40px',
                    color: location.pathname === item.path ? 
                      'primary.main' : 
                      'text.primary',
                    fontSize: '20px',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '0.9rem',
                      fontWeight: location.pathname === item.path ? 500 : 400,
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
          
          {/* Bottom menu items */}
          <List sx={{ mt: 'auto', mb: 2 }}>
            {bottomMenuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  mb: 0.5,
                  mx: 1,
                  borderRadius: 1,
                  backgroundColor: location.pathname === item.path ? 
                    'rgba(0, 0, 255, 0.08)' : 'transparent',
                  color: location.pathname === item.path ? 
                    'primary.main' : 'text.primary',
                  '&:hover': {
                    backgroundColor: location.pathname === item.path ?
                      'rgba(0, 0, 255, 0.08)' :
                      'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon 
                  sx={{
                    minWidth: '40px',
                    color: location.pathname === item.path ? 
                      'primary.main' : 
                      'text.primary',
                    fontSize: '20px',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '0.9rem',
                      fontWeight: location.pathname === item.path ? 500 : 400,
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </StyledDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
