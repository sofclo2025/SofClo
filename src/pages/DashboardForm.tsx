import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  CircularProgress,
} from "@mui/material";
import { toast } from "sonner";
import type { DashboardFormData } from "../utils/types";
import { updateDashboardData, getDashboardData } from "../utils/firebase";

const MATURITY_DIMENSIONS = [
  "Strategy & Governance",
  "Process & Automation",
  "Technology & Tools",
  "People & Skills",
  "Vendor Management",
];

const DEFAULT_FORM_DATA: DashboardFormData = {
  metrics: {
    totalLicenses: 0,
    activeUsers: 0,
    complianceRate: 0,
    costOptimization: 0,
  },
  maturityScores: MATURITY_DIMENSIONS.reduce((acc, dim) => ({ ...acc, [dim]: 0 }), {}),
  complianceStatus: {
    compliant: 0,
    nonCompliant: 0,
    atRisk: 0,
  },
  stakeholders: [
    {
      name: "",
      role: "",
      status: "active",
      priority: "medium",
    },
  ],
};

export default function DashboardForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DashboardFormData>(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const data = await getDashboardData();
        if (data) {
          setFormData(data);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const handleMetricsChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [field]: Number(value),
      },
    }));
  };

  const handleMaturityChange = (dimension: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      maturityScores: {
        ...prev.maturityScores,
        [dimension]: Number(value),
      },
    }));
  };

  const handleComplianceChange = (status: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      complianceStatus: {
        ...prev.complianceStatus,
        [status]: Number(value),
      },
    }));
  };

  const handleStakeholderChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const stakeholders = [...prev.stakeholders];
      stakeholders[index] = {
        ...stakeholders[index],
        [field]: value,
      };
      return { ...prev, stakeholders };
    });
  };

  const addStakeholder = () => {
    setFormData(prev => ({
      ...prev,
      stakeholders: [
        ...prev.stakeholders,
        {
          name: "",
          role: "",
          status: "active",
          priority: "medium",
        },
      ],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      if (Object.values(formData.metrics).some(value => value < 0)) {
        toast.error("Metrics cannot be negative");
        return;
      }

      if (Object.values(formData.maturityScores).some(score => score < 0 || score > 5)) {
        toast.error("Maturity scores must be between 0 and 5");
        return;
      }

      if (Object.values(formData.complianceStatus).some(value => value < 0)) {
        toast.error("Compliance status values cannot be negative");
        return;
      }

      if (!formData.stakeholders.every(s => s.name && s.role)) {
        toast.error("All stakeholder names and roles are required");
        return;
      }

      setSaving(true);
      await updateDashboardData(formData);
      
      // Show success message with promise
      await toast.promise(
        // Artificial delay to ensure user sees the success message
        new Promise(resolve => setTimeout(resolve, 1000)),
        {
          loading: 'Saving dashboard data...',
          success: 'Dashboard data saved successfully! Redirecting...',
          error: 'Failed to save dashboard data'
        }
      );

      // Navigate after showing success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500); // Give time for the user to see the success message
      
    } catch (error) {
      console.error("Error updating dashboard data:", error);
      toast.error("Failed to save dashboard data. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>Key Metrics</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Total Licenses"
                type="number"
                value={formData.metrics.totalLicenses}
                onChange={e => handleMetricsChange("totalLicenses", e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Active Users"
                type="number"
                value={formData.metrics.activeUsers}
                onChange={e => handleMetricsChange("activeUsers", e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Compliance Rate (%)"
                type="number"
                value={formData.metrics.complianceRate}
                onChange={e => handleMetricsChange("complianceRate", e.target.value)}
                InputProps={{ inputProps: { min: 0, max: 100 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cost Optimization (%)"
                type="number"
                value={formData.metrics.costOptimization}
                onChange={e => handleMetricsChange("costOptimization", e.target.value)}
                InputProps={{ inputProps: { min: 0, max: 100 } }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>Program Maturity Assessment</Typography>
          <Grid container spacing={3}>
            {MATURITY_DIMENSIONS.map(dimension => (
              <Grid item xs={12} md={6} key={dimension}>
                <TextField
                  fullWidth
                  label={dimension}
                  type="number"
                  value={formData.maturityScores[dimension]}
                  onChange={e => handleMaturityChange(dimension, e.target.value)}
                  InputProps={{ inputProps: { min: 0, max: 5 } }}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>Compliance Status</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Compliant"
                type="number"
                value={formData.complianceStatus.compliant}
                onChange={e => handleComplianceChange("compliant", e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Non-Compliant"
                type="number"
                value={formData.complianceStatus.nonCompliant}
                onChange={e => handleComplianceChange("nonCompliant", e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="At Risk"
                type="number"
                value={formData.complianceStatus.atRisk}
                onChange={e => handleComplianceChange("atRisk", e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>Stakeholder Engagement</Typography>
          {formData.stakeholders.map((stakeholder, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={stakeholder.name}
                    onChange={e => handleStakeholderChange(index, "name", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Role"
                    value={stakeholder.role}
                    onChange={e => handleStakeholderChange(index, "role", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={stakeholder.status}
                      label="Status"
                      onChange={e => handleStakeholderChange(index, "status", e.target.value)}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={stakeholder.priority}
                      label="Priority"
                      onChange={e => handleStakeholderChange(index, "priority", e.target.value)}
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
          <Button variant="outlined" onClick={addStakeholder} sx={{ mt: 2 }}>
            Add Stakeholder
          </Button>
        </CardContent>
      </Card>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button 
          variant="outlined" 
          onClick={() => navigate("/dashboard")}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          type="submit"
          disabled={saving}
        >
          {saving ? <CircularProgress size={24} /> : "Save Dashboard Data"}
        </Button>
      </Stack>
    </Box>
  );
}
