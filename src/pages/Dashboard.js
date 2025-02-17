import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  Assignment as TaskIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const tasks = [
  {
    id: 'SAM-001',
    title: 'Review License Compliance',
    status: 'IN PROGRESS',
    priority: 'High',
    assignee: 'John Doe',
  },
  {
    id: 'SAM-002',
    title: 'Software Audit Preparation',
    status: 'TODO',
    priority: 'Medium',
    assignee: 'Jane Smith',
  },
  {
    id: 'SAM-003',
    title: 'Cost Optimization Review',
    status: 'IN PROGRESS',
    priority: 'High',
    assignee: 'Mike Johnson',
  },
];

const metrics = [
  {
    title: 'License Compliance',
    value: '94%',
    trend: 'up',
    color: '#00875A',
  },
  {
    title: 'Cost Optimization',
    value: '$45,000',
    trend: 'up',
    color: '#0052CC',
  },
  {
    title: 'Pending Tasks',
    value: '12',
    trend: 'down',
    color: '#FF5630',
  },
];

export default function Dashboard() {
  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Button variant="contained" startIcon={<TaskIcon />}>
          Create Task
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Metrics Cards */}
        {metrics.map((metric) => (
          <Grid item xs={12} md={4} key={metric.title}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {metric.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h4" component="div" sx={{ color: metric.color }}>
                    {metric.value}
                  </Typography>
                  <TrendingUpIcon sx={{ color: metric.color }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Recent Tasks */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader 
              title="Recent Tasks"
              action={
                <Button color="primary">View All</Button>
              }
            />
            <List>
              {tasks.map((task) => (
                <ListItem key={task.id} divider>
                  <ListItemIcon>
                    <TaskIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={task.title}
                    secondary={`${task.id} • Assigned to ${task.assignee}`}
                  />
                  <Chip
                    label={task.status}
                    size="small"
                    color={task.status === 'IN PROGRESS' ? 'primary' : 'default'}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Alerts and Notifications */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Alerts" />
            <List>
              <ListItem>
                <ListItemIcon>
                  <WarningIcon color="error" />
                </ListItemIcon>
                <ListItemText
                  primary="License Expiring Soon"
                  secondary="Adobe Creative Cloud - 15 days remaining"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Compliance Check Passed"
                  secondary="Microsoft Office 365"
                />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
