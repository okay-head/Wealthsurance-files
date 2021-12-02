"use strict";

//defaults

// disable page 4 inputs
$('.retirement-page4 input').prop('disabled',true)

//____ Objects and collections

let retire = {
   page1: [],
   page2: [],
   page3: [],
   page4: [],
   page5: [],
   results: [],
};

//functions
function pushToDatabase1(a,x=undefined) {
   createSessionId();

   let url_string = `http://wealthsurance.com/calculators/?calculator=retirement&session_id=${session_id}&ip_address=${ip}&current_age=${a[0]}&ret_age=${a[1]}&current_income=${a[2]}&post_ret_pre_tax_income=${a[3]}&ret_year=${a[4]}&ret_goal=${a[5]}&income_growth=${a[6]}&growth_rate=${a[7]}&post_ret_growth_rate=${a[8]}&inflation_rate=${a[9]}&saving_pre_percent=${a[10]}&saving_pre_amount=${a[11]}&saving_post_percent=${a[12]}&saving_post_amount=${a[13]}
   `;

   // console.log(url_string)
   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         // console.log(result);
         localStorage.setItem("retire_result", JSON.stringify(result.data));
      },
      error: (error) => {
         console.log(error);
      },
   });

   //recalculate
   if (x==1) {
      updateTables(2)
   }
}
function pushToDatabase2(a) {
   createSessionId();

   let url_string = `http://wealthsurance.com/calculators/?calculator=retirement&session_id=${session_id}&ip_address=${ip}&current_age=${a[0]}&ret_age=${a[1]}&current_income=${a[2]}&post_ret_pre_tax_income=${a[3]}&ret_year=${a[4]}&ret_goal=${a[5]}&income_growth=${a[6]}&growth_rate=${a[7]}&post_ret_growth_rate=${a[8]}&inflation_rate=${a[9]}&saving_pre_percent=${a[10]}&saving_pre_amount=${a[11]}&saving_post_percent=${a[12]}&saving_post_amount=${a[13]}
   `;

   // console.log(url_string)
   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         // console.log(result);
         // localStorage.setItem("retire_result", JSON.stringify(result.data));
         updateTables(2,result.data)
      },
      error: (error) => {
         console.log(error);
      },
   });

   //recalculate
   
}



function updatePlaceholders(x) {
   switch (x) {
      case 1:
         const z = JSON.parse(localStorage.getItem("retirepg4"));

         for (let i = 0; i < 14; i++) {
            $("#retireresultpg1e" + (i + 1)).attr("placeholder", z[i]);
         }
         break;

      //recalculate
      case 2:
         const a = retire.results[0];

         for (let i = 0; i < 14; i++) {
            $("#retireresultpg1e" + (i + 1)).attr("placeholder", a[i]);
         }
         break;
   }
}
function updateTables(x,egg=undefined) {
   switch (x) {
      case 1:
         let res = [];
         res[0] = JSON.parse(localStorage.getItem("retirepg4"))[5]; //retirement goal
         res[1] = JSON.parse(localStorage.getItem("retire_result")); //nest egg
         res[2] = res[1] - res[0];

         updateResult(Number(res[0]), Number(res[1]));

         for (let i = 0; i < 3; i++) {
            $("#retireresultpg2e" + (i + 1)).text(res[i]);
         }

         break;
      case 2:
         let res2 = [];
         res2[0] = retire.results[0][5]; //retirement goal
         res2[1] = egg
         res2[2] = res2[1] - res2[0];

         updateResult(Number(res2[0]), Number(res2[1]));

         for (let i = 0; i < 3; i++) {
            $("#retireresultpg2e" + (i + 1)).text(res2[i]);
         }
         break;
   }
}

function updateResult(goal, egg) {
   if (goal - egg > 0) {
      $("#re-goal").text(numFormatter(goal));
      $("#nest-egg").text(numFormatter(egg));
      $("#legend-txt").text(((egg / goal) * 100).toFixed(0) + "%");
      $('#legend-text-bottom').text('of the way there')
      $('.retire-re-summary p:first-child').text('You have some catching up to do.')
      $('.retire-re-summary p:nth-child(2)').text("Adjust your savings plan to see how it changes your result")

      // console.log(goal,egg);
      drawGraph(goal, egg);
   } else {
      $("#re-goal").text(numFormatter(goal));
      $("#nest-egg").text(numFormatter(egg));
      $("#legend-txt").text((((egg / goal) * 100)).toFixed(0) + "%");
      $('#legend-text-bottom').text('ahead of your goal')

      $('.retire-re-summary p:first-child').text('Congratulations!')
      $('.retire-re-summary p:nth-child(2)').text("You've reached your retirement goal")


      drawGraph(1, 1);

      // alert("You've reached your retirement goal");
   }
}

