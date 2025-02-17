import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const complianceMetrics = [
  {
    title: 'Overall Compliance Score',
    value: 94,
    color: 'success',
  },
  {
    title: 'License Utilization',
    value: 87,
    color: 'primary',
  },
  {
    title: 'Risk Score',
    value: 15,
    color: 'error',
  },
];

const complianceIssues = [
  {
    id: 1,
    title: 'Adobe Creative Cloud License Expiring',
    severity: 'High',
    description: 'License expires in 15 days. Renewal required.',
    status: 'Open',
  },
  {
    id: 2,
    title: 'Over-utilized Microsoft SQL Server Licenses',
    severity: 'Medium',
    description: 'Current usage exceeds licensed quantity by 5.',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Missing Software Usage Data',
    severity: 'Low',
    description: 'Usage data not available for 3 applications.',
    status: 'Open',
  },
];

export default function Compliance() {
  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Compliance
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Export Report
          </Button>
          <Button variant="contained" startIcon={<AssessmentIcon />}>
            Run Assessment
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Compliance Metrics */}
        {complianceMetrics.map((metric) => (
          <Grid item xs={12} md={4} key={metric.title}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {metric.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h4" component="div">
                    {metric.value}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={metric.value}
                  color={metric.color}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Compliance Issues */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Compliance Issues
              </Typography>
              <List>
                {complianceIssues.map((issue) => (
                  <ListItem key={issue.id} divider>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography>{issue.title}</Typography>
                          <Chip
                            label={issue.severity}
                            size="small"
                            color={
                              issue.severity === 'High'
                                ? 'error'
                                : issue.severity === 'Medium'
                                ? 'warning'
                                : 'default'
                            }
                          />
                          <Chip
                            label={issue.status}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={issue.description}
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
