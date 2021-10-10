let productList = [
	
	//shirt type
	{
		"url": "../img/shirt-type-a.jpg",
		"name": "Shirt Type A",
		"price": 750.00,
	},
	{
		"url": "../img/shirt-type-b.jpg",
		"name": "Shirt Type B",
		"price": 350.00,
	},
	{
		"url": "../img/shirt-type-c.jpg",
		"name": "Shirt Type C",
		"price": 550.00,
	},
	{
		"url": "../img/shirt-type-d.jpg",
		"name": "Shirt Type D",
		"price": 450.00,
	},
	{
		"url": "../img/shirt-type-e.jpg",
		"name": "Shirt Type E",
		"price": 450.00,
	},
	//tshirt type
	{
		"url": "../img/tshirt-type-a.jpg",
		"name": "T-Shirt Type A",
		"price": 670.00,
	},
	{
		"url": "../img/tshirt-type-b.jpg",
		"name": "T-Shirt Type B",
		"price": 240.00,
	},
	{
		"url": "../img/tshirt-type-c.jpg",
		"name": "T-Shirt Type C",
		"price": 635.00,
	},
	{
		"url": "../img/tshirt-type-d.jpg",
		"name": "T-Shirt Type D",
		"price": 480.00,
	},
	{
		"url": "../img/tshirt-type-e.jpg",
		"name": "T-Shirt Type E",
		"price": 955.00,
	},
	//sweater type
	{
		"url": "../img/sweater-type-a.jpg",
		"name": "Sweater Type A",
		"price": 464.00,
	},
	{
		"url": "../img/sweater-type-b.jpg",
		"name": "Sweater Type B",
		"price": 120.00,
	},
	{
		"url": "../img/sweater-type-c.jpg",
		"name": "Sweater Type C",
		"price": 735.00,
	},
	{
		"url": "../img/sweater-type-d.jpg",
		"name": "Sweater Type D",
		"price": 620.00,
	},
	{
		"url": "../img/sweater-type-e.jpg",
		"name": "Sweater Type E",
		"price": 240.00,
	},
	
];

var discount = 0.00;
var taxPercentage = 0.0;


var cartList = [];

var i=0;
productList.forEach(products => createProductCard(products.url, products.name, i++));

// createCartProductList("../img/sweater-type-e.jpg", "Sweater Type E", 240.00, 1, 0);

function updateCartList(id, count, price){

	let cartProductGetChilds = document.getElementById("cartlist_"+id).childNodes;

	cartProductGetChilds[0].lastElementChild.innerHTML = count;
	cartProductGetChilds[2].innerHTML = "BDT "+price.toFixed(2);
}

function deleteCartList(id){

	let cartProductGetChilds = document.getElementById("cartlist_"+id).remove();
}

function createCartProductList(imgURL, name, price, count, id){

	var newList = document.createElement('div');
	newList.setAttribute('class', 'cart-products-holder');
	newList.setAttribute('id', "cartlist_"+id);

	//creating img holder child...
	var newImgHolder = document.createElement('div');
	newImgHolder.setAttribute('class', 'cartimg-holder');

	//creating img tag
	var newImg = document.createElement('img');
	newImg.setAttribute('src', imgURL);

	//creating count tag
	var countTag = document.createElement('div');
	countTag.textContent = count;
	countTag.setAttribute('class', 'product-count-holder');

	//adding child into img holder
	newImgHolder.appendChild(newImg);
	newImgHolder.appendChild(countTag);

	//creating name holder...
	var nameHolder = document.createElement('div');
	nameHolder.textContent = name;
	nameHolder.setAttribute('class', 'product-cart-name-holder');

	//creating price holder...
	var priceHolder = document.createElement('div');
	priceHolder.textContent = "BDT "+price.toFixed(2);
	priceHolder.setAttribute('class', 'product-cart-price-holder');

	//creating delete holder...
	var deleteHolder = document.createElement('div');
	deleteHolder.setAttribute('class', 'product-cart-delete-holder');
	deleteHolder.setAttribute('name', id);

	//creating delete button
	var deleteButton = document.createElement('i');
	deleteButton.setAttribute('class', 'fas fa-trash');

	//delete button adding to delete holder
	deleteHolder.appendChild(deleteButton);
	
	
	//appending all childs to main list....
	newList.appendChild(newImgHolder);
	newList.appendChild(nameHolder);
	newList.appendChild(priceHolder);
	newList.appendChild(deleteHolder);


	// document.getElementById("products_holder").setAttribute("style", "background-color: red;");
	document.getElementById("cart_list_parent").appendChild(newList);
}

