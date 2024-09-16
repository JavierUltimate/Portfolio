import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Divider } from '@mui/material';

export default function AccordionCard({item}) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography className='capitalize'>{item.title}</Typography>
          <Divider/>
        </AccordionSummary>
        <AccordionDetails sx={{
        }}>
          <Typography className='capitalize'>
            {item.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}