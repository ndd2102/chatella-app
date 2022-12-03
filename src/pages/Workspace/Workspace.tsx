import { useStore } from "../../state/storeHooks";
import { SidebarComponent } from "../../components/Sidebar/Sidebar";
import Task from "../../components/Task/Task";
import Chat from "../../components/Chat/Chat";

function Workspace() {
  // const id = useParams();
  const { profile } = useStore(({ app }) => app);

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-slate-50 text-black md:px-20">
      <SidebarComponent profile={profile} />
      <div className="ml-64 h-screen grid grid-cols-3 sm:col-span-1 md:col-span-1">
        <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2">
          <Task />
        </div>
        <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1">
          <Chat avatar={profile.avatar} userId={profile.userId} />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
