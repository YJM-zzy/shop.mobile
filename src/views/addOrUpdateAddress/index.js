import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {hide, show} from "../../redux/actionCreators/TabbarActionCreator";
import {NavBar} from "antd-mobile";
import style from "./addOrUpdateAddress.module.css"

const Index = (props) => {
	const {hide, show} = props;
	useEffect(() => {
		console.log()
		hide();
		return () =>{
			show();
		}
	},[hide,show, props.addressInfo])
	const deleteAddress = async id =>{
		console.log(id);
	}
	return (
		<div>
			<div className={style.auaNarBar}>
				<NavBar
					onBack={() => {
						props.history.goBack();
					}}
					right={
						props.match.params.id !== '0' && <span className={style.addAddressBtn} onClick={() => {deleteAddress(props.match.params.id)}}>删除</span>
					}
				>{ props.match.params.id === '0'? '添加收货人': '修改收货人'}</NavBar>
			</div>
		</div>
	);
};


const mapDispatchToProps = {
	show,
	hide
}
const mapStateToProps = state => {
	return{
		addressInfo: state.AddressReducer.addressInfo
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Index);