import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Toast, Divider} from 'antd-mobile';
import {registers} from "../../network";
import style from './register.module.css'
import {connect} from "react-redux";
import {hide, show} from "../../redux/actionCreators/TabbarActionCreator";
import {useNavigate} from "react-router-dom";

const Index = (props) => {
	const {show, hide} = props
	const [form] = Form.useForm();
	const navigate = useNavigate()
	useEffect(() => {
		hide()
		return () => {
			show()
		}
	}, [show, hide])
	const [loading, setLoading] = useState(false);
	const onRegister = async () => {
		const data = form.getFieldsValue();
		if(data.name === '' || data.name===undefined){
			Toast.show({
				icon: 'fail',
				content: '用户名不能为空'
			})
			return;
		}
		if(data.password === '' || data.password===undefined){
			Toast.show({
				icon: 'fail',
				content: '密码不能为空'
			})
			return;
		}
		if(data.password !== data.rePassword){
			Toast.show({
				icon: 'fail',
				content: '两次密码输入不一致'
			})
			return;
		}
		if(data.phone === '' ||  data.phone === undefined) {
			Toast.show({
				icon: 'fail',
				content: '手机号不能为空'
			})
			return;
		}
		delete data.rePassword;
		setLoading(true);
		const res = await registers(data);
		if(res.data.success){
			setLoading(false)
			Toast.show({
				icon: 'success',
				content: '注册成功',
			})
			navigate('/login');
			return;
		}
		Toast.show({
			icon: 'fail',
			content: res.data.message,
		})
		setLoading(false);
	}
	const register = () => {
		navigate('/login');
	}

	return (
		<div>
			<div className={style.logo}>
				<span className={style.text}>用户注册</span>
			</div>
			<div className={style.card}>
				<div className={style.form}>
					<Form
						form={form}
						footer = {
							<Button block color={'primary'} onClick={ onRegister } loading={loading} loadingText={'注册中'}>注册</Button>
						}
					>
						<Form.Item
							name='name'
							rules={[{required: true, message: '用户名不能为空'}]}
						>
							<Input className={style.input}  placeholder='请输入用户名'/>
						</Form.Item>
						<Form.Item
							name='password'
							rules={[{required: true, message: '密码不能为空'}]}
						>
							<Input type={'password'}  className={style.input} placeholder='请输入密码'/>
						</Form.Item>
						<Form.Item
							name='rePassword'
							rules={[{required: true, message: '密码不能为空'}]}
						>
							<Input type={'password'}  className={style.input} placeholder='请再次确认密码'/>
						</Form.Item>
						<Form.Item
							name='phone'
							rules={[{required: true, message: '手机号不能为空'}]}
						>
							<Input className={style.input}  placeholder='请输入手机号'/>
						</Form.Item>
					</Form>
				</div>
			</div>
			<div className={style.register}>
				<Divider
					style={{
						borderStyle: 'solid',
					}}
				>
					已有有账户？<span className={style.registerText} onClick={register}>立即登录</span>
				</Divider>
			</div>
		</div>
	);
};

const mapDispatchToProps = {
	show,
	hide
}
export default connect(null, mapDispatchToProps)(Index) ;