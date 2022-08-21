import { Module } from "../../../lib/types/Module";
import SidebarRedirect from "../SidebarRedirect";
import SidebarRedirectIcon from "../SidebarRedirectIcon";
import SidebarToggle from "../SidebarToggle";

function ModuleOnSidebar(props: { module: Module; courseId: number }) {
  const { module, courseId } = props;
  return (
    <div>
      <SidebarToggle
        highlighted={false}
        title={module.name}
        indent={0}
        primaryFunction="TOGGLE"
      >
        {module.items?.map((item) => {
          return (
            <SidebarRedirect
              highlighted={false}
              // @ts-ignore
              indent={item.indent + 1}
              redirect={item.htmlUrl}
              title={item.title}
            >
              {(() => {
                if (item.type === "Page") {
                  return <SidebarRedirectIcon type="PAGE" />;
                } else {
                  <SidebarRedirectIcon type="DEFAULT" />;
                }
              })()}
            </SidebarRedirect>
          );
        })}
      </SidebarToggle>
    </div>
  );
}

export default ModuleOnSidebar;
