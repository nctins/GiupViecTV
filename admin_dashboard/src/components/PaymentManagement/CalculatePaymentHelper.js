import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table, FormGroup, Input, Button, Label } from "reactstrap";
import ViewCalculate from "./ViewCalculate";
import {DEFAULT_PRICE} from "../../constants/app_contants"
import useAxios from "../../hooks/useAxios";

const CalculatePaymentHelper = ({setIsLoading}) => {
    const { authAxios } = useAxios();
    const [emailHelper,setEmailHelper] = useState("");
    const [message,setMessage] = useState("");
    const [data, setData] = useState({});
    const [helper,setHelper] = useState();
    const [tax, setTax] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);
    const [isCalculate,setIsCalculate] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        authAxios
            .get("/admin/UserManagement/system_control/tax")
            .then(async (response) => {
              let data = response.data.data;
              setTax(parseFloat(data.value));
              setIsLoading(false);
            })
            .catch(async (error) => {
              if (error.response) {
                console.log(error.response.data);
              }
              setIsLoading(false);
            }); 
        setIsLoading(true);
        authAxios
            .get("/admin/UserManagement/system_control/service_fee")
            .then(async (response) => {
                let data = response.data.data;
                setServiceFee(parseFloat(data.value));
                setIsLoading(false);
            })
            .catch(async (error) => {
                if (error.response) {
                console.log(error.response.data);
                }
                setIsLoading(false);
            }); 
    },[])

    const calculate = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        if(emailHelper.length === 0){
            setMessage("Hãy nhập địa chỉ email của người giúp việc!");
            return ;
        }else{
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(emailHelper)){
                setMessage("Hãy nhập đúng địa chỉ email của người giúp việc!");
                return ;
            }
        }
        setIsLoading(true);
        authAxios
            .post("admin/SystemManagement/CalculatePriceHelper",{
                email: emailHelper,
            })
            .then(async (response) => {
                let data = response.data.data;
                // console.log(data);
                let helper = response.data.helper;
                setData(data);
                setIsCalculate(true);
                setHelper(helper);
                setMessage("");
                setIsLoading(false);
            })
            .catch(async (error) => {
                if (error.response) {
                    console.log(error.response.data);
                    cancelCalculate();
                    setMessage(error.response.data.msg);
                }
                setIsLoading(false);
            });
    }

    const cancelCalculate = () => {
        setIsCalculate(false);
        setData({});
        setHelper(null);
    }

    return (
    <div>
        <Card>
        <CardBody>
            <CardTitle tag="h5">Kết toán tiền của người giúp việc</CardTitle>
            <div className="row mt-3">
                <FormGroup className="col-6 ">
                    <Label for="email">Email: </Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="Nhập email của người giúp việc"
                        type="email"
                        value={emailHelper}
                        onChange={(e) => {setEmailHelper(e.target.value)}}
                    />
                </FormGroup>
                <FormGroup className="col-3 ">
                    <Label for="fee">Phần trăm phí: </Label>
                    <Input
                        id="serviceFee"
                        name="serviceFee"
                        value={serviceFee}
                        contentEditable={false}
                        disabled={true}
                    />
                </FormGroup>
                <FormGroup className="col-3 ">
                    <Label for="fee">Phần trăm thuế tạm tính: </Label>
                    <Input
                        id="tax"
                        name="tax"
                        value={tax}
                        contentEditable={false}
                        disabled={true}
                    />
                </FormGroup>
                <div className="col-12 mb-3 d-flex align-items-center justify-content-center">
                    <Button className="btn ms-1" size="md" color="info" onClick={calculate}>Tính toán</Button>
                    <Button className="btn ms-1" size="md" color="danger" onClick={cancelCalculate}>Hủy</Button>
                </div>
            </div>
            <div className="d-flex justify-content-center text-danger">
                {
                message.includes("thành công") ? 
                (<h6 className='text-primary mb-0'>{message}</h6>) 
                : (<h6 className='text-danger mb-0'>{message}</h6>)
                }
            </div>
        </CardBody>
        </Card>
        {isCalculate ? <ViewCalculate data={data} helper={helper} serviceFee={serviceFee} tax={tax} setMessage={setMessage} cancelCalculate={cancelCalculate} setIsLoading={setIsLoading} /> : null}
    </div>
  );
};

export default CalculatePaymentHelper;
