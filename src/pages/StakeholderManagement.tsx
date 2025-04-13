import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  styled,
  Alert,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import pptxgen from 'pptxgenjs';
import StakeholderHexagon from '../components/stakeholders/StakeholderHexagon';
import { useStakeholderStore } from '../stores/stakeholderStore';

const StyledContainer = styled(Container)`
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HexagonGrid = styled(Box)`
  position: relative;
  width: 800px;
  height: 600px;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterHexagon = styled(motion.div)`
  width: 180px;
  height: 180px;
  background: #1976d2;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 1rem;
  font-weight: bold;
  position: absolute;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Form = styled('form')`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 600px;
  align-items: center;
`;

const StyledButton = styled(Button)`
  height: 40px;
  min-width: 120px;
  white-space: nowrap;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterText = styled(Typography)`
  font-size: 1.2rem;
  line-height: 1.3;
  max-width: 140px;
  word-wrap: break-word;
`;

const AlertContainer = styled(Box)`
  width: 100%;
  max-width: 600px;
  margin-bottom: 1rem;
`;

const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 600px;
  justify-content: space-between;
`;

const ButtonGroup = styled(Box)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const DEFAULT_STAKEHOLDERS = [
  { name: 'IDE Team (SAM Pro)', color: '#dc3545' },
  { name: 'FinOps Team', color: '#6f42c1' },
  { name: 'Commercial Advisors', color: '#fd7e14' },
  { name: 'Controller Function', color: '#8b9d5a' },
  { name: 'Product Owners', color: '#198754' },
  { name: 'Tech Move', color: '#20c997' },
  { name: 'Development Team', color: '#0dcaf0' },
  { name: 'QA Team', color: '#6610f2' },
  { name: 'DevOps Team', color: '#d63384' },
  { name: 'Security Team', color: '#fd7e14' },
];

const getRandomColor = () => {
  const colors = ['#dc3545', '#6f42c1', '#fd7e14', '#8b9d5a', '#198754', '#20c997'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const calculatePosition = (index: number, total: number, radius: number = 250) => {
  const angle = ((2 * Math.PI) / total) * index - Math.PI / 2;
  return {
    left: `calc(50% + ${radius * Math.cos(angle)}px - 60px)`,
    top: `calc(50% + ${radius * Math.sin(angle)}px - 60px)`,
    position: 'absolute' as const,
  };
};

const MAX_STAKEHOLDERS = 10;

const StakeholderManagement: React.FC = () => {
  const [newStakeholderName, setNewStakeholderName] = useState('');
  const [showMaxAlert, setShowMaxAlert] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { stakeholders, addStakeholder, removeStakeholder, resetStakeholders } = useStakeholderStore();
  const hexagonGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stakeholders.length === 0) {
      DEFAULT_STAKEHOLDERS.forEach(s => {
        addStakeholder(s.name, s.color);
      });
    }
  }, [addStakeholder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stakeholders.length >= MAX_STAKEHOLDERS) {
      setShowMaxAlert(true);
      setTimeout(() => setShowMaxAlert(false), 3000);
      return;
    }
    if (newStakeholderName.trim()) {
      const color = getRandomColor();
      addStakeholder(newStakeholderName.trim(), color);
      setNewStakeholderName('');
    }
  };

  const handleReset = () => {
    resetStakeholders();
    DEFAULT_STAKEHOLDERS.forEach(s => {
      addStakeholder(s.name, s.color);
    });
  };

  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setAnchorEl(null);
  };

  const exportToPDF = async () => {
    if (hexagonGridRef.current) {
      const canvas = await html2canvas(hexagonGridRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('stakeholder-map.pdf');
    }
    handleExportClose();
  };

  const exportToPPT = async () => {
    if (hexagonGridRef.current) {
      const pptx = new pptxgen();
      const canvas = await html2canvas(hexagonGridRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const slide = pptx.addSlide();
      
      // Add title
      slide.addText("Stakeholder Management", {
        x: 0.5,
        y: 0.5,
        fontSize: 24,
        bold: true,
      });
      
      // Add the stakeholder map image
      const imgData = canvas.toDataURL('image/png');
      slide.addImage({
        data: imgData,
        x: 0.5,
        y: 1,
        w: 9,
        h: 5,
      });
      
      await pptx.writeFile({ fileName: 'stakeholder-map.pptx' });
    }
    handleExportClose();
  };

  const radius = Math.max(250, stakeholders.length * 20);

  return (
    <StyledContainer>
      <HeaderContainer>
        <Typography variant="h4">
          Stakeholder Management
        </Typography>
        <ButtonGroup>
          <Tooltip title="Reset to default stakeholders">
            <IconButton onClick={handleReset} color="primary" size="large">
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export">
            <IconButton onClick={handleExportClick} color="primary" size="large">
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleExportClose}
          >
            <MenuItem onClick={exportToPDF}>
              <ListItemIcon>
                <PictureAsPdfIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Export as PDF</ListItemText>
            </MenuItem>
            <MenuItem onClick={exportToPPT}>
              <ListItemIcon>
                <SlideshowIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Export as PowerPoint</ListItemText>
            </MenuItem>
          </Menu>
        </ButtonGroup>
      </HeaderContainer>

      {showMaxAlert && (
        <AlertContainer>
          <Alert severity="warning" onClose={() => setShowMaxAlert(false)}>
            Maximum limit of {MAX_STAKEHOLDERS} stakeholders reached
          </Alert>
        </AlertContainer>
      )}

      <Form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          value={newStakeholderName}
          onChange={(e) => setNewStakeholderName(e.target.value)}
          placeholder="Enter stakeholder name"
          variant="outlined"
          size="small"
          sx={{ height: '40px' }}
          disabled={stakeholders.length >= MAX_STAKEHOLDERS}
        />
        <StyledButton 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={stakeholders.length >= MAX_STAKEHOLDERS}
        >
          Add Stakeholder
        </StyledButton>
      </Form>

      <HexagonGrid ref={hexagonGridRef}>
        <CenterHexagon
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CenterText variant="h6">
            Software Asset Management
          </CenterText>
        </CenterHexagon>

        <AnimatePresence mode="popLayout">
          {stakeholders.map((stakeholder, index) => (
            <StakeholderHexagon
              key={stakeholder.id}
              stakeholder={stakeholder}
              onDelete={removeStakeholder}
              style={{
                ...calculatePosition(index, stakeholders.length, radius),
                transition: 'all 0.5s ease-in-out',
              }}
            />
          ))}
        </AnimatePresence>
      </HexagonGrid>
    </StyledContainer>
  );
};

export default StakeholderManagement;
