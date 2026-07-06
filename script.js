/* ==========================================================
                    MOBILE MENU
========================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuOverlay = document.querySelector(".menu-overlay");
const body = document.body;

function openMenu() {

    mobileMenu.classList.add("active");
    menuOverlay.classList.add("active");

    body.classList.add("menu-open");

    menuToggle.innerHTML =
        '<i class="fa-solid fa-xmark"></i>';

}

function closeMenu() {

    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");

    body.classList.remove("menu-open");

    menuToggle.innerHTML =
        '<i class="fa-solid fa-bars"></i>';

}

if(menuToggle && mobileMenu && menuOverlay){

    menuToggle.addEventListener("click", () => {

        if(mobileMenu.classList.contains("active")){

            closeMenu();

        }else{

            openMenu();

        }

    });

}

/* ==========================================================
            CLOSE ON OVERLAY CLICK
========================================================== */

menuOverlay?.addEventListener("click", () => {

    closeMenu();

});

/* ==========================================================
            CLOSE ON ESC KEY
========================================================== */

document.addEventListener("keydown", (e)=>{

    if(e.key === "Escape"){

        closeMenu();

    }

});

/* ==========================================================
        CLOSE MENU AFTER CLICKING A LINK
========================================================== */

const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach((link)=>{

    link.addEventListener("click",()=>{

        closeMenu();

    });

});
/* ==========================================================
                SMOOTH SCROLL
========================================================== */

const navLinks = document.querySelectorAll(
    '.navbar a, .mobile-menu a'
);

navLinks.forEach((link)=>{

    link.addEventListener("click",(e)=>{

        const href = link.getAttribute("href");

        if(!href || !href.startsWith("#")) return;

        e.preventDefault();

        const target = document.querySelector(href);

        if(target){

            target.scrollIntoView({

                behavior:"smooth",
                block:"start"

            });

        }

    });

});


/* ==========================================================
                ACTIVE NAVIGATION
========================================================== */

const sections = document.querySelectorAll("section[id]");

function updateActiveNav(){

    const scrollY = window.scrollY + 120;

    sections.forEach((section)=>{

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if(

            scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight

        ){

            navLinks.forEach((link)=>{

                link.classList.remove("active");

            });

            document
            .querySelectorAll(
                `.navbar a[href="#${sectionId}"],
                 .mobile-menu a[href="#${sectionId}"]`
            )
            .forEach((link)=>{

                link.classList.add("active");

            });

        }

    });

}

window.addEventListener("scroll",updateActiveNav);

window.addEventListener("load",updateActiveNav);
/* ==========================================================
                HEADER SCROLL EFFECT
========================================================== */

const header = document.querySelector("header");

function updateHeader(){

    if(!header) return;

    if(window.scrollY > 60){

        header.style.background = "rgba(5,8,22,.90)";
        header.style.backdropFilter = "blur(25px)";
        header.style.borderBottom = "1px solid rgba(255,255,255,.10)";
        header.style.boxShadow = "0 10px 35px rgba(0,0,0,.30)";

    }

    else{

        header.style.background = "rgba(5,8,22,.72)";
        header.style.backdropFilter = "blur(18px)";
        header.style.borderBottom = "1px solid rgba(255,255,255,.08)";
        header.style.boxShadow = "none";

    }

}

window.addEventListener("scroll", updateHeader);

window.addEventListener("load", updateHeader);


/* ==========================================================
                SCROLL TO TOP ON REFRESH
========================================================== */

window.addEventListener("beforeunload", () => {

    window.scrollTo(0,0);

});