import {Button } from "reactstrap";
import useAxios from "../../hooks/useAxios";
import {SERVICE_TYPE} from "../../constants/app_contants";
import {useNavigate } from "react-router-dom";

const ServiceRowTable = ({service, index, getService, printMessage, setIsLoading}) => {
    const navigate = useNavigate();
    const { authAxios } = useAxios();

    const onClickActive = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        activeService();
    }

    const activeService = () => {
        // console.log("active service");
        setIsLoading(true);
        authAxios
        .put("service/setValidService/" + service.service_id,{
            is_active: !service.is_active,
        })
        .then(async (response) => {
            let data = response.data.data;
            getService();
            printMessage(data);
            setIsLoading(false);
        })
        .catch(async (error) => {
            if (error.response) {
                console.log(error.response.data);
            }
            setIsLoading(false);
        });
    }

    return (
    <tr key={index} className="border-top hover-overlay ">
        <td className="text-center">
            {index}
        </td>
        <td>{service.name}</td>
        <td>{service.description}</td>
        <td>{service.service_type ? SERVICE_TYPE.BONUS_NA : SERVICE_TYPE.NORMAL_NA}</td>
        <td >
        {service.is_active === false ? (
            <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
        ) : (
            <span className="p-2 bg-primary rounded-circle d-inline-block ms-3"></span>
        )}
        </td>
        <td>
        <div className="d-flex button-group" style={{flexDirection: "column"}}>
            {<Button className="btn" color="info" size="sm" onClick={() => {navigate("/ServiceManagement/update/" + service.service_id)}}>Chi tiết</Button>}
            {
                service.is_active === true ? (
                    <Button className="btn" color="danger" size="sm" onClick={onClickActive}>Khóa</Button>
                ) : (
                    <Button className="btn" color="primary" size="sm" onClick={onClickActive}>Mở</Button>
                )
            }
        </div>
        </td>
    </tr>
  );
};

export default ServiceRowTable;
