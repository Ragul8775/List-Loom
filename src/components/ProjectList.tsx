// components/ProjectList.tsx

import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { PiDotsSixVerticalBold } from "react-icons/pi";
interface Project {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
}

const initialProjects: Project[] = [
  {
    id: "1",
    name: "Ecommerce ",
    description: "Website Design",
    dueDate: new Date("2023-03-15"),
  },
  {
    id: "2",
    name: "Ardan Coffee",
    description: "Branding",
    dueDate: new Date("2023-03-24"),
  },
  {
    id: "3",
    name: "Aerotech",
    description: "Email Marketing",
    dueDate: new Date("2023-03-30"),
  },
];

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  return (
    <div className="p-4 w-1/2 mx-auto shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">My Project</h2>
      <ReactSortable
        list={projects}
        setList={setProjects}
        className="space-y-4"
        handle=".drag-handle"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center w-full"
          >
            <div className="flex items-center">
              <PiDotsSixVerticalBold className="mr-3 text-gray-400 cursor-move drag-handle w-6 h-6" />
              <div>
                <div className="font-semibold">{project.name}</div>
                <div className="text-gray-500">{project.description}</div>
              </div>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCalendar}
                className="mr-2 text-gray-400"
              />
              <span className="text-gray-700">
                {format(project.dueDate, "MMM d")}
              </span>
            </div>
          </div>
        ))}
      </ReactSortable>
      <button className="flex justify-center items-center gap-4 mt-4 w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 rounded border-2 border-dashed border-gray-900">
        Show All
      </button>
    </div>
  );
};

export default ProjectList;
