import { StatCard } from './StatCard';
import { ProjectCard } from './ProjectCard';

interface DashboardProps {
  onViewAllProjects: () => void;
  onViewProject: (projectTitle: string) => void;
}

export function Dashboard({ onViewAllProjects, onViewProject }: DashboardProps) {
  return (
    <div className="h-full w-full">
      <div className="box-border content-stretch flex flex-col gap-[48px] items-start pb-0 pt-[32px] px-[32px]">
        {/* Stats Grid */}
        <div className="gap-[24px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[172px] w-full">
          <StatCard
            value={30}
            title="Applicants"
            subtitle="in the last 30 days"
            trend="down"
          />
          <StatCard
            value={3}
            title="Perfect Match"
            subtitle="on the last 24 hours"
            trend="up"
          />
          <StatCard
            value={1}
            title="Suspicious assessment"
            subtitle="awaiting review"
            hasLink
          />
        </div>

        {/* Opened Projects Section */}
        <div className="content-stretch flex flex-col gap-[24px] w-full">
          {/* Header */}
          <div className="content-stretch flex h-[30px] items-center justify-between w-full">
            <div className="h-[30px]">
              <p className="font-['Arimo',sans-serif] leading-[30px] text-[20px] text-black">
                Opened Projects
              </p>
            </div>
            <button 
              className="font-['Arimo',sans-serif] leading-[24px] text-[#9f9f9f] text-[16px] hover:text-[#7f7f7f] transition-colors"
              onClick={onViewAllProjects}
            >
              View all
            </button>
          </div>

          {/* Projects Container */}
          <div className="bg-[#fefefe] rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] w-full">
            <div className="size-full">
              <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[32px] pt-[32px] px-[32px]">
                <ProjectCard
                  title="Summer Internship"
                  roles={3}
                  applicants="999"
                  isOpen
                  showEditButton={false}
                  onView={() => onViewProject('Summer Internship')}
                />
                <ProjectCard
                  title="Software Engineering II (DevOps Team)"
                  roles={1}
                  applicants={30}
                  isOpen
                  showEditButton={false}
                  onView={() => onViewProject('Software Engineering II (DevOps Team)')}
                />
                <ProjectCard
                  title="Product Migration Project"
                  roles={7}
                  applicants={100}
                  isOpen
                  showEditButton={false}
                  onView={() => onViewProject('Product Migration Project')}
                />
                <ProjectCard
                  title="AI team"
                  roles={3}
                  applicants={100}
                  isOpen
                  showEditButton={false}
                  onView={() => onViewProject('AI team')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}