import { Box, lighten, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

function About() {
  const theme = useTheme();

  const title: string = 'Taskly';

  const defaultAnimations = {
    hidden: { opacity: 0, y: 10, color: '#fff' },
    visible: {
      opacity: 1,
      y: 0,
      color: theme.palette.secondary.main,
      transition: { duration: 0.3 },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { delayChildren: 0.3, staggerChildren: 0.1 },
    },
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          maxWidth: '1330px',
          gap: 1,
        }}
      >
        <Typography variant="h1" sx={{ color: theme.palette.secondary.main }}>
          <motion.span
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {title.split('').map((char: string, index: number) => (
              <motion.span
                key={index}
                style={{ display: 'inline-block' }}
                variants={defaultAnimations}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            width: '50%',
            color: lighten(theme.palette.secondary.main, 0.3),
          }}
        >
          Taskly is a simple yet powerful to-do app designed to help you stay
          organized and boost productivity. Whether you're managing daily tasks,
          planning projects, or tracking goals, Taskly makes it easy with an
          intuitive interface and smart features.
          <br />
          <br />✅ Add & Organize Tasks – Quickly create, categorize, and
          prioritize your to-dos.
          <br />
          📅 Set Due Dates & Reminders – Never miss a deadline with smart
          notifications.
          <br />
          🎨 Customizable Themes – Personalize your workspace to match your
          style.
          <br />
          📊 Track Progress – Visualize your productivity with insights and
          charts.
          <br />
          🔄 Sync Across Devices – Access your tasks anytime, anywhere.
        </Typography>
      </Box>
    </Box>
  );
}

export default About;
