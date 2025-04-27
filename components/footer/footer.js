var footer = document.getElementById("footer");
let footerContent = `
    <footer class="bg-black text-white py-5">
    <div class="container">
        <div class="row gy-4">
            <!-- Exclusive + Subscribe -->
            <div class="col-md-3">
                <h5 class="fw-bold">Exclusive</h5>
                <p class="mb-1">Subscribe</p>
                <p class="small">Get 10% off your first order</p>
                <div class="input-group">
                    <input type="email" class="form-control bg-transparent border-white text-white"
                        placeholder="Enter your email">
                    <button class="btn btn-outline-light" type="button">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>

            <!-- Support -->
            <div class="col-md-2">
                <h6 class="fw-bold mb-3">Support</h6>
                <p class="small mb-1">Helwan</p>
                <p class="small mb-1">Cairo / Egypt</p>
                <p class="small mb-1">ahmed.ashraf0221@gmail.com</p>
                <p class="small">+201006877585</p>
            </div>

            <!-- Account -->
            <div class="col-md-2">
                <h6 class="fw-bold mb-3">Account</h6>
                <ul class="list-unstyled small">
                    <li><a href="../public/profile.html" class="text-decoration-none text-white">My Account</a></li>
                    <li><a href="../public/login.html" class="text-decoration-none text-white">Login / Register</a></li>
                    <li><a href="../public/cart.html" class="text-decoration-none text-white">Cart</a></li>
                    <li><a href="../public/wishlist.html" class="text-decoration-none text-white">Wishlist</a></li>
                    <li><a href="../public/products.html" class="text-decoration-none text-white">Shop</a></li>
                </ul>
            </div>

            <!-- Quick Link -->
            <div class="col-md-2">
                <h6 class="fw-bold mb-3">Quick Link</h6>
                <ul class="list-unstyled small">
                    <li><a href="../public/privacy-policy.html" class="text-decoration-none text-white">Privacy Policy</a>
                    </li>
                    <li><a href="../public/terms.html" class="text-decoration-none text-white">Terms Of Use</a></li>
                    <li><a href="../public/faq.html" class="text-decoration-none text-white">FAQ</a></li>
                    <li><a href="../public/contact.html" class="text-decoration-none text-white">Contact</a></li>
                </ul>
            </div>

            <!-- Download App -->
            <div class="col-md-3">
                <h6 class="fw-bold mb-2">Download App</h6>
                <p class="small">Save $3 with App New User Only</p>
                <div class="d-flex mb-2">
                    <img src="../images/footer/ahmed-linkedin-Qr-code.png" alt="QR Code" class="me-2"
                        style="width: 80px;">
                    <div class="d-flex flex-column justify-content-center align-items-center">
                        <img src="../images/footer/play-store.png" alt="Google Play" class="mb-2"
                            style="width: 100px;">
                        <img src="../images/footer/app-store.png" alt="App Store" style="width: 85px;">
                    </div>
                </div>
                <!-- Social Icons -->
                <div class="d-flex gap-3 mt-3">
                    <a href="https://www.facebook.com/AhmedAshrafFrontend" target="_blank" class="text-white"><i
                            class="fab fa-facebook-f"></i></a>
                    <a href="#" class="text-white"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="text-white"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.linkedin.com/in/ahmedashrraf/" target="_blank" class="text-white"><i
                            class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
        <!-- Bottom copyright -->
        <hr class="bg-secondary my-4">
        <div class="text-center small">
            &copy; Copyright Ahmed Ashraf 2025. All rights reserved.
        </div>
    </div>
</footer>
`;
footer.innerHTML = footerContent;
