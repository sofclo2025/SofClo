import React, { useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  LinearProgress,
  TextField,
  MenuItem,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSamProgramStore } from '../stores/samProgramStore';
import type { FormField, SamFormState } from '../stores/samProgramStore';
import { useSnackbarStore } from '../stores/snackbarStore';
import type { SnackbarMessage } from '../stores/snackbarStore';

type SectionKey = keyof SamFormState;
type FieldKey<T extends SectionKey> = keyof SamFormState[T];

const isFormField = (value: unknown): value is FormField => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'isCustom' in value &&
    'value' in value &&
    typeof (value as FormField).value === 'string'
  );
};

const SamProgramScope: React.FC = () => {
  const { formData, setField, setCustomMode, resetForm } = useSamProgramStore();
  const { messages, enqueueSnackbar, removeSnackbar } = useSnackbarStore();
  const inputRefs = useRef<{ [key: string]: HTMLInputElement }>({});

  const handleToggleCustom = <T extends SectionKey>(
    section: T,
    fieldKey: FieldKey<T>
  ) => {
    const fieldData = formData[section][fieldKey];
    if (isFormField(fieldData)) {
      setCustomMode(section, fieldKey as keyof SamFormState[T] & string, !fieldData.isCustom);
      setTimeout(() => {
        inputRefs.current[`${String(section)}.${String(fieldKey)}`]?.focus();
      }, 0);
    }
  };

  const handleDownload = () => {
    const jsonData = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sam-program-scope.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const validateForm = () => {
    const requiredSections: (keyof SamFormState)[] = ['governance', 'itAssets', 'computingEnvironment'];
    for (const section of requiredSections) {
      const sectionData = formData[section];
      for (const value of Object.values(sectionData)) {
        if (isFormField(value) && !value.value) {
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
      return;
    }

    console.log('Form submitted:', formData);
    enqueueSnackbar('Form submitted successfully!', { variant: 'success' });
    
    setTimeout(() => {
      resetForm();
    }, 2000);
  };

  const handleCloseSnackbar = (key: number) => {
    removeSnackbar(key);
  };

  const renderFormField = <T extends SectionKey>(
    section: T,
    fieldKey: FieldKey<T>,
    label: string
  ) => {
    const fieldData = formData[section][fieldKey];
    
    if (typeof fieldData === 'number') {
      return (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            {label}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LinearProgress
              variant="determinate"
              value={fieldData}
              sx={{ flexGrow: 1 }}
            />
            <Typography variant="body2">{fieldData}%</Typography>
          </Box>
        </Box>
      );
    }

    if (isFormField(fieldData)) {
      return (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            {label}
          </Typography>
          {fieldData.isCustom ? (
            <TextField
              fullWidth
              value={fieldData.value}
              onChange={(e) => setField(section, fieldKey, { ...fieldData, value: e.target.value })}
              inputRef={(el) => {
                if (el) {
                  inputRefs.current[`${String(section)}.${String(fieldKey)}`] = el;
                }
              }}
              size="small"
            />
          ) : (
            <TextField
              select
              fullWidth
              value={fieldData.value}
              onChange={(e) => setField(section, fieldKey, { ...fieldData, value: e.target.value })}
              size="small"
            >
              {fieldData.options?.map((option: string) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
          <Button
            size="small"
            onClick={() => handleToggleCustom(section, fieldKey)}
            sx={{ mt: 1 }}
          >
            {fieldData.isCustom ? 'Use Dropdown' : 'Custom Input'}
          </Button>
        </Box>
      );
    }

    return null;
  };

  const calculateSectionProgress = (section: SectionKey): number => {
    const sectionData = formData[section];
    let filledFields = 0;
    let totalFields = 0;

    Object.values(sectionData).forEach((field) => {
      if (isFormField(field)) {
        totalFields++;
        if (field.value) filledFields++;
      }
    });

    return totalFields ? (filledFields / totalFields) * 100 : 0;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black', mb: 4 }}>
            SAM Program Scope
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Governance
                </Typography>
                {renderFormField('governance', 'governingBodies', 'Governing Bodies')}
                {renderFormField('governance', 'businessObjectives', 'Business Objectives')}
                {renderFormField('governance', 'executiveBuyIn', 'Executive Buy-in')}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  IT Assets
                </Typography>
                {renderFormField('itAssets', 'assetsIncluded', 'IT Assets Included')}
                {renderFormField('itAssets', 'softwareType', 'Software Type')}
                {renderFormField('itAssets', 'softwareMetrics', 'Software Metrics')}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Computing Environment
                </Typography>
                {renderFormField('computingEnvironment', 'platformsIncluded', 'Platforms Included')}
                {renderFormField('computingEnvironment', 'operatingSystems', 'Operating Systems')}
                {renderFormField('computingEnvironment', 'systemsNotIncluded', 'Systems Not Included')}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Organizations & Regions
                </Typography>
                {renderFormField('organizationsRegions', 'organizationsIncluded', 'Organizations Included')}
                {renderFormField('organizationsRegions', 'regionsIncluded', 'Regions Included')}
                {renderFormField('organizationsRegions', 'regionsNotIncluded', 'Regions Not Included')}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Contacts
                </Typography>
                {renderFormField('contacts', 'mainContacts', 'Main Contacts')}
                {renderFormField('contacts', 'contactsNotIncluded', 'Contacts Not Included')}
                {renderFormField('contacts', 'majorStakeholders', 'Major Stakeholders')}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Tools
                </Typography>
                {renderFormField('tools', 'samTools', 'SAM Tools')}
                {renderFormField('tools', 'itTools', 'IT Tools')}
                {renderFormField('tools', 'itilIntegration', 'ITIL Integration')}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Inventory Coverage
                </Typography>
                {renderFormField('inventoryCoverage', 'serverCoverage', 'Server Coverage')}
                {renderFormField('inventoryCoverage', 'serversExcluded', 'Servers Excluded')}
                {renderFormField('inventoryCoverage', 'clientCoverage', 'Client Coverage')}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Software Categories
                </Typography>
                {renderFormField('softwareCategories', 'softwareIncluded', 'Software Included')}
                {renderFormField('softwareCategories', 'softwareNotIncluded', 'Software Not Included')}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Software Tiers
                </Typography>
                {renderFormField('softwareTiers', 'tier1Definition', 'Tier 1 Definition')}
                {renderFormField('softwareTiers', 'tier2Definition', 'Tier 2 Definition')}
                {renderFormField('softwareTiers', 'tier3Definition', 'Tier 3 Definition')}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Stakeholder Management
                </Typography>
                {renderFormField('stakeholderManagement', 'temporaryStakeholders', 'Temporary Stakeholders')}
                {renderFormField('stakeholderManagement', 'communications', 'Communications')}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Initiatives
                </Typography>
                {renderFormField('initiatives', 'goals', 'Goals')}
                {renderFormField('initiatives', 'initialInitiatives', 'Initial Initiatives')}
                {renderFormField('initiatives', 'longTermInitiatives', 'Long Term Initiatives')}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<RestartAltIcon />}
              onClick={resetForm}
              sx={{ bgcolor: 'grey.300' }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              onClick={handleDownload}
              sx={{ bgcolor: 'blue.500' }}
            >
              Download
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              onClick={handleSubmit}
              sx={{ bgcolor: 'purple.500', color: 'white' }}
            >
              Submit
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            width: 240,
            p: 2,
            position: 'sticky',
            top: 24,
            background: 'transparent',
            ml: 6,
            mt: 8,
          }}
        >
          <Box sx={{ position: 'relative' }}>
            {(Object.keys(formData) as SectionKey[]).map((section, index, array) => {
              const progress = calculateSectionProgress(section);
              const isComplete = progress === 100;
              const isActive = progress > 0;
              const isLast = index === array.length - 1;

              return (
                <Box 
                  key={section} 
                  sx={{ 
                    mb: isLast ? 0 : 12, 
                    position: 'relative',
                    height: '80px', 
                  }}
                >
                  {!isLast && (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 12,
                        top: 24,
                        height: '92px', 
                        width: 2,
                        background: isComplete 
                          ? 'linear-gradient(180deg, #3f51b5 0%, #3f51b5 100%)'
                          : isActive
                          ? 'linear-gradient(180deg, #3f51b5 0%, rgba(63, 81, 181, 0.2) 100%)'
                          : 'rgba(63, 81, 181, 0.1)',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        background: isComplete 
                          ? 'radial-gradient(circle, #3f51b5 30%, #3f51b5 100%)'
                          : isActive
                          ? 'radial-gradient(circle, #3f51b5 30%, rgba(63, 81, 181, 0.2) 100%)'
                          : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'all 0.3s ease',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#3f51b5',
                          opacity: isActive ? 1 : 0.3,
                        },
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: isActive ? 'primary.main' : 'text.secondary',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {section.replace(/([A-Z])/g, ' $1').trim()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {messages.map((message: SnackbarMessage) => (
        <Snackbar
          key={message.key}
          open={true}
          autoHideDuration={6000}
          onClose={() => handleCloseSnackbar(message.key)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => handleCloseSnackbar(message.key)} severity={message.variant} sx={{ width: '100%' }}>
            {message.message}
          </Alert>
        </Snackbar>
      ))}
    </Container>
  );
};

export default SamProgramScope;
