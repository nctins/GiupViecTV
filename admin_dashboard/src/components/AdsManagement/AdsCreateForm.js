import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams  } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Input, Col, Row, Button, Breadcrumb, BreadcrumbItem, FormGroup, Label, Form,FormText } from "reactstrap";
import useAxios from "../../hooks/useAxios";
import FileBase64 from 'react-file-base64';
import LoadingView from '../LoadingView';

const AdsCreateForm = ({props}) => {
    const { id } = useParams();
    const { authAxios } = useAxios();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [image,setImage] = useState();
    const [isActive,setIsActive] = useState(false);
    const [message,setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAds();
    },[])
    
      const getAds = () => {
        if(id){
            setIsLoading(true);
            authAxios
            .get("advertisement/" + id)
            .then(async (response) => {
                let data = response.data.data;
                console.log(data);
                if(data){
                    setTitle(data.ads_title);
                    setContent(data.ads_content);
                    setIsActive(!data.is_delete);
                    setStartDate(data.start_date.substr(0,10));
                    setEndDate(data.end_date.substr(0,10));
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
    }

    const checkUpdate = () => {
        if(title.length === 0){
            setMessage("Hãy nhập tiêu đề quảng cáo!");
            return false;
        }else{
            setMessage("");
        }
        if(content.length === 0 ){
            setMessage("Hãy nhập nội dung quảng cáo!");
            return false;
        }else{
            setMessage("");
        }
        if(startDate.length === 0){
            setMessage("Hãy nhập ngày bắt đầu quảng cáo!");
            return false;
        }else{
            setMessage("");
        }
        if(endDate.length === 0){
            setMessage("Hãy nhập ngày kết thúc quảng cáo!");
            return false;
        }else{
            setMessage("");
        }
        return true;
    }
    
    const onSubmitUpdate = () => {
        let isValid = checkUpdate();
        if(!isValid) return;
        setIsLoading(true);
        authAxios
            .put("advertisement/" + id,{
                title: title,
                content: content,
                image: image,
                start_date: startDate,
                end_date: endDate,
                is_delete: !isActive,
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
                setMessage(error.response.data);
            }
            setIsLoading(false);
        });
    }

    const checkCreate = () => {
        if(title.length === 0){
            setMessage("Hãy nhập tiêu đề quảng cáo!");
            return false;
        }else{
            setMessage("");
        }
        if(content.length === 0 ){
            setMessage("Hãy nhập nội dung quảng cáo!");
            return false;
        }else{
            setMessage("");
        }
        // console.log(startDate);
        if(startDate.length === 0){
            setMessage("Hãy nhập ngày bắt đầu quảng cáo!");
            return false;
        }else{
            setMessage("");
        }
        if(endDate.length === 0){
            setMessage("Hãy nhập ngày kết thúc quảng cáo!");
            return false;
        }else{
            setMessage("");
        }
        if(!image){
            setMessage("Hãy chọn hình ảnh cho quảng cáo!");
            return false;
        }else{
            setMessage("");
        }
        return true;
    }

    const onSubmitCreate = () => {
        let isValid = checkCreate();
        if(!isValid) return;
        setIsLoading(true);
        authAxios
            .post("advertisement",{
                title: title,
                content: content,
                image: image,
                start_date: startDate,
                end_date: endDate,
            })
        .then(async (response) => {
            let data = response.data.data;
            console.log(data);
            setMessage(data);
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
            <BreadcrumbItem active>
                <a href="/#/AdsManagement">Quảng cáo</a>
            </BreadcrumbItem>
            {id ? (<BreadcrumbItem active>Cập nhật</BreadcrumbItem>) : (<BreadcrumbItem active>Tạo mới</BreadcrumbItem>)}
        </Breadcrumb>
        <Row>
            <Col>
                <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <i className="bi bi-badge-ad me-2"> </i>
                    Tạo mới quảng cáo
                </CardTitle>
                <div className="col-12 align-middle text-center mt-1 mb-0">
                    {
                    message.includes("thành công") ? 
                    (<h6 className='text-primary mb-0'>{message}</h6>) 
                    : (<h6 className='text-danger mb-0'>{message}</h6>)
                    }
                </div>
                <CardBody>
                    <Form>
                    <FormGroup>
                        <Label for="title">Tên quảng cáo</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Tiêu đề quảng cáo"
                            value={title}
                            onChange={(e) => {setTitle(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Nội dung quảng cáo</Label>
                        <Input 
                            id="content" 
                            name="content" 
                            type="textarea" 
                            value={content}
                            onChange={(e) => {setContent(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-6">
                            <Label for="startDate">Ngày bắt đầu</Label>
                            <Input
                            id="startDate"
                            name="startDate"
                            placeholder="Nhập ngày voucher bắt đầu hoạt động"
                            value={startDate}
                            onChange={(e) => {setStartDate(e.target.value)}}
                            type="date"
                            />
                        </div>
                        <div className="col-6">
                            <Label for="endDate">Ngày kết thúc</Label>
                            <Input
                            id="endDate"
                            name="endDate"
                            placeholder="Nhập ngày kết thúc voucher"
                            value={endDate}
                            onChange={(e) => {setEndDate(e.target.value)}}
                            type="date"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className='row d-flex flex-direction-column'>
                        <Label for="exampleFile">Hình ảnh quảng cáo</Label>
                        <FileBase64 className="row" multiple={ false } onDone={ (files) => {setImage(files.base64)} } />
                        <FormText>
                        </FormText>
                    </FormGroup>
                    {id ? 
                        (<FormGroup check>
                            <Input id="active" name="active" type="checkbox" checked={isActive} onChange={() => {setIsActive(!isActive)}} /> 
                            <Label for="active" check>Hiệu lực</Label>
                        </FormGroup>) 
                        : (null)
                    }
                    {id ? (<Button onClick={onSubmitUpdate}>Cập nhật</Button>) : (<Button onClick={onSubmitCreate}>Thêm</Button>)}
                    </Form>
                </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
  );
};

export default AdsCreateForm;
