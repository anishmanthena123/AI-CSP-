// =====================================
// MOBILE MENU
// =====================================

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

if (menuButton && navMenu) {
    menuButton.addEventListener("click", function () {
        navMenu.classList.toggle("open");
    });
}


// =====================================
// CART
// =====================================

function getCart() {

    try {
        return JSON.parse(
            localStorage.getItem("apexCart")
        ) || [];
    }

    catch (error) {
        return [];
    }

}


function saveCart(cart) {

    localStorage.setItem(
        "apexCart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


function updateCartCount() {

    const cart = getCart();

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        const numberOfItems =
            cart.reduce(function (total, item) {

                return total + item.quantity;

            }, 0);

        cartCount.textContent =
            numberOfItems;
    }

}


function addToCart(name, price, image) {

    const cart = getCart();

    const existing =
        cart.find(function (item) {

            return item.name === name;

        });


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: Date.now(),

            name: name,

            price: Number(price),

            image: image,

            quantity: 1

        });

    }


    saveCart(cart);

    showToast(
        name + " added to cart!"
    );
}


document
.querySelectorAll(".add-cart")
.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            addToCart(

                button.dataset.name,

                button.dataset.price,

                button.dataset.image

            );

        }
    );

});


// =====================================
// CART PAGE
// =====================================

function renderCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    if (!cartItems) {
        return;
    }


    const cart = getCart();


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your garage is empty.
                </h2>

                <p>
                    Add an Apex vehicle
                    to your cart.
                </p>

                <a
                    href="vehicles.html"
                    class="button primary"
                >
                    Explore Vehicles
                </a>

            </div>

        `;

        updateCartTotals();

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(function (item) {

        const element =
            document.createElement("div");

        element.className =
            "cart-item";


        element.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <p class="vehicle-type">
                    APEX VEHICLE
                </p>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    $${item.price.toLocaleString()}
                </p>

                <p>
                    Quantity: ${item.quantity}
                </p>

                <button
                    class="remove-button"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

            <strong>

                $${(
                    item.price *
                    item.quantity
                ).toLocaleString()}

            </strong>

        `;


        cartItems.appendChild(
            element
        );

    });


    updateCartTotals();
}


function removeFromCart(id) {

    let cart = getCart();


    cart =
        cart.filter(function (item) {

            return item.id !== id;

        });


    saveCart(cart);

    renderCart();

    showToast(
        "Vehicle removed."
    );
}


function updateCartTotals() {

    const cart = getCart();


    const total =
        cart.reduce(
            function (sum, item) {

                return sum +
                    item.price *
                    item.quantity;

            },

            0
        );


    const subtotal =
        document.getElementById(
            "subtotal"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    if (subtotal) {

        subtotal.textContent =
            "$" + total.toLocaleString();

    }


    if (cartTotal) {

        cartTotal.textContent =
            "$" + total.toLocaleString();

    }

}


// =====================================
// CHECKOUT
// =====================================

const checkoutButton =
    document.getElementById(
        "checkoutButton"
    );


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            const cart =
                getCart();


            if (cart.length === 0) {

                showToast(
                    "Your cart is empty."
                );

                return;
            }


            alert(
                "Demo Checkout\n\n" +
                "Your order was created for demonstration purposes.\n\n" +
                "No payment was processed."
            );

        }
    );

}


// =====================================
// TOAST
// =====================================

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },

        2500
    );

}


// =====================================
// ACCOUNT SYSTEM
// =====================================

function getAccounts() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "apexAccounts"
            )
        ) || [];

    }

    catch (error) {

        return [];

    }

}


function saveAccounts(accounts) {

    localStorage.setItem(
        "apexAccounts",
        JSON.stringify(accounts)
    );

}


// =====================================
// SIGN UP
// =====================================

