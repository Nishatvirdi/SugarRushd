//Filter Menu Items
let filterItems = (category) => {
    let cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        if (category == "all") {
            card.style.display = "flex";
        } else {
            if (card.classList.contains(category)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        }
    });

    let buttons = document.querySelectorAll("#menu_buttons>button");
    buttons.forEach((btn) => {
        btn.classList.remove("active");
    });
    event.target.classList.add("active");
};




//side bar
let cart_btn = document.getElementById("cart_btn");
console.log("cart_btn")
let cross_btn = document.getElementById("cross_btn");
let sidebar = document.getElementById("sidebar");

cart_btn.addEventListener("click", () => {
    sidebar.style.right = "0";
    console.log("crt pressed")
});

cross_btn.addEventListener("click", () => {
    sidebar.style.right = "-400px";  
});


let cart = [];

// Quantity update
document.querySelectorAll(".card").forEach((card) => {
    let reduceBtn = card.querySelector(".reducebtn");
    let addBtn = card.querySelector(".addbtn");
    let quantityP = card.querySelector(".itemquantity");

    reduceBtn.addEventListener("click", () => {
        let quantvalue = parseInt(quantityP.innerText);
        if (quantvalue > 0) {
            quantityP.innerText = quantvalue - 1;
        }
    });

    addBtn.addEventListener("click", () => {
        let quantvalue = parseInt(quantityP.innerText);
        quantityP.innerText = quantvalue + 1;
    });

    // add to cart
    let addCartBtn = card.querySelector(".card_two_add button");
    addCartBtn.addEventListener("click", () => {
        let name = card.querySelector(".card_one_desc h2").innerText;
        let price = parseInt(card.querySelector(".card_one_desc p").innerText.replace("Rs.", ''));
        let quant = parseInt(quantityP.innerText);

        if (quant > 0) {
            let existing = cart.find(item => item.name === name);
            if (existing) {
                existing.qty += quant;
            } else {
                cart.push({ name: name, price: price, qty: quant });
            }
            updatecart();
            displayCart();
            quantityP.innerText = 0;
        }
        console.log(cart)
    });
});

//update cart display
function updatecart() {
    let totalquantity = 0;
    let totalprice = 0;

    cart.forEach((item) => {
        totalquantity += item.qty;
        totalprice += item.price * item.qty;
    });

    let cart_qty = document.getElementById("cart_quantity");
    let cart_price = document.getElementById("cart_price");

    cart_qty.innerText = totalquantity;
    cart_price.innerText = `Rs.${totalprice}.00`;
}

function displayCart() {
    const cartContainer = document.getElementById("cart_container");
    cartContainer.innerHTML = "";
    
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        totalPrice += itemTotal;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart_item");
        itemDiv.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Price: ₹${item.price}</p>
            <p>Quantity: ${item.qty}</p>
            <p>Total: ₹${itemTotal}</p>
            <div class="cart_buttons">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <button onclick="updateQuantity(${index}, 1)">+</button>
                <button onclick="deleteItem(${index})" class="deletebtn"><i class="fa-solid fa-trash"></i></button>
            </div>
            </div>
        `;
        cartContainer.appendChild(itemDiv);
    });

    const cartTotal = document.getElementById("cart_total");
    cartTotal.innerHTML = `<h3>Cart Total: ₹${totalPrice}</h3>`;
}

// Function to update quantity
function updateQuantity(index, change) {
    cart[index].qty += change;  
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updatecart(); 
    displayCart();
}

//delete from cart
function deleteItem(index) {
    cart.splice(index, 1); 
    updatecart();
    displayCart();
}