import { username, logout } from './auth.js';
import url from './url.js';

let leftSite = document.querySelector('.left-site');
let button = leftSite.querySelector('button');
button.onclick = () => {
	logout();
};

let setInfo = (data) => {
	leftSite.querySelector('#username').innerHTML = data.username;
	leftSite.querySelector('#phoneNumber').innerHTML = data.phone_number;
	leftSite.querySelector('#email').innerHTML = data.email;
};

let getInfo = async (username) => {
	let res = await fetch(url + `/user/${username}/`);
	let data = await res.json();
	setInfo(data);
};

getInfo(username);
