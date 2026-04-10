import { 
  Activity, 
  Wind, 
  MessageSquare, 
  Mic, 
  Image as ImageIcon, 
  BarChart2, 
  Pill, 
  FlameKindling, 
  CloudRain, 
  AlertTriangle,
  User 
} from "lucide-react";

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Activity },
  { id: 'assistant', label: 'AI Assistant', icon: MessageSquare },
  { id: 'xray', label: 'X-Ray AI', icon: ImageIcon },
  { id: 'cough', label: 'Cough Analyzer', icon: Mic },
  { id: 'breathing', label: 'Breathing', icon: Wind },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'medications', label: 'Meds', icon: Pill },
  { id: 'smoking', label: 'Quit Smoking', icon: FlameKindling },
  { id: 'weather', label: 'Weather', icon: CloudRain },
  { id: 'warnings', label: 'Early Warning', icon: AlertTriangle },
  { id: 'profile', label: 'Profile', icon: User },
];
