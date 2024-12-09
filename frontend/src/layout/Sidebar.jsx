import React from "react";
import { NavLink } from "react-router-dom";
import { Users, MessageSquare, Package, BarChart2, Home } from "lucide-react";

export function Sidebar() {
  const navItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/dashboard/clients", icon: Users, label: "Clients" },
    {
      to: "/dashboard/communications",
      icon: MessageSquare,
      label: "Communications",
    },
    { to: "/dashboard/deliverables", icon: Package, label: "Deliverables" },
    { to: "/dashboard/feedback", icon: BarChart2, label: "Feedback" },
  ];

  return React.createElement(
    "aside",
    { className: "w-64 bg-white border-r border-gray-200" },
    React.createElement(
      "div",
      { className: "p-4" },
      React.createElement(
        "h1",
        { className: "text-xl font-bold text-gray-800" },
        "CRM Panel"
      )
    ),
    React.createElement(
      "nav",
      { className: "mt-4" },
      navItems.map(({ to, icon: Icon, label }) =>
        React.createElement(NavLink, {
          key: to,
          to: to,
          className: ({ isActive }) =>
            `flex items-center px-4 py-2 text-sm font-medium ${
              isActive
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            }`,
          children: [
            React.createElement(Icon, {
              key: "icon",
              className: "w-5 h-5 mr-3",
            }),
            label,
          ],
        })
      )
    )
  );
}
