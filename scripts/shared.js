"use strict";
//global actions

//refresh the screen everytime on resize, to prevent slider glitch
let flag = true;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
   flag = false;
}
if (flag) {
   let resizeTimer = undefined;
   $(window).resize(()=> {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(()=>{
         window.location.reload()
      }, 100);
   });
}



//splash-screen
$(".splash-screen").transition({scale:1.35},1700)
window.setTimeout(() => {
   $(".splash-screen").fadeOut(400);

}, 1500);

//brand
$(".brand").on("click", () => {
   window.open("index.html", "_self");
   // @change
});


// _____functions

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
