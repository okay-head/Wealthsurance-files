"use strict";
const [root] = document.getElementsByTagName("html");

//global actions
$(".shadow-element,.hide-hamburger-component").addClass("hidden");


// $('html,body,.container').addClass('hide-scroll')
// $('html,body,.container').addClass('overflow-h')

//hamburger
$(".hamburger, .canvas-close-btn,.hide-hamburger-component").on("click", () => {
   $(".offCanvasNav").toggleClass("offCanvasNav-visible");
   $(".shadow-element,.hide-hamburger-component").toggleClass("hidden");
   $("html,body,.container").toggleClass("hide-scroll");
   if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
   ) {
      $("html,body,.container").toggleClass("mr-7");
   }
   resizeComponent()
});

// $('body').on('click',()=>{
//    $('.offCanvasNav').removeClass('offCanvasNav-visible')
// })
//refresh the screen everytime on resize, to prevent slider glitch
let flag = true;

//prevent resize on mobile devices
if (
   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
   )
) {
   flag = false;
}
if (flag) {
   let resizeTimer = undefined;
   $(window).resize(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
         window.location.reload();
      }, 100);
   });
}

//splash-screen
$(".splash-screen").transition({ scale: 1.35 }, 1700);
root.scrollTop = 0;
window.setTimeout(() => {
   $(".splash-screen").fadeOut(400);
   // window.setTimeout(()=>{
   //    $('html,body,.container').removeClass('hide-scroll')
   // }, 0)
}, 1500);

//brand
$(".brand").on("click", () => {
   window.open("index.html", "_self");
   // @change
});

// _____functions

function resizeComponent() {
   $(".hide-hamburger-component")
   .width($(window).width() - $(".offCanvasNav").width())
}

// update val
function setValue(id, val) {
   $(id).val(val);
}

// -- Loader
function initLoader() {
   $(".progress-bar").animate({ width: "0%" }, 1000);
   $(".progress-percentage").text("0%").fadeTo(1500, 1);
}

function updateLoader(page, pages) {
   let increment = 100 / pages;
   let text =
      page * Math.round(increment) == 99 ? 100 : page * Math.round(increment);

   $(".progress-percentage").hide();
   $(".progress-bar").animate({ width: `${page * increment}%` }, 800);
   $(".progress-percentage")
      .fadeTo(800, 1)
      .text(text + "%");
}

function fadeInResult() {
   // animate on document.ready
   $(() => {
      $(".calculated-result")
         .animate({ opacity: 1 })
         .css("transform", "translateY(0)");
   });
}

function reEnter(page) {
   $(".re-enter").on("click", () => {
      window.open(page, "_self");
   });
}

// initialize siema
// function initSiema() {}    /*causing bugs*/
