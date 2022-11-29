import { DarkThemeToggle, Flowbite, Tabs } from "flowbite-react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { SidebarComponent } from "../../components/Sidebar/Sidebar";

function Workspace() {
  const id = useParams();
  console.log(id);

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-black">
      <SidebarComponent />
      <div className="ml-64 h-screen">
        <h1>Channel Name</h1>
      </div>
      {/* <Flowbite>
        <DarkThemeToggle />
      </Flowbite> */}
    </div>
  );
}

export default Workspace;
