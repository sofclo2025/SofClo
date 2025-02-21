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
  Divider,
  Stack,
} from '@mui/material';
import { 
  LogOut as LogoutIcon,
  Mail as MailIcon,
  User as UserIcon,
} from 'lucide-react';

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
    <Card sx={{ 
      mb: 3,
      boxShadow: 'none',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            src={user.photoURL || undefined}
            alt={user.displayName || 'User'}
            sx={{ 
              width: 72, 
              height: 72, 
              bgcolor: 'primary.main',
              fontSize: '1.5rem',
              fontWeight: 600,
            }}
          >
            {user.displayName ? user.displayName[0].toUpperCase() : <UserIcon />}
          </Avatar>
          <Box ml={2}>
            <Typography variant="h6" fontWeight={600}>
              {user.displayName || 'User'}
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <MailIcon size={16} />
              {user.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          <Button
            variant="outlined"
            color="inherit"
            fullWidth
            sx={{ 
              borderRadius: 1,
              justifyContent: 'flex-start',
              px: 2,
              py: 1,
              color: 'text.primary',
            }}
            onClick={() => navigate('/profile')}
          >
            <UserIcon size={20} style={{ marginRight: '8px' }} />
            Edit Profile
          </Button>

          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            fullWidth
            sx={{ 
              borderRadius: 1,
              justifyContent: 'flex-start',
              px: 2,
              py: 1,
            }}
          >
            Sign Out
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
