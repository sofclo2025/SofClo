import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
} from '@mui/material';
import { toast } from 'sonner';
import { saveDashboardData } from '../utils/firebase';
import type { DashboardFormData } from '../utils/types';

const initialFormData: DashboardFormData = {
  metrics: {
    totalLicenses: 0,
    activeUsers: 0,
    complianceRate: 0,
    costOptimization: 0,
  },
  stakeholders: [],
};

export default function DashboardForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DashboardFormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleMetricsChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [field]: Number(event.target.value),
      },
    }));
  };

  const handleAddStakeholder = () => {
    setFormData(prev => ({
      ...prev,
      stakeholders: [
        ...prev.stakeholders,
        {
          name: '',
          role: '',
          status: 'active',
          priority: 'medium',
        },
      ],
    }));
  };

  const handleStakeholderChange = (index: number, field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStakeholders = [...formData.stakeholders];
    newStakeholders[index] = {
      ...newStakeholders[index],
      [field]: event.target.value,
    };
    setFormData(prev => ({
      ...prev,
      stakeholders: newStakeholders,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await saveDashboardData(formData);
      toast.success('Dashboard data saved successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving dashboard data:', error);
      toast.error('Failed to save dashboard data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.default' }}>
        <Typography variant="h5" gutterBottom color="primary">
          Dashboard Configuration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Enter your dashboard metrics and stakeholder information below.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Key Metrics
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Total Licenses"
              type="number"
              value={formData.metrics.totalLicenses}
              onChange={handleMetricsChange('totalLicenses')}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Active Users"
              type="number"
              value={formData.metrics.activeUsers}
              onChange={handleMetricsChange('activeUsers')}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Compliance Rate (%)"
              type="number"
              value={formData.metrics.complianceRate}
              onChange={handleMetricsChange('complianceRate')}
              InputProps={{ inputProps: { min: 0, max: 100 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cost Optimization ($)"
              type="number"
              value={formData.metrics.costOptimization}
              onChange={handleMetricsChange('costOptimization')}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Stakeholders
        </Typography>
        {formData.stakeholders.map((stakeholder, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={stakeholder.name}
                  onChange={handleStakeholderChange(index, 'name')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Role"
                  value={stakeholder.role}
                  onChange={handleStakeholderChange(index, 'role')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={stakeholder.status}
                    label="Status"
                    onChange={handleStakeholderChange(index, 'status') as any}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={stakeholder.priority}
                    label="Priority"
                    onChange={handleStakeholderChange(index, 'priority') as any}
                  >
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        ))}

        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleAddStakeholder}
            sx={{ borderRadius: 2 }}
          >
            Add Stakeholder
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            Save Dashboard Data
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
