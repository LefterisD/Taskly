import { Card, lighten, Typography, useTheme } from '@mui/material';
import AnimateYTop from './animations/AnimateYTop';
import AnimateYBottom from './animations/AnimateYBottom';

export interface InfoCardProps {
  animationTop: boolean;
  title: string;
  value: number;
  styling: {
    valueColor: string;
    bgColor: string;
  };
  key: string;
}

function InfoCard(props: InfoCardProps) {
  const { animationTop, title, value, styling, key } = props;

  const theme = useTheme();

  const cardContent = (
    <Card
      sx={{
        boxShadow: 'none',
        padding: `${theme.padding.md} ${theme.padding.sm}`,
        background: styling.bgColor,
        borderRadius: theme.padding.xs,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h2" sx={{ color: styling.valueColor }}>
        {value.toFixed(1)}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: lighten(theme.palette.secondary.main, 0.5) }}
      >
        {title}
      </Typography>
    </Card>
  );

  return animationTop ? (
    <AnimateYTop key={key}>{cardContent}</AnimateYTop>
  ) : (
    <AnimateYBottom key={key}>{cardContent}</AnimateYBottom>
  );
}

export default InfoCard;
