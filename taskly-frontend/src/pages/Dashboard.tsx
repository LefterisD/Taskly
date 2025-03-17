import { Box, lighten, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import InfoCard from '../components/InfoCard';
import Chart from '../components/Chart';
import { useGetTodosStats } from '../api/hooks/useTodo';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';

type Stats = {
  completed: number;
  in_progress: number;
  total_hours: number;
  upcoming: number;
};

const Dashboard = () => {
  const theme = useTheme();
  const [todoStats, setTodoStats] = useState<Stats>({
    completed: 0,
    in_progress: 0,
    total_hours: 0,
    upcoming: 0,
  });

  const { data: stats, isLoading } = useGetTodosStats();

  useEffect(() => {
    if (stats) setTodoStats(stats);
  }, [stats]);

  return (
    <Box
      sx={{
        width: '100%',
        padding: `${theme.padding.sm}`,
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      {isLoading && <Spinner />}
      {!isLoading && (
        <Grid
          container
          rowSpacing={{ xs: 0.5, sm: 1, md: 2 }}
          columnSpacing={{ xs: 0.5, sm: 1, md: 2 }}
        >
          <Grid size={6}>
            <InfoCard
              key={'completed'}
              animationTop={true}
              title="Completed"
              value={todoStats.completed}
              styling={{
                bgColor: lighten(theme.customColors.green, 0.7),
                valueColor: theme.customColors.green,
              }}
            />
          </Grid>
          <Grid size={6}>
            <InfoCard
              key={'in-progress'}
              animationTop={true}
              title="In progress"
              value={todoStats.in_progress}
              styling={{
                bgColor: lighten(theme.customColors.blue, 0.7),
                valueColor: theme.customColors.blue,
              }}
            />
          </Grid>
          <Grid size={6}>
            <InfoCard
              key={'total-hours'}
              animationTop={false}
              title="Total hours"
              value={todoStats.total_hours}
              styling={{
                bgColor: lighten(theme.customColors.jasmin, 0.7),
                valueColor: theme.customColors.jasmin,
              }}
            />
          </Grid>
          <Grid size={6}>
            <InfoCard
              key={'upcoming'}
              animationTop={false}
              title="Upcoming"
              value={todoStats.upcoming}
              styling={{
                bgColor: lighten(theme.customColors.indigo, 0.7),
                valueColor: theme.customColors.indigo,
              }}
            />
          </Grid>
          <Grid size={12} sx={{ marginTop: theme.padding.sm }}>
            <Box
              sx={{
                backgroundColor: theme.customColors.grey,
                padding: theme.padding.md,
                borderRadius: theme.padding.xs,
              }}
            >
              <Chart data={[{ data: [todoStats.total_hours] }]} />
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
