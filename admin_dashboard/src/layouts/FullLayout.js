import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Container } from "reactstrap";
import useAuthContext from "../hooks/useAuthContext";
import React, { useState } from "react";
import HeaderMain from "./HeaderMain";
import LoadingView from "../components/LoadingView";

const FullLayout = () => {
  const { authState } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!authState.authenticated) {
      navigate('/signin')
    }
    console.log(authState);
  },[authState]);

  return (
    <main>
      {isLoading ? <LoadingView /> : null}
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <HeaderMain setIsLoading={setIsLoading} />
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
