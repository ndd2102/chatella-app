import { useStore } from "../../state/storeHooks";
import { SidebarComponent } from "../../components/Sidebar/Sidebar";
import Task from "../../components/Task/Task";
import Chat from "../../components/Chat/Chat";
import { useLocation, useParams } from "react-router-dom";
import CreateChannel from "../../components/Modal/Channel/CreateChannel/CreateChannel";
import { getChannel } from "../../services/api";
import { useEffect, useState } from "react";
import { Channel } from "../../types/channel";

function Workspace() {
  const { profile } = useStore(({ app }) => app);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [channelInfo, setChannelInfo] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchChannelList = async () => {
      const list = await Promise.all(
        profile.channelID.slice(1).map(async (channelId) => {
          return await getChannel(channelId);
        })
      );
      setChannelInfo(list);
    };
    fetchChannelList();
  }, []);

  const channel = channelInfo.find((obj) => {
    return obj.id === Number(id);
  });
  console.log(Number(id));

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-slate-50 text-black">
      <SidebarComponent
        locationId={Number(id)}
        profile={profile}
        channelInfo={channelInfo}
      />
      <>
        {id ? (
          <div className="ml-64 h-screen grid grid-cols-3">
            <div className="col-span-2">
              <Task channel={channel} />
            </div>
            <div className="col-span-1">
              {/* <Chat avatar={profile.avatar} userId={profile.userId} /> */}
            </div>
          </div>
        ) : (
          <div className="pl-64 mx-auto my-auto"></div>
        )}
      </>
    </div>
  );
}

export default Workspace;
