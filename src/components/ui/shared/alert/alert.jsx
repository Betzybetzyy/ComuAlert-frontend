import React from "react";
import { Icon } from "../icons/icon-component";

const variants = {
  info: "text-blue-600 border-blue-300 border",
  danger: "text-red-600 border-red-300 border bg-red-100 opacity-1 ",
  success: "text-green-600 border-green-300 border",
  warning: "text-amber-600 border-yellow-300 border bg-amber-100 opacity-1",
  dark: "text-gray-600 border-gray-300 border ",
};

export const Alert = ({ variant, icon, text, outlined = true }) => {
  const classes = variants[variant] || {};

  return (
    <div
      className={`flex justify-center p-2 text-sm ${classes} rounded-lg w-full items-center`}
      role="alert"
    >
      {icon && (
        <Icon
          width={8}
          height={8}
          variant={`${variant}${outlined ? "-outlined" : ""}`}
          iconActive={false}
          icon={icon}
        />
      )}
      <div>{text}</div>
    </div>
  );
};
