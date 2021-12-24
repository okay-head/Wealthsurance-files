"use strict";
//____ Objects and collections

let ann = {
   page1: [],
   results: [],
};

let a = [];
let b = [];

function pushToDatabase1(ann) {
   let [a, b, c, d] = ann.page1;
   
   $.ajax({
      type: "POST",
      url: `https://wealthsurance.com/calculators/?calculator=annuity&session_id=${session_id}&ip_address=${ip}&start_age=${a}&pay_year=${c}&amount=${b}&growth_rate=${d}`,

      
      success: (x) => {
         console.log(x);
         let result = JSON.parse(x);
         if (result.success) {
            localStorage.setItem("ann_result", JSON.stringify(result.data));
         } else {
            console.log(result + "request not successful");
         }
      },
      error: (error) => {
         console.log(error);
      },
   });
}

function pushToDatabase2(ann) {
   // Create session id only when the user decides to recalculate
   createSessionId();
   [
      {
         current_age: b[0],
         ageToStart_payment: b[1],
         initial_amount: b[2],
         growth_rate: b[3],
      },
   ] = ann.results;

   $.ajax({
      type: "POST",
      url: `https://wealthsurance.com/calculators/?calculator=annuity&session_id=${session_id}&ip_address=${ip}&start_age=${b[0]}&pay_year=${b[1]}&amount=${b[2]}&growth_rate=${b[3]}`,

      success: (x) => {
         let result = JSON.parse(x);
         if (result.success) {
            updateResult(2, result.data);
         } else {
            console.log(result + "request not successful");
         }
      },
      error: (error) => {
         console.log(error);
      },
   });
}

function updateResult(x, y = undefined) {
   switch (x) {
      case 1:
         let amount1 = $.number(JSON.parse(localStorage.getItem("ann_result")));
         $(".calculated-result").text("$" + amount1);
         break;
      case 2:
         let amount2 = $.number(y);
         $(".calculated-result").text("$" + amount2);
         $(".error-text-container").removeClass("opacity-in");
         setTimeout(() => {
            $(".error-text-container").removeClass("z-index");
         }, 800);

         break;
   }
   // console.log(JSON.parse(localStorage.getItem('ann_result')))
}

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

         // pushToDatabase1(ann)
      });
   });
}

function next() {
   //  change next button's action
   function loaderPromise() {
      let update = new Promise((resolve) => {
         resolve(updateLoader(1, 1));
      });
      return update;
   }
   loaderPromise().then(() => {
      pushToDatabase1(ann);
      setTimeout(() => {
         window.open("annuity_result.html", "_self");
      }, 1410);
   });
}
function reCalculate() {
   $("#re-calc").on("click", () => {
      validateFormRecalc("#annRecalcForm", 3);
   });
}

function storeRecalculate() {
   //not to be stored in local storage
   let obj = {
      label: "annuity-result input",
      current_age: $("#annresulte1").val(),
      ageToStart_payment: $("#annresulte2").val(),
      initial_amount: $("#annresulte3").val(),
      growth_rate: $("#annresulte4").val(),
   };

   ann.results = [];
   ann.results.push(obj);

   pushToDatabase2(ann);
   updatePlaceholders(2);
}

function updatePlaceholders(x) {
   // can't use a loop because of just one element bleh
   switch (x) {
      case 1:
         const z = JSON.parse(localStorage.getItem("annpg1"));
         $("#annresulte1").attr("placeholder", z[0]);
         $("#annresulte2").attr("placeholder", z[2]);
         $("#annresulte3").attr("placeholder", z[1]);
         $("#annresulte4").attr("placeholder", z[3]);
         break;

      //recalculate
      case 2:
         // let a = []
         [
            {
               current_age: a[0],
               ageToStart_payment: a[1],
               initial_amount: a[2],
               growth_rate: a[3],
            },
         ] = ann.results;

         for (let i = 0; i < 4; i++) {
            $("#annresulte" + (i + 1)).attr("placeholder", a[i]);
         }
         break;
   }
}

/* -------- validation -------- */

$.validator.addMethod(
   "min_age",
   function (value, element, param) {
      let isValid = value >= Number($("#annpg1e1").val());

      return isValid;
   },
   "Age should be greater than or equal to current age"
);

// recalc
$.validator.addMethod(
   "min_age2",
   function (value) {
      let isValid = value >= Number($("#annresulte1").val());

      return isValid;
   },
   "Age should be greater than or equal to current age"
);

$("#annForm").validate({
   errorPlacement: function (error, element) {
      for (let i = 1; i <= 4; i++) {
         if (element.is("#annpg1e" + i)) {
            error.appendTo("#error" + i);
         }
      }
   },
   rules: {
      annpg1e1: {
         required: true,
         digits: true,
         range: [1, 90],
      },
      annpg1e2: {
         required: true,
         number: true,
         min: 1,
      },
      annpg1e3: {
         required: true,
         digits: true,
         min_age: true,
         // min:1,
         max: 90,
      },
      annpg1e4: {
         required: true,
         number: true,
         range: [0, 8],
      },
   },
   messages: {
      annpg1e1: {
         digits: "Please enter only positive integers",
      },
      annpg1e2: {
         min: "Value should be greater than 0",
      },
      annpg1e3: {
         digits: "Please enter only positive integers",
         min: "Age should be greater than or equal to current age",
         max: "Please enter a value less than or equal to 90",
      },
      annpg1e4: {
         range: "Please enter a val between 0-8",
      },
   },
});

$("#annRecalcForm").validate({
   errorPlacement: function (error, element) {
      for (let i = 1; i <= 4; i++) {
         if (element.is("#annresulte" + i)) {
            error.appendTo("#eresulte" + i);
         }
      }
   },
   rules: {
      annresulte1: {
         required: true,
         digits: true,
         range: [1, 90],
      },
      annresulte3: {
         required: true,
         number: true,
         min: 1,
      },
      annresulte2: {
         required: true,
         digits: true,
         min_age2: true,
         // min:1,
         max: 90,
      },
      annresulte4: {
         required: true,
         number: true,
         range: [0, 8],
      },
   },
   messages: {
      annresulte1: {
         digits: "Please enter only positive integers",
      },
      annresulte3: {
         min: "Value should be greater than 0",
      },
      annresulte2: {
         digits: "Please enter only positive integers",
         min: "Age should be greater than or equal to current age",
         max: "Please enter a value less than or equal to 90",
      },
      annresulte4: {
         range: "Please enter a val between 0-8",
      },
   },
});

$("#annFormSubmit").on("click", () => {
   if ($("#annForm").valid()) {
      next();
   }
});
