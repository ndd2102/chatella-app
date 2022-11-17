import { useState } from "react";
import { Sidebar } from "flowbite-react";

export const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <Sidebar
        className="rounded-none w-fit h-full fixed shadow-md"
        collapsed={collapsed}
        aria-label="sidebar"
        onMouseOver={() => setCollapsed(false)}
        onMouseOut={() => setCollapsed(true)}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#">Channel 1</Sidebar.Item>
            <Sidebar.Item href="#">Channel 2</Sidebar.Item>
            <Sidebar.Item href="#">Channel 3</Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};
