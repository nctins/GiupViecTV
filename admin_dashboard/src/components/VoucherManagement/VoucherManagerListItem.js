import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Input, Col, Row, Button, Breadcrumb, BreadcrumbItem, FormGroup, Label} from "reactstrap";
import VoucherItem from "./VoucherItem";
import useAxios from "../../hooks/useAxios";
import LoadingView from '../LoadingView';


const VoucherManagerListItem = () => {
  const navigate = useNavigate();
  const { authAxios } = useAxios();
  const [vouchers,setVouchers] = useState([])
  const [filter,setFilter] = useState({name:"",isActive:1});
  const [message,setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getVoucher();
  },[filter])

  const getVoucher = () => {
    setIsLoading(true);
    authAxios
      .post("vouchers",{
        voucher_name: filter.name,
        is_delete: !filter.isActive
      })
      .then(async (response) => {
        let data = response.data.data;
        console.log(data);
        if(Array.isArray(data) && data.length > 0){
          setVouchers(data);
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

  return (
    <div>
      {isLoading && <LoadingView />}
      <Breadcrumb>
        <BreadcrumbItem active>Khuyến mãi</BreadcrumbItem>
      </Breadcrumb>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Tìm kiếm khuyến mãi</CardTitle>
          <div className="d-flex flex-direction-row">
            <div className=" col-11 ms-2 d-flex">
              <Input
                id="search"
                name="name"
                placeholder="Tìm kiếm khuyến mãi theo tên"
                value={filter.name}
                onChange={(e) => {setFilter({...filter,name:e.target.value})}}
              />
              <FormGroup check className="ms-2 col-1 ">
                <Input 
                  type="checkbox" 
                    name="active" 
                    id="active" 
                    checked={filter.isActive} 
                    onChange={(e) => {setFilter({...filter,isActive:!filter.isActive})}} /> 
                <Label for="active" check>Hiệu lực</Label>
              </FormGroup>
            </div>
            <div className="ms-1 col-1 d-flex justify-content-center">
              <Button className="btn ms-2" size="md" color="primary" onClick={() => {navigate("/VoucherManagement/Create")}}>tạo mới</Button>
            </div>
          </div>
          <div className="col-12 align-middle text-center mt-1 mb-0">
            {message && <h6 className='text-danger mb-0'>{message}</h6>}
          </div>
        </CardBody>
      </Card>
      <Row>
        {vouchers.map((voucher, index) => (
          <Col sm="6" lg="6" xl="4" key={index}>
            <VoucherItem
              voucher={voucher}
              color="primary"
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VoucherManagerListItem;
