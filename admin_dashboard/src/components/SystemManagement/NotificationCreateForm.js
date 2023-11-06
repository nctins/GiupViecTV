import {Card,Row,Col,CardTitle,CardBody,Button,Form,FormGroup,Label,Input,FormText} from "reactstrap";
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams  } from "react-router-dom";
import {TYPE_NOTIFICATION, ICON_CODE, USER_ROLE, NOTIFICATION_MODULE} from "../../constants/app_contants"
import useAxios from "../../hooks/useAxios";
  
  const NotificationCreateForm = ({setIsLoading}) => {
    const { authAxios } = useAxios();
    const [typeNoti,setTypeNoti] = useState(TYPE_NOTIFICATION.SYSTEM);
    const [typeUser,setTypeUser] = useState(USER_ROLE.CUSTOMER_NA);
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [lstCustomerId,setLstCustomerId] = useState([]);
    const [lstHelperId,setLstHelperId] = useState([]);
    const [message,setMessage] = useState("");

    useEffect(() => {
        getListUser();
    },[])
    
    const getListUser = () => {
        setIsLoading(true);
        authAxios
            .post("admin/UserManagement/view")
            .then(async (response) => {
                let data = response.data.data;
                let lstCustomer = [];
                let lstHelper = [];
                if(Array.isArray(data) && data.length > 0){
                    data.map((user) => {
                        if(user.role === USER_ROLE.CUSTOMER){
                            lstCustomer.push(user.user_id);
                        }else if(user.role === USER_ROLE.HELPER){
                            lstHelper.push(user.user_id);
                        }
                    })
                    console.log(lstCustomer);
                    console.log(lstHelper);
                    setLstCustomerId(lstCustomer);
                    setLstHelperId(lstHelper);
                }else{
                    console.log(data);
                }
                setIsLoading(false);
            })
            .catch(async (error) => {
                if (error.response) {
                    console.log(error.response.data);
                }
                setIsLoading(false);
            });
    }

    const checkFrom = () => {
        if (title.length === 0 || title === "") {
            setMessage("Tiêu đề thông báo không được trống.");
            return false;
        }
        if (content.length === 0 || content === "") {
            setMessage("Nội dung thông báo không được trống.");
            return false;
        } 
        setMessage("");
        return true;
    }

    const createNotification = () => {
        if (!checkFrom()) {
            console.log("error");
            return;
        }

        let lst_user = [];
        if(typeUser == USER_ROLE.HELPER_NA){
            lst_user = lstHelperId;
        }else if(typeUser == USER_ROLE.CUSTOMER_NA){
            lst_user = lstCustomerId;
        }else{
            lst_user = lstCustomerId.concat(lstHelperId);
        }
        setIsLoading(true);
        authAxios
            .post("/notification/create",{
                lst_user: lst_user,
                title: title,
                content: content,
                icon_code: typeNoti == TYPE_NOTIFICATION.COUPON ? ICON_CODE.COUPON : ICON_CODE.LOGO,
                notification_module: typeNoti == TYPE_NOTIFICATION.COUPON ? NOTIFICATION_MODULE.COUPON : NOTIFICATION_MODULE.NONE,
            })
            .then(async (response) => {
                let data = response.data.data;
                // console.log(data);
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

    const onChangeTypeNoti = (e) => {
        if(e.target.value == TYPE_NOTIFICATION.COUPON){
            setTypeUser(USER_ROLE.CUSTOMER);
        }
        setTypeNoti(e.target.value);
    }
    
    return (
      <Row>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              Tạo thông báo tới người dùng
            </CardTitle>
            <div className="mt-2 d-flex justify-content-center text-danger">
                {
                message.includes("thành công") ? 
                (<h6 className='text-primary mb-0'>{message}</h6>) 
                : (<h6 className='text-danger mb-0'>{message}</h6>)
                }
            </div>
            <CardBody>
              <Form>
                <div className="row col-12">
                <FormGroup className="col-4">
                    <Label for="title">Tiêu đề: </Label>
                    <Input
                    id="title"
                    name="title"
                    placeholder="Tiêu đề thông báo"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                    />
                </FormGroup>
                <FormGroup className="col-4">
                    <Label for="type_notification">Loại thông báo: </Label>
                    <Input 
                        id="type_notification" 
                        name="select" 
                        type="select"
                        value={typeNoti}
                        onChange={(e) => onChangeTypeNoti(e)}
                    >
                        <option value={TYPE_NOTIFICATION.SYSTEM}>{TYPE_NOTIFICATION.SYSTEM_NA}</option>
                        <option value={TYPE_NOTIFICATION.COUPON}>{TYPE_NOTIFICATION.COUPON_NA}</option>
                    </Input>
                </FormGroup>
                <FormGroup className="col-4">
                    <Label for="type_user">Thông báo tới: </Label>
                    <Input 
                        id="type_user" 
                        name="select" 
                        type="select"
                        value={typeUser}
                        onChange={(e) => {setTypeUser(e.target.value)}}
                    >
                        <option value={USER_ROLE.CUSTOMER_NA}>{USER_ROLE.CUSTOMER_NA}</option>
                        <option disabled={typeNoti == TYPE_NOTIFICATION.COUPON ? true : false} value={USER_ROLE.ALL}>{USER_ROLE.ALL}</option>
                        <option disabled={typeNoti == TYPE_NOTIFICATION.COUPON ? true : false} value={USER_ROLE.HELPER_NA}>{USER_ROLE.HELPER_NA}</option>
                    </Input>
                </FormGroup>
                </div>
                <FormGroup>
                    <Label for="content">nội dung: </Label>
                    <Input 
                        id="content" 
                        name="text" 
                        type="textarea" 
                        value={content}
                        onChange={(e) => {setContent(e.target.value)}}
                    />
                </FormGroup>
                <Button onClick={createNotification}>Tạo thông báo</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
  
  export default NotificationCreateForm;
  