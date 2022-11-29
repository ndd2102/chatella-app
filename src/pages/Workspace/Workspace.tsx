import { useParams } from "react-router-dom";
import { useStore } from "../../state/storeHooks";
import { SidebarComponent } from "../../components/Sidebar/Sidebar";
import { Profile } from "../../types/profile";

function Workspace() {
  const id = useParams();
  const { profile } = useStore(({ app }) => app);
  const profileInfo: Profile = profile.unwrap();

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-black">
      <SidebarComponent profile={profileInfo} />
      <div className="ml-64 h-screen">
        <h1>Channel Name</h1>
      </div>
    </div>
  );
}

export default Workspace;
