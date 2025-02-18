import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';

const tasks = [
  {
    id: 'SAM-001',
    title: 'Review License Compliance',
    status: 'IN PROGRESS',
    priority: 'High',
    assignee: 'John Doe',
    dueDate: '2025-03-01',
  },
  {
    id: 'SAM-002',
    title: 'Software Audit Preparation',
    status: 'TODO',
    priority: 'Medium',
    assignee: 'Jane Smith',
    dueDate: '2025-03-15',
  },
  {
    id: 'SAM-003',
    title: 'Cost Optimization Review',
    status: 'IN PROGRESS',
    priority: 'High',
    assignee: 'Mike Johnson',
    dueDate: '2025-02-28',
  },
];

export default function Tasks() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Tasks
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<FilterListIcon />}>
            Filter
          </Button>
          <Button variant="contained" startIcon={<AddIcon />}>
            Create Task
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <List>
                {tasks.map((task) => (
                  <ListItem
                    key={task.id}
                    divider
                    secondaryAction={
                      <>
                        <IconButton edge="end" onClick={handleMenuOpen}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                          <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                          <MenuItem onClick={handleMenuClose}>Change Status</MenuItem>
                        </Menu>
                      </>
                    }
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography>{task.title}</Typography>
                          <Chip
                            label={task.status}
                            size="small"
                            color={task.status === 'IN PROGRESS' ? 'primary' : 'default'}
                          />
                          <Chip
                            label={task.priority}
                            size="small"
                            color={task.priority === 'High' ? 'error' : 'default'}
                          />
                        </Box>
                      }
                      secondary={`${task.id} • Assigned to ${task.assignee} • Due ${task.dueDate}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
