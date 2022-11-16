import React, {useState, useEffect} from "react";
import { getProfile } from "../../services/api"
import {
  Button,
  Modal
} from "flowbite-react";
import {Profile} from "../../types/profile"


export function UserInfo() {
  
  const [show, setShow] = useState(false);
  useEffect(() => {
    async function loadUser() {
      const user = await getProfile();
      console.log(user)
    }
    loadUser()
  },[])
  // user.data.data.name
  //  let users : Profile = {
  //    name : user.data.data.name,
  //    image : user.data.data.avatar,
  //    sex :user.data.data.sex,
  //    address : user.data.data.address,
  //    email : user.data.data.email,
  //  dateOfBirth : user.data.data.dob,
  //    nation : user.data.data.national,
  //   createdDate : user.data.data.createdDate,
  //    idCard: user.data.data.idCard,
  //    phoneNumber : user.data.data.phone,
  //    bio :user.data.data.id
  //  }
    return (
        <div>
            <React.Fragment>
        <Button
          className="bg-slate-50 text-blue-600 hover:bg-slate-100"
          onClick={() => setShow(true)}
        >
          user
        </Button>
        <Modal
          show={show}
          size="md"
          popup={true}
          id="UserInModal"
          onClose={() => setShow(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="flex flex-col flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
          <div className="relative -mt-48 mx-auto mb-6">
                        <img src="https://www.kibrispdr.org/data/8/avatar-icon-png-0.png"></img>
                    </div>
                    <div className="text-xl border-b-2 -mt-5 mb-10">NguyenDucDung<b className="text-gray-400">#20020181</b></div>
                    <div className="w-4/5 grid grid-cols-2 text-center">
                    <div>
                      <b>NgaySinh</b>
                      <p>21022002</p>
                    </div>
                    <div>
                      <b>Address</b>
                      <p>HaNoi</p>
                    </div>
                    <div>
                      <b>Sex</b>
                      <p>Male</p>
                    </div>
                    <div>
                      <b>Phone</b>
                      <p>0972485802</p>
                    </div>
                    <div>
                      <b>National</b>
                      <p>VietNam</p>
                    </div>
                    </div>
</div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
        </div>
    )
    
}