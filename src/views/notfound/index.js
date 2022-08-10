import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {hide,show} from "../../redux/actionCreators/TabbarActionCreator";
import {ErrorBlock, NavBar} from "antd-mobile";

const Index = (props) => {
	const {show, hide} = props;
	useEffect(() => {
		hide();
		return () => {
			show();
		}
	},[hide, show]);
	return (
		<div>
			<NavBar onBack={() => {
				props.history.goBack();
			}}></NavBar>

			<ErrorBlock status='empty' />
		</div>
	);
};

const mapDispatchToProps = {
	show,
	hide,
}
export default connect(null, mapDispatchToProps)(Index);