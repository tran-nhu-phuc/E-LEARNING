import "./login.css";
import { Button, Form, Input } from "antd";
import React, { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import "./login.css";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastSuccess, ToastWarning } from "../../common/toastify.common";
import UserService from "../../services/user.service";
import { IntfAdminLogin } from "../../types/interface";

export interface ILogin {
  id?: number;
  userName: string;
  password: string;
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const AdminLogin = () => {
  const [loginData, setLoginData] = useState<IntfAdminLogin>({
    userName: "",
    password: "",
  });
  const location = useLocation();

  useEffect(() => {
    if (location.state === "logout") {
      ToastSuccess("Logout Success");
    }
  }, [location.pathname]);
  const navigate = useNavigate();
  const userService = new UserService();
  const changeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (loginData.userName === "" || loginData.password === "") {
      setLoginData({
        userName: "",
        password: "",
      });
    } else {
      const result = await userService.login(loginData);

      if (result === 0) {
        ToastWarning("Username is incorrect");
      } else if (result === 2) {
        ToastWarning("Password is incorrect");
      } else {
        localStorage.setItem("token", result.admin.accessToken);
        localStorage.setItem("admin", JSON.stringify(result.admin));
        navigate("/");
      }
    }
  };
  return (
    <div className="admin_login_container">
      <div className="admin_login_body">
        <h2>Admin Login</h2>
        <Form
          {...formItemLayout}
          style={{ maxWidth: 800 }}
          className="login_form"
        >
          <h4>Username</h4>
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "Email can't be blank!" }]}
            className="login_input"
          >
            <Input
              type="userName"
              onChange={changeLogin}
              value={loginData.userName}
              name="userName"
            />
          </Form.Item>
          <h4>Password</h4>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password can't be blank!" }]}
            className="login_input"
          >
            <Input
              type="password"
              onChange={changeLogin}
              value={loginData.password}
              name="password"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 36 }} className="login_button">
            <Button
              htmlType="submit"
              style={{
                border: "none",
                width: 100,
                height: 40,
                backgroundColor: "transparent",
                color: "#38C6D0",
                textAlign: "center",
                borderBottom: "1px solid #38C6D0",
                borderLeft: "1px solid #38C6D0",
              }}
              onClick={handleLogin}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
