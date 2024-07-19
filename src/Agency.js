import React from 'react';
import { Container, Grid, Paper, Typography, Button, Box, TextField, MenuItem, Select, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const Agency = () => {
  const [vas, setVas] = useState([]);
  const [models, setModels] = useState([]);
  const [chatters, setChatters] = useState([]);
  const [openDialogVa, setOpenDialogVa] = useState(false);
  const [openDialogModel, setOpenDialogModel] = useState(false);
  const [openDialogChatter, setOpenDialogChatter] = useState(false);
  const [newVa, setNewVa] = useState({
    firstName: '',
    lastName: '',
    paymentPlan: '',
    amount: '',
    telegram: '',
    discord: '',
    accountsManaged: 0,
    lastPaymentDate: ''
  });
  const [newModel, setNewModel] = useState({
    firstName: '',
    lastName: '',
    paymentPlan: '',
    amount: '',
    telegram: '',
    discord: '',
    whatsapp: '',
    lastPaymentDate: ''
  });
  const [newChatter, setNewChatter] = useState({
    firstName: '',
    lastName: '',
    paymentPlan: '',
    amount: '',
    telegram: '',
    discord: '',
    whatsapp: '',
    lastPaymentDate: ''
  });

  useEffect(() => {
    const savedModels = JSON.parse(localStorage.getItem('models')) || [];
    setModels(savedModels);

    const savedChatters = JSON.parse(localStorage.getItem('chatters')) || [];
    setChatters(savedChatters);

    const savedVas = JSON.parse(localStorage.getItem('vas')) || [];
    setVas(savedVas);
  }, []);

  const handleOpenDialogVa = () => {
    setOpenDialogVa(true);
  };

  const handleCloseDialogVa = () => {
    setOpenDialogVa(false);
    setNewVa({ firstName: '', lastName: '', paymentPlan: '', amount: '', telegram: '', discord: '', accountsManaged: 0, lastPaymentDate: '' });
  };

  const handleAddVa = () => {
    const updatedVas = [...vas, newVa];
    setVas(updatedVas);
    localStorage.setItem('vas', JSON.stringify(updatedVas));
    handleCloseDialogVa();
  };

  const handleDeleteVa = (index) => {
    const newVas = vas.filter((_, i) => i !== index);
    setVas(newVas);
    localStorage.setItem('vas', JSON.stringify(newVas));
  };

  const handleOpenDialogModel = () => {
    setOpenDialogModel(true);
  };

  const handleCloseDialogModel = () => {
    setOpenDialogModel(false);
    setNewModel({ firstName: '', lastName: '', paymentPlan: '', amount: '', telegram: '', discord: '', whatsapp: '', lastPaymentDate: '' });
  };

  const handleAddModel = () => {
    const updatedModels = [...models, newModel];
    setModels(updatedModels);
    localStorage.setItem('models', JSON.stringify(updatedModels));
    handleCloseDialogModel();
  };

  const handleDeleteModel = (index) => {
    const newModels = models.filter((_, i) => i !== index);
    setModels(newModels);
    localStorage.setItem('models', JSON.stringify(newModels));
  };

  const handleOpenDialogChatter = () => {
    setOpenDialogChatter(true);
  };

  const handleCloseDialogChatter = () => {
    setOpenDialogChatter(false);
    setNewChatter({ firstName: '', lastName: '', paymentPlan: '', amount: '', telegram: '', discord: '', whatsapp: '', lastPaymentDate: '' });
  };

  const handleAddChatter = () => {
    const updatedChatters = [...chatters, newChatter];
    setChatters(updatedChatters);
    localStorage.setItem('chatters', JSON.stringify(updatedChatters));
    handleCloseDialogChatter();
  };

  const handleDeleteChatter = (index) => {
    const newChatters = chatters.filter((_, i) => i !== index);
    setChatters(newChatters);
    localStorage.setItem('chatters', JSON.stringify(newChatters));
  };

  return (
    <Container>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2, mb: 2 }}>
        <Grid item>
          <Typography variant="h4" sx={{ color: '#fff' }}>
            Agency Management
          </Typography>
        </Grid>
      </Grid>
      
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Total VA
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              {vas.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Total Chatter
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              {chatters.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Total Revenue
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff' }}>
              {/* Add your logic to calculate total revenue */}
              $0
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleOpenDialogModel} sx={{ mb: 2, borderRadius: '20px', boxShadow: 3 }}>
        Add Model
      </Button>
      
      <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
          Model List
        </Typography>
        <List>
          {models.map((model, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #555' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <Link to={`/model/${index}`} style={{ color: 'blue', fontWeight: 'bold' }}>{`${model.firstName} ${model.lastName}`}</Link>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="span" sx={{ color: 'green' }}>
                    {model.paymentPlan === 'percentage' ? `Paid per %: ${model.amount}%` : `Salary: $${model.amount}`}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="span" sx={{ color: '#fff' }}>
                    Last Payment: {model.lastPaymentDate}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="span" sx={{ color: '#fff' }}>
                    {model.telegram && `@Telegram: ${model.telegram}`}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="span" sx={{ color: '#fff' }}>
                    {model.whatsapp && `WhatsApp: ${model.whatsapp}`}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography component="span" sx={{ color: '#fff' }}>
                    {model.discord && `Discord: ${model.discord}`}
                  </Typography>
                </Grid>
                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton edge="end" color="inherit" onClick={() => handleDeleteModel(index)}>
                    <DeleteIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>
      
      <Button variant="contained" color="primary" onClick={handleOpenDialogChatter} sx={{ mb: 2, borderRadius: '20px', boxShadow: 3 }}>
        Add Chatter
      </Button>

      <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
          Chatter List
        </Typography>
        <List>
          {chatters.map((chatter, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #555' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <Link to={`/chatter/${index}`} style={{ color: 'blue', fontWeight: 'bold' }}>{`${chatter.firstName} ${chatter.lastName}`}</Link>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="span" sx={{ color: 'green' }}>
                    {chatter.paymentPlan === 'percentage' ? `Paid per %: ${chatter.amount}%` : `Salary: $${chatter.amount}`}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="span" sx={{ color: '#fff' }}>
                    Last Payment: {chatter.lastPaymentDate}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="span" sx={{ color: '#fff' }}>
                    {chatter.telegram && `@Telegram: ${chatter.telegram}`}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="span" sx={{ color: '#fff' }}>
                    {chatter.whatsapp && `WhatsApp: ${chatter.whatsapp}`}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography component="span" sx={{ color: '#fff' }}>
                    {chatter.discord && `Discord: ${chatter.discord}`}
                  </Typography>
                </Grid>
                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton edge="end" color="inherit" onClick={() => handleDeleteChatter(index)}>
                    <DeleteIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>
      
      <Button variant="contained" color="primary" onClick={handleOpenDialogVa} sx={{ mb: 2, borderRadius: '20px', boxShadow: 3 }}>
        Add VA
      </Button>

      <Paper elevation={3} sx={{ backgroundColor: '#3d3d3d', p: 2 }}>
        <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
          VA List
        </Typography>
        <List>
          {vas.map((va, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #555' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <Link to={`/va/${index}`} style={{ color: 'blue', fontWeight: 'bold' }}>{`${va.firstName} ${va.lastName}`}</Link>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="span" sx={{ color: 'green' }}>
                    {va.paymentPlan === 'sub' ? `Paid per sub: $${va.amount}` : `Salary: $${va.amount}`}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="span" sx={{ color: '#fff' }}>
                    Last Payment: {va.lastPaymentDate}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="span" sx={{ color: '#fff' }}>
                    Accounts Managed: {va.accountsManaged}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="span" sx={{ color: '#fff' }}>
                    {va.telegram && `@Telegram: ${va.telegram}`}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography component="span" sx={{ color: '#fff' }}>
                    {va.discord && `Discord: ${va.discord}`}
                  </Typography>
                </Grid>
                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton edge="end" color="inherit" onClick={() => handleDeleteVa(index)}>
                    <DeleteIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={openDialogVa} onClose={handleCloseDialogVa}>
        <DialogTitle>Add VA</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={newVa.firstName}
            onChange={(e) => setNewVa({ ...newVa, firstName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            value={newVa.lastName}
            onChange={(e) => setNewVa({ ...newVa, lastName: e.target.value })}
          />
          <Select
            fullWidth
            variant="standard"
            value={newVa.paymentPlan}
            onChange={(e) => setNewVa({ ...newVa, paymentPlan: e.target.value })}
            displayEmpty
            sx={{ marginTop: 2 }}
          >
            <MenuItem value="" disabled>Select Payment Plan</MenuItem>
            <MenuItem value="sub">Paid per sub</MenuItem>
            <MenuItem value="salary">Salary</MenuItem>
          </Select>
          <TextField
            margin="dense"
            label={newVa.paymentPlan === 'sub' ? "Amount per sub" : "Salary Amount"}
            type="number"
            fullWidth
            variant="standard"
            value={newVa.amount}
            onChange={(e) => setNewVa({ ...newVa, amount: e.target.value })}
            disabled={!newVa.paymentPlan}
            sx={{ marginTop: 2 }}
          />
          <TextField
            margin="dense"
            label="@Telegram (optional)"
            type="text"
            fullWidth
            variant="standard"
            value={newVa.telegram}
            onChange={(e) => setNewVa({ ...newVa, telegram: e.target.value })}
            sx={{ marginTop: 2 }}
          />
          <TextField
            margin="dense"
            label="Discord (optional)"
            type="text"
            fullWidth
            variant="standard"
            value={newVa.discord}
            onChange={(e) => setNewVa({ ...newVa, discord: e.target.value })}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogVa} color="primary">Cancel</Button>
          <Button onClick={handleAddVa} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogModel} onClose={handleCloseDialogModel}>
        <DialogTitle>Add Model</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={newModel.firstName}
            onChange={(e) => setNewModel({ ...newModel, firstName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            value={newModel.lastName}
            onChange={(e) => setNewModel({ ...newModel, lastName: e.target.value })}
          />
          <Select
            fullWidth
            variant="standard"
            value={newModel.paymentPlan}
            onChange={(e) => setNewModel({ ...newModel, paymentPlan: e.target.value })}
            displayEmpty
            sx={{ marginTop: 2 }}
          >
            <MenuItem value="" disabled>Select Payment Plan</MenuItem>
            <MenuItem value="percentage">Paid per %</MenuItem>
            <MenuItem value="salary">Salary</MenuItem>
          </Select>
          <TextField
            margin="dense"
            label={newModel.paymentPlan === 'percentage' ? "Amount per %" : "Salary Amount"}
            type="number"
            fullWidth
            variant="standard"
            value={newModel.amount}
            onChange={(e) => setNewModel({ ...newModel, amount: e.target.value })}
            disabled={!newModel.paymentPlan}
            sx={{ marginTop: 2 }}
          />
          <TextField
            margin="dense"
            label="@Telegram (optional)"
            type="text"
            fullWidth
            variant="standard"
            value={newModel.telegram}
            onChange={(e) => setNewModel({ ...newModel, telegram: e.target.value })}
            sx={{ marginTop: 2 }}
          />
          <TextField
            margin="dense"
            label="WhatsApp (optional)"
            type="text"
            fullWidth
            variant="standard"
            value={newModel.whatsapp}
            onChange={(e) => setNewModel({ ...newModel, whatsapp: e.target.value })}
            sx={{ marginTop: 2 }}
          />
          <TextField
            margin="dense"
            label="Discord (optional)"
            type="text"
            fullWidth
            variant="standard"
            value={newModel.discord}
            onChange={(e) => setNewModel({ ...newModel, discord: e.target.value })}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogModel} color="primary">Cancel</Button>
          <Button onClick={handleAddModel} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogChatter} onClose={handleCloseDialogChatter}>
        <DialogTitle>Add Chatter</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={newChatter.firstName}
            onChange={(e) => setNewChatter({ ...newChatter, firstName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            value={newChatter.lastName}
            onChange={(e) => setNewChatter({ ...newChatter, lastName: e.target.value })}
          />
          <Select
            fullWidth
            variant="standard"
            value={newChatter.paymentPlan}
            onChange={(e) => setNewChatter({ ...newChatter, paymentPlan: e.target.value })}
            displayEmpty
            sx={{ marginTop: 2 }}
          >
            <MenuItem value="" disabled>Select Payment Plan</MenuItem>
            <MenuItem value="percentage">Paid per %</MenuItem>
            <MenuItem value="salary">Salary</MenuItem>
          </Select>
          <TextField
            margin="dense"
            label={newChatter.paymentPlan === 'percentage' ? "Amount per %" : "Salary Amount"}
            type="number"
            fullWidth
            variant="standard"
            value={newChatter.amount}
            onChange={(e) => setNewChatter({ ...newChatter, amount: e.target.value })}
            disabled={!newChatter.paymentPlan}
            sx={{ marginTop: 2 }}
          />
          <TextField
            margin="dense"
            label="@Telegram (optional)"
            type="text"
            fullWidth
            variant="standard"
            value={newChatter.telegram}
            onChange={(e) => setNewChatter({ ...newChatter, telegram: e.target.value })}
            sx={{ marginTop: 2 }}
          />
          <TextField
            margin="dense"
            label="WhatsApp (optional)"
            type="text"
            fullWidth
            variant="standard"
            value={newChatter.whatsapp}
            onChange={(e) => setNewChatter({ ...newChatter, whatsapp: e.target.value })}
            sx={{ marginTop: 2 }}
          />
          <TextField
            margin="dense"
            label="Discord (optional)"
            type="text"
            fullWidth
            variant="standard"
            value={newChatter.discord}
            onChange={(e) => setNewChatter({ ...newChatter, discord: e.target.value })}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogChatter} color="primary">Cancel</Button>
          <Button onClick={handleAddChatter} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Agency;
