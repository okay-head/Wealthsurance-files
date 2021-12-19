"use strict";

//defaults

// disable page 4 inputs
$(".retirement-page4 input").prop("disabled", true);

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
function pushToDatabase1(a, x = undefined) {
   createSessionId();

   let url_string = `http://wealthsurance.com/calculators/?calculator=retirement&session_id=${session_id}&ip_address=${ip}&current_age=${a[0]}&ret_age=${a[1]}&current_income=${a[2]}&post_ret_pre_tax_income=${a[3]}&ret_year=${a[4]}&ret_goal=${a[5]}&income_growth=${a[6]}&growth_rate=${a[7]}&post_ret_growth_rate=${a[8]}&inflation_rate=${a[9]}&saving_pre_percent=${a[10]}&saving_pre_amount=${a[11]}&saving_post_percent=${a[12]}&saving_post_amount=${a[13]}
   `;

   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         // console.log(url_string);
         // console.log(x);
         let result = JSON.parse(x);
         localStorage.setItem("retire_result", JSON.stringify(result.data));
      },
      error: (error) => {
         console.log(error);
      },
   });

   //recalculate
   if (x == 1) {
      updateTables(2);
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
         updateTables(2, result.data);
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
function updateTables(x, egg = undefined) {
   switch (x) {
      case 1:
         let res = [];
         res[0] = JSON.parse(localStorage.getItem("retirepg2"))[2]; //retirement goal
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
         res2[1] = egg;
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
      // console.log(goal,egg);
      $("#re-goal").text(numFormatter(Number(goal)));
      // $("#re-goal").text('aaa');
      $("#nest-egg").text(numFormatter(Number(egg)));
      $("#legend-txt").text(((egg / goal) * 100).toFixed(0) + "%");
      $("#legend-text-bottom").text("of the way there");
      $(".retire-re-summary p:first-child").text(
         "You have some catching up to do."
      );
      $(".retire-re-summary p:nth-child(2)").text(
         "Adjust your savings plan to see how it changes your result"
      );

      // console.log(goal,egg);
      drawGraph(goal, egg);
   } else {
      $("#re-goal").text(numFormatter(Number(goal)));
      // $("#re-goal").text('bbb');
      $("#nest-egg").text(numFormatter(Number(egg)));
      $("#legend-txt").text(((egg / goal) * 100).toFixed(0) + "%");
      $("#legend-text-bottom").text("ahead of your goal");

      $(".retire-re-summary p:first-child").text("Congratulations!");
      $(".retire-re-summary p:nth-child(2)").text(
         "You've reached your retirement goal"
      );

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
         // setPage4();
         // prefill();
      });
   });
}

// page4 is logically page5;the last page
// function page4LocalStorage() {
//    //check for existing localStorage on page load
//    if (localStorage.getItem("retirepg4") != null) {
//       retire.page4 = JSON.parse(localStorage.getItem("retirepg4"));
//       for (let i = 0; i < 14; i++) {
//          $("#retirepg4e" + (i + 1)).val(retire.page4[i]);
//       }
//    }

//    //push to local storage
//    $(".page4 :input").change(() => {
//       if (localStorage.getItem("retirepg4") != null) {
//          localStorage.removeItem("retirepg4");
//          retire.page4 = [];
//       }

//       $(".next-btn").one("click", () => {
//          retire.page4 = [
//             ...retire.page1,
//             ...retire.page2,
//             ...retire.page3,
//             ...retire.page5,
//          ];
//          // for (let i = 0; i < 10; i++) {
//          //    retire.page4.push($("#retirepg4e"+(i+1)).val());
//          // }
//          localStorage.setItem("retirepg4", JSON.stringify(retire.page4));
//       });
//    });
// }

// function prefill() {
//    //function discarded
//    // for (let i = 0; i < 14; i++) {
//    //    $("#retirepg4e" + (i + 1)).val(retire.page4[i]);
//    // }

//    // localStorage.setItem("retirepg4", JSON.stringify(retire.page4));
// }

function setPage4() {
   retire.page4 = [
      ...retire.page1,
      ...retire.page2,
      ...retire.page3,
      ...retire.page5,
   ];

   localStorage.setItem("retirepg4",JSON.stringify(retire.page4))
}

function hideTable() {
   $(".retirement-page4 .input-fields").slideUp(800);
}
function showTable() {
   $(".retirement-page4 .input-fields").slideDown(1400);
}

function next() {
   //  change next button's action
      setPage4();
      function loaderPromise() {
         let update = new Promise((resolve) => {
            resolve(updateLoader(4, 4));
         });
         return update;
      }

      loaderPromise().then(() => {
         setPage4()
         pushToDatabase1(retire.page4);
         setTimeout(() => {
            window.open("retirement_result.html", "_self");
         }, 1410);
      });

}

function storeRecalculate() {
   //not to be stored in local storage
   let input = [];

   for (let i = 1; i <= 14; i++) {
      input.push(Number($("#retireresultpg1e" + i).val()));
   }

   retire.results = [];
   retire.results.push(input);

   pushToDatabase2(retire.results[0], 1);
   updatePlaceholders(2);
}

function reCalculate() {
   $("#re-calc").on("click", () => {
      storeRecalculate();
   });
}

/* ---------- Validation ---------- */

$.validator.addMethod(
   "min_age",
   function (value) {
      let isValid = value >= Number($("#retirepg1e1").val());

      return isValid;
   },
   "Value should be greater than or equal to current age"
);


