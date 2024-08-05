import React, { useContext } from 'react';
import { Container, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Chat from './pages/Chat';
import ConversationsPanel from './components/ConversationsPanel';
import { CssBaseline } from '@mui/material';
import ThemeSwitch from './components/ThemeSwitch';
import { Box } from '@mui/material';


const App = () => {



  return (
    <Container maxWidth="xxl" style={{ display: 'flex', height: '100vh', flexDirection: 'column', paddingLeft: '0', paddingRight: '0' }}>
      <CssBaseline />
      <div style={{ display: 'flex', flex: 1 }}>
        <ConversationsPanel />
        <Chat />
      </div>
      <Box position="absolute" right="10px" top="10px">
        <ThemeSwitch />
      </Box>
    </Container>
  );
};

export default App;
