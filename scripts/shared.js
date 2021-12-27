"use strict";
const [root] = document.getElementsByTagName("html");

//global actions
$(".shadow-element,.hide-hamburger-component").addClass("hidden");

$("button").on("click", (e) => {
   e.preventDefault();
});

// $('html,body,.container').addClass('hide-scroll')
// $('html,body,.container').addClass('overflow-h')

//hamburger
$(".hamburger, .canvas-close-btn,.hide-hamburger-component").on("click", () => {
   $(".offCanvasNav").toggleClass("offCanvasNav-visible");
   $(".shadow-element,.hide-hamburger-component").toggleClass("hidden");
   $("html,body,.container").toggleClass("hide-scroll");
   if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      $("html,body,.container").toggleClass("mr-8");
   }
   resizeComponent();
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
   adjustErrorMessage();
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
root.scrollTop = 0;
window.setTimeout(() => {
   $(".splash-screen img").transition({ scale: 1.16 }, 1100);
}, 400);
window.setTimeout(() => {
   $(".splash-screen").fadeOut(400);
   // window.setTimeout(()=>{
   //    $('html,body,.container').removeClass('hide-scroll')
   // }, 0)
}, 1200);

//result splash screen

$(() => {
   // $(".result-splash-screen").fadeOut(400);
});

//brand
$(".brand").on("click", () => {
   window.open("index.html", "_self");
   // @change
});

$("#re-calc").on("click", scrollTop);

// _____functions

let session_id = "aaabbb000000";
let ip = "139.5.30.66";

function createSessionId() {
   const length = 6; //length of the alphabet part of session id
   // let number = Math.round(      Math.random().toFixed(length / 2) * Math.pow(10, length / 2)
   // ).toString(); //8

   let number = Math.round(Date.now() / 1000);

   const arr = "abcdefghijklmnopqrstuvwxyz";
   let string = "";
   for (let i = 0; i < length; i++) {
      let x = Math.random().toFixed(1) * 10;
      string += arr[x];
   }
   session_id = string + number;
}

function numFormatter(num) {
   if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(2) + " K";
   } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + " Million";
   } else if (num < 1000) {
      return num;
   }
}

function resizeComponent() {
   $(".hide-hamburger-component").width(
      $(window).width() - $(".offCanvasNav").width()
   );
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

      window.setTimeout(() => {
         $(".calculated-result-2")
            .animate({ opacity: 1 })
            .css("transform", "translateY(15%)");
      }, 800);
   });
}

function scrollTop() {
   root.scrollTop = 76;
}

//behaviour of the reEnter button
function reEnter(page) {
   $(".re-enter").on("click", () => {
      window.open(page, "_self");
   });
}

function prevBehaviour() {
   $(".prev-btn").on("click", () => {
      $(".next-btn").text("Next");
      // .off()
      // .on("click", () => {
      //    mySiema.next();
      // });
   });
}

// ----- Assumptions ------

function getAssumptions(calc) {
   const assump_url = `https://wealthsurance.com/calculators/?get=assumption&cal=${calc}`;

   $.ajax({
      type: "GET",
      url: assump_url,

      success: (x) => {
         let result = JSON.parse(x);
         if (
            result == 0 ||
            result == "" ||
            result == null ||
            result == undefined
         ) {
            console.log(
               "Assumptions cannot be fetched from the database. (Not available)"
            );
            $(".result-splash-screen").fadeOut(400);
         } else {
            addAssumptions(result);
         }
      },

      error: (error) => {
         console.log(error);
      },
   });
}

function addAssumptions(assump_arr) {
   let assump_text = "";
   Object.values(assump_arr).forEach((element) => {
      let x = `<li>${element}</li>`;
      assump_text += x;
   });

   $(".assumptions ul").html(assump_text);

   $(".result-splash-screen").fadeOut(400);
}

// ----- Number formatting -----
// $('#annFormSubmit').on('click',()=>{
//    let newText = placeCommas($('#annpg1e2').val())
//    console.log(newText);
//    $('#annpg1e2').val(newText)
//    // changeText()
// })

// function changeText() {
//    $('#annpg1e2').val('banjo')

// }

// function placeCommas(num) {
//   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }

// ------Validation functions ------

function fValidate(x) {
   $(`span[form~='page${x}Form']`).on("click", () => {
      validateForm(x);
   });
}

function validateFormRecalc(x, y) {
   if ($(x).valid()) {
      // $('.error-text-container').removeClass('opacity-in')
      // $('.calculated-result').removeClass('reduce-font')
      storeRecalculate();
      if (x == "#mortgRecalcForm") {
         $("#mortgresulte3,#mortgresulte2").removeClass("error");
         $("#mortgresulte3,#mortgresulte2").addClass("valid");
      } if (x == "#retireRecalcForm"){
         $('.io-container').attr('id','')
      }
   } else {
      if (x == "#retireRecalcForm"){
         $('.io-container').attr('id','extend-retirement-io-container')
      }
      $(".error-text-container").addClass("opacity-in");
      $(".error-text-container").addClass("z-index");
      $(".ammortization-btn").addClass("d-none");
      $(".refi-output-table").addClass("d-none");
      $(".ammortization-table-container,.toggle-btn-grp").addClass("d-none");
      $(".retire-results-table-container").addClass("d-none");
      // $('.calculated-result').addClass('reduce-font')
      // $('.calculated-result').text('Incorrect information')
      // $('.calculated-result-2').text('0')
      let inval_arr = checkInvalid(y);
      inval_arr.forEach((element) => {
         $(`#${element}`).parent().removeClass("d-none");
      });
   }
   let valid_arr = checkValid(y);
   valid_arr.forEach((element) => {
      $(`#${element}`).parent().addClass("d-none");
   });
}
// for networth page2 and page3
function validateForm2(x, y) {
   if ($(x).valid()) {
      let valid_arr = checkValid(y);
      valid_arr.forEach((element) => {
         $(`#${element}`).parent().addClass("d-none");
      });

      if (x == "#page3Form") {
         next();
      } else {
         return mySiema.next();
      }
   } else {
      let inval_arr = checkInvalid(y);
      inval_arr.forEach((element) => {
         $(`#${element}`).parent().removeClass("d-none");
      });
   }
   let valid_arr = checkValid(y);
   valid_arr.forEach((element) => {
      $(`#${element}`).parent().addClass("d-none");
   });
}

//Validation functions for reCalc
function checkInvalid(y) {
   let z = document.querySelectorAll("input.error");
   let inval = []; //array containing id's of invalid elements
   z.forEach((element) => {
      let x = element.id.toString().slice(y);
      inval.push("e" + x);
   });
   return inval;
}
function checkValid(y) {
   let z = document.querySelectorAll("input.valid");
   let valid = []; //array containing id's of valid elements
   z.forEach((element) => {
      let x = element.id.toString().slice(y);
      valid.push("e" + x);
   });
   return valid;
}


// To ensure Responsiveness
function adjustErrorMessage() {
   let e_containers = document.getElementsByClassName('error-container')

   for (let i = 0; i < e_containers.length; i++) {
      let l = parseFloat($(`#${e_containers[i].id}`).css('left'))
     $(`#${e_containers[i].id}`).css('left',l+15)
      // console.log(l);
   }
}

