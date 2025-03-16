import { Box, lighten, Typography, useTheme } from '@mui/material';
import { Todo as TodoType } from '../components/TodoInput';
import { motion } from 'framer-motion';
import Grid from '@mui/material/Grid2';
import Todo from '../components/Todo';
import { useState } from 'react';

function About() {
  const theme = useTheme();

  const todo: TodoType = {
    text: 'This is a todo to do in the future',
    date: new Date(),
    color: theme.customColors.indigo,
  };

  const [todos, setTodos] = useState<TodoType[]>([
    {
      ...todo,
      text: 'Make a shopping list',
      color: theme.palette.primary.main,
    },
    {
      ...todo,
      text: 'Refactor home component',
      color: theme.customColors.jasmin,
    },
    { ...todo, text: 'Bake a cake', color: theme.customColors.violet },
  ]);

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

  const todoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    floating: {
      y: [0, -3, -1, 1, 3, 0],
      transition: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 1,
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: theme.padding.md,
          gap: 1,
          minHeight: 'calc(100vh - 4rem)',
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
      <Grid
        container
        spacing={1}
        direction="row"
        size={{ xs: 12, md: 12, lg: 12 }}
        sx={{
          minHeight: '100vh',
          padding: theme.padding.md,
          width: '100%',
          flexGrow: 1,
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          direction="column"
          size={{ xs: 12, md: 12, lg: 6 }}
          sx={{
            width: '100%',
            flexGrow: 1,
          }}
        >
          {todos.slice(0, 3).map((todo: TodoType, index: number) => (
            <motion.div
              key={index}
              variants={todoVariants}
              initial="hidden"
              whileHover="floating"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{ width: '100%' }}
            >
              <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ width: '100%' }}>
                <Todo todo={todo} />
              </Grid>
            </motion.div>
          ))}
        </Grid>
        <Grid
          size={{ xs: 12, md: 12, lg: 6 }}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.padding.sm,
          }}
        >
          <Typography variant="body1" sx={{ color: '#fff' }}>
            On the left, you’ll see interactive to-do templates, just as they
            appear when you create them. Taskly makes it easy to organize,
            customize, and manage your tasks effortlessly.
            <br />
            <br />✨ Create a To-Do – Add tasks in seconds with a clean,
            intuitive interface.
            <br />
            🎨 Personalize with Colors – Assign colors to categorize and
            prioritize your tasks visually.
            <br />
            📅 Set Due Dates & Reminders – Stay on track with smart
            notifications and scheduling.
            <br />
            ✏️ Edit & Update Anytime – Modify your tasks, change priorities, and
            keep everything up to date.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default About;
