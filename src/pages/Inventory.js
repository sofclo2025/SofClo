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
  Chip,
} from '@mui/material';
import { Add as AddIcon, FilterList as FilterListIcon } from '@mui/icons-material';

const softwareInventory = [
  {
    id: 1,
    name: 'Microsoft Office 365',
    licenses: 500,
    used: 423,
    status: 'Compliant',
    expiryDate: '2025-12-31',
    cost: '$50,000',
  },
  {
    id: 2,
    name: 'Adobe Creative Cloud',
    licenses: 100,
    used: 98,
    status: 'Warning',
    expiryDate: '2025-03-15',
    cost: '$25,000',
  },
  {
    id: 3,
    name: 'Atlassian Suite',
    licenses: 200,
    used: 150,
    status: 'Compliant',
    expiryDate: '2025-06-30',
    cost: '$30,000',
  },
];

export default function Inventory() {
  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Software Inventory
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<FilterListIcon />}>
            Filter
          </Button>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Software
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Software Name</TableCell>
                      <TableCell align="right">Total Licenses</TableCell>
                      <TableCell align="right">Used Licenses</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Expiry Date</TableCell>
                      <TableCell align="right">Annual Cost</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {softwareInventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell align="right">{item.licenses}</TableCell>
                        <TableCell align="right">{item.used}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            color={item.status === 'Compliant' ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{item.expiryDate}</TableCell>
                        <TableCell align="right">{item.cost}</TableCell>
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
