"use strict";

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

$(".brand,.re-enter").on('click',() => {
   window.open("index.html", "_self");
   // @change
});

function fadeInResult() {
      // animate on document.ready
      $(()=>{
         $(".calculated-result")
            .animate({ opacity: 1 })
            .css("transform", "translateY(0)");
      })
   }
   


// initialize siema
// function initSiema() {}    /*causing bugs*/