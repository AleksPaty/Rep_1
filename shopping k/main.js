const boxCart = document.querySelector(".bxs-cart");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

boxCart.addEventListener('click', () => {cart.classList.add("open")})
closeCart.addEventListener('click', () => {cart.classList.remove("open")})

if(document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", loading)
} else {
    loading()
}

function loading() {
    let removeCartBtns = document.getElementsByClassName("cart-remove")
    //console.log(removeCartBtns)
    if(removeCartBtns.length > 0) {
        for(let key of removeCartBtns) {
            console.log(key)
            key.addEventListener('click', removeCartItem, { once: true})
        }
        let allQuantityInputs = document.getElementsByClassName("cart-quantity")
        for (let input of allQuantityInputs) {
            input.addEventListener('change', quantityChange)
        }
    }
    let cartAddBtn = document.getElementsByClassName('bxs-cart-add')
    for (let btn of cartAddBtn) {
        btn.addEventListener('click', addCartItem)
    }
}

function addCartItem(e) {
    let options = e.target.parentElement.children;
    let productTitle = document.getElementsByClassName('cart-product-title')
    let basket = document.querySelector('.cart-body')
    let clonCard = false;

    for (let title of productTitle) {
        if (title.innerText == options[1].innerText) {
            clonCard = true;
        }
    }
    
    //if(Array.prototype.includes.call(productTitle)) {} /* псевдомассив из элементов не вариант */
    if (!clonCard) {
        basket.insertAdjacentHTML("afterbegin", `
            <div class="cart-box">
                <img src="${options[0].src.replace("file:///E:/workshopTest/shopping%20k/", "")}" alt="${options[0].alt}" class="cart-img">
                <div class="detail">
                    <div class="cart-product-title">${options[1].innerText}</div>
                    <div class="cart-price">${options[2].innerText}</div>
                    <input type="number" name="" value="1" min="1" class="cart-quantity">
                </div>
                <i class='bx bx-trash cart-remove'></i>
            </div>
        `)
        basket.querySelector(".cart-remove").addEventListener('click', removeCartItem, { once: true})
        for (let quant of basket.getElementsByClassName("cart-quantity")) {
            quant.removeEventListener('change', quantityChange)
            quant.addEventListener('change', quantityChange)
        }
        clonCard = false;
    }
    updateTotal()
    highlightbasket(basket)
}
function quantityChange(e) {
    if(isNaN(e.target.value) || e.target.value < 1) {
        e.target.value = 1
    }
    updateTotal()
}
function highlightbasket(basket) {
    let redDot = document.querySelector(".hlt-dote")
    basket.children.length > 0 ? redDot.style.display = "inline" : redDot.style.display = "none";
}
function removeCartItem(e) {
    e.target.parentElement.remove()
    updateTotal()
    highlightbasket(document.querySelector('.cart-body'))
}

function updateTotal() {
    let cartBoxes = document.getElementsByClassName("cart-box")

    let total = 0;
    for (let item of cartBoxes) {
        let itemPrice = item.querySelector(".cart-price")
        let price = parseFloat(itemPrice.innerText.replace("$", ""))
        let valueQuantity = item.querySelector(".cart-quantity").value;
        
        total += (price * valueQuantity)
    }
    total = Math.round(total * 100) / 100;
    document.querySelector(".total-price").innerText = "$" + total;
}