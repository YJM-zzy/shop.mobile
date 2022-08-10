import React, {useEffect, useState} from 'react';
import {Button, ImageUploader, NavBar, Toast} from "antd-mobile";
import  {upLoadImg, delAvatar, updateAvatar} from "../../network";
import style from './updateAvatar.module.css'
import {hide, show} from "../../redux/actionCreators/TabbarActionCreator";
import {connect} from "react-redux";

const Index = (props) => {
	const [img, setImg] = useState('');
	const {show, hide} = props;
	useEffect(() => {
		hide();
		return () => {
			show();
		}
	}, [show, hide]);
	const back = () =>{
		props.history.goBack();
	}
	const  mockUpload = async (file) =>{
		let formData = new FormData()
		formData.append('file', file)
		const res = await upLoadImg(formData);
		setImg(`/api/app/user/GetAvatar/${res.data.result}`)
		return {
			url:`http://124.222.132.236:8080/api/app/user/GetAvatar/${res.data.result}`
		}
	}

	const deleteImg = async (value) => {
		const arr = value.url.split('/')
		await delAvatar(arr[7]);
	}
	const update = async () => {
		const res = await updateAvatar({
			url: img
		})
		if (res.data.success)
		{
			props.history.push('/center');
			return;
		}
		else {
			Toast.show({
				icon: 'fail',
				content: '修改头像失败',
			})
		}

	}
	return (
		<div>
			<div className={style.avatarTabbar}>
				<NavBar onBack={back}>修改头像</NavBar>
			</div>
			<div className={style.upLoadImgBox}>
				<ImageUploader
					upload={mockUpload}
					maxCount = {1}
					multiple={false	}
					onDelete={deleteImg}
				/>
				<div style={{
					marginTop: '10px'
				}}>
					<Button color={'primary'} onClick={ update}>提交</Button>
				</div>
			</div>
		</div>
	);
};
const mapDispatchToProps = {
	show,
	hide
}
export default connect(null, mapDispatchToProps)(Index) ;