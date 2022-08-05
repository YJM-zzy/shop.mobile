import React from 'react';
import {Button, Form, Input} from "antd-mobile";

const Index = () => {
	return (
		<div style={{
			padding: '10px'
		}}>
			<Form
				mode={'card'}
				footer={
					<Button block type='submit' color='primary'>
						登录
					</Button>
				}

			>
				<Form.Item
					name='用户名'
					rules={[{required: true, message: '用户名不能为空'}]}
				>
					<Input placeholder='请输入用户名'/>
				</Form.Item>
				<Form.Item
					name='密码'
					rules={[{required: true, message: '密码不能为空'}]}
				>
					<Input type={'password'} placeholder='请输入密码'/>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Index;