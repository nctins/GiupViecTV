import {Card,Row,Col,CardTitle,CardBody,Button,Form,FormGroup,Label,Input,FormText} from "reactstrap";
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams  } from "react-router-dom";
import {TYPE_NOTIFICATION, ICON_CODE, USER_ROLE} from "../../constants/app_contants"
import useAxios from "../../hooks/useAxios";
import UpdateSystemControlForm from "./UpdateSystemControlForm";
  
  const SettingSystemForm = ({setIsLoading}) => {
    const { authAxios } = useAxios();
    const [message,setMessage] = useState("");
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [lstSystemControl, setLstSystemControl] = useState([]);

    useEffect(() => {
        getSystemColtrol();
    },[])
    
    const getSystemColtrol = () => {
      setIsLoading(true);
      authAxios
          .get("/admin/UserManagement/system_control")
          .then(async (response) => {
            let data = response.data.data;
            setLstSystemControl(data);
            setIsLoading(false);
          })
          .catch(async (error) => {
            if (error.response) {
                console.log(error.response.data);
            }
            setIsLoading(false);
          });
    }

    const checkInputUpdate = () => {
      let lst = lstSystemControl.filter((ele) => ele.value.length === 0);
      if(lst.length > 0) return false;
      return true;
    }

    const updateSystemControl = () => {
        if(!checkInputUpdate()){
          setMessage("Vui lòng nhập đầy đủ giá trị của thông số hệ thống!");
          return;
        }
        setIsLoading(true);
        authAxios
            .put("/admin/UserManagement/system_control/update",{
              data: lstSystemControl
            })
            .then(async (response) => {
                let data = response.data.data;
                // console.log(response.data);
                setMessage(data);
                setIsLoading(false);
            })
            .catch(async (error) => {
                if (error.response) {
                  console.log(error.response.data);
                }
                setIsLoading(false);
            });
    }

    const checkInputCreate = () => {
      if(name.length === 0){
        return "Vui lòng nhập tên giá trị!";
      }
      if(name.includes(" ")){
        return "Vui lòng nhập tên giá trị không có khoảng trắng và các ký tự đặc biệt!"
      }
      if(value.length === 0){
        return "Vui lòng nhập giá trị!";
      }
      return "";
    }

    const create = () => {
      let msg = checkInputCreate();
      if(msg.length > 0){
        setMessage(msg);
        return;
      }
      setIsLoading(true);
        authAxios
            .post("/admin/UserManagement/system_control/create",{
              data: {
                name: name,
                value: value
              }
            })
            .then(async (response) => {
                let data = response.data.data;
                // console.log(response.data);
                setMessage(data);
                setIsLoading(false);
                getSystemColtrol();
            })
            .catch(async (error) => {
                if (error.response) {
                  console.log(error.response.data);
                }
                setIsLoading(false);
            });
    }

    const onchangeName = (e) => {
      const result = (e.target.validity.valid) ? e.target.value : name;
      setName(result);
  }

    const displayListSystemControl = () => {
      return (
        <Form className="mt-2">
          {lstSystemControl.map((data, index) => {
            return <UpdateSystemControlForm key={index} data={data} lstSystemControl={lstSystemControl} setLstSystemControl={setLstSystemControl} />
          })}
          <Button onClick={updateSystemControl}>Cập nhật</Button>
        </Form>
      )
    }
    
    return (
      <Row>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-sliders2 me-2"> </i>
              Cài đặt thông tin hệ thống
            </CardTitle>
            <div className="mt-2 d-flex justify-content-center text-danger">
                {
                message.includes("thành công") ? 
                (<h6 className='text-primary mb-0'>{message}</h6>) 
                : (<h6 className='text-danger mb-0'>{message}</h6>)
                }
            </div>
            <CardBody>
              <Form className="border-bottom">
                <div className="row col-12">
                <FormGroup className="col-5">
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nhập tên giá trị (VD: service_fee, tax, min_date, ...)"
                    pattern="[a-z|A-Z]+[a-z|A-Z|_|0-9]*"
                    value={name}
                    onChange={onchangeName}
                  />
                </FormGroup>
                <FormGroup className="col-5">
                  <Input
                    id="value"
                    name="value"
                    placeholder="Nhập giá trị"
                    value={value}
                    onChange={(e) => {setValue(e.target.value)}}
                  />
                </FormGroup>
                <FormGroup className="col-2 d-flex justify-content-end">
                  <Button className="btn" onClick={create}>Thêm mới</Button>
                </FormGroup>
                </div>
              </Form>
              {lstSystemControl.length > 0 && displayListSystemControl()}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
  
  export default SettingSystemForm;
  