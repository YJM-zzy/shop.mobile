import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {hide, show} from "../../redux/actionCreators/TabbarActionCreator";
import {Button, CascadePicker, Form, Input, NavBar} from "antd-mobile";
import style from "./addOrUpdateAddress.module.css"

const options = [
	{
		label: '上海',
		value: '上海',
		children: [
			{
				label: '嘉定',
				value: '嘉定',
				children: [
					{
						label: '马陆镇',
						value: '马陆镇',
					}
				]
			}
		],
	},

]

const Index = (props) => {
	const {hide, show,addressInfo} = props;
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	useEffect(() => {
		hide();
		return () => {
			show();
		}
	}, [hide, show])
	const deleteAddress = async id => {
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
						props.match.params.id !== '0' && <span className={style.addAddressBtn} onClick={() => {
							deleteAddress(props.match.params.id)
						}}>删除</span>
					}
				>{props.match.params.id === '0' ? '添加收货人' : '修改收货人'}</NavBar>
			</div>
			<div className={style.form}>
				<Form
					mode={'card'}
					layout='horizontal'
					form={form}
					footer={
						<Button block type='submit' color='primary' size='large' onClick={() => {
							console.log(form.getFieldValue())
						}
						}>
							提交
						</Button>
					}
				>
					<Form.Item
						name='name'
						label='收货人'
						initialValue = {addressInfo.name}
					>
						<Input onChange={console.log} placeholder='请输入收货人姓名'/>
					</Form.Item>
					<Form.Item
						label='手机号'
						name='mobile'
						initialValue = {addressInfo.mobile}
					>
						<Input onChange={console.log} placeholder='请输入收货人手机号'/>
					</Form.Item>
					<Form.Item
						name={'bir'}
						label='所在地区'
						initialValue = {[addressInfo.city, addressInfo.district, addressInfo.town]}
						trigger='onConfirm'
						onClick={() => {
							setVisible(true)
						}}
					>
						{/*<Input onChange={console.log} placeholder='请输入收货人姓名'/>*/}
						<CascadePicker
							options={options}
							visible={visible}
							onClose={() => {
								setVisible(false)
							}}
						>
							{items => {
								if (items.every(item => item === null)) {
									return '未选择'
								} else {
									return items.map(item => item?.label ?? '未选择').join(' - ')
								}
							}}
						</CascadePicker>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};


const mapDispatchToProps = {
	show,
	hide
}
const mapStateToProps = state => {
	return {
		addressInfo: state.AddressReducer.addressInfo
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);