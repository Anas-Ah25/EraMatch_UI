import { Home, Briefcase, Users, Settings, Bell } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: any) => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <div 
      className="fixed left-0 top-0 h-full w-[96px] hover:w-[220px] bg-[#f7fafe] flex flex-col items-center justify-center gap-[16px] rounded-br-[24px] rounded-tr-[24px] transition-all duration-300 ease-in-out group z-50 overflow-hidden"
    >
      {/* Home Button */}
      <button 
        className={`relative rounded-[24px] h-[64px] w-[64px] flex items-center justify-center transition-all duration-300 overflow-hidden ${
          activePage === 'dashboard' 
            ? 'bg-[#dad3ff]' 
            : 'hover:bg-[#ede9ff]'
        } group-hover:w-[188px] group-hover:justify-start group-hover:px-[16px]`}
        onClick={() => onNavigate('dashboard')}
      >
        <Home size={32} className="text-[#4834AB] shrink-0" strokeWidth={2} />
        <span 
          className={`absolute left-[80px] font-['Arimo',sans-serif] text-[16px] leading-[24px] text-[#4834AB] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:relative group-hover:left-0 group-hover:ml-[12px] transition-all duration-300 ${
            activePage === 'dashboard' ? 'font-medium' : ''
          }`}
        >
          Home
        </span>
      </button>

      {/* Projects Button */}
      <button 
        className={`relative rounded-[24px] h-[64px] w-[64px] flex items-center justify-center transition-all duration-300 overflow-hidden ${
          activePage === 'projects' 
            ? 'bg-[#dad3ff]' 
            : 'hover:bg-[#ede9ff]'
        } group-hover:w-[188px] group-hover:justify-start group-hover:px-[16px]`}
        onClick={() => onNavigate('projects')}
      >
        <Briefcase size={32} className="text-[#4834AB] shrink-0" strokeWidth={2} />
        <span 
          className={`absolute left-[80px] font-['Arimo',sans-serif] text-[16px] leading-[24px] text-[#4834AB] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:relative group-hover:left-0 group-hover:ml-[12px] transition-all duration-300 ${
            activePage === 'projects' ? 'font-medium' : ''
          }`}
        >
          Projects
        </span>
      </button>

      {/* Alerts Button */}
      <button 
        className={`relative rounded-[24px] h-[64px] w-[64px] flex items-center justify-center transition-all duration-300 overflow-hidden ${
          activePage === 'alerts' 
            ? 'bg-[#dad3ff]' 
            : 'hover:bg-[#ede9ff]'
        } group-hover:w-[188px] group-hover:justify-start group-hover:px-[16px]`}
        onClick={() => onNavigate('alerts')}
      >
        <div className="relative">
          <Bell size={32} className="text-[#4834AB] shrink-0" strokeWidth={2} />
          <div className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-[#ef4444] flex items-center justify-center">
            <span className="font-['Arimo',sans-serif] text-[10px] text-white">3</span>
          </div>
        </div>
        <span 
          className={`absolute left-[80px] font-['Arimo',sans-serif] text-[16px] leading-[24px] text-[#4834AB] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:relative group-hover:left-0 group-hover:ml-[12px] transition-all duration-300 ${
            activePage === 'alerts' ? 'font-medium' : ''
          }`}
        >
          Alerts
        </span>
      </button>

      {/* Candidates Button */}
      <button 
        className="relative rounded-[24px] h-[64px] w-[64px] flex items-center justify-center transition-all duration-300 overflow-hidden hover:bg-[#ede9ff] group-hover:w-[188px] group-hover:justify-start group-hover:px-[16px]"
      >
        <Users size={32} className="text-[#4834AB] shrink-0" strokeWidth={2} />
        <span 
          className="absolute left-[80px] font-['Arimo',sans-serif] text-[16px] leading-[24px] text-[#4834AB] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:relative group-hover:left-0 group-hover:ml-[12px] transition-all duration-300"
        >
          Candidates
        </span>
      </button>

      {/* Settings Button */}
      <button 
        className="relative rounded-[24px] h-[64px] w-[64px] flex items-center justify-center transition-all duration-300 overflow-hidden hover:bg-[#ede9ff] group-hover:w-[188px] group-hover:justify-start group-hover:px-[16px]"
      >
        <Settings size={32} className="text-[#4834AB] shrink-0" strokeWidth={2} />
        <span 
          className="absolute left-[80px] font-['Arimo',sans-serif] text-[16px] leading-[24px] text-[#4834AB] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:relative group-hover:left-0 group-hover:ml-[12px] transition-all duration-300"
        >
          Settings
        </span>
      </button>
    </div>
  );
}