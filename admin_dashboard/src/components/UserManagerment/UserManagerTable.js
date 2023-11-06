import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Label, Input, FormGroup } from "reactstrap";
import useAuthContext from "../../hooks/useAuthContext";
import useAxios from "../../hooks/useAxios";
import UserRowTable from "./UserRowTable";
import LoadingView from '../LoadingView';

const UserManagerTable = () => {
  const { authAxios } = useAxios();
  const authContext = useAuthContext();
  const [users,setUsers] = useState([])
  const [name,setName] = useState("");
  const [message,setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUser();
  },[name])

  const getUser = () => {
    // setIsLoading(true);
    authAxios
      .post("admin/UserManagement/view",{
        name: name,
      })
      .then(async (response) => {
        let data = response.data.data;
        if(Array.isArray(data) && data.length > 0){
          setUsers(data);
        }else{
          setMessage(data);
        }
        // setIsLoading(false);
      })
      .catch(async (error) => {
        if (error.response) {
          console.log(error.response.data);
          setMessage(error.response.data);
        }
        // setIsLoading(false);
      });
  }

  const printMessage = (data) => {
    setMessage(data);
  }

  const onSearch = (value) => {
    setName(value);
  }

  return (
    <div>
    {isLoading && <LoadingView />}
      <Card>
        <CardBody>
          <CardTitle tag="h5">Quản lý tài khoản</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Quản lý tài khoản người dùng
          </CardSubtitle>
          <div className="mb-2">
              <Input
                id="search"
                name="name"
                placeholder="Nhập tên tài khoản"
                value={name}
                onChange={(e) => onSearch(e.target.value)}
              />
          </div>
          <div className="col-12 align-middle text-center">
            {
              message.includes("thành công") ? 
              (<h6 className='text-primary'>{message}</h6>) 
              : (<h6 className='text-danger'>{message}</h6>)
            }
          </div>

          <Table className="no-wrap mt-3 align-middle table-hover" responsive borderless>
            <thead>
              <tr>
                <th className="col-1 text-center" >STT</th>
                <th className="col-6" >Thông tin người dùng</th>
                <th className="col-2">Mã số định danh</th>
                <th className="col-1">Loại tài khoản</th>
                <th className="col-1">Trạng thái</th>
                <th className="col-1 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (<UserRowTable key={index} user={user} index={index+1} printMessage={printMessage} getUser={getUser} setIsLoading={setIsLoading} />))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserManagerTable;
