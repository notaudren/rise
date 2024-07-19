import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Paper, Typography, Button, Box, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField, List, ListItem } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ChatterDetails = () => {
  const { id } = useParams();
  const [chatter, setChatter] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [lastPayment, setLastPayment] = useState('');
  const [invoiceDateRange, setInvoiceDateRange] = useState('month');
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);

  useEffect(() => {
    const savedChatters = JSON.parse(localStorage.getItem('chatters')) || [];
    const currentChatter = savedChatters[id];
    if (currentChatter) {
      setChatter(currentChatter);
      setPaymentMethod(currentChatter.paymentMethod || '');
      setPaymentDetails(currentChatter.paymentDetails || '');
      setLastPayment(currentChatter.lastPayment || '2023-07-01');
    }
  }, [id]);

  const handlePresetDateRange = (range) => {
    // Logique pour définir les plages de dates prédéfinies
  };

  const handlePaymentDialogOpen = () => {
    setOpenPaymentDialog(true);
  };

  const handlePaymentDialogClose = () => {
    setOpenPaymentDialog(false);
  };

  const handleInvoiceDialogOpen = () => {
    setOpenInvoiceDialog(true);
  };

  const handleInvoiceDialogClose = () => {
    setOpenInvoiceDialog(false);
  };

  const handlePaymentMethodChange = () => {
    // Logique pour changer la méthode de paiement
    handlePaymentDialogClose();
  };

  const handleCreateInvoice = () => {
    // Logique pour créer la facture
    const invoiceContent = `
      -------------------------------------------------------------
      |                       FACTURE                              |
      -------------------------------------------------------------

      Date: ${new Date().toLocaleDateString()}
      Numéro de facture: 00123
      Client: Monsieur/Madame ${chatter.firstName} ${chatter.lastName}
      Adresse: [Adresse du client]
      Téléphone: [Numéro de téléphone du client]
      Email: [Email du client]

      -------------------------------------------------------------
      | Description des services                           | Montant |
      -------------------------------------------------------------
      | Service rendu                                          |  XXX €  |
      -------------------------------------------------------------

      Total hors taxes: XXX €
      TVA (XX%): XXX €
      Total toutes taxes comprises (TTC): XXX €

      Conditions de règlement: À réception de facture
      Mode de paiement: ${paymentMethod}

      Merci de votre confiance !

      -------------------------------------------------------------
    `;

    const invoiceWindow = window.open('', '_blank');
    invoiceWindow.document.write(`<pre>${invoiceContent}</pre>`);
    invoiceWindow.document.close();

    handleInvoiceDialogClose();
  };

  const getMonthsOptions = () => {
    const currentMonth = new Date().getMonth();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.slice(0, currentMonth + 1);
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

  if (!chatter) {
    return (
      <Container>
        <Typography variant="h4" sx={{ color: '#fff', mt: 2 }}>
          Chatter not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 1, mb: 1 }}>
        <Grid item>
          <Typography variant="h4" sx={{ color: '#fff' }}>
            Chatter Details - {chatter.firstName} {chatter.lastName}
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

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center', height: '70%' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Total Accounts
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              5
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center', height: '70%' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Total Revenue
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              17,500 $
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center', height: '70%' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Tips
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              500 $
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center', height: '70%' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Messages
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              120
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center', height: '70%' }}>
            <Typography variant="h6" sx={{ color: '#fff', fontSize: '16px' }}>
              Payment Plan
            </Typography>
            <Typography variant="h5" sx={{ color: '#fff' }}>
              {chatter.paymentPlan === 'percentage' ? `Paid per %: ${chatter.amount}%` : `Salary: $${chatter.amount}`}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={12}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Combined Data
            </Typography>
            <Box sx={{ position: 'relative', height: 300 }}>
              <Line data={combinedData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Payment Method: {paymentMethod}
            </Typography>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Details: {paymentDetails}
            </Typography>
            <Button variant="contained" color="primary" onClick={handlePaymentDialogOpen} sx={{ mt: 2, borderRadius: '20px', boxShadow: 3 }}>
              Change Payment Method
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Last Payment:
            </Typography>
            <Typography variant="h6" sx={{ color: new Date(lastPayment) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) ? 'red' : '#fff', fontWeight: 'bold' }}>
              {lastPayment}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleInvoiceDialogOpen} sx={{ mt: 2, borderRadius: '20px', boxShadow: 3 }}>
              Create Invoice
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openPaymentDialog} onClose={handlePaymentDialogClose}>
        <DialogTitle>Change Payment Method</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            variant="standard"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            displayEmpty
            sx={{ marginTop: 2 }}
          >
            <MenuItem value="" disabled>Select Payment Method</MenuItem>
            <MenuItem value="Skrill">Skrill</MenuItem>
            <MenuItem value="Crypto">Crypto</MenuItem>
            <MenuItem value="Wise">Wise</MenuItem>
            <MenuItem value="Revolut">Revolut</MenuItem>
            <MenuItem value="IBAN">IBAN</MenuItem>
            <MenuItem value="Paypal">Paypal</MenuItem>
          </Select>
          <TextField
            margin="dense"
            label={paymentMethod}
            type="text"
            fullWidth
            variant="standard"
            value={paymentDetails}
            onChange={(e) => setPaymentDetails(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePaymentDialogClose} color="primary">Cancel</Button>
          <Button onClick={handlePaymentMethodChange} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openInvoiceDialog} onClose={handleInvoiceDialogClose}>
        <DialogTitle>Create Invoice</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            variant="standard"
            value={invoiceDateRange}
            onChange={(e) => setInvoiceDateRange(e.target.value)}
            displayEmpty
            sx={{ marginTop: 2 }}
          >
            {getMonthsOptions().map((month, index) => (
              <MenuItem key={index} value={month}>{month}</MenuItem>
            ))}
            <MenuItem value="custom">Custom Range</MenuItem>
          </Select>
          {invoiceDateRange === 'custom' && (
            <>
              <TextField
                margin="dense"
                label="Start Date"
                type="date"
                fullWidth
                variant="standard"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                sx={{ marginTop: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin="dense"
                label="End Date"
                type="date"
                fullWidth
                variant="standard"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                sx={{ marginTop: 2 }}
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInvoiceDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleCreateInvoice} color="primary">Create</Button>
        </DialogActions>
      </Dialog>

      <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, mt: 2 }}>
        <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
          Account List
        </Typography>
        <List>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #555' }}>
            <Typography component="span" sx={{ color: 'blue', fontWeight: 'bold' }}>OnlyFans: example_onlyfans</Typography>
            <Typography component="span" sx={{ color: '#fff' }}>Subscribers: 1000</Typography>
            <Typography component="span" sx={{ color: '#fff' }}>Likes: 200</Typography>
            <Typography component="span" sx={{ color: '#fff' }}>Views: 5000</Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #555' }}>
            <Typography component="span" sx={{ color: 'blue', fontWeight: 'bold' }}>OnlyFans: example_onlyfans2</Typography>
            <Typography component="span" sx={{ color: '#fff' }}>Subscribers: 500</Typography>
            <Typography component="span" sx={{ color: '#fff' }}>Likes: 100</Typography>
            <Typography component="span" sx={{ color: '#fff' }}>Views: 3000</Typography>
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default ChatterDetails;
