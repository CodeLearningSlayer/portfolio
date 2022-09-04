export default function removeOnScroll(){
    
    let header = document.querySelector(".header__top");
    let firstSectionHeight = document.querySelector(".header").clientHeight;
    
    let scrollPrev = 0;
    window.addEventListener("scroll", () => {
        let scrolled = window.scrollY;
        console.log(scrolled);
        if(scrolled > firstSectionHeight && scrolled > scrollPrev){
            header.classList.add("header__top--out");
        } 
        else{
            header.classList.remove("header__top--out");
        }
        scrollPrev = scrolled;
    });
}