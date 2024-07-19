import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Typography, CircularProgress, Paper } from '@mui/material';
import RFB from '@novnc/novnc';

const Jailbreak = () => {
  const [ip, setIp] = useState('');
  const [password, setPassword] = useState('');
  const [rfb, setRfb] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = () => {
    if (!ip || !password) {
      setError('IP Address and Password are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const url = `ws://${ip}`;
      const newRfb = new RFB(document.getElementById('vnc-canvas'), url, { credentials: { password } });
      newRfb.viewOnly = false;
      newRfb.scaleViewport = true;
      newRfb.resizeSession = true;
      newRfb.clipViewport = true;
      setRfb(newRfb);
      newRfb.addEventListener('connect', () => setLoading(false));
      newRfb.addEventListener('disconnect', () => setLoading(false));
    } catch (e) {
      setError('Failed to connect');
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (rfb) {
        rfb.disconnect();
      }
    };
  }, [rfb]);

  return (
    <Container sx={{ color: '#fff', textAlign: 'center', paddingTop: '20px' }}>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Jailbreak Connection</Typography>
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#1c1c1c' }}>
          <Box component="form" sx={{ mb: 3 }}>
            <TextField
              label="VNC IP Address"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              sx={{ 
                marginBottom: '20px', 
                input: { color: '#fff' }, 
                label: { color: '#fff' }, 
                svg: { color: '#fff' }, 
                '& .MuiOutlinedInput-root': { 
                  '& fieldset': { borderColor: '#00b0f0' },
                  '&:hover fieldset': { borderColor: '#00b0f0' },
                  '&.Mui-focused fieldset': { borderColor: '#00b0f0' }
                }
              }}
              fullWidth
              required
            />
            <TextField
              label="VNC Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ 
                marginBottom: '20px', 
                input: { color: '#fff' }, 
                label: { color: '#fff' }, 
                svg: { color: '#fff' }, 
                '& .MuiOutlinedInput-root': { 
                  '& fieldset': { borderColor: '#00b0f0' },
                  '&:hover fieldset': { borderColor: '#00b0f0' },
                  '&.Mui-focused fieldset': { borderColor: '#00b0f0' }
                }
              }}
              fullWidth
              required
            />
            <Button 
              onClick={handleConnect} 
              variant="contained" 
              color="primary" 
              sx={{ padding: '10px 20px', backgroundColor: '#00b0f0', '&:hover': { backgroundColor: '#0090d0' } }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Connect'}
            </Button>
          </Box>
          {error && <Typography variant="body1" color="error">{error}</Typography>}
        </Paper>
      </Box>
      <Box
        id="iphone-container"
        sx={{
          position: 'relative',
          width: '375px',
          height: '750px',
          margin: '50px auto',
          background: '#000',
          borderRadius: '36px',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '30px',
            backgroundColor: '#000',
          }}
        />
        <Box
          id="vnc-canvas"
          sx={{
            position: 'absolute',
            top: '30px',
            bottom: '70px',
            left: 0,
            right: 0,
            backgroundColor: '#000',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '70px',
            backgroundColor: '#000',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50px',
            height: '50px',
            backgroundColor: '#444',
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '5px',
            backgroundColor: '#444',
            borderRadius: '10px',
          }}
        />
      </Box>
    </Container>
  );
};

export default Jailbreak;
