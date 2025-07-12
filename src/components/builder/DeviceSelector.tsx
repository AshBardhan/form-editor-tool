"use client";

import { DeviceList, DeviceType } from "@/lib/constants/device";
import { Button } from "../ui/Button";
import { JSX } from "react";

interface DeviceSelectorProps {
  currentDevice: DeviceType;
  onDeviceChange: (newDeviceName: DeviceType) => void;
}

/**
 * Device Selector
 * - Displays a list of devices to choose the desired viewport for Form Builder Canvas.
 *
 * @param {DeviceSelectorProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const DeviceSelector = ({
  currentDevice,
  onDeviceChange,
}: DeviceSelectorProps): JSX.Element => {
  return (
    <div className="absolute z-[1] top-1 left-1/2 -translate-x-1/2 bg-[#151515] rounded overflow-hidden text-white flex">
      {DeviceList.map((device) => {
        const Icon = device.icon;
        return (
          <Button
            variant="ghost"
            title={device.label}
            key={device.label}
            onClick={() => onDeviceChange(device.label)}
            className={`${currentDevice === device.label && "bg-[#2e2e2e]"} hover:bg-[#1f1f1f] rounded-none`}
          >
            <Icon size={12} />
          </Button>
        );
      })}
    </div>
  );
};

export { DeviceSelector };
