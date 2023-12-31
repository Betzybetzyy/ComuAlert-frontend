import React from "react";

export const TH = ({ label }) => {
  return (
    <th
      scope="col"
      className="px-6 py-4 font-medium text-slate-900 text-center sm:text-left"
      colSpan={label === "" ? 2 : 1}
    >
      {label}
    </th>
  );
};

export const TD = ({ children, className = "" }) => {
  return <td className={`px-2 sm:px-6 py-4 ${className}`}>{children}</td>;
};

export const TR = ({ children }) => {
  return <tr className="text-xs sm:text-base hover:bg-gray-50">{children}</tr>;
};

export const Table = ({ titles, children }) => {
  return (
    <div className="border border-gray-200 shadow-md m-1 rounded-xl">
      <table className="w-full border-collapse bg-white text-left text-sm text-slate-600 rounded-xl">
        <thead>
          <tr>
            {titles.map((title) => (
              <TH key={`${title}-${Math.random(9999)}`} label={title} />
            ))}
          </tr>
        </thead>
        <tbody className="overflow-x-auto divide-y divide-gray-100 border-t border-gray-100">
          {children}
        </tbody>
      </table>
    </div>
  );
};
