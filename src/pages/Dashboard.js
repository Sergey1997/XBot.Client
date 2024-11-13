import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material'; // Import Box and Typography for layout and text

const Dashboard = () => {
  const [user, setUser] = useState({
    secretKey: '',
    botInstructions: '',
    about: '',
    twitterConsumerKey: '',
    twitterConsumerSecret: '',
    twitterAccessToken: '',
    twitterAccessTokenSecret: ''
  });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the updated user data
  };

  return (
    <Box sx={{ mt: 10 }}> {/* Add margin top of 50px */}
      <Typography variant="h6" gutterBottom>
        Instructions to Get Your Twitter Keys
      </Typography>
      <Typography variant="body1" gutterBottom>
        Follow these steps to obtain your Twitter API keys:
      </Typography>
      <Typography variant="body2" gutterBottom>
        1. Go to the <a href="https://developer.twitter.com/en/apps" target="_blank" rel="noopener noreferrer">Twitter Developer Portal</a>.
      </Typography>
      <Typography variant="body2" gutterBottom>
        2. Create a new application.
      </Typography>
      <Typography variant="body2" gutterBottom>
        3. Once the application is created, navigate to the "Keys and tokens" tab.
      </Typography>
      <Typography variant="body2" gutterBottom>
        4. You will find your <strong>Consumer Key</strong> and <strong>Consumer Secret</strong> here.
      </Typography>
      <Typography variant="body2" gutterBottom>
        5. Scroll down to the "Access token & access token secret" section and generate your <strong>Access Token</strong> and <strong>Access Token Secret</strong>.
      </Typography>
      <Typography variant="body2" gutterBottom>
        6. Use the keys in the following format:
      </Typography>
      <Typography variant="body2" gutterBottom>
        <code>
          const twitterConsumerKey = "EJV3WqB1********T0QUoFg2Z";<br />
          const twitterConsumerSecret = "TpdIpm5rvVCqkWSQc*******jvlxS6UUIql84FnvyfFZ24Qd3";<br />
          const twitterAccessToken = "1643734242986188801-*********kNGGcG8Fn7ur9Upkmi";<br />
          const twitterAccessTokenSecret = "85NY6gEHuT7k****************isXmL3O7ngc6Ymfk26";
        </code>
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between">
          <Box flex={1} pr={1}>
            <TextField
              label="Secret Key"
              variant="outlined"
              name="secretKey"
              value={user.secretKey}
              onChange={handleChange}
              fullWidth
              size="small" // Make the TextField smaller
              sx={{ mb: 1 }} // Adjust bottom margin
            />
            <TextField
              label="Twitter Access Token"
              variant="outlined"
              name="twitterAccessToken"
              value={user.twitterAccessToken}
              onChange={handleChange}
              fullWidth
              size="small" // Make the TextField smaller
              sx={{ mb: 1 }} // Adjust bottom margin
            />
            <TextField
              label="Twitter Consumer Key"
              variant="outlined"
              name="twitterConsumerKey"
              value={user.twitterConsumerKey}
              onChange={handleChange}
              fullWidth
              size="small" // Make the TextField smaller
              sx={{ mb: 1 }} // Adjust bottom margin
            />
            <TextField
              label="Twitter Access Token Secret"
              variant="outlined"
              name="twitterAccessTokenSecret"
              value={user.twitterAccessTokenSecret}
              onChange={handleChange}
              fullWidth
              size="small" // Make the TextField smaller
              sx={{ mb: 1 }} // Adjust bottom margin
            />
          </Box>
          <Box flex={1} pl={1}>
            <TextField
              label="About"
              variant="outlined"
              name="about"
              value={user.about}
              onChange={handleChange}
              fullWidth
              size="small" // Make the TextField smaller
              sx={{ mb: 1 }} // Adjust bottom margin
            />
            <TextField
              label="Instructions for Bot"
              variant="outlined"
              name="botInstructions"
              value={user.botInstructions}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4} // Set the number of rows for the textarea
              size="small" // Make the TextField smaller
              sx={{ mb: 1 }} // Adjust bottom margin
            />
          </Box>
        </Box>
        <Button type="submit" variant="contained" color="primary" sx={{ mb: 1 }}>
          Update
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          sx={{ mb: 1, ml: 2 }} // Added left margin
          disabled={!user.twitterConsumerKey || !user.twitterAccessTokenSecret || !user.about || !user.botInstructions}
          title="Please fill in all fields to enable the bot" // Tooltip for guidance
        >
          Enable Bot
        </Button>
      </form>
    </Box>
  );
};

export default Dashboard;