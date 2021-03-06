import { Form, Input, Button, Card, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';
import RequestUtil from '../request'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Redirect, Link } from 'react-router-dom'

export default class Regist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.status,
            loading: false
        }
    }

    onFinish = async (values) => {
        this.setState({
            loading: true
        })
        let response = await RequestUtil.POST("/api/v1/auth2/regist", {
            account: values.account,
            password: values.password
        })

        if (response && response.data && response.data.status) {
            this.setState({
                status: response.data.status
            })
        }

        this.setState({
            loading: false
        })
        window.location.reload();
    };

    render() {
        if (this.state.status) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <Row>
                    <Col span={6}></Col>
                    <Col span={12}>
                        <Card
                            hoverable
                            style={{ width: "100%" }}
                            // cover={<img alt="example" src={"url("+bg+")"}/>}
                        >
                            <Row>
                                <Col span={6}></Col>
                                <Col span={12}>
                                    <Form
                                        name="normal_login"
                                        className="login-form"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={this.onFinish}
                                    >
                                        <Form.Item
                                            name="account"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '???????????????/??????/??????!',
                                                },
                                            ]}
                                        >
                                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="??????/??????/??????" />
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '???????????????!',
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                placeholder="??????"
                                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                            />
                                        </Form.Item>

                                        <Form.Item>
                                            <div style={{display: "flex", justifyContent: "space-between", padding: "1rem"}}>
                                                <div>
                                                    ????????????? <Link to="/login">??????</Link>
                                                </div>
                                            </div>
                                            <Button type="primary" htmlType="submit" className="login-form-button" block={true}>
                                                ??????
                                            </Button>
                                            
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col span={6}></Col>
                            </Row>

                        </Card>
                    </Col>
                    <Col span={6}></Col>
                </Row>
            </div>
        );
    }
};
