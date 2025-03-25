export const homeContent = `import React from 'react';
import '../App.css';
import { Box, Divider, Paper, Typography } from '@mui/material';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Box>

        <Paper elevation={3} sx={{ width: "55%", height: 'fit-content', margin: '5% auto', backgroundColor: 'inherit', fontFamily: 'Sora, sens-serif' }}>
          <Typography sx={{ color: "#244545", fontSize: '22px', textAlign: 'center', fontWeight: 'bold' }}>Home page</Typography>

          <Divider orientation="horizontal" sx={{ margin: '2% 2%' }} />

        </Paper>

      </Box>

      <Footer />
    </React.Fragment>
  )
}

export default Home;`