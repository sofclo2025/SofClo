import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { toast } from 'sonner';

interface FormData {
  name: string;
  industry: string;
  size: string;
  country: string;
  description: string;
}

const initialFormData: FormData = {
  name: '',
  industry: '',
  size: '',
  country: '',
  description: '',
};

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Other',
];

const companySizes = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+',
];

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'India',
  'Other',
];

export default function OrganizationSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSelectChange = (field: keyof FormData) => (
    event: SelectChangeEvent
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      if (!formData.name || !formData.industry || !formData.size || !formData.country) {
        throw new Error('Please fill in all required fields');
      }

      // TODO: Save organization data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      toast.success('Organization setup completed');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error setting up organization:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to set up organization');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.default' }}>
        <Typography variant="h5" gutterBottom color="primary">
          Organization Setup
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Set up your organization profile to get started.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Organization Name</FormLabel>
              <TextField
                fullWidth
                placeholder="Enter your organization name"
                value={formData.name}
                onChange={handleInputChange('name')}
                sx={{ mt: 1 }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel>Industry</FormLabel>
              <Select
                value={formData.industry}
                onChange={handleSelectChange('industry')}
                displayEmpty
                sx={{ mt: 1 }}
              >
                <MenuItem value="" disabled>
                  Select an industry
                </MenuItem>
                {industries.map(industry => (
                  <MenuItem key={industry} value={industry}>
                    {industry}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel>Company Size</FormLabel>
              <Select
                value={formData.size}
                onChange={handleSelectChange('size')}
                displayEmpty
                sx={{ mt: 1 }}
              >
                <MenuItem value="" disabled>
                  Select size
                </MenuItem>
                {companySizes.map(size => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Country</FormLabel>
              <Select
                value={formData.country}
                onChange={handleSelectChange('country')}
                displayEmpty
                sx={{ mt: 1 }}
              >
                <MenuItem value="" disabled>
                  Select country
                </MenuItem>
                {countries.map(country => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Description</FormLabel>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Describe your organization"
                value={formData.description}
                onChange={handleInputChange('description')}
                sx={{ mt: 1 }}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            Complete Setup
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            Skip for Now
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
