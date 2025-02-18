import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { toast } from 'sonner';
import { getDashboardData } from '../utils/firebase';
import type { DashboardFormData } from '../utils/types';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardFormData | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          No dashboard data found
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.href = '/dashboard/form'}
        >
          Create Dashboard Data
        </Button>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Dashboard</Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.href = '/dashboard/form'}
        >
          Update Dashboard Data
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Metrics */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Key Metrics</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography color="textSecondary">Total Licenses</Typography>
                  <Typography variant="h4">{dashboardData.metrics.totalLicenses}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography color="textSecondary">Active Users</Typography>
                  <Typography variant="h4">{dashboardData.metrics.activeUsers}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography color="textSecondary">Compliance Rate</Typography>
                  <Typography variant="h4">{dashboardData.metrics.complianceRate}%</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography color="textSecondary">Cost Optimization</Typography>
                  <Typography variant="h4">${dashboardData.metrics.costOptimization}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Maturity Scores */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Maturity Assessment</Typography>
              <List>
                {Object.entries(dashboardData.maturityScores).map(([dimension, score]) => (
                  <ListItem key={dimension}>
                    <ListItemText 
                      primary={dimension}
                      secondary={`Score: ${score}/5`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Compliance Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Compliance Status</Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="success.main" variant="h4">
                    {dashboardData.complianceStatus.compliant}
                  </Typography>
                  <Typography color="textSecondary">Compliant</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="error.main" variant="h4">
                    {dashboardData.complianceStatus.nonCompliant}
                  </Typography>
                  <Typography color="textSecondary">Non-Compliant</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="warning.main" variant="h4">
                    {dashboardData.complianceStatus.atRisk}
                  </Typography>
                  <Typography color="textSecondary">At Risk</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Stakeholders */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Stakeholders</Typography>
              <Grid container spacing={2}>
                {dashboardData.stakeholders.map((stakeholder, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6">{stakeholder.name}</Typography>
                        <Typography color="textSecondary" gutterBottom>{stakeholder.role}</Typography>
                        <Box mt={1}>
                          <Chip 
                            label={stakeholder.status}
                            color={stakeholder.status === 'active' ? 'success' : 'default'}
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <Chip 
                            label={stakeholder.priority}
                            color={
                              stakeholder.priority === 'high' ? 'error' :
                              stakeholder.priority === 'medium' ? 'warning' : 'info'
                            }
                            size="small"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
