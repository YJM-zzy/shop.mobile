import React from 'react';
import {Form, Input,Button,Toast} from 'antd-mobile';
import {getToken} from "../../network";
import style from './login.module.css'

const Index = (props) => {
  const [form] = Form.useForm();
  const onSubmit = () => {

    const data = form.getFieldsValue()
    if(data.query === '' || data.query === undefined){
      return new Error('手机号不能为空!')
    }
    getToken(data).then(res => {
      if(res.data.success){
        localStorage.setItem('token', res.data.result.token);
        Toast.show({
          icon: 'success',
          content: '登录成功',
        })
        props.history.push('/center');
        return;
      }
      Toast.show({
        icon: 'fail',
        content: res.data.message,
      })
    })
  }
  return (
    <div>
      <div className={style.logo}>
        <span className={style.text}>用户登录</span>
      </div>
      <div style = {
        {
          padding: '10px',
        }
      }>
        <Form
          form={form}
          footer = {
            <Button block color={'primary'} onClick={ onSubmit }>登录</Button>
          }
        >
          <Form.Item
            name='query'
            rules={[{required: true, message: '用户名或者手机号不能为空'}]}
          >
            <Input className={style.input}  placeholder='请输入用户名或者手机号'/>
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{required: true, message: '密码不能为空'}]}
          >
            <Input type={'password'}  className={style.input} placeholder='请输入密码'/>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Index;