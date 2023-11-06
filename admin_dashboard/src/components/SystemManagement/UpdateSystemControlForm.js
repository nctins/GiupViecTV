import {Card,Row,Col,CardTitle,CardBody,Button,Form,FormGroup,Label,Input,FormText} from "reactstrap";
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams  } from "react-router-dom";
import {TYPE_NOTIFICATION, ICON_CODE, USER_ROLE} from "../../constants/app_contants"
import useAxios from "../../hooks/useAxios";
  
  const UpdateSystemControlForm = ({data, lstSystemControl ,setLstSystemControl ,setIsLoading}) => {
    const { authAxios } = useAxios();

    useEffect(() => {
    },[])

    const onChangeValue = (value) => {
        let rs = lstSystemControl.map((ele) => {
            if(ele.name === data.name){
                ele.value = value;
            }
            return ele;
        })
        setLstSystemControl(rs);
    }
    
    return (
        <div className="row col-12">
            <FormGroup className="col-6">
                <Input
                    id="data_name"
                    name="data_name"
                    value={data.name}
                    contentEditable={false}
                    disabled={true}
                />
            </FormGroup>
            <FormGroup className="col-6">
                <Input
                    id="data_value"
                    name="data_value"
                    value={data.value}
                    onChange={(e) => onChangeValue(e.target.value)}
                />
            </FormGroup>
        </div>
    );
  };
  
  export default UpdateSystemControlForm;
  