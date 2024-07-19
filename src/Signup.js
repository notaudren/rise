import React from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import logo from './rise.png'; // Assurez-vous que le chemin du logo est correct

const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#00b0f0',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#00b0f0',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#00b0f0',
    },
    '&:hover fieldset': {
      borderColor: '#00b0f0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00b0f0',
    },
  },
});

const Signup = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#000' }}>
      <Paper elevation={6} sx={{ p: 3, backgroundColor: '#000' }}>
        <Grid container justifyContent="center">
          <img src={logo} alt="Rise Logo" style={{ marginBottom: '20px', width: '300px' }} />
        </Grid>
        <Typography component="h1" variant="h5" align="center" sx={{ color: '#fff' }}>
          Sign up
        </Typography>
        <form noValidate>
          <CustomTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
          />
          <CustomTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
          />
          <CustomTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => navigate('/login')} sx={{ color: '#00b0f0' }}>
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
