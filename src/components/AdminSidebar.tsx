import {
  Users,
  Settings,
  LayoutDashboard,
  UserCog,
  Archive,
  CreditCard,
} from "lucide-react";

interface AdminSidebarProps {
  activePage:
    | "dashboard"
    | "members"
    | "settings"
    | "delegation"
    | "closed-positions"
    | "subscription";
  onNavigate: (
    page:
      | "dashboard"
      | "members"
      | "settings"
      | "delegation"
      | "closed-positions"
      | "subscription",
  ) => void;
}

export function AdminSidebar({
  activePage,
  onNavigate,
}: AdminSidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-200 flex flex-col items-center justify-center gap-8 rounded-r-3xl">
      <button
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
          activePage === "dashboard"
            ? "bg-indigo-50 text-indigo-600"
            : "text-gray-400 hover:bg-gray-50"
        }`}
        onClick={() => onNavigate("dashboard")}
        title="Dashboard"
      >
        <LayoutDashboard size={24} />
      </button>

      <button
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
          activePage === "subscription"
            ? "bg-indigo-50 text-indigo-600"
            : "text-gray-400 hover:bg-gray-50"
        }`}
        onClick={() => onNavigate("subscription")}
        title="Subscription Management"
      >
        <CreditCard size={24} />
      </button>

      <button
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
          activePage === "members"
            ? "bg-indigo-50 text-indigo-600"
            : "text-gray-400 hover:bg-gray-50"
        }`}
        onClick={() => onNavigate("members")}
        title="Organization Members"
      >
        <Users size={24} />
      </button>

      <button
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
          activePage === "delegation"
            ? "bg-indigo-50 text-indigo-600"
            : "text-gray-400 hover:bg-gray-50"
        }`}
        onClick={() => onNavigate("delegation")}
        title="Recruiter Delegation"
      >
        <UserCog size={24} />
      </button>

      <button
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
          activePage === "closed-positions"
            ? "bg-indigo-50 text-indigo-600"
            : "text-gray-400 hover:bg-gray-50"
        }`}
        onClick={() => onNavigate("closed-positions")}
        title="Closed Positions"
      >
        <Archive size={24} />
      </button>

      <button
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
          activePage === "settings"
            ? "bg-indigo-50 text-indigo-600"
            : "text-gray-400 hover:bg-gray-50"
        }`}
        onClick={() => onNavigate("settings")}
        title="Settings"
      >
        <Settings size={24} />
      </button>
    </div>
  );
}