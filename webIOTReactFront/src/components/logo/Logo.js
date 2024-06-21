import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link,Typography} from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({disabledLink = false}) => {

  // OR using local (public folder)
  // -------------------------------------------------------

  const logo = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <img
        src="/assets/trainer_skin.ico" // Replace with your path
        alt="Logo"
        style={{ width: 40, height: 40, cursor: 'pointer' }}
      />
      <Typography variant="body1" sx={{ marginLeft: 2, fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold', color: '#1B81DD' }}>
        KneeTherapy
      </Typography>
    </Box>
  );
  
  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
};

export default Logo;
