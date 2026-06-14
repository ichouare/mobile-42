import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSun, LucideIcon, Snowflake, Sun } from "lucide-react-native";

export const weatherIcons: Record<number, LucideIcon> = {
  0: Sun,
  1: CloudSun,
  2: CloudSun,
  3: Cloud,
  45: CloudFog,
  48: CloudFog,
  51: CloudDrizzle,
  61: CloudRain,
  71: Snowflake,
  95: CloudLightning
};