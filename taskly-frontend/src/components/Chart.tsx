import { lighten, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

type chartData = {
  data: number[];
};

export interface chartProps {
  data: chartData[];
}

export default function Chart(props: chartProps) {
  const { data } = props;
  const theme = useTheme();

  return (
    <BarChart
      series={data.map((item) => ({
        ...item,
        color: lighten(theme.palette.primary.main, 0.3),
      }))}
      height={240}
      xAxis={[{ data: ['Hours'], scaleType: 'band' }]}
      grid={{ horizontal: true }}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}
