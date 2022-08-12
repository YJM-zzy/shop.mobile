import React, {useEffect, useState} from 'react';
import {List, NavBar, SwipeAction, Tag} from "antd-mobile";
import style from './address.module.css'
import {getAddressList} from "../../network";
import {connect} from "react-redux";
import {getAddress} from "../../redux/actionCreators/AddressActionCreator"
import {hide, show} from "../../redux/actionCreators/TabbarActionCreator";

const Index = (props) => {
	const [addressList, setAddressList] = useState([]);
	const {show, hide} = props;
	useEffect(() => {
		getAddressList().then(res => {
			setAddressList(res.data.result);
		})
	}, [show, hide]);
	useEffect(() => {
		hide();
		return () => {
			show();
		}
	}, [hide, show])

	const deleteAddress = async id => {
		console.log(id)
	}
	return (<div className={style.addressContainer}>
		<div className={style.addressNavbar}>
			<NavBar
				onBack={() => {
					props.history.goBack();
				}}
				right={<span
					className={style.addAddressBtn}
					onClick={() => {
						props.getAddress({})
						props.history.push('/addOrUpdateAddress')
					}}
				>新增地址</span>}
			>
				地址管理
			</NavBar>
		</div>
		<div className={style.addressContent}>
			<List mode={'card'}>
				{addressList.map((item => <SwipeAction
					key={item.id}
					rightActions={[{
						key: 'delete', value: '11', text: '删除', color: 'danger', onClick: () => {
							deleteAddress(item.id);
						}
					},]}

				>
					<List.Item
						title={<>
							{item.isDefault && <Tag color='danger'>默认</Tag>} <Tag
							color='primary'>{item.tag}</Tag> {item.addrCombination}
						</>}
						description={<>
							{item.name} {item.mobileHide}
						</>}
						children={item.detail}
						extra={<i className={'iconfont icon-bianji'} onClick={() => {
							props.getAddress(item);
							props.history.push(`/addOrUpdateAddress/${item.id}`);
						}}></i>}
					>
					</List.Item>
				</SwipeAction>))}
			</List>
		</div>
	</div>);
};

const mapDispatchToProps = {
	getAddress, show, hide,
}

export default connect(null, mapDispatchToProps)(Index);