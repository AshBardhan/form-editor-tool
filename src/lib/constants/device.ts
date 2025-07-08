import { LucideIcon, Monitor, Smartphone, Tablet } from "lucide-react";

export enum DeviceType {
  DESKTOP = "desktop",
  TABLET = "tablet",
  MOBILE = "mobile",
}

export interface Device {
  label: DeviceType;
  icon: LucideIcon;
  size: number;
}

export const DeviceList: Device[] = [
  {
    label: DeviceType.DESKTOP,
    icon: Monitor,
    size: 1280,
  },
  {
    label: DeviceType.TABLET,
    icon: Tablet,
    size: 768,
  },
  {
    label: DeviceType.MOBILE,
    icon: Smartphone,
    size: 375,
  },
];