$("#page1Form").validate({
   errorPlacement: function (error, element) {
      for (let i = 1; i <= 3; i++) {
         if (element.is("#retirepg1e" + i)) {
            error.appendTo("#error1e" + i);
         }
      }
   },
   rules: {
      retirepg1e1: {
         required: true,
         digits: true,
         range: [1, 90],
      },
      retirepg1e2: {
         required: true,
         digits: true,
         max: 90,
         min_age:true,
      },
      retirepg1e3: {
         required: true,
         number: true,
         min: 1,
      },
   },
   messages: {
      retirepg1e1: {
         required: "Please enter your age",
         digits: "Please enter only positive integers",
         range: "Please enter a value between 1-90",
      },
      retirepg1e2: {
         required: "Please enter your retirement age",
         digits: "Please enter only positive integers",
      },
      retirepg1e3: {
         required: "Please enter your income",
         // min: "Income should be greater than 0",
         // min: "Income cannot be negative",
      },
   },
});

$("#page2Form").validate({
   errorPlacement: function (error, element) {
      for (let i = 1; i <= 3; i++) {
         if (element.is("#retirepg2e" + i)) {
            error.appendTo("#error2e" + i);
         }
      }
   },
   rules: {
      retirepg2e1: {
         required: true,
         number: true,
         min: 1,
      },
      retirepg2e2: {
         required: true,
         number: true,
         range: [1, 100],
      },
      retirepg2e3: {
         required: true,
         number: true,
         min: 1,
      },
   },
   messages: {
      retirepg2e1: {
         min: "Value should be greater than 1",
      },
      retirepg2e2: {
         range: "Please enter a value between 1-100",
      },
      retirepg2e3: {
         min: "Value should be greater than 1",
      },
   },
});

$("#page3Form").validate({
   errorPlacement: function (error, element) {
      for (let i = 1; i <= 4; i++) {
         if (element.is("#retirepg3e" + i)) {
            error.appendTo("#error3e" + i);
         }
      }
   },
   rules: {
      retirepg3e1: {
         required: true,
         number: true,
         range: [0, 100],
      },
      retirepg3e2: {
         required: true,
         number: true,
         range: [0, 100],
      },
      retirepg3e3: {
         required: true,
         number: true,
         range: [0, 100],
      },
      retirepg3e4: {
         required: true,
         number: true,
         range: [0, 100],
      },
   },
   messages: {
      retirepg3e1: {
         range: "Please enter a value between 0-100",
      },
      retirepg3e2: {
         range: "Please enter a value between 0-100",
      },
      retirepg3e3: {
         range: "Please enter a value between 0-100",
      },
      retirepg3e4: {
         range: "Please enter a value between 0-100",
      },
   },
});

$("#page4Form").validate({
   errorPlacement: function (error, element) {
      for (let i = 1; i <= 4; i++) {
         if (element.is("#retirepg5e" + i)) {
            error.appendTo("#error5e" + i);
         }
      }
   },
   rules: {
      retirepg5e1: {
         required: true,
         number: true,
         range: [0, 100],
      },
      retirepg5e2: {
         required: true,
         number: true,
         min:0,
      },
      retirepg5e3: {
         required: true,
         number: true,
         range: [0, 100],
      },
      retirepg5e4: {
         required: true,
         number: true,
         min:0,
      },
   },
   messages: {
      retirepg5e1: {
         range: "Please enter a value between 0-100",
      },
      retirepg5e2: {
         min: "Value cannot be negative",
      },
      retirepg5e3: {
         range: "Please enter a value between 0-100",
      },
      retirepg5e4: {
         min: "Value cannot be negative",
      },
   },
});

$("#retireRecalcForm").validate({
   errorPlacement: function (error, element) {
      for (let i = 1; i <= 14; i++) {
         if (element.is("#retireresultpg1e" + i)) {
            error.appendTo("#eresultpg1e1" + i);
         }
      }
   },

   rules: {
      retireresultpg1e1: {
         required: true,
         digits: true,
         range: [1, 90],
      },
      retireresultpg1e2: {
         required: true,
         digits: true,
         max: 90,
         min_age:true,
      },
      retireresultpg1e3: {
         required: true,
         number: true,
         min: 1,
      },


      retireresultpg1e4: {
         required: true,
         number: true,
         min: 1,
      },
      retireresultpg1e5: {
         required: true,
         number: true,
         range: [1, 100],
      },
      retireresultpg1e6: {
         required: true,
         number: true,
         min: 1,
      },



      retireresultpg1e7: {
         required: true,
         number: true,
         range: [0, 100],
      },
      retireresultpg1e8: {
         required: true,
         number: true,
         range: [0, 100],
      },
      retireresultpg1e9: {
         required: true,
         number: true,
         range: [0, 100],
      },
      retireresultpg1e10: {
         required: true,
         number: true,
         range: [0, 100],
      },



      retireresultpg1e11: {
         required: true,
         number: true,
         range: [0, 100],
      },
      retireresultpg1e12: {
         required: true,
         number: true,
         min:0,
      },
      retireresultpg1e13: {
         required: true,
         number: true,
         range: [0, 100],
      },
      retireresultpg1e14: {
         required: true,
         number: true,
         min:0,
      },


   },


});

function validateForm(x) {
   if ($(`#page${x}Form`).valid()) {
      if (x==4) {
         // console.log($(`#page4Form`).valid());
         next()
      }else{
         return mySiema.next();
      }
   }
}

