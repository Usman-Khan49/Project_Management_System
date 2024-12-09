import React from "react";

export function Button({
  children,
  variant = "primary",
  icon: Icon,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
}
