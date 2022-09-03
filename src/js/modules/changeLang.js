import {langObj} from "./languages.js";


export function changeLang(){
    const nav = document.querySelectorAll(".header__nav-link");
    const content = Array.from(document.querySelector(".content__left-box").children);
    const skillsTitle = document.querySelector(".skills__title");
    const skillsSub = document.querySelector(".skills__subtitle");
    const skills = [skillsTitle, skillsSub];
    const about = Array.from(document.querySelector(".about__main.main").children);
    const portfolioTitle = document.querySelectorAll(".portfolio__title");
    let portfolio = [];
    document.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate) .slide__description').forEach(item => {
        portfolio = portfolio.concat(Array.from(item.children));
    });
    const contact = document.querySelectorAll(".contact__title");
    const footer = Array.from(document.querySelectorAll(".footer__nav-link")).concat(Array.from(document.querySelectorAll('.footer__communication')));

    const elems = [nav, content, skills, about, portfolioTitle, portfolio, contact, footer];

    function getInfo(lang){
        let part;
        let keyCounter = 0;
        let htmlElement;
        try{
            for (htmlElement of elems){
                htmlElement.forEach((elem, i) => {
                    part = Object.keys(langObj)[keyCounter];
                    changeText(langObj[part][lang][i], elem);
                });
                keyCounter++;

            }
        }
        catch(e){

        }

    }

    let switchBtn = document.querySelector("#language-toggle");
    let currentLang;

    function setSwitch(){
        if (localStorage.getItem('lang') === 'undefined'){
            localStorage.setItem('lang', 'ru');
            currentLang = 'ru';
        }
        if(localStorage.getItem('lang') === 'ru'){
            switchBtn.checked = false;
            currentLang = 'ru';
        }
        else{
            switchBtn.checked = true;
            currentLang = 'en';

        }
        getInfo(currentLang);
    }

    setSwitch();
    const toggleLanguage = (currLang) => {
        localStorage.setItem("lang", currLang);
        currentLang = currLang;
    };
    switchBtn.addEventListener('change', (e)=>{
        if(e.target.checked){
            toggleLanguage("en");
            currentLang = "en";
        }
        else{
            toggleLanguage("ru");
            currentLang = "ru";
        }
        getInfo(currentLang);
    });


    function changeText(elemFromObj, elemOfHtml){
        elemOfHtml.textContent = elemFromObj;
    }

}