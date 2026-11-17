
// =================================
// NOVABITE - BASIC JAVASCRIPT
// =================================


// 1. CART ARRAYS

let cartNames = [];
let cartPrices = [];


// 2. ADD TO CART FUNCTION

function addToCart(name, price) {

    cartNames.push(name);

    cartPrices.push(price);

    alert(name + " added to cart!");

    updateCart();

}


// 3. UPDATE CART FUNCTION

function updateCart() {

    let cartItems = document.getElementById("cart-items");

    let count = document.getElementById("cart-count");

    let subtotal = 0;

    cartItems.innerHTML = "";

    // Display cart items

    if (cartNames.length === 0) {

        cartItems.innerHTML =
            "<p class='empty-cart'>Your cart is empty!</p>";

    }

    for (let i = 0; i < cartNames.length; i++) {

        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <h4>${cartNames[i]}</h4>

                    <p>Rs. ${cartPrices[i]}</p>

                </div>

                <button class="remove-btn"
                    onclick="removeItem(${i})">
                    ✕
                </button>

            </div>

        `;

        subtotal = subtotal + cartPrices[i];

    }


    // Calculate delivery charges

    let delivery = 0;

    if (cartNames.length > 0) {

        delivery = 150;

    }


    // Calculate final total

    let total = subtotal + delivery;


    // Display values

    count.innerHTML = cartNames.length;

    document.getElementById("subtotal").innerHTML =
        "Rs. " + subtotal;

    document.getElementById("delivery").innerHTML =
        "Rs. " + delivery;

    document.getElementById("total").innerHTML =
        "Rs. " + total;

}


// 4. REMOVE ITEM FUNCTION

function removeItem(index) {

    cartNames.splice(index, 1);

    cartPrices.splice(index, 1);

    updateCart();

}


// 5. OPEN AND CLOSE CART

function toggleCart() {

    document.getElementById("cart-sidebar")
        .classList.toggle("open");

    document.getElementById("overlay")
        .classList.toggle("show");

}


// 6. SEARCH FOOD FUNCTION

function searchFood() {

    let search = document.getElementById("search-input")
        .value.toLowerCase();

    let cards = document.getElementsByClassName("food-card");

    let found = 0;

    for (let i = 0; i < cards.length; i++) {

        let foodName = cards[i]
            .getElementsByTagName("h3")[0]
            .innerHTML.toLowerCase();

        if (foodName.includes(search)) {

            cards[i].style.display = "block";

            found++;

        } else {

            cards[i].style.display = "none";

        }

    }

}


// 7. CATEGORY FILTER FUNCTION

function showCategory(category, button) {

    let cards = document.getElementsByClassName("food-card");

    let buttons = document.getElementsByClassName("category-btn");

    // Remove active class

    for (let i = 0; i < buttons.length; i++) {

        buttons[i].classList.remove("active");

    }

    button.classList.add("active");

    // Clear search field

    document.getElementById("search-input").value = "";

    // Display selected category

    for (let i = 0; i < cards.length; i++) {

        let foodCategory = cards[i].getAttribute("data-category");

        if (category === "All" || foodCategory === category) {

            cards[i].style.display = "block";

        } else {

            cards[i].style.display = "none";

        }

    }

}


// 8. CHECKOUT FUNCTION

function checkout() {

    if (cartNames.length === 0) {

        alert("Your cart is empty!");

    } else {

        document.getElementById("checkout-modal")
            .classList.add("show");

    }

}


// 9. CLOSE CHECKOUT

function closeCheckout() {

    document.getElementById("checkout-modal")
        .classList.remove("show");

}


// 10. PLACE ORDER

document.getElementById("checkout-form")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.getElementById("customer-name").value;

        let phone = document.getElementById("customer-phone").value;

        let address = document.getElementById("customer-address").value;

        if (name === "" || phone === "" || address === "") {

            alert("Please fill all fields!");

        } else {

            alert(
                "Your order has been placed successfully!\n\n" +
                "Customer: " + name + "\n" +
                "Phone: " + phone
            );

            // Empty cart

            cartNames = [];

            cartPrices = [];

            updateCart();

            closeCheckout();

            // Close cart sidebar

            document.getElementById("cart-sidebar")
                .classList.remove("open");

            document.getElementById("overlay")
                .classList.remove("show");

            this.reset();

        }

    });


// 11. CONTACT FORM

document.getElementById("contact-form")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.getElementById("contact-name").value;

        let email = document.getElementById("contact-email").value;

        let message = document.getElementById("contact-message").value;

        if (name === "" || email === "" || message === "") {

            alert("Please fill all fields!");

        } else {

            alert("Thank you! Your message has been submitted.");

            this.reset();

        }

    });


// 12. INITIAL CART

updateCart();
