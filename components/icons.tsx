import {
  AppWindow,
  ArrowDown,
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Code2,
  Coins,
  FileSearch,
  FileText,
  Handshake,
  Layout,
  MessageCircle,
  Send,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Wallet,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Layout,
  ShoppingCart,
  Building2,
  AppWindow,
  Sparkles,
  Code2,
  Bot,
  Smartphone,
  Workflow,
  Coins,
  FileSearch,
  Wrench,
  Send,
  FileText,
  Handshake,
  Wallet,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  ArrowDown,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Sparkles;
}

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = getIcon(name);
  return <Icon className={className} aria-hidden="true" />;
}
