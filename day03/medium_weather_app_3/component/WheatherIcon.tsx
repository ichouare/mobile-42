import { COLORS } from '@/constant/color';
import { weatherIcons } from '@/constant/icons';
import { Sun } from 'lucide-react-native';

type Props = {
  code: number;
  size?: number;
  color?: string;
};

function WeatherIcon({ code, size = 80, color = COLORS.blue }: Props) {
  const Icon = weatherIcons[code] ?? Sun;

  return <Icon size={size} color={color} />;
}

export default WeatherIcon;
