import useAxios from "../../hooks/useAxios";

const FeedbackRowTable = ({feedback, index}) => {
    const { authAxios } = useAxios();

    const getRoleUser = () => {
        if(feedback.user_id.substr(0,3) === "CUS"){
            return "Khách hàng";
        }else{
            return "Người giúp việc";
        }
    }

    return (
    <tr key={index} className="border-top hover-overlay ">
        <td className="text-center">
        {index}
        </td>
        <td>
            <div className="d-flex align-items-center p-2">
                <img
                    src={feedback.user_url}
                    className="rounded-circle"
                    alt="avatar"
                    width="45"
                    height="45"
                />
                <div className="ms-3">
                <h6 className="mb-0">{feedback.user_name}</h6>
                <span className="text-muted">{feedback.user_email}</span>
                <br/>
                <span className="text-muted">{feedback.user_phone}</span>
                </div>
            </div>
        </td>
        <td>{getRoleUser()}</td>
        <td>{feedback.create_date.substr(0,10)}</td>
        <td>{feedback.content}</td>
    </tr>
  );
};

export default FeedbackRowTable;
