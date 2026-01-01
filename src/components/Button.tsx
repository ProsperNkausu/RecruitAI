import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", isLoading = false, className = "", children, ...props },
    ref
  ) => {
    const baseClass = "btn";
    const variantClass = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      outline: "btn-outline",
    }[variant];

    const sizeClass = {
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
    }[size];

    return (
      <button
        ref={ref}
        className={`${baseClass} ${variantClass} ${sizeClass} ${className}`.trim()}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
