import React, {useEffect, useState} from 'react';
import {Empty, List, NavBar, SwipeAction, Tag, Toast} from "antd-mobile";
import style from './address.module.css'
import {delAddress, getAddressList} from "../../network";
import {connect} from "react-redux";
import {getAddress} from "../../redux/actionCreators/AddressActionCreator"
import {hide, show} from "../../redux/actionCreators/TabbarActionCreator";
import {useNavigate} from "react-router-dom";

const Index = (props) => {
	const [addressList, setAddressList] = useState([]);
	const {show, hide} = props;
	const navigate = useNavigate();

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
		const res = await delAddress(id);
		if(res.data.success) {
			Toast.show({
				icon: 'success', content: '删除成功'
			})
			navigate(0);
			return;
		}
		Toast.show({
			icon: 'fail', content: res.data.message,
		})
	}
	return (
		addressList.length !== 0?<div className={style.addressContainer}>
			<div className={style.addressNavbar}>
				<NavBar
					onBack={() => {
						navigate('/center');
					}}
					right={<span
						className={style.addAddressBtn}
						onClick={() => {
							props.getAddress({})
							navigate('/addOrUpdateAddress')
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
								navigate(`/addOrUpdateAddress/${item.id}`);
							}}></i>}
						>
						</List.Item>
					</SwipeAction>))}
				</List>
			</div>
		</div>:<>
			<div className={style.addressNavbar}>
				<NavBar
					onBack={() => {
						navigate('/center');
					}}
					right={<span
						className={style.addAddressBtn}
						onClick={() => {
							props.getAddress({})
							navigate('/addOrUpdateAddress')
						}}
					>新增地址</span>}
				>
					地址管理
				</NavBar>
			</div><Empty description='暂无地址信息，请前往添加' />
		</>
	);
};

const mapDispatchToProps = {
	getAddress, show, hide,
}

export default connect(null, mapDispatchToProps)(Index);