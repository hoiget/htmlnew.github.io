import url from './url.js';

export let username = localStorage.getItem('token')
	? parseJwt(JSON.parse(localStorage.getItem('token'))).name
	: null;

export let cart = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: [];

// hàm đăng nhập
export let login = async (form, dataLogin, wellcomeText) => {
	let res = await fetch(url + '/user/api/token/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dataLogin),
	});

	let data = await res.json();
	if (res.status === 200) {
		let paths = location.pathname.split('/');
		let path = paths[paths.length - 1];
		localStorage.setItem('token', JSON.stringify(data.refresh));
		username = parseJwt(JSON.parse(localStorage.getItem('token'))).name;
		alert(wellcomeText);
		location.pathname = location.pathname.replace(path, 'account.html');
	} else {
		form.querySelector('#error-message').innerHTML =
			'Tài khoản hoặc mật khẩu không hợp lệ';
	}
};

export let logout = () => {
	let paths = location.pathname.split('/');
	let path = paths[paths.length - 1];
	localStorage.removeItem('token');
	username = null;
	location.pathname = location.pathname.replace(path, 'login.html');
};

export let regis = async (form, dataRegis, welcomeText) => {
	let res = await fetch(url + '/user/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dataRegis),
	});

	if (res.status === 200) {
		let paths = location.pathname.split('/');
		let path = paths[paths.length - 1];
		alert(welcomeText);
		location.pathname = location.pathname.replace(path, 'login.html');
	} else {
		form.querySelector('#error-message').innerHTML =
			'Tài khoản hoặc email đã tồn tại';
	}
};

export function parseJwt(token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('')
	);

	return JSON.parse(jsonPayload);
}
