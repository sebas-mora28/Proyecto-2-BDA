import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import { Grid } from '@mui/material';

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <AppBar position="static" style={{ background: ' #9238B9' }}>
      <Grid container maxWidth="xl" justifyContent='center'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'}}}>              
                  <Button
                    onClick={() => navigate("/home")}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                    Home
                </Button>
              </Box>
        </Toolbar>
      </Grid>
    </AppBar>
  );
};
export default Navbar;

