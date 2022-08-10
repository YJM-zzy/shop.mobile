import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import {getUser} from "../../network";
import style from "../login/login.module.css";
import {Avatar, Button, Card, Dialog, List} from "antd-mobile";
import './center.css'
import {  RightOutline } from 'antd-mobile-icons'

const Index = (props) => {
	const [userMessage, setUserMessage] = useState({})
	useEffect(() => {
		getUser().then(res => {
			setUserMessage(res.data.result);
		})
	}, [])
	const logout = async () => {
		const result = await Dialog.confirm({
			content: '是否确认退出当前系统'
		})
		if (result) {
			localStorage.clear();
			props.history.push('/login');
		}
	}
	const changeAddress = () => {
		props.history.push('/address')
	}
	const changeUserInfo = () => {
		props.history.push('/updateUserInfo')
	}
	return (
		<div className={'centerContainer'}>
			<div className={style.logo}>
				<div className={style.avatar} onClick={() => {
					props.history.push('/updateAvatar')
				}}>
					<Avatar src={`http://124.222.132.236:8080${userMessage.avatarUrl}`}
									style={{'--size': '60px', '--border-radius': '30px'}}/>
				</div>
				<span className={style.username}>{userMessage.name}</span>
			</div>
			<div className={'orderCard'}>
				<Card title='订单管理'  className={'tabbarcontainer'} extra={
					<span
						style={{
							display:"inline-block",
							height: '100%',
							color: '#999999'
						}}
						onClick={() => {
							props.history.push('/orderList/0')}
						}
					> 全部<RightOutline /></span>
				} onHeaderClick={() => {}}>
					<ul >
						<li onClick={() => {
							props.history.push('/orderList/1')
						}}>
							<div><i className={'iconfont icon-daifahuo'}></i></div>
							<span>待发货</span>
						</li>
						<li onClick={() => {
							props.history.push('/orderList/2')
						}}>
							<div><i className={'iconfont icon-daishouhuo'}></i></div>
							<span>待收货</span></li>
						<li onClick={() => {
							props.history.push('/orderList/3')
						}}>
							<div><i className={'iconfont icon-yifahuo'}></i></div>
							<span>已收货</span>
						</li>
					</ul>
				</Card>
			</div>
			<div className={'list'}>
					<List mode={'card'} header={'通用设置'}>
						<List.Item onClick={changeAddress}>地址管理</List.Item>
						<List.Item onClick={changeUserInfo}>修改信息</List.Item>
						<List.Item>关于我们</List.Item>
					</List>
			</div>

			<div style={{
				margin:'16px 12px'
			}}>
				<Button color={'danger'} block size='large' onClick={logout}>退出登录</Button>
			</div>
		</div>
	);
};

export default withRouter(Index);