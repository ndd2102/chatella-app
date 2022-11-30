import { useParams } from "react-router-dom";
import { useStore } from "../../state/storeHooks";
import { SidebarComponent } from "../../components/Sidebar/Sidebar";
import { Profile } from "../../types/profile";
import Task from "../../components/Task/Task";
import Chat from "../../components/Chat/Chat";

function Workspace() {
  const id = useParams();
  const { profile } = useStore(({ app }) => app);
  const profileInfo: Profile = profile.unwrap();

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-slate-50 text-black">
      <SidebarComponent profile={profileInfo} />
      <div className="ml-64 h-screen grid grid-cols-3">
        <div className="col-span-2">
          <Task />
        </div>
        <div className="col-span-1">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
