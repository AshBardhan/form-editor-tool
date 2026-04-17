"use client";

import { DeviceList, DeviceType } from "@/lib/constants/device";
import { Button } from "@/components/ui/Button";
import { JSX } from "react";
import { cn } from "@/lib/utils/styleUtils";

interface DeviceSelectorProps {
  currentDevice: DeviceType;
  onDeviceChange: (newDeviceName: DeviceType) => void;
}

/**
 * Device Selector (Canvas Toolbar)
 * - Displays a list of devices to choose the desired viewport for Form Builder Canvas.
 *
 * @param {DeviceSelectorProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const DeviceSelector = ({
  currentDevice,
  onDeviceChange,
}: DeviceSelectorProps): JSX.Element => {
  return (
    <div className="sticky z-10 top-2 left-1/2 -translate-x-1/2 bg-[#2a2a2a] rounded overflow-hidden text-white inline-flex">
      {DeviceList.map((device) => {
        const Icon = device.icon;
        return (
          <Button
            key={device.label}
            variant="ghost"
            title={device.label}
            onClick={() => onDeviceChange(device.label)}
            className={cn(
              "flex items-center justify-center p-3 cursor-pointer",
              currentDevice === device.label && "bg-[#151515]",
              "hover:bg-[#0f0f0f] rounded-none",
              "focus-visible:outline-none! focus-visible:ring-0! focus-visible:border-transparent! focus-visible:bg-[#0f0f0f]",
              "transition-all",
            )}
          >
            <Icon size={14} />
          </Button>
        );
      })}
    </div>
  );
};
