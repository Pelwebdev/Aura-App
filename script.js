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
