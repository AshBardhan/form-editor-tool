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
 * Interface representing a device with a label, icon, and size.
 */
export interface Device {
  label: DeviceType;
  icon: LucideIcon;
  size: number;
}

/**
 * A list of devices with their corresponding labels, icons, and sizes.
 */
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
