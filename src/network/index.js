import request from "./base";

export async function getToken(data) {
	return request({
		url: "/api/app/auth/login",
		method: "post",
		data: data,
	});
}