import axios from "axios";

export default function request(config) {
	const request = axios.create({
		baseURL:'https://localhost:5001',
		timeout: 1000000,
	});

	// 请求拦截器
	// request.interceptors.request.use(
	// 	(res) => {
	// 		if (res.url != "/login") {
	// 			const token = localStorage.getItem("token");
	// 			res.headers.token = token;
	// 		}
	// 		return res;
	// 	},
	// 	(err) => {
	// 		return Promise.reject(err);
	// 	}
	// );

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