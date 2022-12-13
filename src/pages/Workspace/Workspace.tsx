import { useStore } from "../../state/storeHooks";
import { SidebarComponent } from "../../components/Sidebar/Sidebar";
import Task from "../../components/Task/Task";
import Chat from "../../components/Chat/Chat";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../services/api";
import { Profile } from "../../types/profile";

function Workspace() {
  const { profile } = useStore(({ app }) => app);
  const { channelList } = useStore(({ workspace }) => workspace);
  const [memberList, setMemberList] = useState<Profile[]>([]);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const channel = channelList.find((findChannel) => {
    return findChannel.id === Number(id);
  });
  const isHost = profile.id === channel?.members[0].userId ? true : false;
  useEffect(() => {
    if (channel === undefined) return;
    const fetchUserList = async () => {
      const list = await Promise.all(
        channel.members.map(async (value) => {
          return await getUserProfile(value.userId);
        })
      );
      setMemberList(list);
    };
    fetchUserList();
  }, [channel, id]);

  return (
    <div className="h-screen flex flex-col flex-auto flex-shrink-0 font-lexend text-black">
      <SidebarComponent
        locationId={Number(id)}
        profile={profile}
        channelInfo={channelList}
      />

      {id && channel ? (
        <div className="ml-72 h-screen grid grid-cols-3">
          <div className="col-span-2">
            <Task
              channel={channel}
              memberList={memberList}
              profile={profile}
              isHost={isHost}
            />
          </div>
          <div className="col-span-1">
            <Chat
              profile={profile}
              memberList={memberList}
              channel={channel}
              isHost={isHost}
            />
          </div>
        </div>
      ) : (
        <div className="pl-64 mx-auto my-auto"></div>
      )}
    </div>
  );
}

export default Workspace;
