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
import TwitterIcon from '@mui/icons-material/Twitter';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Twitter = () => {
  const [model, setModel] = useState('Model1');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [username, setUsername] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [difference, setDifference] = useState({
    followers: 0,
    likes: 0,
    views: 0,
  });

  useEffect(() => {
    updateData();
    updateDifference();
  }, [accounts, startDate, endDate]);

  const handleAddAccount = () => {
    if (username) {
      setAccounts([...accounts, { username, followers: Math.floor(Math.random() * 1000), likes: Math.floor(Math.random() * 500), views: Math.floor(Math.random() * 2000), status: 'ONLINE' }]);
      setUsername('');
    }
  };

  const handleDeleteAccount = (username) => {
    setAccounts(accounts.filter(account => account.username !== username));
  };

  const handleStatusChange = (username, newStatus) => {
    setAccounts(accounts.map(account => account.username === username ? { ...account, status: newStatus } : account));
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
    const followersData = accounts.map(account => account.followers);
    const likesData = accounts.map(account => account.likes);
    const viewsData = accounts.map(account => account.views);

    setData({
      labels,
      datasets: [
        {
          label: 'Followers',
          data: followersData,
          borderColor: '#1DA1F2',
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
    const previousWeek = accounts.map(account => ({
      ...account,
      followers: account.followers - Math.floor(Math.random() * 100),
      likes: account.likes - Math.floor(Math.random() * 50),
      views: account.views - Math.floor(Math.random() * 200),
    }));

    const totalCurrentFollowers = accounts.reduce((acc, account) => acc + account.followers, 0);
    const totalPreviousFollowers = previousWeek.reduce((acc, account) => acc + account.followers, 0);

    const totalCurrentLikes = accounts.reduce((acc, account) => acc + account.likes, 0);
    const totalPreviousLikes = previousWeek.reduce((acc, account) => acc + account.likes, 0);

    const totalCurrentViews = accounts.reduce((acc, account) => acc + account.views, 0);
    const totalPreviousViews = previousWeek.reduce((acc, account) => acc + account.views, 0);

    setDifference({
      followers: totalCurrentFollowers - totalPreviousFollowers,
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
          Twitter Statistics
        </Typography>
        <TwitterIcon fontSize="large" sx={{ color: '#1DA1F2' }} />
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
              Total Accounts
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              {accounts.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Total Followers
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              {accounts.reduce((acc, account) => acc + account.followers, 0)}
              <Box component="span" sx={{ color: 'green', ml: 1 }}>
                (+{difference.followers})
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
              {accounts.reduce((acc, account) => acc + account.likes, 0)}
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
              {accounts.reduce((acc, account) => acc + account.views, 0)}
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
          <Button onClick={handleAddAccount} variant="contained" color="primary" sx={{ ml: 2 }}>
            Add Account
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
            Account Overview
          </Typography>
          <Box sx={{ position: 'relative', height: 300 }}>
            <Line data={data} options={chartOptions} />
          </Box>
        </Paper>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
          Twitter Accounts
        </Typography>
        <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2 }}>
          <List>
            {accounts.map((account, index) => (
              <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff', fontWeight: 'bold' }}>
                <ListItemText
                  primary={
                    <Link href={`https://x.com/${account.username}`} target="_blank" rel="noopener noreferrer" sx={{ color: 'blue', fontWeight: 'bold', textDecoration: 'none' }}>
                      {account.username}
                    </Link>
                  }
                  sx={{ flex: 1, minWidth: '100px' }}
                />
                <ListItemText primary={`Followers: ${account.followers}`} sx={{ flex: 1, minWidth: '100px', textAlign: 'center' }} />
                <ListItemText primary={`Likes: ${account.likes}`} sx={{ flex: 1, minWidth: '100px', textAlign: 'center' }} />
                <ListItemText primary={`Views: ${account.views}`} sx={{ flex: 1, minWidth: '100px', textAlign: 'center' }} />
                <FormControl sx={{ flex: 1, minWidth: '100px' }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={account.status}
                    label="Status"
                    onChange={(e) => handleStatusChange(account.username, e.target.value)}
                    sx={{
                      backgroundColor: account.status === 'ONLINE' ? 'green' : account.status === 'WARMUP' ? 'blue' : 'red',
                      color: '#fff',
                      '& .MuiSelect-icon': { color: '#fff' }
                    }}
                  >
                    <MenuItem value="ONLINE" sx={{ backgroundColor: 'green', color: '#fff' }}>ONLINE</MenuItem>
                    <MenuItem value="WARMUP" sx={{ backgroundColor: 'blue', color: '#fff' }}>WARMUP</MenuItem>
                    <MenuItem value="BAN" sx={{ backgroundColor: 'red', color: '#fff' }}>BAN</MenuItem>
                  </Select>
                </FormControl>
                <IconButton onClick={() => handleDeleteAccount(account.username)} sx={{ color: '#fff', ml: 2 }}>
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

export default Twitter;
