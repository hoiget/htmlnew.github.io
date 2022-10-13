import url from './url.js';
const { createStore } = window.Redux;

window.showAside = () => {
	document.querySelector('aside').classList.toggle('active');
};
// create store
let initialState = [];

let getData = async () => {
	let res = await fetch(url + '/product/');
	let data = await res.json();
	return data;
};
await getData().then((data) => (initialState = data));
const cakesReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'category': {
			if (action.condition === '0') {
				renderCakesList(state);
				return state;
			}
			let newData = state.filter((cake) =>
				cake.category.some(
					(type) => parseInt(type.id) === parseInt(action.condition)
				)
			);
			renderCakesList(newData);
			return state;
		}

		default:
			return state;
	}
};

const store = createStore(cakesReducer);
// render cakes
const renderCakesList = async (cakesList) => {
	if (!Array.isArray(cakesList) || cakesList.length === 0) return;

	const sectionElement = document.querySelector('section');
	if (!sectionElement) return;

	sectionElement.innerHTML = '';
	let html = cakesList.map(
		(cake) => `
	<a href="./product.html" class="item" onclick="handlerProduct(this)" id=${
		cake.id
	}>
		<img src=${url + cake.image} alt="">
		<h5 class="name">${cake.name}</h5>
		<p class="price">${Intl.NumberFormat().format(cake.price)} VND</p>
	</a>
	`
	);

	sectionElement.innerHTML = html.join('');
};

// render category
let renderCategory = async (data) => {
	let category = document.querySelector('.list-category');
	let html = data.map(
		(type) =>
			`<li class="type"  onclick="changeCategory(this)" id=${type.id}>${type.name}</li>`
	);
	if (category) {
		category.innerHTML = `<li class="type"  onclick="changeCategory(this)" id="0">tất cả</li>`;
		category.innerHTML += html.join('');
	}
};

let getTags = async () => {
	let res = await fetch(url + '/product/category/');
	let data = await res.json();
	renderCategory(data);
};

getTags(renderCategory);
getData().then((data) => renderCakesList(data));

window.changeCategory = (e) => {
	const action = {
		type: 'category',
		condition: e.id,
	};
	store.dispatch(action);
};
