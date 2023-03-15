
// 상위 App

import styles from "../../css/Login/login.module.css";
import { Button, Checkbox, Form, Input, notification } from "antd";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginUrlState } from "../../recoil/state";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

import { checkUserState, loginState } from "../../recoil/state";

function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(); // 쿠키 훅 
    const [url, setUrl] = useRecoilState(loginUrlState);
    const idRef = useRef()
    const pwRef = useRef()
    const navigate = useNavigate();

    const [checkUser, setCheckUser] = useRecoilState(checkUserState);
    const [isLogin, setIsLogin] = useRecoilState(loginState);

    const StyleForm = styled.div`
      width: 800px;
      background-color: #e4e7ec;
      padding-left: 50px;
      padding-top: 50px;
      padding-bottom: 50px;
      ustify-content: center;
      border-radius: 5px;
      box-shadow: 0px 0px 2px gray;
    `

    useEffect(() => {
      let token = cookies["token"];
      console.log("Token : " + token);
      console.log(checkUser)
      axios.get(checkUser, {
        headers: {
          Authorization: "Bearer " + token
        }
      }).then((res) => {
        console.log(res);
        if(res.data.result == "success") {
          setIsLogin(true);
          navigate("/contents");
        }
        else
          setIsLogin(false)
      })
    }, [])

    const onFinish = () => {
      let id = idRef.current.input.value;
      let pw = pwRef.current.input.value;

      axios.post(url, {
        id: id,
        pw: pw
      }).then((res) => {
        let data = res.data;
        if(data.result == "success") {
          setCookie("token", data.access_token);
          navigate("/contents")
        } else {
          alert("아이디 또는 비밀번호가 틀렸습니다.");
        }
      })
    }

    const onFinishFailed = () => {
    }

    return (
      <div style={{width: "100%", height: "100%", alignItems: "center", display: "flex", justifyContent: "center", backgroundColor: "#f4f7f7"}}>
        <StyleForm>

        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600}}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
                <Form.Item
                label="아이디"
                name="id"
                rules={[{ required: true, message: '아이디를 입력해주세요!'}]}
                >
                <Input ref={idRef}/>
                </Form.Item>

                <Form.Item
                label="비밀번호"
                name="password"
                rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
                >
                <Input.Password ref={pwRef}/>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>자동 로그인</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                로그인
                </Button>
                </Form.Item>
            </Form>
        </StyleForm>
        
      </div>
    );
  }
  
  export default Login;
  