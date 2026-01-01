import React from "react";

interface BadgeProps {
  variant?: "success" | "danger" | "warning" | "info";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "info",
  children,
  className = "",
}) => {
  const variantClass = {
    success: "badge-success",
    danger: "badge-danger",
    warning: "badge-warning",
    info: "badge-info",
  }[variant];

  return <span className={`badge ${variantClass} ${className}`.trim()}>{children}</span>;
};
