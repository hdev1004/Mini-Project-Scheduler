
// 상위 App

import styles from "../../css/Login/login.module.css";
import { Button, Checkbox, Form, Input, notification } from "antd";
import styled from "styled-components";

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

const onFinish = () => {
    alert("성공");
    openNotificationWithIcon('success');
}

const onFinishFailed = () => {
    alert("실패");
}

const openNotificationWithIcon = (type) => {
    let [api, contextHolder] = notification.useNotification();

    api[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

function Login() {
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
                <Input />
                </Form.Item>

                <Form.Item
                label="비밀번호"
                name="password"
                rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
                >
                <Input.Password />
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
  