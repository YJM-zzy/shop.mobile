import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {hide, show} from "../../redux/actionCreators/TabbarActionCreator";
import {Image, List, NavBar, Tabs} from "antd-mobile";
import style from "./orderList.module.css"
import {useNavigate, useParams} from "react-router-dom";

const Index = (props) => {
	const [type, setType] = useState("0")
	const [orderList, setOrderList] = useState([])
	const {hide, show} = props
	const params = useParams();
	const navigate = useNavigate()
	useEffect(() => {
		hide()
		setType(params.type)
		return () => {
			show()
		}
	}, [params.type, hide, show])

	useEffect(()=> {
		setOrderList([1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
	}, [])
	return (
		<div className={style.orderList}>
			<div className={style.orderListNavBar}>
				<NavBar onBack={() =>{
					navigate('/center');
				}}>订单列表</NavBar>
			</div>
			<div className={style.orderListTabBar}>
				<Tabs activeKey={type} onChange={val => {
					navigate('/orderList/' + val)
				}}>
					<Tabs.Tab title='全部' key='0'></Tabs.Tab>
					<Tabs.Tab title='待发货' key='1'></Tabs.Tab>
					<Tabs.Tab title='待收货' key='2'></Tabs.Tab>
					<Tabs.Tab title='已收货' key='3'></Tabs.Tab>
				</Tabs>
			</div>

			<div className={style.orderListContent}>
				<List>
					{orderList.map((item) =>  <List.Item
						key={item}
						prefix={
							<Image
								style={{ borderRadius: 20 }}
								fit='cover'
								width={40}
								height={40}
							/>
						}
						description={item}
					>
						{item}
					</List.Item>)}
				</List>
			</div>

		</div>
	);
};

const mapDispatchToProps = {
	show,
	hide
}
export default connect(null, mapDispatchToProps)(Index);