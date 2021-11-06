"use strict";

//globals

// $(":input").on("change", () => {
//    localStorage.removeItem("clg_result");
// });

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

   let url_string = `http://wealthsurance.com/calculators/?calculator=college&session_id=${session_id}&ip_address=${ip}&child_name=${a}&curr_age=${b}&college_year=${c}&year_in_college=${d}&coll_expense=${f}&to_fund_percent=${e}&to_fund_amnt=${
      ((f * e) / 100).toFixed(2)
   }&inv_rate=${g}`;

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
   createSessionId()
   let [{ 
      'name': a,
      'current_age': b,
      'age_entering_clg': c,
      'clg_years': d,
      'annual_clg_expenses': e,
      'portion_funded%': f,
      'investment_rate': g,
   }] = clg.results

   let url_string = `http://wealthsurance.com/calculators/?calculator=college&session_id=${session_id}&ip_address=${ip}&child_name=${a}&curr_age=${b}&college_year=${c}&year_in_college=${d}&coll_expense=${e}&to_fund_percent=${f}&to_fund_amnt=${
      ((f * e) / 100).toFixed(2)
   }&inv_rate=${g}`;

   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         if (result.success) {
            updateResult(2,result.amount)
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
         $(".calculated-result").text(
            "$" + JSON.parse(localStorage.getItem("clg_result"))
         );
         break;
      case 2:
         $(".calculated-result").text("$" + y);
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
            z[5] * (z[4] / 100).toFixed(2)
         );
         $("#clgpg1resulte8").attr("placeholder",z[6])

         break;

      //recalculate
      case 2:
         [
            {
               "name": a[0],
               "current_age": a[1],
               "age_entering_clg": a[2],
               "clg_years": a[3],
               "annual_clg_expenses": a[4],
               "portion_funded%": a[5],
               "investment_rate":a[6],
            },
         ] = clg.results;

         for (let i = 0; i < 6; i++) {
            $("#clgpg1resulte" + (i + 1)).attr("placeholder", a[i]);
         }

         let calc = a[5] * (a[4] / 100).toFixed(2);
         $("#clgpg1resulte7").attr("placeholder", calc);
         $("#clgpg1resulte7").val(calc);

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
   $(".next-btn").on("click", () => {
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
   });
}

function reCalculate() {
   $(".re-calc-btn").on("click", () => {
      storeRecalculate();

      // updatePlaceholders(2);
   });
}

function storeRecalculate() {
   //not to be stored in local storage
   let obj = {
      "label": "clg-result input",
      "name": $("#clgpg1resulte1").val(),
      "current_age": $("#clgpg1resulte2").val(),
      "age_entering_clg": $("#clgpg1resulte3").val(),
      "clg_years": $("#clgpg1resulte4").val(),
      "annual_clg_expenses": $("#clgpg1resulte5").val(),
      "portion_funded%": $("#clgpg1resulte6").val(),
      "portion_funded$": $("#clgpg1resulte7").val(),
      "investment_rate": $("#clgpg1resulte8").val(),
      // 'saved': $('#clgpg1resulte8').val(),

      // 'additional_saving': $('#clgpg2resulte1').val(),
      // 'growth_rate': $('#clgpg2resulte2').val(),
      // 'saving_monthly': $('#clgpg2resulte3').val(),
   };

   clg.results = []
   clg.results.push(obj);
   pushToDatabase2(clg)

   updatePlaceholders(2)

}
