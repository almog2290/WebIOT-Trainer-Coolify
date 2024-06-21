// @mui
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';
// utils
import { formatMilimeterToCMeter } from '../../../utils/formatStatus';

// ----------------------------------------------------------------------

AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTrafficBySite({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {list.map((site) => (
            <Paper key={site.name} variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
              <Box sx={{ mb: 0.5 }}>{site.icon}</Box>

              {site.name === 'Distance (CM)' ? (
                <Typography variant="h6">{formatMilimeterToCMeter(site.value)}</Typography>
              ) : site.name === 'Correct Steps' ? (
                <Typography variant="h6">{site.value}</Typography>
              ) : site.name === 'Failed Steps' ? (
                <Typography variant="h6">{site.value}</Typography>
              ) : (
                <Typography variant="h6">{site.value}</Typography>
              )}

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {site.name}
              </Typography>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
