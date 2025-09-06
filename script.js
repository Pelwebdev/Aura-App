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




// when click in small screen navbar the bg should disapper and scroll to the exact href
const navLinks = document.querySelectorAll(".navbar a");
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth < 1024) {
            const getNavBar = document.querySelector(".navbar");
            getNavBar.classList.add("hidden");
            getNavBar.style.background = 'transparent';
            toggleNavStatus = true;
        }
    });
});





// Form Section DownloadForm
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





// DownloadForm Section
let DownloadFormStatus = true;
let DownloadFormStatusInfo = function () {
    let getGetDemo = document.querySelector(".Get-demo");
    let getDownFormSec = document.querySelector(".DownloadForm");
    let getTimesBtn = document.querySelector(".Times-btn");

    if (FormStatus) {
        getDownFormSec.style.display = 'block';
    } else {
        getDownFormSec.style.display = 'none'
    }

    FormStatus = !FormStatus;
};





// Dropdown functionality
const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdownSelected = document.getElementById("dropdownSelected");
const options = dropdownMenu.querySelectorAll("li");

dropdownBtn.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
});

options.forEach(option => {
    option.addEventListener("click", () => {
        // Update button text
        dropdownSelected.textContent = option.textContent;

        // Make the placeholder change colr after selection
        dropdownSelected.classList.remove("text-gray-500");
        dropdownSelected.style.color = "#242424";

        // Close dropdown
        dropdownMenu.classList.add("hidden");
    });
});

// Close dropdown if clicked outside
document.addEventListener("click", (e) => {
    if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add("hidden");
    }
});
// .Dropdown functionality




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
const successModal = document.getElementById("status");
const errorModal = document.getElementById("error-modal");
const closeErrorBtn = document.getElementById("close-error");
const loadingModal = document.getElementById("loading");
const successMessage = document.getElementById("success-message");

// Handle form submission (works for any form)
function handleFormSubmit(e, formType) {
    e.preventDefault();

    // Get form reference
    const form = e.target;

    // Common fields
    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();

    // Basic validation
    if (!name || !email) {
        alert("Please fill in all required fields before submitting.");
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Show loading modal
    loadingModal.classList.remove("hidden");

    let formDetails = "";
    let welcomeMessage = "";

    if (formType === "Contact Form") {
        const company = form.querySelector("#company")?.value.trim() || "";
        const size = form.querySelector("#size")?.value.trim() || "";
        const role = form.querySelector("#role")?.value.trim() || "";
        const message = form.querySelector("#message")?.value.trim() || "";

        formDetails = `
Company: ${company}
Size: ${size}
Role: ${role}
Message: ${message}
        `;

        welcomeMessage = "Thanks for contacting Aura! We’ll review your message and get back to you soon.";
    }

    if (formType === "Waitlist Form") {
        const interest = form.querySelector("#dropdownSelected")?.innerText.trim() || "";

        formDetails = `Interest: ${interest}`;
        welcomeMessage = "Thanks for joining the Aura waitlist! You’ll be the first to know when we launch 🚀";
    }

    const templateParams = {
        form_type: formType,
        user_name: name,
        user_email: email,
        form_details: formDetails,
        welcome_message: welcomeMessage // dynamic welcome message
    };

    // Send Welcome email to user (same template, dynamic message)
    emailjs
        .send("service_21wq9fd", "template_gy7syif", templateParams)
        .then(() => {
            console.log("Welcome email sent to user");
        })
        .catch((error) => {
            console.error("Failed to send welcome email", error);
        });

    // Send form details to admin
    emailjs
        .send("service_21wq9fd", "template_n45n7l4", templateParams)
        .then(() => {
            loadingModal.classList.add("hidden");
            
        // Change success message based on form type
        if (formType === "Contact Form") {
            successMessage.innerText = "✅ Thanks! Someone from our team will be in touch within 24 hours.";
        } else if (formType === "Waitlist Form") {
            successMessage.innerText = "🎉 Thank you! You’re officially on the Aura Conect waitlist. We’ll notify you as soon as the app is live.";
        }

            successModal.classList.remove("hidden");
            form.reset();
        })
        .catch((error) => {
            console.error("Failed to send admin email", error);
            loadingModal.classList.add("hidden");
            errorModal.classList.remove("hidden");
        });
}

// Attach events
document.getElementById("contact-form")?.addEventListener("submit", (e) => handleFormSubmit(e, "Contact Form"));
document.getElementById("waitlist-form")?.addEventListener("submit", (e) => handleFormSubmit(e, "Waitlist Form"));

// Close error modal
closeErrorBtn.addEventListener("click", () => {
    errorModal.classList.add("hidden");
});
