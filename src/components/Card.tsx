import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = "", children }) => {
  return <div className={`card ${className}`.trim()}>{children}</div>;
};

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className = "", children }) => {
  return <div className={`px-6 py-4 border-b border-gray-200 ${className}`.trim()}>{children}</div>;
};

interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ className = "", children }) => {
  return <div className={`px-6 py-4 ${className}`.trim()}>{children}</div>;
};

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ className = "", children }) => {
  return <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`.trim()}>{children}</div>;
};
