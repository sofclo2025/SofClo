import React from 'react';
import { Theme } from '@mui/material/styles';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
} from 'lucide-react';

export default function Dashboard() {
  const theme = useTheme<Theme>();
  const recentActivities = [
    { id: 1, user: 'Alice', action: 'Updated Project Scope', time: '2 hours ago', type: 'update' },
    { id: 2, user: 'Bob', action: 'Completed Risk Assessment', time: '4 hours ago', type: 'complete' },
    { id: 3, user: 'Carol', action: 'Added New Milestone', time: '5 hours ago', type: 'create' },
    { id: 4, user: 'David', action: 'Flagged Critical Issue', time: 'Yesterday', type: 'alert' },
  ];

  const projectProgress = [
    { name: 'Project Alpha', progress: 85 },
    { name: 'Project Beta', progress: 65 },
    { name: 'Project Gamma', progress: 45 },
    { name: 'Project Delta', progress: 30 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: 1, 
                  bgcolor: 'primary.lighter',
                  display: 'flex',
                  mr: 2
                }}>
                  <TrendingUp size={24} style={{ color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h6">Total Projects</Typography>
              </Box>
              <Typography variant="h3" color="primary.main" sx={{ mb: 1 }}>24</Typography>
              <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp size={16} style={{ marginRight: 4 }} />
                +12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: 1, 
                  bgcolor: 'info.lighter',
                  display: 'flex',
                  mr: 2
                }}>
                  <Users size={24} style={{ color: theme.palette.info.main }} />
                </Box>
                <Typography variant="h6">Team Members</Typography>
              </Box>
              <Typography variant="h3" color="info.main" sx={{ mb: 1 }}>18</Typography>
              <AvatarGroup max={5} sx={{ justifyContent: 'flex-start' }}>
                <Avatar>A</Avatar>
                <Avatar>B</Avatar>
                <Avatar>C</Avatar>
                <Avatar>D</Avatar>
                <Avatar>E</Avatar>
                <Avatar>F</Avatar>
              </AvatarGroup>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: 1, 
                  bgcolor: 'warning.lighter',
                  display: 'flex',
                  mr: 2
                }}>
                  <Clock size={24} style={{ color: theme.palette.warning.main }} />
                </Box>
                <Typography variant="h6">Pending Tasks</Typography>
              </Box>
              <Typography variant="h3" color="warning.main" sx={{ mb: 1 }}>45</Typography>
              <Typography variant="body2" color="text.secondary">
                Due within next 7 days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: 1, 
                  bgcolor: 'success.lighter',
                  display: 'flex',
                  mr: 2
                }}>
                  <Activity size={24} style={{ color: theme.palette.success.main }} />
                </Box>
                <Typography variant="h6">Completion Rate</Typography>
              </Box>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                  variant="determinate"
                  value={75}
                  size={80}
                  thickness={4}
                  sx={{ color: 'success.main' }}
                />
                <Box sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Typography variant="h4" component="div" color="success.main">
                    75%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Project Progress */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Project Progress</Typography>
              <Box sx={{ mt: 2 }}>
                {projectProgress.map((project) => (
                  <Box key={project.name} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{project.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={project.progress}
                      sx={{ 
                        height: 8, 
                        borderRadius: 1,
                        bgcolor: 'background.neutral'
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Activity</Typography>
              <List>
                {recentActivities.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: 
                            activity.type === 'update' ? 'primary.lighter' :
                            activity.type === 'complete' ? 'success.lighter' :
                            activity.type === 'create' ? 'info.lighter' : 'warning.lighter'
                        }}>
                          {activity.type === 'update' ? <TrendingUp size={20} /> :
                           activity.type === 'complete' ? <CheckCircle size={20} /> :
                           activity.type === 'create' ? <Users size={20} /> :
                           <AlertTriangle size={20} />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.action}
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              {activity.user}
                            </Typography>
                            {` — ${activity.time}`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
