import React from 'react';
import { motion } from 'framer-motion';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { Stakeholder } from '../../stores/stakeholderStore';

const HexagonTile = styled(motion.div)<{ bgcolor: string }>`
  width: 120px;
  height: 120px;
  background-color: ${props => props.bgcolor};
  position: relative;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
    z-index: 2;
  }
`;

const DeleteButton = styled(IconButton)`
  position: absolute;
  bottom: 5px;
  padding: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 3;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const StakeholderName = styled('div')`
  color: white;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  padding: 0 10px;
  word-break: break-word;
  max-width: 90%;
  line-height: 1.2;
  margin-bottom: 5px;
`;

interface Props {
  stakeholder: Stakeholder;
  onDelete: (id: string) => void;
  style?: React.CSSProperties;
}

const StakeholderHexagon: React.FC<Props> = ({ stakeholder, onDelete, style }) => {
  return (
    <HexagonTile
      bgcolor={stakeholder.color}
      style={style}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <StakeholderName>{stakeholder.name}</StakeholderName>
      <DeleteButton 
        size="small" 
        onClick={(e) => {
          e.stopPropagation();
          onDelete(stakeholder.id);
        }}
      >
        <DeleteIcon sx={{ fontSize: '1rem', color: 'white' }} />
      </DeleteButton>
    </HexagonTile>
  );
};

export default StakeholderHexagon;
