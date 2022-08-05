import React from 'react';
import {  TabBar } from 'antd-mobile'
import {
	AppOutline,
	UnorderedListOutline,
	UserOutline,
	CalendarOutline
} from 'antd-mobile-icons'
import './tabbar.css'
import {withRouter} from "react-router-dom";

const AntTabBar = (props) => {
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
					props.history.push(value)
				}}
				activeKey={ props.location.pathname }
			>
				{tabs.map(item => (
					<TabBar.Item key={item.key} icon={item.icon} title={item.title} />
				))}
			</TabBar>
		</div>
	);
};

export default withRouter(AntTabBar);