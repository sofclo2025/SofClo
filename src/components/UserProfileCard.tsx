import React, { ReactElement } from 'react';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
} from '@mui/material';
import { LogoutOutlined as LogoutIcon } from '@mui/icons-material';

export function UserProfileCard(): ReactElement | null {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to log out');
    }
  };

  if (!user) return null;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            src={user.photoURL || undefined}
            alt={user.displayName || 'User'}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">
              {user.displayName || 'User'}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {user.email}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          fullWidth
        >
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}