function page1LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("retirepg1") != null) {
      retire.page1 = JSON.parse(localStorage.getItem("retirepg1"));
      $("#retirepg1e1").val(retire.page1[0]);
      $("#retirepg1e2").val(retire.page1[1]);
      $("#retirepg1e3").val(retire.page1[2]);
      // $("#retirepg1e4").val(retire.page1[3]);
   }

   //push to local storage
   $(".page1 :input").change(() => {
      if (localStorage.getItem("retirepg1") != null) {
         localStorage.removeItem("retirepg1");
         retire.page1 = [];
      }

      $(".next-btn").one("click", () => {
         retire.page1 = [];
         retire.page1.push($("#retirepg1e1").val());
         retire.page1.push($("#retirepg1e2").val());
         retire.page1.push($("#retirepg1e3").val());
         // retire.page1.push($("#retirepg1e4").val());

         localStorage.setItem("retirepg1", JSON.stringify(retire.page1));
      });
   });
}
function page2LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("retirepg2") != null) {
      retire.page2 = JSON.parse(localStorage.getItem("retirepg2"));
      for (let i = 0; i < 3; i++) {
         $("#retirepg2e" + (i + 1)).val(retire.page2[i]);
      }
   }

   //push to local storage
   $(".page2 :input").change(() => {
      if (localStorage.getItem("retirepg2") != null) {
         localStorage.removeItem("retirepg2");
         retire.page2 = [];
      }

      $(".next-btn,.prev-btn").one("click", () => {
         retire.page2 = [];
         for (let i = 1; i <= 3; i++) {
            retire.page2.push($("#retirepg2e" + i).val());
         }
         localStorage.setItem("retirepg2", JSON.stringify(retire.page2));
      });
   });
}
function page3LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("retirepg3") != null) {
      retire.page3 = JSON.parse(localStorage.getItem("retirepg3"));
      for (let i = 0; i < 4; i++) {
         $("#retirepg3e" + (i + 1)).val(retire.page3[i]);
      }
   }

   //push to local storage
   $(".page3 :input").change(() => {
      if (localStorage.getItem("retirepg3") != null) {
         localStorage.removeItem("retirepg3");
         retire.page3 = [];
      }

      $(".next-btn,.prev-btn").one("click", () => {
         retire.page3 = [];
         for (let i = 1; i <= 4; i++) {
            retire.page3.push($("#retirepg3e" + i).val());
         }
         localStorage.setItem("retirepg3", JSON.stringify(retire.page3));
      });
   });
}

function page5LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("retirepg5") != null) {
      retire.page5 = JSON.parse(localStorage.getItem("retirepg5"));
      for (let i = 0; i < 4; i++) {
         $("#retirepg5e" + (i + 1)).val(retire.page5[i]);
      }
   }

   //push to local storage
   $(".page5 :input").change(() => {
      if (localStorage.getItem("retirepg5") != null) {
         localStorage.removeItem("retirepg5");
         retire.page5 = [];
      }

      $(".next-btn,.prev-btn").one("click", () => {
         retire.page5 = [];
         for (let i = 0; i < 4; i++) {
            retire.page5.push($("#retirepg5e" + (i + 1)).val());
         }
         localStorage.setItem("retirepg5", JSON.stringify(retire.page5));
         setPage4();
         prefill();
      });
   });
}

// page4 is logically page5;the last page
function page4LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("retirepg4") != null) {
      retire.page4 = JSON.parse(localStorage.getItem("retirepg4"));
      for (let i = 0; i < 14; i++) {
         $("#retirepg4e" + (i + 1)).val(retire.page4[i]);
      }
   }

   //push to local storage
   $(".page4 :input").change(() => {
      if (localStorage.getItem("retirepg4") != null) {
         localStorage.removeItem("retirepg4");
         retire.page4 = [];
      }

      $(".next-btn").one("click", () => {
         retire.page4 = [
            ...retire.page1,
            ...retire.page2,
            ...retire.page3,
            ...retire.page5,
         ];
         // for (let i = 0; i < 10; i++) {
         //    retire.page4.push($("#retirepg4e"+(i+1)).val());
         // }
         localStorage.setItem("retirepg4", JSON.stringify(retire.page4));
      });
   });
}

function prefill() {
   for (let i = 0; i < 14; i++) {
      $("#retirepg4e" + (i + 1)).val(retire.page4[i]);
   }

   localStorage.setItem("retirepg4", JSON.stringify(retire.page4));
}

function setPage4() {
   retire.page4 = [
      ...retire.page1,
      ...retire.page2,
      ...retire.page3,
      ...retire.page5,
   ];
}

function hideTable() {
   $(".retirement-page4 .input-fields").slideUp(800);
}
function showTable() {
   $(".retirement-page4 .input-fields").slideDown(1400);
}

function next() {
   //  change next button's action
   $(".next-btn").on("click", () => {
      function loaderPromise() {
         let update = new Promise((resolve) => {
            resolve(updateLoader(5, 5));
         });
         return update;
      }

      loaderPromise().then(() => {
         pushToDatabase1(retire.page4);
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

function storeRecalculate() {
   //not to be stored in local storage
   let input = []

   for (let i = 1; i <= 14; i++) {
      input.push(Number($('#retireresultpg1e'+i).val()))
   }

   retire.results = []
   retire.results.push(input);

   pushToDatabase2(retire.results[0],1)
   updatePlaceholders(2)
}

function reCalculate() {

   $("#re-calc").on("click", () => {
      storeRecalculate();
   });
}
