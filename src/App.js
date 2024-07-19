import React, { useState, useRef } from 'react';
import { Container, Grid, Paper, Typography, Button, Box, MenuItem, Select, TextField, Card, CardContent, Avatar, Divider } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Line } from 'react-chartjs-2';
import Sidebar from './Sidebar'; // Assurez-vous que le chemin est correct
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Instagram from './Instagram';
import YouTube from './YouTube';
import Music from './Music';
import Twitter from './Twitter';
import Reddit from './Reddit';
import Favorites from './Favorites';
import Agency from './Agency';
import OnlyFans from './OnlyFans';
import ModelDetails from './ModelDetails';
import ChatterDetails from './ChatterDetails';
import VADetails from './VADetails';
import Jailbreak from './Jailbreak'; // Importer le composant Jailbreak
import Login from './Login'; // Importer le composant Login

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [platform, setPlatform] = useState('All');
  const [model, setModel] = useState('All');

  const followersRef = useRef(null);
  const likesRef = useRef(null);
  const viewsRef = useRef(null);
  const subsRef = useRef(null);
  const revenueRef = useRef(null);

  const handlePresetDateRange = (range) => {
    // Logique pour définir les plages de dates prédéfinies
  };

  const combinedData = {
    labels: ['2023-07-01', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05', '2023-07-06', '2023-07-07'],
    datasets: [
      {
        label: 'Followers',
        data: [200, 220, 250, 270, 300, 330, 350],
        borderColor: '#00b0f0',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Likes',
        data: [50, 55, 60, 65, 70, 75, 80],
        borderColor: '#ff6384',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Views',
        data: [100, 110, 120, 130, 140, 150, 160],
        borderColor: '#36a2eb',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Subs',
        data: [20, 25, 30, 35, 40, 45, 50],
        borderColor: '#cc65fe',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const revenueData = {
    labels: ['2023-07-01', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05', '2023-07-06', '2023-07-07'],
    datasets: [
      {
        label: 'Revenue',
        data: [1000, 1200, 1500, 1800, 2200, 2700, 3000],
        borderColor: '#f9c74f',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const followersData = {
    labels: ['2023-07-01', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05', '2023-07-06', '2023-07-07'],
    datasets: [
      {
        label: 'Followers',
        data: [200, 220, 250, 270, 300, 330, 350],
        borderColor: '#00b0f0',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const likesData = {
    labels: ['2023-07-01', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05', '2023-07-06', '2023-07-07'],
    datasets: [
      {
        label: 'Likes',
        data: [50, 55, 60, 65, 70, 75, 80],
        borderColor: '#ff6384',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const viewsData = {
    labels: ['2023-07-01', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05', '2023-07-06', '2023-07-07'],
    datasets: [
      {
        label: 'Views',
        data: [100, 110, 120, 130, 140, 150, 160],
        borderColor: '#36a2eb',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const subsData = {
    labels: ['2023-07-01', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05', '2023-07-06', '2023-07-07'],
    datasets: [
      {
        label: 'Subs',
        data: [20, 25, 30, 35, 40, 45, 50],
        borderColor: '#cc65fe',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: '#3d3d3d',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4" gutterBottom sx={{ color: '#fff' }}>
            Dashboard
          </Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePresetDateRange('24H')}
                sx={{ borderRadius: '20px', boxShadow: 3, mx: 1 }}
              >
                Today
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePresetDateRange('7D')}
                sx={{ borderRadius: '20px', boxShadow: 3, mx: 1 }}
              >
                This week
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePresetDateRange('1M')}
                sx={{ borderRadius: '20px', boxShadow: 3, mx: 1 }}
              >
                This month
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePresetDateRange('INCEPTION')}
                sx={{ borderRadius: '20px', boxShadow: 3, mx: 1 }}
              >
                All time
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} sx={{ input: { color: '#fff' }, svg: { color: '#fff' }, label: { color: '#fff' } }} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} sx={{ input: { color: '#fff' }, svg: { color: '#fff' }, label: { color: '#fff' } }} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <Select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Platform', style: { color: '#fff' } }}
            sx={{ minWidth: 120, color: '#fff', '& .MuiSelect-icon': { color: '#fff' } }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="YouTube">YouTube</MenuItem>
            <MenuItem value="Instagram">Instagram</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <Select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Model', style: { color: '#fff' } }}
            sx={{ minWidth: 120, color: '#fff', '& .MuiSelect-icon': { color: '#fff' } }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Model1">Model1</MenuItem>
            <MenuItem value="Model2">Model2</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Followers
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              910
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="subtitle1" sx={{ backgroundColor: 'green', color: '#fff', px: 1, borderRadius: 1 }}>
                5.00%
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Likes
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              455
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="subtitle1" sx={{ backgroundColor: 'green', color: '#fff', px: 1, borderRadius: 1 }}>
                10.26%
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Views
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              1820
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="subtitle1" sx={{ backgroundColor: 'green', color: '#fff', px: 1, borderRadius: 1 }}>
                5.00%
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Subs
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              175
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="subtitle1" sx={{ backgroundColor: 'green', color: '#fff', px: 1, borderRadius: 1 }}>
                8.15%
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Revenue
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              17,500 $
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="subtitle1" sx={{ backgroundColor: 'green', color: '#fff', px: 1, borderRadius: 1 }}>
                12.00%
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Combined Data
            </Typography>
            <Box sx={{ position: 'relative', height: 300 }}>
              <Line data={combinedData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Revenue
            </Typography>
            <Box sx={{ position: 'relative', height: 300 }}>
              <Line data={revenueData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Followers
            </Typography>
            <Box sx={{ position: 'relative', height: 200 }}>
              <Line data={followersData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Likes
            </Typography>
            <Box sx={{ position: 'relative', height: 200 }}>
              <Line data={likesData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Views
            </Typography>
            <Box sx={{ position: 'relative', height: 200 }}>
              <Line data={viewsData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Subs
            </Typography>
            <Box sx={{ position: 'relative', height: 200 }}>
              <Line data={subsData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const App = () => {
  return (
    <div style={{ backgroundColor: '#1e1e1e', minHeight: '100vh', padding: '20px', display: 'flex' }}>
      <Sidebar />
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/instagram" element={<Instagram />} />
          <Route path="/youtube" element={<YouTube />} />
          <Route path="/music" element={<Music />} />
          <Route path="/twitter" element={<Twitter />} />
          <Route path="/reddit" element={<Reddit />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/agency" element={<Agency />} />
          <Route path="/onlyfans" element={<OnlyFans />} />
          <Route path="/model/:id" element={<ModelDetails />} />
          <Route path="/chatter/:id" element={<ChatterDetails />} />
          <Route path="/va/:id" element={<VADetails />} />
          <Route path="/jailbreak" element={<Jailbreak />} /> {/* Ajouter la nouvelle route */}
          <Route path="/login" element={<Login />} /> {/* Ajouter la route pour la page de login */}
        </Routes>
      </Container>
    </div>
  );
};

export default App;
