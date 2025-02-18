import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const costMetrics = [
  {
    title: 'Total Software Spend',
    value: '$450,000',
    trend: '+5.2%',
    period: 'YTD',
  },
  {
    title: 'Cost per Employee',
    value: '$1,250',
    trend: '-2.8%',
    period: 'vs. Last Quarter',
  },
  {
    title: 'Potential Savings',
    value: '$65,000',
    trend: 'Identified',
    period: 'Next 12 Months',
  },
];

const topSpending = [
  {
    software: 'Microsoft Office 365',
    licenses: 500,
    annualCost: '$50,000',
    costPerUser: '$100',
    trend: '+2.5%',
  },
  {
    software: 'Adobe Creative Cloud',
    licenses: 100,
    annualCost: '$25,000',
    costPerUser: '$250',
    trend: '+5.0%',
  },
  {
    software: 'Atlassian Suite',
    licenses: 200,
    annualCost: '$30,000',
    costPerUser: '$150',
    trend: '-1.5%',
  },
];

export default function FinOps() {
  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          FinOps
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Export Report
          </Button>
          <Button variant="contained" startIcon={<TrendingUpIcon />}>
            Cost Analysis
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Cost Metrics */}
        {costMetrics.map((metric) => (
          <Grid item xs={12} md={4} key={metric.title}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {metric.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <Typography variant="h4" component="div">
                    {metric.value}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={metric.trend.startsWith('+') ? 'error.main' : 'success.main'}
                  >
                    {metric.trend}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {metric.period}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Top Spending Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Software Spending
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Software</TableCell>
                      <TableCell align="right">Licenses</TableCell>
                      <TableCell align="right">Annual Cost</TableCell>
                      <TableCell align="right">Cost per User</TableCell>
                      <TableCell align="right">YoY Trend</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topSpending.map((item) => (
                      <TableRow key={item.software}>
                        <TableCell component="th" scope="row">
                          {item.software}
                        </TableCell>
                        <TableCell align="right">{item.licenses}</TableCell>
                        <TableCell align="right">{item.annualCost}</TableCell>
                        <TableCell align="right">{item.costPerUser}</TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color: item.trend.startsWith('+')
                              ? 'error.main'
                              : 'success.main',
                          }}
                        >
                          {item.trend}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
