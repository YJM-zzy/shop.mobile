import axios from "axios";

export default function request(config) {
	const request = axios.create({
		// baseURL:'https://localhost:44342',
		baseURL:'http://124.222.132.236:8080',
		timeout: 1000000,
	});

	// 请求拦截器
	request.interceptors.request.use(
		(res) => {
			if (res.url !== "/api/app/auth/login" || res.url !== '/api/app/auth/register') {
				const token = localStorage.getItem("token");
				res.headers.Authorization = `Bearer ${token}`;
			}
			return res;
		},
		(err) => {
			return Promise.reject(err);
		}
	);

	// 响应拦截器
	request.interceptors.response.use(
		res=> {
			return res.data;
		},
		error => {
			return Promise.reject(error);
		}
	);

	return request(config);
}