const signupForm =
    document.getElementById(
        "signupForm"
    );


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const firstName =
                document
                .getElementById(
                    "signupFirst"
                )
                .value
                .trim();


            const lastName =
                document
                .getElementById(
                    "signupLast"
                )
                .value
                .trim();


            const email =
                document
                .getElementById(
                    "signupEmail"
                )
                .value
                .trim()
                .toLowerCase();


            const password =
                document
                .getElementById(
                    "signupPassword"
                )
                .value;


            const confirmPassword =
                document
                .getElementById(
                    "confirmPassword"
                )
                .value;


            const message =
                document
                .getElementById(
                    "signupMessage"
                );


            if (
                password.length < 6
            ) {

                message.textContent =
                    "Password must be at least 6 characters.";

                message.style.color =
                    "#ff6767";

                return;
            }


            if (
                password !==
                confirmPassword
            ) {

                message.textContent =
                    "Passwords do not match.";

                message.style.color =
                    "#ff6767";

                return;
            }


            const accounts =
                getAccounts();


            const duplicate =
                accounts.some(
                    function (account) {

                        return (
                            account.email ===
                            email
                        );

                    }
                );


            if (duplicate) {

                message.textContent =
                    "An account with this email already exists.";

                message.style.color =
                    "#ff6767";

                return;
            }


            accounts.push({

                firstName:
                    firstName,

                lastName:
                    lastName,

                email:
                    email,

                password:
                    password

            });


            saveAccounts(
                accounts
            );


            localStorage.setItem(
                "apexCurrentUser",
                email
            );


            message.textContent =
                "Account created successfully!";

            message.style.color =
                "#56e58f";


            setTimeout(
                function () {

                    window.location.reload();

                },

                500
            );

        }
    );

}


// =====================================
// LOGIN
// =====================================

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document
                .getElementById(
                    "loginEmail"
                )
                .value
                .trim()
                .toLowerCase();


            const password =
                document
                .getElementById(
                    "loginPassword"
                )
                .value;


            const message =
                document
                .getElementById(
                    "loginMessage"
                );


            const user =
                getAccounts()
                .find(
                    function (account) {

                        return (
                            account.email === email &&
                            account.password === password
                        );

                    }
                );


            if (!user) {

                message.textContent =
                    "Incorrect email or password.";

                message.style.color =
                    "#ff6767";

                return;
            }


            localStorage.setItem(
                "apexCurrentUser",
                email
            );


            message.textContent =
                "Login successful!";

            message.style.color =
                "#56e58f";


            setTimeout(
                function () {

                    window.location.reload();

                },

                400
            );

        }
    );

}


// =====================================
// CURRENT USER
// =====================================

function getCurrentUser() {

    const email =
        localStorage.getItem(
            "apexCurrentUser"
        );


    if (!email) {
        return null;
    }


    return getAccounts()
        .find(
            function (account) {

                return (
                    account.email ===
                    email
                );

            }
        );

}


function updateAccountDisplay() {

    const user =
        getCurrentUser();


    const accountLink =
        document.getElementById(
            "accountLink"
        );


    if (
        accountLink &&
        user
    ) {

        accountLink.textContent =
            user.firstName;

    }


    const accountForms =
        document.getElementById(
            "accountForms"
        );


    const loggedInArea =
        document.getElementById(
            "loggedInArea"
        );


    const welcomeName =
        document.getElementById(
            "welcomeName"
        );


    if (
        user &&
        accountForms &&
        loggedInArea
    ) {

        accountForms.style.display =
            "none";

        loggedInArea.style.display =
            "block";


        if (welcomeName) {

            welcomeName.textContent =
                user.firstName;

        }

    }

}


// =====================================
// LOGOUT
// =====================================

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "apexCurrentUser"
            );

            window.location.reload();

        }
    );

}


// =====================================
// FORMSPREE CONTACT FORM
// =====================================

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const formStatus =
                document.getElementById(
                    "formStatus"
                );


            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            const originalText =
                submitButton.textContent;


            formStatus.textContent =
                "Sending...";

            formStatus.style.color =
                "white";


            submitButton.disabled =
                true;

            submitButton.textContent =
                "Sending...";


            try {

                const response =
                    await fetch(
                        "https://formspree.io/f/xnpjojkw",
                        {

                            method:
                                "POST",

                            body:
                                new FormData(
                                    contactForm
                                ),

                            headers: {

                                "Accept":
                                    "application/json"

                            }

                        }
                    );


                if (response.ok) {

                    formStatus.textContent =
                        "Message sent successfully!";

                    formStatus.style.color =
                        "#56e58f";

                    contactForm.reset();

                }

                else {

                    let errorMessage =
                        "There was a problem sending your message.";


                    try {

                        const data =
                            await response.json();


                        if (
                            data.errors &&
                            data.errors.length
                        ) {

                            errorMessage =
                                data.errors
                                .map(
                                    function (error) {

                                        return error.message;

                                    }
                                )
                                .join(" ");

                        }

                    }

                    catch (error) {
                    }


                    formStatus.textContent =
                        errorMessage;

                    formStatus.style.color =
                        "#ff6767";

                }

            }

            catch (error) {

                formStatus.textContent =
                    "Unable to send your message. Please try again.";

                formStatus.style.color =
                    "#ff6767";

            }

            finally {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    originalText;

            }

        }
    );

}


// =====================================
// START WEBSITE
// =====================================

updateCartCount();

updateAccountDisplay();

renderCart();
