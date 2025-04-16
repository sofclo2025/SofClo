import React, { useState } from 'react';
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
} from '@mui/material';
import { Initiative } from '../../../stores/plannerStore';

type NewInitiative = Omit<Initiative, 'id' | 'createdAt'>;

interface NewInitiativeDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (initiative: NewInitiative) => void;
}

const initialInitiative: NewInitiative = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'not_started',
  year: new Date().getFullYear(),
  quarter: `Q${Math.floor((new Date().getMonth() / 3)) + 1}`,
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0],
  progress: 0,
  stakeholders: [],
};

const NewInitiativeDialog: React.FC<NewInitiativeDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [initiative, setInitiative] = useState<NewInitiative>(initialInitiative);

  const handleChange = (field: keyof NewInitiative, value: any) => {
    setInitiative((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onAdd(initiative);
    setInitiative(initialInitiative);
    onClose();
  };

  const handleCancel = () => {
    setInitiative(initialInitiative);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Initiative</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Title"
            fullWidth
            required
            value={initiative.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={initiative.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={initiative.priority}
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
                value={initiative.status}
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
              value={initiative.year}
              onChange={(e) => handleChange('year', parseInt(e.target.value))}
            />
            <FormControl fullWidth>
              <InputLabel>Quarter</InputLabel>
              <Select
                value={initiative.quarter}
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
              value={initiative.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={initiative.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!initiative.title}
        >
          Add Initiative
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewInitiativeDialog;
