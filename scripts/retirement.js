"use strict";
//functions
function page1LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("retirepg1") != null) {
      retire.page1 = JSON.parse(localStorage.getItem("retirepg1"));
      $("#retirepg1e1").val(retire.page1[0]);
      $("#retirepg1e2").val(retire.page1[1]);
      $("#retirepg1e3").val(retire.page1[2]);
      $("#retirepg1e4").val(retire.page1[3]);
   }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("retirepg1") != null) {
         localStorage.removeItem("retirepg1");
         retire.page1 = [];
      }

      $(".next-btn").one("click", () => {
         retire.page1 = [];
         retire.page1.push($("#retirepg1e1").val());
         retire.page1.push($("#retirepg1e2").val());
         retire.page1.push($("#retirepg1e3").val());
         retire.page1.push($("#retirepg1e4").val());

         localStorage.setItem("retirepg1", JSON.stringify(retire.page1));
      });
   });
}
function page2LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("retirepg2") != null) {
      retire.page2 = JSON.parse(localStorage.getItem("retirepg2"));
      $("#retirepg2e1").val(retire.page2[0]);
      $("#retirepg2e2").val(retire.page2[1]);
      $("#retirepg2e3").val(retire.page2[2]);
   }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("retirepg2") != null) {
         localStorage.removeItem("retirepg2");
         retire.page2 = [];
      }

      $(".next-btn").one("click", () => {
         retire.page2 = [];
         retire.page2.push($("#retirepg2e1").val());
         retire.page2.push($("#retirepg2e2").val());
         retire.page2.push($("#retirepg2e3").val());

         localStorage.setItem("retirepg2", JSON.stringify(retire.page2));
      });
   });
}
function page3LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("retirepg3") != null) {
      retire.page3 = JSON.parse(localStorage.getItem("retirepg3"));
      $("#retirepg3e1").val(retire.page3[0]);
      $("#retirepg3e2").val(retire.page3[1]);
      $("#retirepg3e3").val(retire.page3[2]);
      $("#retirepg3e4").val(retire.page3[3]);
   }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("retirepg3") != null) {
         localStorage.removeItem("retirepg3");
         retire.page3 = [];
      }

      $(".next-btn").one("click", () => {
         retire.page3 = [];
         retire.page3.push($("#retirepg3e1").val());
         retire.page3.push($("#retirepg3e2").val());
         retire.page3.push($("#retirepg3e3").val());
         retire.page3.push($("#retirepg3e4").val());

         localStorage.setItem("retirepg3", JSON.stringify(retire.page3));
      });
   });
}
function page4LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("retirepg4") != null) {
      retire.page4 = JSON.parse(localStorage.getItem("retirepg4"));
      for (let i = 0; i < 10; i++) {
         $("#retirepg4e"+(i+1)).val(retire.page4[i]);
      }
   }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("retirepg4") != null) {
         localStorage.removeItem("retirepg4");
         retire.page4 = [];
      }

      $(".next-btn").one("click", () => {
         retire.page4 = [];
         for (let i = 0; i < 10; i++) {
            retire.page4.push($("#retirepg4e"+(i+1)).val());
         }
         localStorage.setItem("retirepg4", JSON.stringify(retire.page4));
      });
   });
}


function next() {
   //  change next button's action
   $(".next-btn").on("click", () => {
      function loaderPromise() {
         let update = new Promise((resolve) => {
            resolve(updateLoader(4,4));
         });

         //----- @prasad -----
         function pushToDatabase() {
            console.log(retire);
         }
         // ------------------

         return update;
      }

      loaderPromise().then(() => {
         setTimeout(() => {
            window.open("retirement_result.html", "_self");
         }, 1410);
      });
   });

   //change the functionality back when back button is pressed
   $(".prev-btn").on("click", () => {
      $(".next-btn")
         .text("Next")
         .off()
         .on("click", () => {
            mySiema.next();
         });
   });
}

// function fadeInResult() {
//    // animate on document.ready
//    $(()=>{
//       $(".calculated-result")
//          .animate({ opacity: 1 })
//          .css("transform", "translateY(0)");
//    })
// }

function storeRecalculate() {
   //not to be stored in local storage
   let input = {
      label: "retirement-result input",
      current_age: $('#retireresultpg1e1').val(),
      current_income: $('#retireresultpg1e2').val(),
      income_growth_rate: $('#retireresultpg1e3').val(),
      monthly_saving: $('#retireresultpg1e4').val(),
      savings_so_far: $('#retireresultpg1e5').val(),
      growth_rate: $('#retireresultpg1e6').val(),
      retirement_age: $('#retireresultpg1e7').val(),
   };

   let output = {
      label: "retirement-result output",
      retirement_goal: $('#retireresultpg2e1').val(),
      potential_nest: $('#retireresultpg2e2').val(),
      surplus: $('#retireresultpg2e3').val(),
   };

   retire.results.push(input);
   retire.results.push(output);
}

function reCalculate() {
   // ---@error check ---

   $("#re-calc").on("click", () => {
      storeRecalculate();

      // @prasad push to database
      console.log(retire.results);

      // more actions
   });
}

//____ Objects and collections

let retire = {
   page1: [],
   page2: [],
   page3: [],
   page4:[],
   results: [],
};

