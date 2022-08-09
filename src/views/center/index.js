import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import {getUser} from "../../network";
import style from "../login/login.module.css";
import {Avatar, Button, Dialog} from "antd-mobile";
import './center.css'


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
	return (
		<div>
			<div className={style.logo}>
				<div className={style.avatar} onClick={() => {
					props.history.push('/updateAvatar')
				}}>
					<Avatar src={`http://124.222.132.236:8080${userMessage.avatarUrl}`}
									style={{'--size': '60px', '--border-radius': '30px'}}/>
				</div>
				<span className={style.username}>{userMessage.name}</span>
			</div>

			<div style={{
				padding: '10px'
			}}>
				<Button color={'danger'} block size='large' onClick={logout}>退出登录</Button>
			</div>
		</div>
	);
};

export default withRouter(Index);