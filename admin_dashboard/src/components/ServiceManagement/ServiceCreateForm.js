import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams  } from "react-router-dom";
import { 
    Card, 
    CardBody, 
    CardTitle, 
    CardSubtitle, 
    Input, 
    Col, 
    Row, 
    Button, 
    Breadcrumb, 
    BreadcrumbItem, 
    Tooltip, 
    FormGroup, 
    Label, 
    Form,
    FormText, 
    InputGroup, 
    InputGroupText,
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody,
} from "reactstrap";
import {SERVICE_TYPE, INPUT_FORMAT} from "../../constants/app_contants"
import useAxios from "../../hooks/useAxios";
import FileBase64 from 'react-file-base64';
import LoadingView from '../LoadingView';

const ServiceCreateForm = () => {
    const { id } = useParams();
    const { authAxios } = useAxios();
    const [isLoading, setIsLoading] = useState(false);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [type,setType] = useState(SERVICE_TYPE.NORMAL);
    const [inputFormat,setInputFormat] = useState(0);
    const [seqNb,setSeqNb] = useState(0);
    const [dram,setDram] = useState("");
    const [lstValue,setlstValue] = useState([]);
    const [typeInput,setTypeInput] = useState("1");
    const [dramUnit,setDramUnit] = useState("");
    const [unitPriceTitle,setUnitPriceTitle] = useState("");
    const [stringValue,setStringValue] = useState("");
    const [multiFieldTitle,setMultiFieldTitle] = useState("");
    const [unitPrice,setUnitPrice] = useState("");
    const [estimateTime, setEstimateTime] = useState("");
    const [hasMultiField, setHasMultiField] = useState(true);
    
    const [message,setMessage] = useState("");

    useEffect(() => {
        getService();
    },[])
    
      const getService = () => {
        if(id){
            authAxios
            .get("service/" + id)
            .then(async (response) => {
                let data = response.data.data;
                console.log(data);
                if(data){
                    setName(data.name);
                    setDescription(data.description ? data.description : "");
                    setType(data.service_type);
                    setTypeInput(data.input_format + '');
                    setDram(data.dram);
                    if(data.input_format === INPUT_FORMAT.RADIO && data.items && data.items.length > 0){
                        let lst = [];
                        data.items.forEach(element => {
                            lst.push({name: element.string_value, price: element.unit_price, estimate_time: element.estimate_time});
                        });
                        setlstValue(lst);
                    }else{
                        setDramUnit(data.dram_unit);
                        setMultiFieldTitle(data.multiple_field_title);
                        setUnitPriceTitle(data.unit_price_title);
                        setUnitPrice(data.unit_price);
                        setEstimateTime(data.estimate_time)
                    }
                }
            })
            .catch(async (error) => {
                if (error.response) {
                    console.log(error.response.data);
                }
            });
        }
    }
    
    const onSubmitUpdate = () => {
        setMessage("");
        if(!checkInput()) return;
        setIsLoading(true);
        authAxios
            .put("service/" + id,{
                service_name: name,
                service_type: type,
                service_description: description,
                input_format: typeInput === "0" ? INPUT_FORMAT.RADIO: INPUT_FORMAT.TEXTBOX,
                type_input: typeInput,
                lst_value: lstValue,
                dram: dram,
                dram_unit: dramUnit,
                string_value: stringValue,
                unit_price_title: unitPriceTitle,
                multiple_field_title: multiFieldTitle,
                unit_price: unitPrice,
                estimate_time: typeInput === "0" ? "": estimateTime,
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

    const checkInput = () => {
        if(name.length === 0) {
            setMessage("Hãy nhập tên dịch vụ");
            return false;
        }
        // if(description.length === 0) {
        //     setMessage("Hãy nhập mô tả dịch vụ");
        //     return false;
        // }
        // console.log(dram);
        if(dram.length === 0) {
            setMessage("Hãy nhập tên đại lượng đo lường");
            return false;
        }
        if(typeInput === INPUT_FORMAT.RADIO + ''){
            setUnitPrice("");
            if(lstValue.length === 0) {
                setMessage("Hãy thêm các giá trị đo lường và số tiền");
                return false;
            }
        }else{
            if(dramUnit.length === 0) {
                setMessage("Hãy nhập đơn vị");
                return false;
            }
            if(unitPriceTitle.length === 0) {
                setMessage("Hãy nhập đơn giá");
                return false;
            }
            if(multiFieldTitle.length === 0 && hasMultiField) {
                setMessage("Hãy nhập mô tả đại lượng đơn vị");
                return false;
            }
            if(unitPrice.length === 0) {
                setMessage("Hãy nhập giá tiền");
                return false;
            }
        }
        return true;
    }

    const onSubmitCreate = () => {
        setMessage("");
        if(!checkInput()) return;
        setIsLoading(true);
        authAxios
            .post("service",{
                service_name: name,
                service_type: type,
                service_description: description,
                input_format: typeInput === "0" ? INPUT_FORMAT.RADIO: INPUT_FORMAT.TEXTBOX,
                type_input: typeInput,
                lst_value: lstValue,
                dram: dram,
                dram_unit: dramUnit,
                string_value: stringValue,
                unit_price_title: unitPriceTitle,
                multiple_field_title: multiFieldTitle,
                unit_price: unitPrice,
                estimate_time: typeInput === "0" ? "": estimateTime,
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

    const removeStringValue = (value) => {
        console.log("remove " + value);
        setlstValue(prev => prev.filter(e => e.name !== value));
    }

    const addStringValue = () => {
        if(stringValue.length === 0){
            setMessage("Hãy nhập lượng mức độ!");
            return;
        }

        if(unitPrice.length === 0){
            setMessage("Hãy nhập giá tiền!");
            return;
        }

        if(estimateTime.length === 0){
            setMessage("Hãy nhập thời gian dự kiến hoàn thành!");
            return;
        }

        let check = lstValue.filter(value => value.name === stringValue);

        if(check.length > 0){
            setMessage("Đã tồn tại giá trị đo lường!");
            return;
        }else{
            setMessage("");
            setlstValue([...lstValue,{name:stringValue,price:unitPrice,estimate_time: estimateTime}]);
            setStringValue("");
            setUnitPrice("");
            setEstimateTime("");
        }
    }

    const onchangeUnitPrice = (e) => {
        const result = (e.target.validity.valid) ? e.target.value : unitPrice;
        setUnitPrice(result);
    }

    const onChangeTypeInput = (e) => {
        setTypeInput(e.target.value);
        setlstValue([]);
        setUnitPrice("");
        setStringValue("")
    }

    const onchangeEstimateTime = (e) => {
        const result = (e.target.validity.valid) ? e.target.value : estimateTime;
        setEstimateTime(result);
    }

  return (
    <div>
        {isLoading ? <LoadingView /> : null}
        <Breadcrumb>
            <BreadcrumbItem active>
                <a href="/#/ServiceManagement">Dịch vụ</a>
            </BreadcrumbItem>
            {id ? (<BreadcrumbItem active>Cập nhật</BreadcrumbItem>) : (<BreadcrumbItem active>Tạo mới</BreadcrumbItem>)}
        </Breadcrumb>
        <Row>
            <Col>
                <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <i className="bi bi-briefcase me-2"> </i>
                    Tạo mới dịch vụ
                </CardTitle>
                <div className="col-12 align-middle text-center mt-1 mb-0">
                    {
                    message?.includes("thành công") ? 
                    (<h6 className='text-primary mb-0'>{message}</h6>) 
                    : (<h6 className='text-danger mb-0'>{message}</h6>)
                    }
                </div>
                <CardBody>
                    <Form>
                    <div className='row'>
                        <FormGroup className='col-6'>
                            <Label for="service_name">Tên dịch vụ</Label>
                            <Input
                                id="service_name"
                                name="service_name"
                                placeholder="Tên dịch vụ"
                                value={name}
                                onChange={(e) => {setName(e.target.value)}}
                            />
                        </FormGroup>
                        <FormGroup className='col-6'>
                            <Label for="voucher_type">Loại dịch vụ</Label>
                            <Input 
                                id="service_type" 
                                name="service_type" 
                                type="select" 
                                value={type}
                                onChange={(e) => {setType(e.target.value)}}
                            >
                                <option value={SERVICE_TYPE.NORMAL}>Dịch vụ thông thường</option>
                                <option value={SERVICE_TYPE.BONUS}>Dịch vụ thêm</option>
                            </Input>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Label for="service_description">Mô tả dịch vụ</Label>
                        <Input 
                            id="service_description" 
                            name="service_description" 
                            type="textarea" 
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)}}
                        />
                    </FormGroup>
                    <div className='row'>
                        <FormGroup className='col-6'>
                            <Label for="type_input">Đo lường theo</Label>
                            <Input 
                                id="type_input" 
                                name="type_input" 
                                type="select" 
                                value={typeInput}
                                onChange={(e) => onChangeTypeInput(e)}
                            >
                                <option value={0}>Mức độ</option>
                                <option value={1}>Lượng xác định</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className='col-6'>
                            <Label for="dram_input">Tên đại lượng đo lường</Label>
                            <Input
                                id="dram_input"
                                name="dram_input"
                                placeholder="VD: diện tích, số lượng,..."
                                value={dram}
                                onChange={(e) => {setDram(e.target.value)}}
                            />
                        </FormGroup>
                    </div>
                    {
                    typeInput === "0" ? (
                        <div className='row'>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Input
                                            id="string_value"
                                            name="string_value"
                                            placeholder="Lượng mức độ. VD: ít, trung bình, nhiều,..."
                                            value={stringValue}
                                            onChange={(e) => {setStringValue(e.target.value)}}
                                        />
                                    </Col>
                                    <Col>
                                        <Input
                                            id="unit_price"
                                            name="unit_price"
                                            placeholder="Nhập số tiền (VNĐ)"
                                            pattern="[0-9]*"
                                            maxLength={9}
                                            value={unitPrice}
                                            onChange={onchangeUnitPrice}
                                        />
                                    </Col>
                                    <Col>
                                        <Input
                                            id="estimate_price"
                                            name="estimate_price"
                                            placeholder="Nhập thời ước lượng (phút)"
                                            pattern="[0-9]*"
                                            maxLength={3}
                                            value={estimateTime}
                                            onChange={onchangeEstimateTime}
                                        />
                                    </Col>
                                    <Col md={1} sm={1}>
                                        <Button style={{width:75}} onClick={addStringValue}>Thêm</Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                            {lstValue.map((value,index) => {
                                return (
                                    <FormGroup>
                                        <Row key={index}>
                                            <Col>
                                                <Input
                                                    width="100%"
                                                    id="string_value"
                                                    name="string_value"
                                                    placeholder="lượng mức độ"
                                                    value={value.name}
                                                    readOnly={true}
                                                    disabled={true}
                                                />
                                            </Col>
                                            <Col>
                                                <Input
                                                    id="unit_price"
                                                    name="unit_price"
                                                    placeholder="Nhập số tiền X VNĐ"
                                                    value={value.price}
                                                    readOnly={true}
                                                    disabled={true}
                                                />
                                            </Col>
                                            <Col>
                                                <Input
                                                    id="estimate_price"
                                                    name="estimate_price"
                                                    placeholder="Nhập thời gian dự kiến hoàn thành"
                                                    value={value.estimate_time}
                                                    readOnly={true}
                                                    disabled={true}
                                                />
                                            </Col>
                                            <Col md={1} sm={1}>
                                                <Button style={{width: 75}} onClick={() => removeStringValue(value.name)}>Xóa</Button>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                )
                            })}
                            
                        </div>
                    )
                    : (
                        <div>
                            <div className='row'>
                                <FormGroup className='col-6'>
                                    <Label for="estimate_time">Thời gian ước lượng (phút/đơn vị đo lường)</Label>
                                    <Input
                                        id="estimate_time"
                                        name="estimate_time"
                                        placeholder="VD: 30, 10,..."
                                        pattern="[0-9]*"
                                        maxLength={3}
                                        value={estimateTime}
                                        onChange={onchangeEstimateTime}
                                    />
                                </FormGroup>
                                <FormGroup className='col-6'>
                                    <Label for="unit_price">Đơn giá (VNĐ/đơn vị đo lường)</Label>
                                    <Input
                                        id="unit_price"
                                        name="unit_price"
                                        placeholder="VD: 10000, 20000,..."
                                        pattern="[0-9]*"
                                        maxLength={9}
                                        value={unitPrice}
                                        onChange={onchangeUnitPrice}
                                    />
                                </FormGroup>
                            </div>
                            <div className='row'>
                            <FormGroup className='col-4'>
                                <Label for="dram_unit">Đơn vị đại lượng đo lường</Label>
                                <Input
                                    id="dram_unit"
                                    name="dram_unit"
                                    placeholder="VD: m2, cái,..."
                                    value={dramUnit}
                                    onChange={(e) => {setDramUnit(e.target.value)}}
                                />
                            </FormGroup>
                            <FormGroup className='col-4'>
                                <Label for="unit_price">Đơn vị đơn giá</Label>
                                <Input
                                    id="unit_price"
                                    name="unit_price"
                                    placeholder="VD: VNĐ/m2, VNĐ/cái"
                                    value={unitPriceTitle}
                                    onChange={(e) => {setUnitPriceTitle(e.target.value)}}
                                />
                            </FormGroup>
                            <FormGroup className='col-4'>
                                    <Label for="multi_field_title">Tên bội số đại lượng đo lường</Label>
                                    <InputGroup>
                                        <Input
                                            id="multi_field_title"
                                            name="multi_field_title"
                                            placeholder= "VD: số lượng phòng, số bộ bàn ghế, ..."
                                            value={multiFieldTitle}
                                            onChange={(e) => {setMultiFieldTitle(e.target.value)}}
                                            disabled={!hasMultiField}
                                        />
                                        <Button id='multi_field_title_popover'>
                                            <i className="bi bi-question-circle"/>
                                        </Button>
                                    </InputGroup>
                                    <UncontrolledPopover placement="top" target="multi_field_title_popover" trigger="focus">
                                        <PopoverBody>
                                        Để giá trị rỗng nếu dịch vụ không có bội số đại lượng đo lường
                                        </PopoverBody>
                                    </UncontrolledPopover>
                            </FormGroup>
                            
                            </div>
                            
                        </div>
                    )
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

export default ServiceCreateForm;
