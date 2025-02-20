import React from 'react'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Avatar } from '@mui/material';

import sam1 from '../images/sample.jpg'

export default function GridEg() {
  return (
    <Grid container spacing={2}>
    <Grid item xs={6} direction={'row'}>
      <Box bgcolor="lightblue" p={2}>Item 1</Box>
     </Grid>
     <Grid item xs={3}>
      <Avatar alt="Travis Howard" src={sam1}  sx={{ width: "30vh", height: "30vh" }}/>
      </Grid>
      <Grid item xs={3}>
      <Avatar alt="Travis Howard" src={sam1}  sx={{ width: "30vh", height: "30vh" }}/>
      </Grid>      
      
    <Grid item xs={6}>
      <Box bgcolor="lightgreen" p={2}>Item 2</Box>
    </Grid>
    <Grid item xs={12}>
      <Box bgcolor="lightcoral" p={2}>Item 3</Box>
    </Grid>
    <Grid item xs={8} align="center">
      <Box bgcolor="lightblue" p={2}>Item 1</Box>
    </Grid>
  </Grid>

  )
}
