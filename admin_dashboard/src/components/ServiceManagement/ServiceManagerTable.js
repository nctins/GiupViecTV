import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Label, Input, FormGroup } from "reactstrap";
import useAuthContext from "../../hooks/useAuthContext";
import useAxios from "../../hooks/useAxios";
import ServiceRowTable from './ServiceRowTable';
import LoadingView from '../LoadingView';

const ServiceTable = () => {
  const navigate = useNavigate();
  const { authAxios } = useAxios();
  const authContext = useAuthContext();
  const [services,setServices] = useState([])
  const [name,setName] = useState("");
  const [message,setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getService();
  },[name])

  const getService = () => {
    setIsLoading(true);
    authAxios
      .get("services")
      .then(async (response) => {
        let data = response.data.data;
        // console.log(data);
        if(Array.isArray(data) && data.length > 0){
            setServices(data);
        }else{
          setMessage(data);
        }
        setIsLoading(false);
      })
      .catch(async (error) => {
        if (error.response) {
          console.log(error.response.data);
          setMessage(error.response.data);
        }
        setIsLoading(false);
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
          <CardTitle tag="h5">Quản lý dịch vụ</CardTitle>
          <div className="row pe-4">
            <div className='col-11'>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Quản lý các dịch vụ làm việc
              </CardSubtitle>
            </div>
            <Button className="mr-5 btn col-1" size="md" color="primary" onClick={() => {navigate("/ServiceManagement/Create")}}>tạo mới</Button>
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
                <th className="col-2" >Tên dịch vụ</th>
                <th className="col-5">Mô tả dịch vụ</th>
                <th className="col-2">Loại dịch vụ</th>
                <th className="col-1">Trạng thái</th>
                <th className="col-1 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (<ServiceRowTable key={index} service={service} index={index+1} printMessage={printMessage} getService={getService} setIsLoading={setIsLoading} />))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ServiceTable;
