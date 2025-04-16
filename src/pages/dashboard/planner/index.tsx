import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Tab,
  Tabs,
  Paper,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Grid,
  Menu,
  MenuItem as MuiMenuItem,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { usePlannerStore, Initiative, Status } from '../../../stores/plannerStore';
import InitialData from './InitialData';
import InitiativeDialog from './InitiativeDialog';
import NewInitiativeDialog from './NewInitiativeDialog';

const statusColors = {
  not_started: '#e0e0e0',
  in_progress: '#2196f3',
  review: '#ff9800',
  completed: '#4caf50',
};

const priorityColors = {
  high: '#f44336',
  medium: '#ff9800',
  low: '#4caf50',
};

const PlannerDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('all');
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [cardMenuAnchor, setCardMenuAnchor] = useState<{ element: HTMLElement; initiative: Initiative } | null>(null);
  const [editingObjective, setEditingObjective] = useState<string | null>(null);
  const [newObjectiveText, setNewObjectiveText] = useState('');

  const {
    initiatives,
    businessObjectives,
    moveInitiative,
    updateInitiative,
    addInitiative,
    removeInitiative,
    addBusinessObjective,
    updateBusinessObjective,
    removeBusinessObjective,
  } = usePlannerStore();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceStatus = result.source.droppableId as Status;
    const destinationStatus = result.destination.droppableId as Status;
    const initiativeId = result.draggableId;

    if (sourceStatus !== destinationStatus) {
      moveInitiative(initiativeId, destinationStatus);
    }
  };

  const handleInitiativeClick = (initiative: Initiative) => {
    setSelectedInitiative(initiative);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedInitiative(null);
  };

  const handleInitiativeSave = (updatedInitiative: Initiative) => {
    updateInitiative(updatedInitiative.id, updatedInitiative);
  };

  const handleInitiativeDelete = (initiative: Initiative) => {
    removeInitiative(initiative.id);
  };

  const handleInitiativeStatusChange = (initiative: Initiative, newStatus: Status) => {
    moveInitiative(initiative.id, newStatus);
  };

  const handleAddClick = () => {
    setNewDialogOpen(true);
  };

  const handleNewDialogClose = () => {
    setNewDialogOpen(false);
  };

  const handleNewInitiativeAdd = (initiative: Omit<Initiative, 'id' | 'createdAt'>) => {
    addInitiative(initiative);
  };

  const handleCardMenuOpen = (event: React.MouseEvent<HTMLElement>, initiative: Initiative) => {
    event.stopPropagation();
    setCardMenuAnchor({ element: event.currentTarget, initiative });
  };

  const handleCardMenuClose = () => {
    setCardMenuAnchor(null);
  };

  const handleQuickStatusChange = (newStatus: Status) => {
    if (cardMenuAnchor) {
      moveInitiative(cardMenuAnchor.initiative.id, newStatus);
      handleCardMenuClose();
    }
  };

  const handleQuickDelete = () => {
    if (cardMenuAnchor) {
      removeInitiative(cardMenuAnchor.initiative.id);
      handleCardMenuClose();
    }
  };

  const filteredInitiatives = initiatives.filter((initiative) => {
    if (selectedYear !== 'all' && initiative.year.toString() !== selectedYear) return false;
    if (selectedQuarter !== 'all' && initiative.quarter !== selectedQuarter) return false;
    return true;
  });

  const stats = {
    total: initiatives.length,
    completed: initiatives.filter((i) => i.status === 'completed').length,
    inProgress: initiatives.filter((i) => i.status === 'in_progress').length,
    notStarted: initiatives.filter((i) => i.status === 'not_started').length,
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <InitialData />
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">SAM Program</Typography>
        <Button variant="contained" startIcon={<DownloadIcon />}>
          Export Report
        </Button>
      </Box>

      <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 4 }}>
        <Tab label="Initiatives Board" />
        <Tab label="Program Overview" />
        <Tab label="Quarterly Plans" />
        <Tab label="Reports" />
      </Tabs>

      {selectedTab === 0 && (
        <>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Business Objectives</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Add new objective"
                  value={newObjectiveText}
                  onChange={(e) => setNewObjectiveText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newObjectiveText.trim()) {
                      addBusinessObjective(newObjectiveText.trim());
                      setNewObjectiveText('');
                    }
                  }}
                />
                <Button
                  variant="contained"
                  size="small"
                  disabled={!newObjectiveText.trim()}
                  onClick={() => {
                    if (newObjectiveText.trim()) {
                      addBusinessObjective(newObjectiveText.trim());
                      setNewObjectiveText('');
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>
            <Grid container spacing={2}>
              {businessObjectives.map((objective) => (
                <Grid item xs={12} md={6} key={objective.id}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      {objective.order}.{' '}
                      {editingObjective === objective.id ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={objective.text}
                          autoFocus
                          onBlur={() => setEditingObjective(null)}
                          onChange={(e) =>
                            updateBusinessObjective(objective.id, e.target.value)
                          }
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              setEditingObjective(null);
                            }
                          }}
                        />
                      ) : (
                        <Box
                          onClick={() => setEditingObjective(objective.id)}
                          sx={{ flex: 1, cursor: 'pointer' }}
                        >
                          {objective.text}
                        </Box>
                      )}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => removeBusinessObjective(objective.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">SAM Program Initiatives</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Select
                size="small"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                sx={{ minWidth: 100 }}
              >
                <MenuItem value="all">All Years</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
              </Select>
              <Select
                size="small"
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="all">All Quarters</MenuItem>
                <MenuItem value="Q1">Q1</MenuItem>
                <MenuItem value="Q2">Q2</MenuItem>
                <MenuItem value="Q3">Q3</MenuItem>
                <MenuItem value="Q4">Q4</MenuItem>
              </Select>
              <IconButton>
                <FilterListIcon />
              </IconButton>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddClick}>
                Add Initiative
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Initiatives
                  </Typography>
                  <Typography variant="h4">{stats.total}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Completed
                  </Typography>
                  <Typography variant="h4">{stats.completed}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    In Progress
                  </Typography>
                  <Typography variant="h4">{stats.inProgress}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Not Started
                  </Typography>
                  <Typography variant="h4">{stats.notStarted}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Grid container spacing={2}>
              {(['not_started', 'in_progress', 'review', 'completed'] as Status[]).map((status) => (
                <Grid item xs={12} md={3} key={status}>
                  <Paper
                    sx={{
                      p: 2,
                      height: '100%',
                      backgroundColor: '#f5f5f5',
                      borderTop: `3px solid ${statusColors[status]}`,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize' }}>
                      {status.replace('_', ' ')}
                      <Chip
                        label={
                          filteredInitiatives.filter((i) => i.status === status).length
                        }
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                    <Droppable droppableId={status}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 200 }}
                        >
                          {filteredInitiatives
                            .filter((initiative) => initiative.status === status)
                            .map((initiative, index) => (
                              <Draggable
                                key={initiative.id}
                                draggableId={initiative.id}
                                index={index}
                              >
                                {(provided) => (
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => handleInitiativeClick(initiative)}
                                  >
                                    <CardContent>
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Box sx={{ flex: 1 }}>
                                          <Typography variant="subtitle1" gutterBottom>
                                            {initiative.title}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            noWrap
                                          >
                                            {initiative.description}
                                          </Typography>
                                        </Box>
                                        <IconButton
                                          size="small"
                                          onClick={(e) => handleCardMenuOpen(e, initiative)}
                                          sx={{ ml: 1 }}
                                        >
                                          <MoreVertIcon />
                                        </IconButton>
                                      </Box>
                                      <Box sx={{ mt: 2 }}>
                                        <LinearProgress
                                          variant="determinate"
                                          value={initiative.progress}
                                          sx={{ mb: 1 }}
                                        />
                                        <Box
                                          sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                          }}
                                        >
                                          <Chip
                                            label={initiative.priority}
                                            size="small"
                                            sx={{
                                              backgroundColor:
                                                priorityColors[initiative.priority],
                                              color: 'white',
                                            }}
                                          />
                                          <Typography variant="caption">
                                            {initiative.quarter} {initiative.year}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </Box>
                      )}
                    </Droppable>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </DragDropContext>
        </>
      )}

      <Menu
        anchorEl={cardMenuAnchor?.element}
        open={Boolean(cardMenuAnchor)}
        onClose={handleCardMenuClose}
      >
        <MuiMenuItem onClick={() => handleQuickStatusChange('not_started')}>
          Move to Not Started
        </MuiMenuItem>
        <MuiMenuItem onClick={() => handleQuickStatusChange('in_progress')}>
          Move to In Progress
        </MuiMenuItem>
        <MuiMenuItem onClick={() => handleQuickStatusChange('review')}>
          Move to Review
        </MuiMenuItem>
        <MuiMenuItem onClick={() => handleQuickStatusChange('completed')}>
          Move to Completed
        </MuiMenuItem>
        <MuiMenuItem onClick={handleQuickDelete} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete Initiative
        </MuiMenuItem>
      </Menu>

      <InitiativeDialog
        open={dialogOpen}
        initiative={selectedInitiative}
        onClose={handleDialogClose}
        onSave={handleInitiativeSave}
        onDelete={handleInitiativeDelete}
        onStatusChange={handleInitiativeStatusChange}
      />

      <NewInitiativeDialog
        open={newDialogOpen}
        onClose={handleNewDialogClose}
        onAdd={handleNewInitiativeAdd}
      />
    </Container>
  );
};

export default PlannerDashboard;
