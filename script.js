// toggle navbar section
let toggleNavStatus = true;
let toggleNav = function () {
    let getNavBar = document.querySelector(".navbar");
    let getMenuBar = document.querySelector(".menu-bar");
    let getTimesBar = document.querySelector(".times-bar");

    if (toggleNavStatus) {
        getTimesBar.classList.remove("hidden");
        getMenuBar.classList.add("hidden");
        getNavBar.classList.remove("hidden");
        getNavBar.style.background = '#67A9D0';
    } else {
        getTimesBar.classList.add("hidden");
        getMenuBar.classList.remove("hidden");
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

    if (DownloadFormStatus) {
        getDownFormSec.style.display = 'block';
    } else {
        getDownFormSec.style.display = 'none'
    }

    DownloadFormStatus = !DownloadFormStatus;
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


// MODALS
// ==========================
const successModal = document.getElementById("status");
const errorModal = document.getElementById("error-modal");
const closeErrorBtn = document.getElementById("close-error");
const loadingModal = document.getElementById("loading");
const successMessage = document.getElementById("success-message");

const sureDeleteModal = document.getElementById("sureDelete-modal");
const closeSureDelete = document.getElementById("close-sureDelete");
const yesDeleteBtn = document.getElementById("yesDelete-sureDelete");

// ==========================
// HELPER FUNCTION: SEND EMAIL
// ==========================
function sendEmail(templateParams, form) {
    if (typeof emailjs === "undefined") {
        console.error("EmailJS is not loaded!");
        loadingModal.classList.add("hidden");
        errorModal.classList.remove("hidden");
        return;
    }

    loadingModal.classList.remove("hidden");
    emailjs.init("3fXb389uFG4etZ4-v"); // public key

    Promise.all([
        emailjs.send("service_21wq9fd", "template_gy7syif", templateParams),
        emailjs.send("service_21wq9fd", "template_n45n7l4", templateParams)
    ])
        .then(() => {
            loadingModal.classList.add("hidden");

            // --------------------------
            // CUSTOM SUCCESS MESSAGES
            // --------------------------
            if (templateParams.form_type === "Waitlist Form") {
                successMessage.innerText = "🎉 Thank you! You’re officially on the Aura Connect waitlist. We’ll notify you as soon as the app is live.";
            } else if (templateParams.form_type === "Contact Form") {
                successMessage.innerText = "✅ Thanks! Someone from our team will be in touch within 24 hours.";
            } else if (templateParams.form_type === "Deleted Form") {
                successMessage.innerText = "🗑️ Your deletion request has been submitted. We’ll process it within 30 days.";
            } else {
                successMessage.innerText = `✅ ${templateParams.form_type} submitted successfully!`;
            }

            successModal.classList.remove("hidden");
            form.reset();
        })
        .catch((err) => {
            console.error("EmailJS Error:", err);
            loadingModal.classList.add("hidden");
            errorModal.classList.remove("hidden");
        });
}

// ==========================
// HANDLE FORM SUBMIT
// ==========================
function handleFormSubmit(e, formType) {
    e.preventDefault();

    const form = e.target;
    const name = form.querySelector("#name")?.value.trim() || "";
    const email = form.querySelector("#email")?.value.trim() || "";

    // Basic validation
    if (!name || !email) {
        alert("Please fill in all required fields");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    let formDetails = "";
    let welcomeMessage = "";

    if (formType === "Contact Form") {
        const company = form.querySelector("#company")?.value.trim() || "";
        const role = form.querySelector("#role")?.value.trim() || "";
        const message = form.querySelector("#message")?.value.trim() || "";
        formDetails = `Company: ${company}\nRole: ${role}\nMessage: ${message}`;
        welcomeMessage = "Thanks for contacting us! We’ll get back to you soon.";
    } else if (formType === "Waitlist Form") {
        const interest = form.querySelector("#dropdownSelected")?.innerText.trim() || "";
        formDetails = `Interest: ${interest}`;
        welcomeMessage = "Thanks for joining our waitlist! You’ll be the first to know when we launch.";
    } else if (formType === "Deleted Form") {
        formDetails = `Reason: ${message}`;
        welcomeMessage = "Your deletion request has been received. We’ll process it within 30 days.";
    }

    const templateParams = {
        form_type: formType,
        user_name: name,
        user_email: email,
        form_details: formDetails,
        welcome_message: welcomeMessage,
        deletion_reason: message
    };

    // Customize for Deleted Form
    if (formType === "Deleted Form") {
        templateParams.welcome_message = `
        Hi ${name},<br><br>
        We have received your account deletion request. Your data will be removed within 30 days.<br>
        If you have any questions or need help, contact us at 
        <a href="mailto:Info@adinkra.global" style="color: #fc0038;">Info@adinkra.global</a>. We're here to assist you!<br><br>
        If you did not request this deletion, you can safely ignore this email.<br><br>
        Best regards,<br>
        The Genie Team
    `;
    }
    if (formType === "Contact Form") {
        templateParams.welcome_message = `
    Hi ${name},Welcome to the Genie family! We're excited to have you on board.<br><br>
    Thanks for contacting us! We’ll get back to you soon.<br><br>
    If you have any questions or need help getting started, our support team is just an email away at <a href="mailto:Info@adinkra.global" style="color: #fc0038;">Info@adinkra.global</a>. We're here to assist you every step of the way.<br><br>
    Best regards,<br>
    The Company Genie Team
    `;
    }
    if (formType === "Waitlist Form") {
        templateParams.welcome_message = `
    Hi ${name},Welcome to the Genie family! We're excited to have you on board.<br><br>
    Thanks for joining our waitlist! You’ll be the first to know when we launch.<br>
    If you have any questions or need help getting started, our support team is just an email away at <a href="mailto:Info@adinkra.global" style="color: #fc0038;">Info@adinkra.global</a>. We're here to assist you every step of the way.<br><br>
    Best regards,<br>
    The Company Genie Team
    `;
    }

    // If Deleted Form, show confirmation first
    if (formType === "Deleted Form") {
        sureDeleteModal.classList.remove("hidden");

        yesDeleteBtn.onclick = () => {
            sureDeleteModal.classList.add("hidden");
            sendEmail(templateParams, form);
        };
    } else {
        sendEmail(templateParams, form);
    }
}

// ==========================
// ATTACH EVENT LISTENERS
// ==========================
document.getElementById("contact-form")?.addEventListener("submit", (e) => handleFormSubmit(e, "Contact Form"));
document.getElementById("waitlist-form")?.addEventListener("submit", (e) => handleFormSubmit(e, "Waitlist Form"));
document.getElementById("deleted-form")?.addEventListener("submit", (e) => handleFormSubmit(e, "Deleted Form"));

// ==========================
// CLOSE ERROR MODAL
// ==========================
closeErrorBtn.addEventListener("click", () => {
    errorModal.classList.add("hidden");
});

// ==========================
// CLOSE DELETE CONFIRMATION MODAL (Cancel Button)
// ==========================
closeSureDelete.addEventListener("click", () => {
    sureDeleteModal.classList.add("hidden");
});
