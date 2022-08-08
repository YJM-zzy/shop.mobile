import request from "./base";

export async function getToken(data) {
	return request({
		url: "/api/app/auth/login",
		method: "post",
		data: data,
	});
}

export async function getUser(){
	return request({
		url: '/api/app/user/getuser',
		method: 'get'
	})
}

export async  function  upLoadImg(data)
{
	return request({
		url: '/api/app/user/uploadavatar',
		method: 'post',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		data
	})
}

export async function delAvatar(id){
	return request({
		url: `/api/app/user/delavatar/${id}`,
		method: 'post',
	})
}

export async function updateAvatar(data) {
	return request({
		url: "/api/app/user/updateavatar",
		method: "post",
		data: data,
	});
}
