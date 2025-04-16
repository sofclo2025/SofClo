import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  LinearProgress,
  Chip,
  IconButton,
  Menu,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { Initiative, Status } from '../../../stores/plannerStore';

interface InitiativeDialogProps {
  open: boolean;
  initiative: Initiative | null;
  onClose: () => void;
  onSave: (updatedInitiative: Initiative) => void;
  onDelete: (initiative: Initiative) => void;
  onStatusChange: (initiative: Initiative, newStatus: Status) => void;
}

const priorityColors = {
  high: '#f44336',
  medium: '#ff9800',
  low: '#4caf50',
};

const InitiativeDialog: React.FC<InitiativeDialogProps> = ({
  open,
  initiative,
  onClose,
  onSave,
  onDelete,
  onStatusChange,
}) => {
  const [editedInitiative, setEditedInitiative] = React.useState<Initiative | null>(null);
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    setEditedInitiative(initiative);
  }, [initiative]);

  if (!editedInitiative) return null;

  const handleChange = (field: keyof Initiative, value: any) => {
    setEditedInitiative((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedInitiative);
    onClose();
  };

  const handleDelete = () => {
    onDelete(editedInitiative);
    onClose();
  };

  const handleStatusChange = (newStatus: Status) => {
    onStatusChange(editedInitiative, newStatus);
    setMenuAnchor(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            Initiative Details
            <Chip
              label={editedInitiative.priority}
              size="small"
              sx={{
                ml: 1,
                backgroundColor: priorityColors[editedInitiative.priority as keyof typeof priorityColors],
                color: 'white',
              }}
            />
          </Typography>
          <Box>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleStatusChange('not_started')}>
                Move to Not Started
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange('in_progress')}>
                Move to In Progress
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange('review')}>
                Move to Review
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange('completed')}>
                Move to Completed
              </MenuItem>
              <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                <DeleteIcon sx={{ mr: 1 }} /> Delete Initiative
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Title"
            fullWidth
            value={editedInitiative.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={editedInitiative.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={editedInitiative.priority}
                label="Priority"
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={editedInitiative.status}
                label="Status"
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <MenuItem value="not_started">Not Started</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="review">Review</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Year"
              type="number"
              fullWidth
              value={editedInitiative.year}
              onChange={(e) => handleChange('year', parseInt(e.target.value))}
            />
            <FormControl fullWidth>
              <InputLabel>Quarter</InputLabel>
              <Select
                value={editedInitiative.quarter}
                label="Quarter"
                onChange={(e) => handleChange('quarter', e.target.value)}
              >
                <MenuItem value="Q1">Q1</MenuItem>
                <MenuItem value="Q2">Q2</MenuItem>
                <MenuItem value="Q3">Q3</MenuItem>
                <MenuItem value="Q4">Q4</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={editedInitiative.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={editedInitiative.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={editedInitiative.progress}
                sx={{ flexGrow: 1 }}
              />
              <Typography variant="body2">{editedInitiative.progress}%</Typography>
            </Box>
            <TextField
              type="number"
              size="small"
              value={editedInitiative.progress}
              onChange={(e) => handleChange('progress', Math.min(100, Math.max(0, parseInt(e.target.value))))}
              inputProps={{ min: 0, max: 100 }}
              sx={{ mt: 1, width: 100 }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InitiativeDialog;
