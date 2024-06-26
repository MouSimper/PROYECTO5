import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Link from '@mui/material/Link';
import PropTypes from 'prop-types';

const Subrayado = styled(Link)(({ theme }) => ({
  fontFamily: 'Arial, sans-serif',
  color: '#000000',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Items = ({ items }) => {
  return (
    <Grid container spacing={4} justifyContent="center" pb={4}>
      {items.map((item, index) => (
        <Grid item xs={6} sm={4} md={2} key={index}>
          <Box
            borderRadius={3}
            width="100%"
            height={150}
            bgcolor="grey.300"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={2}
            p={1}
            sx={{
              backgroundImage: `url(${item.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Puedes agregar un mensaje de carga o un fallback aquí si lo deseas */}
          </Box>
          <Typography variant="h6" align="left">{item.nombre}</Typography>
          <Subrayado href="#" pb={4}>Learn More</Subrayado>
        </Grid>
      ))}
    </Grid>
  );
};

Items.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Items;
