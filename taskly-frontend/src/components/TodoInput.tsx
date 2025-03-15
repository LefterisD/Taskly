import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { motion } from 'framer-motion';

function TodoInput() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#dd0000');

  const handleExpandedClick = () => {
    setExpanded(!expanded);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Box
      sx={{
        boxShadow: 3,
        width: '700px',
        padding: theme.padding.sm,
        borderRadius: theme.padding.xs,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          id="outlined-basic"
          variant="standard"
          placeholder="Add a new todo"
          sx={{ flexGrow: '1' }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ backgroundColor: theme.customColors.orange }}
        >
          Add
        </Button>
      </Box>
      <Button
        variant="text"
        endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={{ padding: 0, textTransform: 'capitalize' }}
        onClick={handleExpandedClick}
      >
        Show more options
      </Button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          expanded
            ? { height: 'auto', opacity: 1, marginTop: '1rem' }
            : { height: 0, opacity: 0 }
        }
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }} // Prevents abrupt jumps
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography sx={{ minWidth: '9rem' }}>Select color:</Typography>
            <input type="color" value={color} onChange={handleColorChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography sx={{ minWidth: '9rem' }}>
              Select starting from:
            </Typography>
            <DatePicker />
          </Box>
        </Box>
      </motion.div>
      {/* {expanded && (
        
      )} */}
    </Box>
  );
}

export default TodoInput;
