import * as flsFunctions from "./modules/functions.js";
import Swiper, {Navigation} from "swiper";
import {langObj} from "./modules/languages.js";
import {changeLang} from "./modules/changeLang.js";
import removeOnScroll from "./modules/removeHeaderOnScroll.js";

window.addEventListener("DOMContentLoaded", ()=>{

    let preloader = document.querySelector(".preloader");

    const closePreloader = new Promise(resolve => {
        setTimeout(()=> {
            preloader.classList.add("preloader--hide");
            resolve();
        }, 2000);
    }); 
        
    closePreloader.then(()=>{
        setTimeout(() => {
            preloader.remove();

        }, 600);
    });
    
    let swiper;

    function enableSwiper(){
        swiper = new Swiper('.swiper', {
            modules:[Navigation],
            watchSlidesProgress:true,
            centeredSlides: true,
            // loop: true,
            // loopedSlides: 4,
            // slidesPerGroup:1,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints:{
                0:{
                    watchOverflow:true,
                    loop:false,
                },
                576:{
                    setWrapperSize:true,
                    slidesPerView: 1,
                },
            }
        });
    }
    
    const breakpoint = window.matchMedia('(max-width: 576px)');
    const breakpointChecker = function() {
        if (breakpoint.matches == true && swiper!=undefined){
            swiper.destroy(true, true);
        }
        else if (breakpoint.matches==false){
            return enableSwiper();
        }
    };
    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
    
    const getId = (link) => link.getAttribute('href').replace('#','');
    
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if (entry.isIntersecting){
                document.querySelectorAll(".header__nav-link").forEach((link)=>{
                    link.classList.toggle("header__nav-link--active",
                    getId(link)===entry.target.id);
                });
            }
            
        });
    },{
        threshold:0.2,
    });
    
    function Scroll(event, name){
        if (event.target.classList.contains(name)) {
            event.preventDefault();
            const id = getId(event.target);
            window.scrollTo({
                top: document.getElementById(id).offsetTop,
                behavior:"smooth"
            });
        }
    }
    
    
    let burgerBtn = document.querySelector(".header__burger");
    burgerBtn.addEventListener("click", function(){
        document.querySelector(".header__nav").classList.toggle("header__nav--active");
        burgerBtn.classList.toggle("header__burger--active");
    });
    
    
    window.addEventListener("scroll", function(){
        let header = document.querySelector(".header__top");
        header.classList.toggle("header__top--sticky", window.scrollY > 0);
    });
    
    let upBtn = document.querySelector(".footer__up");
    let contactBtn = document.querySelector(".content__contact-btn");
    
    contactBtn.addEventListener("click", (contact)=> Scroll(contact, "content__contact-btn"));
    
    upBtn.addEventListener("click", (home)=>Scroll(home, "footer__up"));
    
    
    
    document.querySelectorAll(".section").forEach((section)=>observer.observe(section));
    document.querySelector('.header__nav').addEventListener('click', (event)=> Scroll(event, 'header__nav-link'));
    document.querySelector('.footer__nav').addEventListener('click', (event)=> Scroll(event, 'footer__nav-link'));
    
    
    //Lang change
    
    changeLang();
    
    //Removing sticky header on scroll
    
    removeOnScroll();
    
    
    // flsFunctions.testWebP();

});

