import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Label, Input, FormGroup } from "reactstrap";
import useAuthContext from "../../hooks/useAuthContext";
import useAxios from "../../hooks/useAxios";
import FeedbackRowTable from './FeedbackRowTable';
import LoadingView from '../LoadingView';

const FeedbackTable = () => {
  const { authAxios } = useAxios();
  const authContext = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [feedbacks,setFeedbacks] = useState([])

  useEffect(() => {
    getFeedback();
  },[])

  const getFeedback = () => {
    setIsLoading(true);
    authAxios
      .get("feedback")
      .then(async (response) => {
        let data = response.data.data;
        if(Array.isArray(data) && data.length > 0){
          setFeedbacks(data);
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

  return (
    <div>
      {isLoading && <LoadingView />}
      <Card>
        <CardBody>
          <CardTitle tag="h5">Phản hồi</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            danh sách phản hồi của người dùng
          </CardSubtitle>
          <Table className="no-wrap mt-3 align-middle table-hover" responsive borderless>
            <thead>
              <tr>
                <th className="col-1 text-center" >STT</th>
                <th className="col-3" >Thông tin người dùng</th>
                <th className="col-2">Loại tài khoản</th>
                <th className="col-2">Ngày phản hồi</th>
                <th className="col-4">Nội dung</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback, index) => (<FeedbackRowTable key={index} feedback={feedback} index={index+1} />))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default FeedbackTable;
