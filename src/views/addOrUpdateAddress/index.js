import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {hide, show} from "../../redux/actionCreators/TabbarActionCreator";
import {Button, CascadePicker, Form, Input, NavBar, Selector, SpinLoading, Switch, Toast} from "antd-mobile";
import style from "./addOrUpdateAddress.module.css"
import {useNavigate, useParams} from "react-router-dom";
import {addAddress, updateAddress,delAddress} from "../../network";
import axios from "axios";

const Index = (props) => {
	const {hide, show, addressInfo, areas, getAreas} = props;
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [isLoad, setIsLoad] = useState(true)
	const [checked, setChecked] = useState(addressInfo.isDefault)
	const [options, setOptions] = useState([])
	const params = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		axios.get('areas.json').then(res => {
			setOptions(res.data.data.result)
			setIsLoad(false);
		})
		hide();
		return () => {
			show();
		}
	}, [hide, show, getAreas, areas])
	const deleteAddress = async id => {
		const res = await delAddress(id);
		if(res.data.success) {
			Toast.show({
				icon: 'success', content: '删除成功'
			})
			navigate('/address');
			return;
		}
		Toast.show({
			icon: 'fail', content: res.data.message,
		})
	}

	const addOrUpdate = async () => {
		const formData = form.getFieldValue();
		const data = {
			country: '100000000000',
			province: formData.area[0],
			city: formData.area[1],
			district: formData.area[2],
			detail: formData.details,
			mobile: formData.mobile,
			name: formData.name,
			isDefault: checked,
			tag: formData.tag[0],
		}
		if (params.id === '0') {
			const res = await addAddress(data);
			if (res.data.success) {
				Toast.show({
					icon: 'success', content: '添加成功',
				})
				navigate('/address');
				return;
			}
			Toast.show({
				icon: 'fail', content: res.data.message,
			})
			return;
		}
		else {
			data['id'] = parseInt(params.id);
			const res = await updateAddress(data);
			if (res.data.success) {
				Toast.show({
					icon: 'success', content: '更新成功',
				})
				navigate('/address');
				return;
			}
			Toast.show({
				icon: 'fail', content: res.data.message,
			})
			return;
		}
	}
	return (

		isLoad ? <div style={{
			width: '60px', height: '60px', margin: '0 auto', top: '40%'
		}}>
			<SpinLoading className={style.load}/>
		</div> : (<div>
				<div className={style.auaNarBar}>
					<NavBar
						onBack={() => {
							navigate('/address');
						}}
						right={params.id !== '0' && <span className={style.addAddressBtn} onClick={() => {
							deleteAddress(params.id)
						}}>删除</span>}
					>{params.id === '0' ? '添加收货人' : '修改收货人'}</NavBar>
				</div>
				<div className={style.form}>
					<Form
						mode={'card'}
						layout='horizontal'
						form={form}
						footer={<Button block type='submit' color='primary' size='large' onClick={addOrUpdate}>
							提交
						</Button>}
					>
						<Form.Item
							name='name'
							label='收货人'
							initialValue={addressInfo.name}
						>
							<Input placeholder='请输入收货人姓名'/>
						</Form.Item>
						<Form.Item
							label='手机号'
							name='mobile'
							initialValue={addressInfo.mobile}
						>
							<Input placeholder='请输入收货人手机号'/>
						</Form.Item>
						<Form.Item
							name={'area'}
							label={'地区'}
							initialValue={[addressInfo.province, addressInfo.city, addressInfo.district]}
							trigger='onConfirm'
							onClick={() => {
								setVisible(true)
							}}
						>
							<CascadePicker
								options={options}
								visible={visible}
								onClose={() => {
									setVisible(false)
								}}
							>
								{items => {
									if (items[1]?.label === '市辖区') delete items[1]
									if (items.every(item => item === null)) {
										return '请选择地区'
									} else {
										return items.map(item => item?.label ?? '')
									}
								}}
							</CascadePicker>
						</Form.Item>
						<Form.Item name='details' label='详细地址' initialValue={addressInfo.detail}>
							<Input placeholder='请输入详细地址'/>
						</Form.Item>
						<Form.Item name='tag' label='标签' initialValue={[addressInfo.tag]}>
							<Selector
								style={{
									'--checked-color': '#f5f5f5'
								}}
								columns={3}
								options={[{label: '家', value: 'home'}, {label: '公司', value: 'company'}, {
									label: '学校',
									value: 'school'
								},]}
							/>
						</Form.Item>
						<Form.Item name='isDefault' label='是否默认收货地址'>
							<Switch checked={checked} onChange={(val) => {
								setChecked(val)
							}}/>
						</Form.Item>
					</Form>
				</div>
			</div>));
};


const mapDispatchToProps = {
	show, hide,
}
const mapStateToProps = state => {
	return {
		addressInfo: state.AddressReducer.addressInfo,
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);