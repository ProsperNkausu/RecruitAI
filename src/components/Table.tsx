import React from "react";

interface TableProps {
  className?: string;
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ className = "", children }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full text-left text-sm ${className}`.trim()}>{children}</table>
    </div>
  );
};

interface TableHeadProps {
  className?: string;
  children: React.ReactNode;
}

export const TableHead: React.FC<TableHeadProps> = ({ className = "", children }) => {
  return (
    <thead className={`bg-gray-50 border-b border-gray-200 ${className}`.trim()}>
      {children}
    </thead>
  );
};

interface TableBodyProps {
  className?: string;
  children: React.ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({ className = "", children }) => {
  return <tbody className={className}>{children}</tbody>;
};

interface TableRowProps {
  className?: string;
  children: React.ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({ className = "", children }) => {
  return (
    <tr className={`border-b border-gray-200 hover:bg-gray-50 ${className}`.trim()}>
      {children}
    </tr>
  );
};

interface TableCellProps {
  className?: string;
  children: React.ReactNode;
  isHeader?: boolean;
}

export const TableCell: React.FC<TableCellProps> = ({
  className = "",
  isHeader = false,
  children,
}) => {
  const Tag = isHeader ? "th" : "td";
  const baseClass = isHeader
    ? "px-6 py-3 font-semibold text-gray-700"
    : "px-6 py-4 text-gray-900";

  return (
    <Tag className={`${baseClass} ${className}`.trim()}>{children}</Tag>
  );
};
