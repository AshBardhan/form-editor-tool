import { LucideIcon, Monitor, Smartphone, Tablet } from "lucide-react";

/**
 * Enum representing different types of devices.
 * @enum {string}
 */
export enum DeviceType {
  DESKTOP = "desktop",
  TABLET = "tablet",
  MOBILE = "mobile",
}

/**
 * Interface representing a device with a label, value, icon and size.
 */
export interface Device {
  label: string;
  value: DeviceType;
  icon: LucideIcon;
  size: number;
}

/**
 * A list of devices with their corresponding labels, values, icons and sizes.
 */
export const DeviceList: Device[] = [
  {
    label: "Desktop",
    value: DeviceType.DESKTOP,
    icon: Monitor,
    size: 1440,
  },
  {
    label: "Tablet",
    value: DeviceType.TABLET,
    icon: Tablet,
    size: 1024,
  },
  {
    label: "Mobile",
    value: DeviceType.MOBILE,
    icon: Smartphone,
    size: 375,
  },
];
