// cart functionalities

let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

// show cart
cartIcon.addEventListener('click', () => {
  cart.classList.add('active')
})

// close cart
closeCart.addEventListener('click', () => {
  cart.classList.remove('active')
})

// check if items added to cart
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

// remove item(s) from cart
function ready() {
  let removeCartButton = document.getElementsByClassName('cart-remove')
  for (let i = 0; i < removeCartButton.length; i++) {
    let button = removeCartButton[i]
    button.addEventListener('click', removeCartItem)
  }

  // check quantity changes
  let quantityInputs = document.getElementsByClassName('cart-quantity')
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }

  // Get item to be added to cart
  let addCart = document.getElementsByClassName('add-cart')
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i]
    button.addEventListener('click', addToCartClicked)
  }

  // BUY NOW
  document
    .getElementsByClassName('btn-buy')[0]
    .addEventListener('click', buyButtonClicked)
}

// buy now function
function buyButtonClicked() {
  alert('Thank you for your purchase')
  let cartItems = document.getElementsByClassName('cart-content')[0]
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateTotal()
}

// remove particular item from cart
function removeCartItem(event) {
  let buttonClicked = event.target
  buttonClicked.parentElement.remove()
  updateTotal()
}

// change quantity of item
function quantityChanged(event) {
  let input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateTotal()
}

// Add item to Cart
function addToCartClicked(event) {
  let button = event.target
  let shopItem = button.parentElement
  let title = shopItem.getElementsByClassName('product-title')[0].innerText
  let price = shopItem.getElementsByClassName('price')[0].innerText
  let imageSrc = shopItem.getElementsByClassName('product-img')[0].src
  // console.log(title, price)
  addItemToCart(title, price, imageSrc)
  updateTotal()
}

// Add item details to cart
function addItemToCart(title, price, imageSrc) {
  let cartShopBox = document.createElement('div')
  cartShopBox.classList.add('cart-box')
  let cartItems = document.getElementsByClassName('cart-content')[0]
  let cartItemNames = cartItems.getElementsByClassName('cart-product-title')
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('This item is already added to the cart')
      return
    }
  }

  let cartBoxContent = `
  <img src="${imageSrc}" class="cart-img" />
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity" />
      </div>
      <i class="bx bxs-trash-alt cart-remove"></i> `

  cartShopBox.innerHTML = cartBoxContent
  cartItems.append(cartShopBox)
  cartShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem)
  cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged)
}

// updateTotal
function updateTotal() {
  let cartContent = document.getElementsByClassName('cart-content')[0]
  let cartBoxes = cartContent.getElementsByClassName('cart-box')
  let total = 0
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i]
    let priceElement = cartBox.getElementsByClassName('cart-price')[0]
    let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
    let price = parseFloat(priceElement.innerText.replace('₦', ''))
    let quantity = quantityElement.value
    total = total + price * quantity
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('total-price')[0].innerText = '₦' + total
}
