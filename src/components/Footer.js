import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3, mt: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          Follow us on Twitter:
          <Link href="https://twitter.com/" target="_blank" rel="noopener" color="inherit" sx={{ ml: 1 }}>
            @TwitterXBot
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Twitter(X) Bot. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;