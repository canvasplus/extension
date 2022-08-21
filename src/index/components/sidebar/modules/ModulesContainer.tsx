import { FiChevronLeft } from "solid-icons/fi";
import { IoArrowBack, IoChevronBack } from "solid-icons/io";
import { Module } from "../../../lib/types/Module";
import ModuleOnSidebar from "./ModuleOnSidebar";

function ModulesContainer(props: {
  modules: Module[];
  courseId: number;
  close(): void;
}) {
  const count = props.modules.length;

  return (
    <div className="p-1">
      <div
        className="flex flex-row gap-2 text-gray items-center p-1 group cursor-pointer"
        onClick={props.close}
      >
        <div className="p-1 rounded-full group-hover:bg-cyan-200 group-hover:text-cyan-500">
          <FiChevronLeft />
        </div>
        <p className="group-hover:hidden">{`Viewing ${count} module${
          count === 1 ? "" : "s"
        }`}</p>
        <p className="hidden group-hover:block">{`Back to Courses`}</p>
      </div>
      {props.modules.map((module) => (
        <ModuleOnSidebar module={module} courseId={props.courseId} />
      ))}
    </div>
  );
}

export default ModulesContainer;
