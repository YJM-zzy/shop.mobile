import axios from "axios";

// token 键定义
const accessTokenKey = "access-token";
const refreshAccessTokenKey = `x-${accessTokenKey}`;

// 解密token
function decryptJWT(token) {
	token = token.replace(/_/g, "/").replace(/-/g, "+");
	let json = decodeURIComponent(escape(window.atob(token.split(".")[1])));
	return JSON.parse(json);
}

function getJWTDate(timestamp) {
	return new Date(timestamp * 1000);
}

function clearAccessTokens(){
	localStorage.removeItem('token');
	localStorage.removeItem('refresh_token');
}

export default function request(config) {
	const request = axios.create({
		// baseURL:'https://localhost:44342',
		baseURL:process.env.NODE_ENV !== 'production' ?'https://localhost:5001': 'http://124.222.132.236:8080' ,
		timeout: 1000000,
	});

	// 请求拦截器
	request.interceptors.request.use(
		(res) => {
			if (res.url !== "/api/app/auth/login" || res.url !== '/api/app/auth/register') {
				const token = localStorage.getItem("token");
				if(token){
					const jwt = decryptJWT(token);
					const exp =getJWTDate(jwt.exp)
					if(exp < new Date())
					{
						res.headers['X-Authorization'] = 'Bearer ' + localStorage.getItem('refresh_token');
					}
				}
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
			// 获取状态码和返回数据
			const status = res.status;
			// 处理 401
			if (status === 401) {
				clearAccessTokens();
			}
			// 读取响应报文头 token 信息
			const accessToken = res.headers[accessTokenKey];
			const refreshAccessToken = res.headers[refreshAccessTokenKey];
			if(accessToken && refreshAccessToken && accessToken !== 'invalid_token')
			{
				localStorage.setItem('token', accessToken);
				localStorage.setItem('refresh_token', refreshAccessToken);
			}
			return res.data;
		},
		error => {
			return Promise.reject(error);
		}
	);

	return request(config);
}