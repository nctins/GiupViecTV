import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams  } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Input, Col, Row, Button, Breadcrumb, BreadcrumbItem, FormGroup, Label, Form,FormText } from "reactstrap";
import {VOUCHER_TYPE, PAYMENT_METHOD_CONDITION} from "../../constants/app_contants"
import useAxios from "../../hooks/useAxios";
import FileBase64 from 'react-file-base64';
import LoadingView from '../LoadingView';
import { uniqid8byteGen } from '../../utils/IDGenerator';
import Format from '../../utils/Format';

const VoucherCreateForm = () => {
    const { id } = useParams();
    const { authAxios } = useAxios();
    const [isLoading, setIsLoading] = useState(false);
    const [type,setType] = useState(VOUCHER_TYPE.DISCOUNT_PERCENT);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [discount,setDiscount] = useState("");
    const [minPrice,setMinPrice] = useState("");
    const [maxPrice,setMaxPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [payment,setPayment] = useState(PAYMENT_METHOD_CONDITION.ALL);
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [code,setCode] = useState("");
    const [isActive,setIsActive] = useState(false);
    const [image,setImage] = useState();
    const [message,setMessage] = useState("");

    useEffect(() => {
        getVoucher();
    },[])
    const getVoucher = () => {
        if(id){
            setIsLoading(true);
            authAxios
            .get("voucher/" + id)
            .then(async (response) => {
                let data = response.data.data;
                // console.log(data);
                if(data){
                    setName(data.voucher_name);
                    setType(data.voucher_type);
                    setDescription(data.voucher_description);
                    if(data.voucher_type === VOUCHER_TYPE.DISCOUNT_PERCENT){
                        setDiscount(data.discount_percent);
                    }else{
                        setDiscount(Format.formatPrice(data.discount_price));
                    }
                    setMinPrice(Format.formatPrice(data.min_post_price));
                    if(data.max_discount_price === null || data.max_discount_price === undefined){
                        setMaxPrice(Format.formatPrice(data.discount_price));
                    }else{
                        setMaxPrice(Format.formatPrice(data.max_discount_price));
                    }
                    setQuantity(data.quantity);
                    setPayment(data.payment_method_condition);
                    setStartDate(data.start_date.substr(0,10));
                    setEndDate(data.end_date.substr(0,10));
                    setCode(data.voucher_code);
                    setIsActive(!data.is_delete);
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
        if(name.length === 0){
            setMessage("Hãy nhập tên voucher!");
            return false;
        }else{
            setMessage("");
        }
        if(description.length === 0 ){
            setMessage("Hãy nhập mô tả voucher!");
            return false;
        }else{
            setMessage("");
        }
        if(discount.length === 0 || discount === "0"){
            setMessage("Hãy nhập giá trị giảm giá cho voucher!");
            return false;
        }else{
            setMessage("");
        }
        if(quantity.length === 0){
            setMessage("Hãy nhập số lượng voucher!");
            return false;
        }else{
            setMessage("");
        }
        if(code.length === 0){
            setMessage("Hãy nhập mã code cho voucher!");
            return false;
        }else{
            setMessage("");
        }
        if(startDate.length === 0){
            setMessage("Hãy nhập ngày bắt đầu voucher!");
            return false;
        }else{
            setMessage("");
        }
        if(endDate.length === 0){
            setMessage("Hãy nhập ngày kết thúc cho voucher!");
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
        let data = {
            voucher_name: name,
            voucher_type: type,
            voucher_description: description,
            discount: parseInt(type) === VOUCHER_TYPE.DISCOUNT_PRICE ? Format.removeFormatPrice(discount) : discount,
            min_post_price: Format.removeFormatPrice(minPrice),
            max_discount_price: Format.removeFormatPrice(maxPrice),
            quantity: quantity,
            payment_method_condition: payment,
            start_date: startDate,
            end_date: endDate,
            voucher_code: code,
            is_delete: !isActive,
            image: image
        }
        // console.log(data);
        authAxios
            .put("voucher/" + id, data)
            .then(async (response) => {
                let data = response.data.data;
                console.log(data);
                setMessage(data);
                setIsLoading(false);
            })
            .catch(async (error) => {
            if (error.response) {
                console.log(error.response.data.msg);
                setMessage(error.response.data.msg);
                setIsLoading(false);
            }
            });
    }
    const checkCreate = () => {
        if(name.length === 0){
            setMessage("Hãy nhập tên voucher!");
            return false;
        }else{
            setMessage("");
        }
        if(description.length === 0 ){
            setMessage("Hãy nhập mô tả voucher!");
            return false;
        }else{
            setMessage("");
        }
        if(discount.length === 0 || discount === "0"){
            setMessage("Hãy nhập giá trị giảm giá cho voucher!");
            return false;
        }else{
            setMessage("");
        }
        if(quantity.length === 0){
            setMessage("Hãy nhập số lượng voucher!");
            return false;
        }else{
            setMessage("");
        }
        if(code.length === 0){
            setMessage("Hãy nhập mã code cho voucher!");
            return false;
        }else{
            setMessage("");
        }
        if(startDate.length === 0){
            setMessage("Hãy nhập ngày bắt đầu voucher!");
            return false;
        }else{
            setMessage("");
        }
        if(endDate.length === 0){
            setMessage("Hãy nhập ngày kết thúc cho voucher!");
            return false;
        }else{
            setMessage("");
        }
        if(!image){
            setMessage("Hãy chọn hình ảnh cho voucher!");
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
        let data = {
            voucher_name: name,
            voucher_type: type,
            voucher_description: description,
            discount: Format.removeFormatPrice(discount),
            min_post_price: Format.removeFormatPrice(minPrice),
            max_discount_price: Format.removeFormatPrice(maxPrice),
            quantity: quantity,
            payment_method_condition: parseInt(payment),
            start_date: startDate,
            end_date: endDate,
            voucher_code: code,
            image: image
        }
        authAxios
            .post("voucher", data)
            .then(async (response) => {
                let data = response.data.data;
                // console.log(data);
                setMessage(data);
                setIsLoading(false);
            })
            .catch(async (error) => {
                if (error.response) {
                    console.log(error.response.data.msg);
                    setMessage(error.response.data.msg);
                }
                setIsLoading(false);
            });
    }
    const onchangeQuantity = (e) => {
        const result = (e.target.validity.valid) ? e.target.value : quantity;
        setQuantity(result);
    }
    const onBlurDiscount = (e, isPrice) => {
        let result = "";
        if(e.target.validity.valid){
            result = e.target.value;
            setMessage("");
        }else{
            setMessage("Vui lòng " + e.target.placeholder);
        }
        if(isPrice && result.length > 0){
            setDiscount(Format.formatPrice(parseInt(result)));
            setMaxPrice(Format.formatPrice(parseInt(result)));
            return;
        }
        setDiscount(result);
    }
    const onFocusDiscount = (e, isPrice) => {
        if(isPrice && e.target.value && e.target.value.length > 0)
            setDiscount(Format.removeFormatPrice(e.target.value));
    }
    const onchangeMinPrice = (e) => {
        const result = (e.target.validity.valid) ? e.target.value : minPrice;
        setMinPrice(result);
    }
    const onBlurMinPrice = (e) => {
        let result = e.target.value;
        if(result.length > 0){
            setMinPrice(Format.formatPrice(parseInt(result)));
            return;
        }
        setMinPrice(result);
    }
    const onFocusMinPrice = (e) => {
        if(e.target.value && e.target.value.length > 0)
            setMinPrice(Format.removeFormatPrice(e.target.value));
    }
    const onchangeMaxPrice = (e) => {
        const result = (e.target.validity.valid) ? e.target.value : maxPrice;
        setMaxPrice(result);
    }
    const onBlurMaxPrice = (e) => {
        let result = e.target.value;
        if(result.length > 0){
            setMaxPrice(Format.formatPrice(parseInt(result)));
            return;
        }
        setMaxPrice(result);
    }
    const onFocusMaxPrice = (e) => {
        if(e.target.value && e.target.value.length > 0)
            setMaxPrice(Format.removeFormatPrice(e.target.value));
    }
    const onChangeTypeVoucher = (e) => {
        if(parseInt(e.target.value) === VOUCHER_TYPE.DISCOUNT_PRICE){
            setMaxPrice(discount);
        }
        setType(e.target.value);
    }

    const displayForm = () => {
        return (
            <Row>
            <Col>
                <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <i className="bi bi-gift me-2"> </i>
                    Tạo mới khuyến mãi
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
                        <Label for="voucher_name">Tên khuyến mãi</Label>
                        <Input
                            id="voucher_name"
                            name="voucher_name"
                            placeholder="Tên khuyến mãi"
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="voucher_description">Mô tả khuyến mãi</Label>
                        <Input 
                            id="voucher_description" 
                            name="voucher_description" 
                            type="textarea" 
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-4">
                            <Label for="voucher_type">Loại khuyến mãi</Label>
                            <Input 
                                id="voucher_type" 
                                name="voucher_type" 
                                type="select" 
                                value={type}
                                onChange={onChangeTypeVoucher}
                            >
                                <option value={VOUCHER_TYPE.DISCOUNT_PERCENT}>{VOUCHER_TYPE.DISCOUNT_PERCENT_NA}</option>
                                <option value={VOUCHER_TYPE.DISCOUNT_PRICE}>{VOUCHER_TYPE.DISCOUNT_PRICE_NA}</option>
                            </Input>
                        </div>
                        <div className="col-4">
                            <Label for="discount">{type == VOUCHER_TYPE.DISCOUNT_PERCENT ? "Phần trăm giảm giá" : "Số tiền giảm giá"}</Label>
                            <Input
                                id="discount"
                                name="discount"
                                maxLength={9}
                                pattern={parseInt(type) === VOUCHER_TYPE.DISCOUNT_PERCENT ? "[0]|[1][.][0]+|[0][.][0-9]+" : "[0-9]*"}
                                placeholder={parseInt(type) === VOUCHER_TYPE.DISCOUNT_PERCENT ? "Nhập % giảm giá từ 0 - 1. vd: 0.2 ~ 20%" : "Nhập số tiền giảm giá từ 0 - 999999999 VNĐ"}
                                value={discount}
                                onChange={(e) => {setDiscount(e.target.value)}}
                                onBlur={(e) => parseInt(type) === VOUCHER_TYPE.DISCOUNT_PERCENT ? onBlurDiscount(e, false) : onBlurDiscount(e, true)}
                                onFocus={(e) => parseInt(type) === VOUCHER_TYPE.DISCOUNT_PERCENT ? onFocusDiscount(e, false) : onFocusDiscount(e, true)}
                            />
                        </div>
                        <div className="col-4">
                            <Label for="quantity">Số lượng khuyễn mãi</Label>
                            <Input
                                id="quantity"
                                name="quantity"
                                placeholder="Nhập X số lượng mã khuyến mãi"
                                pattern="[0-9]*"
                                maxLength={5}
                                value={quantity}
                                onChange={onchangeQuantity}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-4">
                            <Label for="max_price">Giảm giá tối đa</Label>
                            <Input
                                id="max_price"
                                name="max_price"
                                placeholder="Nhập số tiền giảm giá tối đa từ 0 - 999999999 VNĐ"
                                pattern="[0-9]*"
                                maxLength={9}
                                value={maxPrice}
                                onChange={onchangeMaxPrice}
                                onBlur={(e) => onBlurMaxPrice(e, true)}
                                onFocus={(e) => onFocusMaxPrice(e, true)}
                                readOnly={parseInt(type) === VOUCHER_TYPE.DISCOUNT_PRICE?true:false}
                                disabled={parseInt(type) === VOUCHER_TYPE.DISCOUNT_PRICE?true:false}
                            />
                        </div>
                        <div className="col-4">
                            <Label for="min_price">Hóa đơn tối thiểu</Label>
                            <Input
                                id="min_price"
                                name="min_price"
                                placeholder="Nhập số tiền hóa đơn tối thiểu từ 0 - 999999999 VNĐ"
                                pattern="[0-9]*"
                                maxLength={9}
                                value={minPrice}
                                onChange={onchangeMinPrice}
                                onBlur={(e) => onBlurMinPrice(e, true)}
                                onFocus={(e) => onFocusMinPrice(e, true)}
                            />
                        </div>
                        <div className="col-4">
                            <Label for="code">Mã khuyến mãi</Label>
                            <div className='d-flex'>
                                <Input
                                    id="code"
                                    name="code"
                                    placeholder="Mã dùng để lấy khuyến mãi"
                                    maxLength={8}
                                    value={code}
                                    onChange={(e) => {setCode(e.target.value)}}
                                    readOnly={id?true:false}
                                    disabled={id?true:false}
                                />
                                {!id && <Button onClick={() => setCode(uniqid8byteGen())}>Gen</Button>}
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="voucher_condition">Phương thức thanh toán</Label>
                        <Input 
                            id="voucher_condition" 
                            name="voucher_condition" 
                            type="select" 
                            value={payment}
                            onChange={(e) => {setPayment(e.target.value)}}
                        >
                            <option value={PAYMENT_METHOD_CONDITION.ALL}>{PAYMENT_METHOD_CONDITION.ALL_NA}</option>
                            <option value={PAYMENT_METHOD_CONDITION.COD}>{PAYMENT_METHOD_CONDITION.COD_NA}</option>
                            <option value={PAYMENT_METHOD_CONDITION.VNPAY}>{PAYMENT_METHOD_CONDITION.VNPAY_NA}</option>
                        </Input>
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
                        <Label for="exampleFile">Hình ảnh khuyến mãi</Label>
                        <FileBase64 className="row" multiple={ false } onDone={ (files) => {setImage(files.base64)} } />
                        <FormText>
                        </FormText>
                    </FormGroup>
                    {id ? 
                        (<FormGroup check>
                            <Input id="active" name="active" type="checkbox" checked={isActive} onChange={() => {setIsActive(!isActive)}} /> 
                            <Label for="active" check>Active</Label>
                        </FormGroup>) 
                        : (null)
                    }
                    {id ? (<Button onClick={onSubmitUpdate}>Cập nhật</Button>) : (<Button onClick={onSubmitCreate}>Thêm</Button>)}
                    </Form>
                </CardBody>
                </Card>
            </Col>
        </Row>
        )
    }

  return (
    <div>
        {isLoading && <LoadingView />}
        <Breadcrumb>
            <BreadcrumbItem active>
                <a href="/#/VoucherManagement">Khuyến mãi</a>
            </BreadcrumbItem>
            {id ? (<BreadcrumbItem active>Cập nhật</BreadcrumbItem>) : (<BreadcrumbItem active>Tạo mới</BreadcrumbItem>)}
        </Breadcrumb>
        {!isLoading && displayForm()}
    </div>
  );
};

export default VoucherCreateForm;
