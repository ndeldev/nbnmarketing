/**
 * Centralized icon map for dynamic icon lookup
 * Used by service pages and other components that need string-to-icon mapping
 */

import {
  Target,
  FileText,
  Globe,
  Mail,
  Video,
  BarChart3,
  Users,
  Megaphone,
  Search,
  Code,
  Circle,
  BookOpen,
  Newspaper,
  Award,
  BarChart,
  TrendingUp,
  Share2,
  PenTool,
  Zap,
  Shield,
  MessageSquare,
  Heart,
  DollarSign,
  Repeat,
  UserPlus,
  MessageCircle,
  RefreshCw,
  Calendar,
  LineChart,
  Handshake,
  Layers,
  Rocket,
  Clock,
  Sliders,
  Link as LinkIcon,
  Gauge,
  FileCode,
  Smartphone,
  Eye,
  Building,
  Linkedin,
  Youtube,
  Twitter,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Complete icon map for all icons used across the site
export const iconMap: Record<string, LucideIcon> = {
  // Primary service icons
  Target,
  FileText,
  Globe,
  Mail,
  Video,
  BarChart3,

  // Feature and benefit icons
  Users,
  Megaphone,
  Search,
  Code,
  Circle,
  BookOpen,
  Newspaper,
  Award,
  BarChart,
  TrendingUp,
  Share2,
  PenTool,
  Zap,
  Shield,
  MessageSquare,
  Heart,
  DollarSign,
  Repeat,
  UserPlus,
  MessageCircle,
  RefreshCw,
  Calendar,
  LineChart,
  Handshake,
  Layers,
  Rocket,
  Clock,
  Sliders,
  Link: LinkIcon,
  Gauge,
  FileCode,
  Smartphone,
  Eye,
  Building,

  // Social icons
  Linkedin,
  Youtube,
  Twitter,

  // Aliases for backward compatibility
  SiteMap: Globe,
};

/**
 * Get an icon component by name, with fallback to Circle
 */
export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Circle;
}

// Re-export commonly used icons for direct imports
export {
  Target,
  FileText,
  Globe,
  Mail,
  Video,
  BarChart3,
  Circle,
};
