import url from './url.js';
import { cart } from './auth.js';
// let tags = [];
let addTags = async () => {
	let res = await fetch(url + '/product/category/');
	let data = await res.json();
	return data;
};

let id = sessionStorage.getItem('id')
	? JSON.parse(sessionStorage.getItem('id'))
	: 1;

let getProduct = async (callback) => {
	let res = await fetch(url + `/product/${id}/`);
	let data = await res.json();
	callback(data);
};

let renderMain = async (data) => {
	let tags = await addTags();
	let main = document.querySelector('main');
	main.innerHTML = `
	<section class="info-cake container">
            <div class="l-info">
                <img src=${url + data.image} alt="">
            </div>
            <div class="r-info" id=${data.id}>
                <h4 class="name">${data.name}</h4>
                <h2 id="price">
                    <p class="old">240000</p>
                    <p class="new">120000</p>
                </h2>
                <p id="category">
                </p>
                <div class="input-group">
                    <label for="amount">Số lượng</label>
                    <input name="amount" id="amount" type="number" min="0" class="amount" placeholder="1" value="1">
                </div>
                <div class="button-group">
                    <button id="addCard" class="btn-primary" onclick="handlerBtnAdd(this)">Thêm vào giỏ hàng</button>
                    <button id="buy">Mua ngay</button>
                </div>
            </div>
        </section>
        <section class="more-info-cake container">
            <div class="ingredient">
                <b>Nguyên liệu: </b>
                <span>${data.ingredient}</span>
            </div>
            <div class="describe">
                <b>Miêu tả: </b>
                <span>${data.describe}</span>
            </div>
        </section>
	`;
	// add sale price
	document.getElementById('price').innerHTML =
		data.sale !== 0
			? `
		<h2 id="price">
			<p class="old">${Intl.NumberFormat().format(data.price)}</p>
			<p class="new">${Intl.NumberFormat().format(
				data.price - (data.price * data.sale) / 100
			)}</p>
		</h2>
	`
			: `
		<h2 id="price">
			<p class="new">${Intl.NumberFormat().format(
				data.price - (data.price * data.sale) / 100
			)}</p>
		</h2>
	`;
	// add category
	document.getElementById('category').innerHTML = data.category
		.map(
			(tag) =>
				`
	<span>${tags[tag - 1].name}</span>
	`
		)
		.join('');
};
getProduct(renderMain);

window.handlerBtnAdd = (e) => {
	let section = e.parentElement.parentElement;
	let item = {
		cake: section.id,
		name: section.querySelector('.name').innerHTML,
		image: section.parentElement.querySelector('img').src,
		price: section.querySelector('#price .new').innerHTML,
		amount: section.querySelector('#amount').value,
	};
	if (cart.some((cake) => cake.cake === item.cake)) {
		let index = cart.findIndex((cake) => cake.cake === item.cake);
		cart[index].amount = (
			parseInt(cart[index].amount, 10) + parseInt(item.amount, 10)
		).toString();
		localStorage.setItem('cart', JSON.stringify(cart));
	} else {
		cart.push(item);
		localStorage.setItem('cart', JSON.stringify(cart));
	}
	document.getElementById('card-num').innerHTML = cart.length;
};
