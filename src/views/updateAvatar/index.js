import React, {useState} from 'react';
import {Button, ImageUploader, NavBar, Toast} from "antd-mobile";
import  {upLoadImg, delAvatar, updateAvatar} from "../../network";
import style from './updateAvatar.module.css'

const Index = (props) => {
	const [img, setImg] = useState('');
	const back = () =>{
		props.history.goBack();
	}
	const  mockUpload = async (file) =>{
		let formData = new FormData()
		formData.append('file', file)
		const res = await upLoadImg(formData);
		setImg(`https://localhost:5001/api/app/user/GetAvatar/${res.data.result}`)
		return {
			url:`https://localhost:5001/api/app/user/GetAvatar/${res.data.result}`
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
		Toast.show({
			icon: 'fail',
			content: '修改头像失败',
		})
	}
	return (
		<div>
			<NavBar onBack={back}>修改头像</NavBar>
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

export default Index;