function createProductCard(imgURL, name, index){

	var newDiv = document.createElement('div');
	newDiv.setAttribute('class', 'product-card');
	newDiv.setAttribute('name', index);

	//creating img holder child
	var newImgHolder = document.createElement('div');
	newImgHolder.setAttribute('class', 'img-holder');

	//creating img tag
	var newImg = document.createElement('img');
	newImg.setAttribute('src', imgURL);

	//creating name holder
	var nameHolder = document.createElement('div');
	nameHolder.textContent = name;
	nameHolder.setAttribute('class', 'name-holder');


	//adding img to img holder
	newImgHolder.appendChild(newImg);

	//adding img holder to the new product card
	newDiv.appendChild(newImgHolder);

	//adding name holder to the new product card
	newDiv.appendChild(nameHolder);

	// document.getElementById("products_holder").setAttribute("style", "background-color: red;");
	document.getElementById("products_holder").appendChild(newDiv);
}

window.onload = function() {

	var productCard = document.getElementsByClassName('product-card');

	for(var i = 0; i < productCard.length; i++) {

		productCard[i].onclick = function() {
			
			let index = parseInt(this.getAttribute('name'));

			var iCount = 0;
			if(cartList[index]){

				iCount = cartList[index];
			}

			cartList[index] = ++iCount;
			
			if(iCount > 1){
				//update
				// console.log("trying to update");
				updateCartList(index, cartList[index], (cartList[index]*productList[index].price));

			}
			else{
				//create new
				createCartProductList(productList[index].url, productList[index].name, productList[index].price, cartList[index], index);
			}

			updatePeyments();
			updateDeleteList();
			// console.log(cartList);
		}
	}

}

function updateDeleteList(){

	var deleteButton = document.getElementsByClassName('product-cart-delete-holder');
	//console.log(deleteButton.length);
	for(var i = 0; i < deleteButton.length; i++) {

		deleteButton[i].onclick = function() {
			
			let index = parseInt(this.getAttribute('name'));

			swal({
				title: "Do you want to remove?",
				text: productList[index].name+" will be removed from your cart!",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			  })
			  .then((willDelete) => {
				if (willDelete) {

					deleteCartList(index);
					cartList[index] = 0;

					updatePeyments();
					// console.log(cartList);

					swal({
						title: "Done!",
						text: "Product(s) removed successfully!",
						icon: "success",
						button: false,
						timer: 1500,
					});

				} else {
				  
					swal({
						title: "Cancelled",
						icon: "error",
						button: false,
						timer: 1500,
					});
				}

			});
			
		}
	}
}




function updatePeyments(){

	//sub total calculating...
	var subTotal = 0;
	for(var i=0; i<cartList.length;i++){

		if(cartList[i]){

			subTotal = subTotal + (productList[i].price*cartList[i]);
		}
	}
	var subTotalDiv = document.getElementById('sub_total_value').innerHTML = "BDT "+subTotal.toFixed(2);

	//discount calculating...
	var tempDis = 0;
	if(subTotal > 0){

		tempDis = discount;	
	}
	else{
		
		tempDis = 0;	
	}
	document.getElementById('discount_value').innerHTML = "BDT "+tempDis.toFixed(2);

	//tax calculating...
	var tax = (subTotal*(taxPercentage/100));
	document.getElementById('tax_value').innerHTML = "BDT "+tax.toFixed(2);

	//total calculating...
	var total = 0.00;
	total = subTotal - tempDis + tax;
	document.getElementById('total_value').innerHTML = "BDT "+total.toFixed(2);

	//payment update...
	document.getElementById('paybox').innerHTML = "BDT "+total.toFixed(2);
}




