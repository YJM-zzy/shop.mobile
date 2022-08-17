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

export async function registers(data) {
	return request({
		url: "/api/app/auth/register",
		method: "post",
		data: data,
	});
}

export async function getAddressList() {
	return request({
		url: "/api/app/user/getuseraddress",
		method: "get",
	});
}

export async function getAreaList() {
	return request({
    url: "/api/app/user/getarealist",
    method: "get",
  });
}

export  async  function  addAddress(data){
	return request({
    url: "/api/app/user/adduseraddr",
    method: "post",
		data
  });
}

export async function updateAddress(data) {
	return request({
		url: "/api/app/user/updateuseraddr",
		method: "post",
		data
	})
}
export async function delAddress(id){
	return request({
    url: `api/app/user/deleteuseraddr/${id}`,
    method: "post",
  });
}
