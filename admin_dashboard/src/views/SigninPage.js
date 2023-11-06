import React from "react";
import { useNavigate } from "react-router-dom";
import {Card, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input} from "reactstrap";
import useAuthContext from "../hooks/useAuthContext";
import useAxios from "../hooks/useAxios";
import LoadingView from "../components/LoadingView";

const SigninPage = () => {
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { publicAxios } = useAxios();
  const authContext = useAuthContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authContext.authState.authenticated) {
      navigate("/");
    }
  });

  const onLogin = async () => {
    setIsLoading(true);
    publicAxios
      .post("auth/admin/signin", {
        username: username,
        password: password,
      })
      .then(async (response) => {
        console.log(response.data);
        const { token, refreshToken, user } = response.data;
        authContext.setAuthState({
          token,
          refreshToken,
          authenticated: true,
          user,
        });
        // await setToken(JSON.stringify({ token, refreshToken, user }));
        sessionStorage.setItem(
          "auth_info",
          JSON.stringify({ token, refreshToken, user })
        );
        setMessage("");
        navigate("/");
        setIsLoading(false);
      })
      .catch(async (error) => {
        setMessage(error.response.data.msg);
        setIsLoading(false);
      });
  };

  return (
    <div className="pageWrapper d-flex">
    {isLoading ? <LoadingView /> : null}
      <Col className="d-flex flex-row justify-content-center align-items-center">
        <Card className="col-3">
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Đăng nhập
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="Username">Tên tài khoản: </Label>
                <Input
                  id="Username"
                  name="Username"
                  placeholder="Nhập username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Mật khẩu: </Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Nhập password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </FormGroup>
              <div className="d-flex justify-content-center">
                <h6 className="text-danger">{message}</h6>
              </div>
              <FormGroup className="d-flex justify-content-center">
                <Button onClick={() => onLogin()}>Đăng nhập</Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};
export default SigninPage;
