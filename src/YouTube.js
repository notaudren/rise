import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, Box, Select, MenuItem, TextField, List, ListItem, ListItemText, IconButton, InputLabel, FormControl, Link } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Line } from 'react-chartjs-2';
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
import { addDays, subDays } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import YouTubeIcon from '@mui/icons-material/YouTube';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const YouTube = () => {
  const [model, setModel] = useState('Model1');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [username, setUsername] = useState('');
  const [channels, setChannels] = useState([]);
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [difference, setDifference] = useState({
    subscribers: 0,
    likes: 0,
    views: 0,
  });

  useEffect(() => {
    updateData();
    updateDifference();
  }, [channels, startDate, endDate]);

  const handleAddChannel = () => {
    if (username) {
      setChannels([...channels, { username, subscribers: Math.floor(Math.random() * 1000), likes: Math.floor(Math.random() * 500), views: Math.floor(Math.random() * 2000), status: 'ONLINE' }]);
      setUsername('');
    }
  };

  const handleDeleteChannel = (username) => {
    setChannels(channels.filter(channel => channel.username !== username));
  };

  const handleStatusChange = (username, newStatus) => {
    setChannels(channels.map(channel => channel.username === username ? { ...channel, status: newStatus } : channel));
  };

  const handlePresetDateRange = (range) => {
    const now = new Date();
    switch (range) {
      case '24H':
        setStartDate(subDays(now, 1));
        setEndDate(now);
        break;
      case '7D':
        setStartDate(subDays(now, 7));
        setEndDate(now);
        break;
      case '1M':
        setStartDate(subDays(now, 30));
        setEndDate(now);
        break;
      case 'INCEPTION':
        setStartDate(null);
        setEndDate(now);
        break;
      default:
        setStartDate(null);
        setEndDate(null);
    }
  };

  const updateData = () => {
    const labels = ['2023-07-01', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05', '2023-07-06', '2023-07-07'];
    const subscribersData = channels.map(channel => channel.subscribers);
    const likesData = channels.map(channel => channel.likes);
    const viewsData = channels.map(channel => channel.views);

    setData({
      labels,
      datasets: [
        {
          label: 'Subscribers',
          data: subscribersData,
          borderColor: '#FF0000',
          fill: false,
          tension: 0.4,
        },
        {
          label: 'Likes',
          data: likesData,
          borderColor: '#ff6384',
          fill: false,
          tension: 0.4,
        },
        {
          label: 'Views',
          data: viewsData,
          borderColor: '#36a2eb',
          fill: false,
          tension: 0.4,
        },
      ],
    });
  };

  const updateDifference = () => {
    const previousWeek = channels.map(channel => ({
      ...channel,
      subscribers: channel.subscribers - Math.floor(Math.random() * 100),
      likes: channel.likes - Math.floor(Math.random() * 50),
      views: channel.views - Math.floor(Math.random() * 200),
    }));

    const totalCurrentSubscribers = channels.reduce((acc, channel) => acc + channel.subscribers, 0);
    const totalPreviousSubscribers = previousWeek.reduce((acc, channel) => acc + channel.subscribers, 0);

    const totalCurrentLikes = channels.reduce((acc, channel) => acc + channel.likes, 0);
    const totalPreviousLikes = previousWeek.reduce((acc, channel) => acc + channel.likes, 0);

    const totalCurrentViews = channels.reduce((acc, channel) => acc + channel.views, 0);
    const totalPreviousViews = previousWeek.reduce((acc, channel) => acc + channel.views, 0);

    setDifference({
      subscribers: totalCurrentSubscribers - totalPreviousSubscribers,
      likes: totalCurrentLikes - totalPreviousLikes,
      views: totalCurrentViews - totalPreviousViews,
    });
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
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#fff', mr: 2 }}>
          YouTube Statistics
        </Typography>
        <YouTubeIcon fontSize="large" sx={{ color: '#FF0000' }} />
      </Box>
      <Box sx={{ mb: 3 }}>
        <Select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Model', style: { color: '#fff' } }}
          sx={{ minWidth: 120, color: '#fff', '& .MuiSelect-icon': { color: '#fff' } }}
        >
          <MenuItem value="Model1">Model1</MenuItem>
          <MenuItem value="Model2">Model2</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Total Channels
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              {channels.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Total Subscribers
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              {channels.reduce((acc, channel) => acc + channel.subscribers, 0)}
              <Box component="span" sx={{ color: 'green', ml: 1 }}>
                (+{difference.subscribers})
              </Box>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Total Likes
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              {channels.reduce((acc, channel) => acc + channel.likes, 0)}
              <Box component="span" sx={{ color: 'green', ml: 1 }}>
                (+{difference.likes})
              </Box>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Total Views
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              {channels.reduce((acc, channel) => acc + channel.views, 0)}
              <Box component="span" sx={{ color: 'green', ml: 1 }}>
                (+{difference.views})
              </Box>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 3 }}>
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
        <Grid item sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ input: { color: '#fff' }, label: { color: '#fff' }, flexGrow: 1 }}
          />
          <Button onClick={handleAddChannel} variant="contained" color="primary" sx={{ ml: 2 }}>
            Add Channel
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 3 }}>
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
      <Box sx={{ mb: 3 }}>
        <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2 }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            Channel Overview
          </Typography>
          <Box sx={{ position: 'relative', height: 300 }}>
            <Line data={data} options={chartOptions} />
          </Box>
        </Paper>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
          YouTube Channels
        </Typography>
        <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2 }}>
          <List>
            {channels.map((channel, index) => (
              <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff', fontWeight: 'bold' }}>
                <ListItemText
                  primary={
                    <Link href={`https://www.youtube.com/@${channel.username}`} target="_blank" rel="noopener noreferrer" sx={{ color: 'blue', fontWeight: 'bold', textDecoration: 'none' }}>
                      {channel.username}
                    </Link>
                  }
                  sx={{ flex: 1, minWidth: '100px' }}
                />
                <ListItemText primary={`Subscribers: ${channel.subscribers}`} sx={{ flex: 1, minWidth: '100px', textAlign: 'center' }} />
                <ListItemText primary={`Likes: ${channel.likes}`} sx={{ flex: 1, minWidth: '100px', textAlign: 'center' }} />
                <ListItemText primary={`Views: ${channel.views}`} sx={{ flex: 1, minWidth: '100px', textAlign: 'center' }} />
                <FormControl sx={{ flex: 1, minWidth: '100px' }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={channel.status}
                    label="Status"
                    onChange={(e) => handleStatusChange(channel.username, e.target.value)}
                    sx={{
                      backgroundColor: channel.status === 'ONLINE' ? 'green' : channel.status === 'WARMUP' ? 'blue' : 'red',
                      color: '#fff',
                      '& .MuiSelect-icon': { color: '#fff' }
                    }}
                  >
                    <MenuItem value="ONLINE" sx={{ backgroundColor: 'green', color: '#fff' }}>ONLINE</MenuItem>
                    <MenuItem value="WARMUP" sx={{ backgroundColor: 'blue', color: '#fff' }}>WARMUP</MenuItem>
                    <MenuItem value="BAN" sx={{ backgroundColor: 'red', color: '#fff' }}>BAN</MenuItem>
                  </Select>
                </FormControl>
                <IconButton onClick={() => handleDeleteChannel(channel.username)} sx={{ color: '#fff', ml: 2 }}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default YouTube;
