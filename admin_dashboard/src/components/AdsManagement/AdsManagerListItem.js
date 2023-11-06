import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle,FormGroup, Label, Input, Col, Row, Button, Breadcrumb, BreadcrumbItem } from "reactstrap";
import AdsItem from "./AdsItem";
import useAxios from "../../hooks/useAxios";
import LoadingView from '../LoadingView';

const AdsManagerListItem = () => {
  const navigate = useNavigate();
  const { authAxios } = useAxios();
  const [lstAds,setLstAds] = useState([])
  const [filter,setFilter] = useState({title:"",isActive:1});
  const [message,setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAds();
  },[filter])

  const getAds = () => {
    setIsLoading(true);
    authAxios
      .post("advertisements",{
        title: filter.title,
        is_delete: !filter.isActive
      })
      .then(async (response) => {
        let data = response.data.data;
        console.log(data);
        if(Array.isArray(data) && data.length > 0){
          setLstAds(data);
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
        <BreadcrumbItem active>Quảng cáo</BreadcrumbItem>
      </Breadcrumb>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Tìm kiếm quảng cáo</CardTitle>
          <div className="d-flex flex-direction-row">
            <div className=" col-11 ms-2 d-flex">
              <Input
                id="search"
                name="name"
                placeholder="Tìm kiếm quảng cáo theo tên"
                value={filter.title}
                onChange={(e) => {setFilter({...filter,title:e.target.value})}}
              />
              <FormGroup check className="ms-2 col-1 ">
                <Input 
                  type="checkbox" 
                  id="active" 
                  name="active"
                  checked={filter.isActive} 
                  onChange={(e) => {setFilter({...filter,isActive:!filter.isActive})}}
                /> 
                <Label for="active" check>Hiệu lực</Label>
              </FormGroup>
            </div>
            <div className="ms-1 col-1 d-flex justify-content-center">
              <Button className="btn ms-2" size="md" color="primary" onClick={() => {navigate("/AdsManagement/Create")}}>tạo mới</Button>
            </div>
          </div>
          
        </CardBody>
      </Card>
      <Row>
        {lstAds.map((ads, index) => (
          <Col sm="6" lg="6" xl="4" key={index}>
            <AdsItem
              ads={ads}
              color="primary"
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdsManagerListItem;
