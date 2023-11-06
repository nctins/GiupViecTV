import React from 'react';
import ReactLoading from "react-loading";


const LoadingView = () => {

    const style = {
        position:"fixed",
        width: "100%", 
        height: "100%", 
        top: 0, 
        left: 0, 
        backgroundColor: "#ECECEC",
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        zIndex: 100,
        opacity: 0.8,
    }

  return (
    <div className='d-flex mh-100' style={style}>
        <ReactLoading type='spin' color="#0000FF" height={50} width={50}/>
    </div>
  )
};

export default LoadingView;
