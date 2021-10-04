"use strict";

//functions
function pgLocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("annpg1") != null) {
      ann.page1 = JSON.parse(localStorage.getItem("annpg1"));
      $("#annpg1e1").val(ann.page1[0]);
      $("#annpg1e2").val(ann.page1[1]);
      $("#annpg1e3").val(ann.page1[2]);
      $("#annpg1e4").val(ann.page1[3]);
   }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("annpg1") != null) {
         localStorage.removeItem("annpg1");
         ann.page1 = [];
      }

      $(".next-btn").one("click", () => {
         ann.page1 = [];
         ann.page1.push($("#annpg1e1").val());
         ann.page1.push($("#annpg1e2").val());
         ann.page1.push($("#annpg1e3").val());
         ann.page1.push($("#annpg1e4").val());

         localStorage.setItem("annpg1", JSON.stringify(ann.page1));
      });
   });
}

function next() {
   //  change next button's action
   $(".next-btn").on("click", () => {
      function loaderPromise() {
         let update = new Promise((resolve) => {
            resolve(updateLoader(1, 1));
         });
         //----- @prasad -----
         function pushToDatabase() {
            console.log(ann);
         }
         // ------------------
         return update;
      }
      loaderPromise().then(() => {
         setTimeout(() => {
            window.open("annuity_result.html", "_self");
         }, 1410);
      });
   });
}

function showResult() {
   $(".calculated-result")
      .animate({ opacity: 1 })
      .css("transform", "translateY(0)");
}

function reCalculate() {
   $(".re-calc-btn").on("click", () => {
      /*      - - -
      
      some error checking

              - - - 
      */
     storeRecalculate();

   // ----------  
   // @prasad
   // Push to database and calculate results
     console.log(ann.results)
   //   ----------
   
   });
}

function storeRecalculate() {
   //not to be stored in local storage
   let obj = {
      label:'annuity-result input',
      current_age: $('#annresulte1').val(),
      ageToStart_payment: $('#annresulte2').val(),
      annuity_length: $('#annresulte3').val(),
      initial_amount: $('#annresulte4').val(),
      growth_rate: $('#annresulte5').val(),
   };

   ann.results.push(obj);
}
//____ Objects and collections

let ann = {
   page1: [],
   results:[],
};

