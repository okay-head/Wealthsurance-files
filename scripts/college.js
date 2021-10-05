"use strict";

//functions
function pgLocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("clgpg1") != null) {
      clg.page1 = JSON.parse(localStorage.getItem("clgpg1"));
      for (let i = 0; i < 10; i++) {
         $("#clgpg1e"+(i+1)).val(clg.page1[i]);
      }
   }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("clgpg1") != null) {
         localStorage.removeItem("clgpg1");
         clg.page1 = [];
      }

      $(".next-btn").one("click", () => {
         clg.page1 = [];
         for (let i = 0; i < 10; i++) {
            clg.page1.push($("#clgpg1e"+(i+1)).val());
         }
         localStorage.setItem("clgpg1", JSON.stringify(clg.page1));
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
            console.log(clg);
         }
         // ------------------
         return update;
      }
      loaderPromise().then(() => {
         setTimeout(() => {
            window.open("college_expenses_result.html", "_self");
         }, 1410);
      });
   });
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
     console.log(clg.results)
   //   ----------
   
   });
}

function storeRecalculate() {
   //not to be stored in local storage
   let obj = {
      'label':'clg-result input',
      'name': $('#clgpg1resulte1').val(),
      'current_age': $('#clgpg1resulte2').val(),
      'age_entering_clg': $('#clgpg1resulte3').val(),
      'clg_years': $('#clgpg1resulte4').val(),
      'annual_clg_expenses': $('#clgpg1resulte5').val(),
      'portion_funded%': $('#clgpg1resulte6').val(),
      'portion_funded$': $('#clgpg1resulte7').val(),
      'saved': $('#clgpg1resulte8').val(),
      
      'additional_saving': $('#clgpg2resulte1').val(),
      'growth_rate': $('#clgpg2resulte2').val(),
      'saving_monthly': $('#clgpg2resulte3').val(),
   };

   clg.results.push(obj);
}
//____ Objects and collections

let clg = {
   page1: [],
   results:[],
};

