import React from 'react';
import {  TabBar } from 'antd-mobile'
import {
	AppOutline,
	UnorderedListOutline,
	UserOutline,
	CalendarOutline
} from 'antd-mobile-icons'
import {useLocation, useNavigate} from "react-router-dom";

const AntTabBar = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const tabs = [
		{
			key: '/index',
			title: '首页',
			icon: <AppOutline />,
		},
		{
			key: '/category',
			title: '分类',
			icon: <UnorderedListOutline />,
		},
		{
			key: '/cart',
			title: '购物车',
			icon:  <CalendarOutline /> ,
		},
		{
			key: '/center',
			title: '个人中心',
			icon: <UserOutline />,
		},
	]
	return (
		<div>
			<TabBar
				onChange={(value) => {
					navigate(value)
				}}
				activeKey={ location.pathname }
			>
				{tabs.map(item => (
					<TabBar.Item key={item.key} icon={item.icon} title={item.title} />
				))}
			</TabBar>
		</div>
	);
};

export default AntTabBar;