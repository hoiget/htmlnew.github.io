import { username } from './auth.js';
let orderDetail = JSON.parse(sessionStorage.getItem('cart'));
let data = {
	user: username,
	address: 'Đại học công nghiệp thành phố hồ chí minh',
	orderDetails: orderDetail,
};

console.log(data);
