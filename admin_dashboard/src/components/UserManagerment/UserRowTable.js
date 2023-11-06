import {Button } from "reactstrap";
import useAxios from "../../hooks/useAxios";
import { USER_ROLE } from "../../constants/app_contants";

const UserRowTable = ({user, index, getUser, printMessage, setIsLoading}) => {
    const { authAxios } = useAxios();

    const onClickActive = () => {
        activeUser();
    }

    const activeUser = () => {
        window.scrollTo({
            top: 0,
            // behavior: "smooth"
          });
        
        setIsLoading(true);
        authAxios
        .put("admin/UserManagement/update/" + user.user_id,{
            role: user.role,
            is_active: !user.is_active,
        })
        .then(async (response) => {
            let data = response.data.data;
            printMessage(data);
            getUser();
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
        <td>
            <div className="d-flex align-items-center p-2">
                <img
                    src={user.avatar_url}
                    className="rounded-circle"
                    alt="avatar"
                    width="60"
                    height="60"
                />
                <div className="ps-2 pe-5">
                <h6 className="mb-0">{user.name}</h6>
                <span className="text-muted">{user.email}</span>
                <br/>
                <span className="text-muted">{user.phone}</span>
                <br/>
                <span className="text-muted" >{user.address}</span>
                </div>
            </div>
        </td>
        <td>{user.common}</td>
        <td>{user.role === USER_ROLE.CUSTOMER ? "Khách hàng" : "Người giúp việc"}</td>
        <td >
        {user.is_active === false ? (
            <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
        ) : (
            <span className="p-2 bg-primary rounded-circle d-inline-block ms-3"></span>
        )}
        </td>
        <td>
        <div className="d-flex button-group" style={{flexDirection: "column"}}>
            {user.is_active === true ? (
                <Button className="btn" color="danger" size="sm" onClick={onClickActive}>Khóa</Button>
            ) : (
                <Button className="btn" color="primary" size="sm" onClick={onClickActive}>Mở</Button>
            )}
            
        </div>
        </td>
    </tr>
  );
};

export default UserRowTable;
