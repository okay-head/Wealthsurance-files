"use strict";

//globals

//____ Objects and collections

let clg = {
   page1: [],
   results: [],
};

let a = [];
//functions

function pushToDatabase1(clg) {
   createSessionId();
   let [a, b, c, d, e, f, g] = clg.page1;

   let url_string = `https://wealthsurance.com/calculators/?calculator=college&session_id=${session_id}&ip_address=${ip}&child_name=${a}&curr_age=${b}&college_year=${c}&year_in_college=${d}&coll_expense=${f}&to_fund_percent=${e}&to_fund_amnt=${(
      (f * d * e) /
      100
   ).toFixed(2)}&inv_rate=${g}`;

   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         // console.log(result.amount);
         // console.log(url_string);

         if (result.success) {
            localStorage.setItem("clg_result", JSON.stringify(result.amount));
         } else {
            console.log(result + "request not successful");
         }
      },
      error: (error) => {
         console.log(error);
      },
   });
}

function pushToDatabase2(clg) {
   createSessionId();
   let [
      {
         name: a,
         current_age: b,
         age_entering_clg: c,
         clg_years: d,
         annual_clg_expenses: e,
         "portion_funded%": f,
         investment_rate: g,
      },
   ] = clg.results;

   let url_string = `https://wealthsurance.com/calculators/?calculator=college&session_id=${session_id}&ip_address=${ip}&child_name=${a}&curr_age=${b}&college_year=${c}&year_in_college=${d}&coll_expense=${e}&to_fund_percent=${f}&to_fund_amnt=${(
      (f *d * e) /
      100
   ).toFixed(2)}&inv_rate=${g}`;
   // console.log(url_string);

   $.ajax({
      type: "POST",
      url: url_string,
      success: (x) => {
         console.log(x);
         console.log(url_string);
         let result = JSON.parse(x);
         if (result.success) {
            updateResult(2, result.amount);
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
         let amount1 = $.number(
            JSON.parse(localStorage.getItem("clg_result"))
         );
         $(".calculated-result").text("$" + amount1);
         break;
      case 2:
         let amount2 = $.number( y )
         $(".calculated-result").text("$" + amount2);
         $(".error-text-container").removeClass("opacity-in");
         setTimeout(() => {
            $(".error-text-container").removeClass("z-index");
         }, 800);

         break;
         
   }
}

function updatePlaceholders(x) {
   switch (x) {
      case 1:
         const z = JSON.parse(localStorage.getItem("clgpg1"));
         for (let i = 0; i < 4; i++) {
            $("#clgpg1resulte" + (i + 1)).attr("placeholder", z[i]);
         }
         $("#clgpg1resulte5").attr("placeholder", z[5]);
         $("#clgpg1resulte6").attr("placeholder", z[4]);
         $("#clgpg1resulte7").attr(
            "placeholder",
            z[5] * z[3]*(z[4] / 100).toFixed(2)
         );
         $("#clgpg1resulte8").attr("placeholder", z[6]);

         break;

      //recalculate
      case 2:
         [
            {
               name: a[0],
               current_age: a[1],
               age_entering_clg: a[2],
               clg_years: a[3],
               annual_clg_expenses: a[4],
               "portion_funded%": a[5],
               investment_rate: a[6],
            },
         ] = clg.results;

         for (let i = 0; i < 6; i++) {
            $("#clgpg1resulte" + (i + 1)).attr("placeholder", a[i]);
         }

         let calc = a[5] * a[3]*(a[4] / 100).toFixed(2);
         $("#clgpg1resulte7").attr("placeholder", calc.toFixed(1));
         // $("#clgpg1resulte7").val(calc);

         $("#clgpg1resulte8").attr("placeholder", a[6]);
         break;
   }
}
function pgLocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("clgpg1") != null) {
      clg.page1 = JSON.parse(localStorage.getItem("clgpg1"));
      for (let i = 0; i < 7; i++) {
         $("#clgpg1e" + (i + 1)).val(clg.page1[i]);
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
         for (let i = 0; i < 7; i++) {
            clg.page1.push($("#clgpg1e" + (i + 1)).val());
         }
         localStorage.setItem("clgpg1", JSON.stringify(clg.page1));
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
         pushToDatabase1(clg);
         setTimeout(() => {
            window.open("college_expenses_result.html", "_self");
         }, 1410);
      });
}
function reCalculate() {
   $("#re-calc").on("click", () => {
      validateFormRecalc("#clgRecalcForm", 6);
   });
}

function storeRecalculate() {
   //not to be stored in local storage
   let obj = {
      label: "clg-result input",
      name: $("#clgpg1resulte1").val(),
      current_age: $("#clgpg1resulte2").val(),
      age_entering_clg: $("#clgpg1resulte3").val(),
      clg_years: $("#clgpg1resulte4").val(),
      annual_clg_expenses: $("#clgpg1resulte5").val(),
      "portion_funded%": $("#clgpg1resulte6").val(),
      portion_funded$: $("#clgpg1resulte7").val(),
      investment_rate: $("#clgpg1resulte8").val(),
   };

   clg.results = [];
   clg.results.push(obj);
   pushToDatabase2(clg);

   updatePlaceholders(2);
}


/* ----------- Validation ----------- */
$.validator.addMethod("lettersonly", function(value, element)
{
return this.optional(element) || /^[a-z ]+$/i.test(value);
}, "Letters and spaces only please");

$.validator.addMethod(
   "min_age",
   function (value) {
      let isValid = ( value >= Number($("#clgpg1e2").val()) );

      return isValid;
   },
   "Age should be greater than or equal to current age"
);

$.validator.addMethod(
   "min_age2",
   function (value) {
      let isValid = ( value >= Number($("#clgpg1resulte2").val()) );

      return isValid;
   },
   "Age should be greater than or equal to current age"
);
// let difference = undefined

// function getDifference() {
//    difference = 90-(Number($("#clgpg1e3").val()))
//    return difference
// }

// window.setInterval(getDifference,200)

// $.validator.addMethod(
//    "max_y",
//    function (value) {
//        difference = 90-(Number($("#clgpg1e3").val()) )
//       let isValid =  value <= difference ;

//       return isValid;
//    },
//    `College years cannot be greater than ${getDifference()}`
// );


$("#clgForm").validate({
   errorPlacement: function (error, element) {
      for (let i = 1; i <= 7; i++) {
         if (element.is("#clgpg1e" + i)) {
            error.appendTo("#error" + i);
         }
      }
   },
   rules: {
      clgpg1e1: {
         required: true,
         lettersonly: true,
      },
      clgpg1e2: {
         required: true,
         digits: true,
         range: [1,35],
      },
      clgpg1e3: {
         required: true,
         digits: true,
         min_age: true,
         range:[5,35]
      },
      clgpg1e4: {
         required: true,
         number: true,
         range: [1, 8],
         // max_y: true,
      },
      clgpg1e5: {
         required: true,
         number: true,
         range: [1, 100],
      },
      clgpg1e6: {
         required: true,
         number: true,
         min: .1,
      },
      clgpg1e7: {
         required: true,
         number: true,
         range: [0, 20],
      },

   },
   messages: {
      clgpg1e1: {
         digits: "Please enter only positive integers",
      },
      clgpg1e2: {
         digits: "Please enter only positive integers",
         // range: "Please enter a value between 1-90",
      },
      clgpg1e3: {
         digits: "Please enter only positive integers",
         // min: "Age should be greater than or equal to current age",
         // max: "Please enter a value less than or equal to 90",
      },
      clgpg1e4: {
         range: "Please enter a val between 1-8",
      },
      clgpg1e6:{
         min: "Value should be greater than 0"
      }
   },
});

$("#clgRecalcForm").validate({
   errorPlacement: function (error, element) {
      for (let i = 1; i <= 8; i++) {
         if (element.is("#clgpg1resulte" + i)) {
            error.appendTo("#eresulte" + i);
         }
      }
   },
   rules: {
      clgpg1resulte1: {
         required: true,
         lettersonly: true,
      },
      clgpg1resulte2: {
         required: true,
         digits: true,
         range: [1,35],
      },
      clgpg1resulte3: {
         required: true,
         digits: true,
         min_age2: true,
         range:[5,35]
      },
      clgpg1resulte4: {
         required: true,
         number: true,
         range: [1, 8],
         // max_y: true,
      },
      clgpg1resulte6: {
         required: true,
         number: true,
         range: [1, 100],
      },
      clgpg1resulte5: {
         required: true,
         number: true,
         min: .1,
      },
      clgpg1resulte8: {
         required: true,
         number: true,
         range: [0, 20],
      },

   },
   messages: {
      clgpg1resulte1: {
         digits: "Please enter only positive integers",
      },
      clgpg1resulte2: {
         digits: "Please enter only positive integers",
         // range: "Please enter a value between 1-90",
      },
      clgpg1resulte3: {
         digits: "Please enter only positive integers",
         // min: "Age should be greater than or equal to current age",
         // max: "Please enter a value less than or equal to 90",
      },
      clgpg1resulte4: {
         range: "Please enter a val between 1-8",
      },
      clgpg1resulte5:{
         min: "Value should be greater than 0"
      }
   },
});



$("#clgFormSubmit").on("click", () => {
   if ($("#clgForm").valid()) {
      next();
   }else{
      console.log('invalid form');
   }
});

