// toggle navbar section

let toggleNavStatus = true;
let toggleNav = function () {
    let getNavBar = document.querySelector(".navbar");
    let getMenuBar = document.querySelector(".menu-bar");

    if (toggleNavStatus) {
        getNavBar.classList.remove("hidden");
        getNavBar.style.background = '#67A9D0';
    } else {
        getNavBar.classList.add("hidden");
        getNavBar.style.background = 'transparent'
    }

    toggleNavStatus = !toggleNavStatus;
};

// Form Section
let FormStatus = true;
let FormStatusInfo = function () {
    let getGetDemo = document.querySelector(".Get-demo");
    let getFormSec = document.querySelector(".Form-sec");
    let getTimesBtn = document.querySelector(".Times-btn");

    if (FormStatus) {
        getFormSec.style.display = 'block';
    } else {
        getFormSec.style.display = 'none'
    }

    FormStatus = !FormStatus;
};

// Sucess Form Section
let SucessFormStatus = true;
let SucessFormtatusInfo = function () {
    let getGetDemoBtn = document.querySelector(".getDemoBtn");
    let getSucessFormSec = document.querySelector(".SucessForm-sec");
    let getGetDemo = document.querySelector(".Get-demo");
    let getFormSsec = document.querySelector(".Form-sec");

    if (SucessFormStatus) {
        getSucessFormSec.style.display = 'block';
    } else {
    }

    SucessFormStatus = !SucessFormStatus;
};

// onscroll Section
window.onscroll = function () {
    let getHeader = document.querySelector('.header');
    let getHeaderCover = document.querySelector('.header-cover');
    var top = window.scrollY;

    if (top >= 100) {
        getHeader.style.background = '#67A9D0'
    } else {
        getHeader.style.background = 'transparent'
    }
}





// EMailJS Section
const form = document.getElementById("contact-form");
const successModal = document.getElementById("status");
const errorModal = document.getElementById("error-modal");
const closeErrorBtn = document.getElementById("close-error");
const loadingModal = document.getElementById("loading");

form.addEventListener("submit", function (e) {
    e.preventDefault();


    // Get input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const company = document.getElementById("company").value.trim();
    const size = document.getElementById("size").value.trim();
    const role = document.getElementById("role").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !company || !size || !role || !message) {
        alert("Please fill in all fields before submitting."); // Focus the first empty input
        if (!name) document.getElementById("name").focus();
        else if (!email) document.getElementById("email").focus();
        else if (!company) document.getElementById("company").focus();
        else if (!size) document.getElementById("size").focus();
        else if (!role) document.getElementById("role").focus();
        else if (!message) document.getElementById("message").focus();

        return;
    }



    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        document.getElementById("email").focus();
        return;
    }
    // Show loading modal
    loadingModal.classList.remove("hidden");

    const templateParams = {
        user_name: name,
        user_email: email,
        company: company,
        size: size,
        role: role,
        message: message,
    };

    // Send Welcome email via EmailJS To User
    emailjs
        .send("service_21wq9fd", "template_gy7syif", templateParams)
        .then(() => {
            console.error("Welcome email sent to user");
        })
        .catch((error) => {
            console.error("FAILED...", error);
        });


    // Send email via EmailJS
    emailjs
        .send("service_21wq9fd", "template_n45n7l4", templateParams)
        .then(() => {
            loadingModal.classList.add("hidden");
            successModal.classList.remove("hidden");
            form.reset();
        })
        .catch((error) => {
            console.error("FAILED...", error);
            loadingModal.classList.add("hidden");
            errorModal.classList.remove("hidden");
        });
});

// Close error modal
closeErrorBtn.addEventListener("click", () => {
    errorModal.classList.add("hidden");
});

