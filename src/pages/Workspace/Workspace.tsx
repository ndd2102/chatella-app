import { useStore } from "../../state/storeHooks";
import { SidebarComponent } from "../../components/Sidebar/Sidebar";
import Task from "../../components/Task/Task";
import Chat from "../../components/Chat/Chat";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../services/api";
import { Profile } from "../../types/profile";
import CreateChannel from "../../components/Modal/Channel/CreateChannel/CreateChannel";

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
        <div className="pl-64 mx-auto my-auto">
          <div className="w-1/2 mx-auto my-auto text-center font-bold text-blue-400 text-5xl">
            <img
              alt="mockup"
              src="https://www.godfrey.com/application/files/2516/5594/4141/sg-blog-trdshw-pr-p1.gif"
            />
            <div className="text-transparent bg-clip-text bg-gradient-to-tr from-green-300 via-indigo-300 to-red-700">
              This is your Workspace!
            </div>
            <div className="block mx-auto">
              <div className="flex italic items-center mt-2 ml-12 text-base font-light gap-2">
                Now you can create your own channel by clicking this button:
                <CreateChannel />
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-52">
                  <img
                    alt="assigned"
                    src="https://res.cloudinary.com/dkhgw8y83/image/upload/v1670997114/chatella-project/DrawKit_Vector_Illustration_Team_Work_19_diiai6.png"
                  />
                </div>
                <ul className="font-light text-lg text-left">
                  <p className="font-bold">If you are host you also can:</p>
                  <li>✓ Assign task to anyone</li>
                  <li>✓ Set deadlines for each task</li>
                  <li>✓ Drag and drop task among columns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workspace;
