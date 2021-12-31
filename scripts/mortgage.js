"use strict";

//____ Objects and collections

let mortg = {
   page1: [],
   results: [],
};

let a = [];

// prefill

//pmi
$("#mortgpg1e6,#mortgresulte5").val(20);
//disabling loan amount
$("#mortgpg1e8").prop("disabled", true);

// Graph/Table toggler (for ammortization schedule)
$("#graph-btn").addClass("active-btn");
$("#table").addClass("d-none");

$("#graph-btn,#table-btn").on("click", () => {
   $("#graph,#table").toggleClass("d-none");
   $("#graph-btn,#table-btn").toggleClass("active-btn");
});

//Monthly/yearly toggler for  graphs
$("#year-btn-g").addClass("active-btn");
$("#mortg_chartM").addClass("d-none");

$("#year-btn-g,#month-btn-g").on("click", () => {
   $("#mortg_chart,#mortg_chartM").toggleClass("d-none");
   $("#year-btn-g,#month-btn-g").toggleClass("active-btn");
});

//Yearly/Monthly toggler for ammortization schedule
$("#year-btn").addClass("active-btn");
$("#amm-monthly").addClass("d-none");

$("#year-btn,#month-btn").on("click", () => {
   $("#amm-yearly,#amm-monthly").toggleClass("d-none");
   $("#year-btn,#month-btn").toggleClass("active-btn");
});

//For ammortization table
$(".ammortization-table-container,#slide-toggle-btn-grp")
   .slideUp()
   .css("opacity", "0");

$(".ammortization-btn").on("click", () => {
   changeText();
   $(".ammortization-table-container,#slide-toggle-btn-grp").slideToggle(700);
   $("#slide-toggle-btn-grp").animate(
      {
         opacity: 1,
      },
      500
   );
   animateTable($("#show-table").text());
});

function changeText() {
   let x = $("#show-table").text() == "Show" ? "Hide" : "Show";
   $("#show-table").text(x);
}

function animateTable(val) {
   if (val == "Hide") {
      $(".ammortization-table-container").animate({ opacity: 1 }, 400);
   } else {
      $(".ammortization-table-container").animate({ opacity: 0 }, 400);
   }
}

//functions
function pgLocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("mortgpg1") != null) {
      mortg.page1 = JSON.parse(localStorage.getItem("mortgpg1"));

      for (let i = 0; i < 12; i++) {
         if (i == 2 || i == 3 || i == 7) {
            if (i == 2 && mortg.page1[i] != 0) {
               $("#mortgpg1e3").val(mortg.page1[i]);
            } else if (i == 3 && mortg.page1[i] != 0) {
               $("#mortgpg1e4").val(mortg.page1[i]);
            }
            continue;
         } else {
            $("#mortgpg1e" + (i + 1)).val(mortg.page1[i]);
         }
      }
   }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("mortgpg1") != null) {
         localStorage.removeItem("mortgpg1");
         mortg.page1 = [];
      }

      $(".next-btn").one("click", () => {
         mortg.page1 = [];
         for (let i = 0; i < 12; i++) {
            if (i == 7 || i == 2 || i == 3) {
               if (i == 2 || i == 3) {
                  if (i == 2 && $("#mortgpg1e4").val() == 0) {
                     mortg.page1.push($("#mortgpg1e" + (i + 1)).val());
                  } else if (i == 2 && $("#mortgpg1e4").val() != 0) {
                     mortg.page1.push(0);
                  } else if (i == 3 && $("#mortgpg1e3").val() == 0) {
                     mortg.page1.push($("#mortgpg1e" + (i + 1)).val());
                  } else if (i == 3 && $("#mortgpg1e3").val() != 0) {
                     mortg.page1.push(0);
                  }
               } else if (i == 7) {
                  mortg.page1.push(
                     Number($("#mortgpg1e8").attr("placeholder"))
                  );
               }
            } else {
               mortg.page1.push($("#mortgpg1e" + (i + 1)).val());
            }
         }
         localStorage.setItem("mortgpg1", JSON.stringify(mortg.page1));
      });
   });
}

// function next() {
//    //  change next button's action
//    $(".next-btn").on("click", () => {
//       function loaderPromise() {
//          let update = new Promise((resolve) => {
//             resolve(updateLoader(1, 1));
//          });
//          return update;
//       }
//       loaderPromise().then(() => {
//          pushToDatabase1(mortg);
//          setTimeout(() => {
//             window.open("mortgage_result.html", "_self");
//          }, 1410);
//       });
//    });
// }

function reCalculate() {
   $("#re-calc").on("click", () => {
         if (!$("#graph-btn").hasClass("active-btn")) {
            $("#graph-btn").click();
         }

      validateFormRecalc("#mortgRecalcForm", 5);
      // storeRecalculate();
   });
}

function storeRecalculate() {
   //not to be stored in local storage
   let obj = {
      label: "mortg-result input",
      house_price: $("#mortgresulte1").val(),
      "down_payment%": $("#mortgresulte2").val(),
      down_payment$: $("#mortgresulte3").val(),
      pmi: $("#mortgresulte4").val(),
      pmi_stops_at: $("#mortgresulte5").val(),
      loan_amount: $("#mortgresulte7").val(),
      interest_rate: $("#mortgresulte6").val(),
      loan_duration: $("#mortgresulte8").val(),
      annual_hoa_dues: $("#mortgresulte9").val(),
      annual_property_taxes: $("#mortgresulte10").val(),
      annual_property_insurance: $("#mortgresulte11").val(),
   };

   obj.down_payment$ =
      obj.down_payment$ ||
      ((obj.house_price * obj["down_payment%"]) / 100).toFixed(2);

   obj["down_payment%"] =
      obj["down_payment%"] ||
      ((obj.down_payment$ * 100) / obj.house_price).toFixed(2);

   mortg.results = [];
   mortg.results.push(obj);

   updatePlaceholders(2);

   // console.log(mortg.results[0]);
   pushToDatabase2(mortg);
}

function pushToDatabase1(mortg) {
   createSessionId();
   localStorage.setItem("session", JSON.stringify(session_id));

   let z = [];
   for (let i = 0; i < 12; i++) {
      if (i == 7) {
         continue;
      } else {
         z[i] = mortg.page1[i];
      }
   }

   z[7] = $("#mortgpg1e8").attr("placeholder");

   if (z[3] == "") {
      z[3] = ((Number(z[0]) * Number(z[2])) / 100).toFixed(2);
   }

   let url_string = `https://wealthsurance.com/calculators/?calculator=mortgage&session_id=${session_id}&ip_address=${ip}&data={"price" : ${z[0]},"amount" : ${z[7]} ,"down" : ${z[3]},"interest" : ${z[6]},"duration" : ${z[8]},"hoaDue" : ${z[9]},"propTax" : ${z[10]},"propIns" : ${z[11]},"stPmi" : ${z[4]},"fnPmi" : ${z[5]}}&type=2&zipcode=${z[1]}`;
   // monthly
   let url_string2 = `https://wealthsurance.com/calculators/?calculator=mortgage&session_id=${session_id}&ip_address=${ip}&data={"price" : ${z[0]},"amount" : ${z[7]} ,"down" : ${z[3]},"interest" : ${z[6]},"duration" : ${z[8]},"hoaDue" : ${z[9]},"propTax" : ${z[10]},"propIns" : ${z[11]},"stPmi" : ${z[4]},"fnPmi" : ${z[5]}}&type=1&zipcode=${z[1]}`;

   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         if (result.success) {
            // console.log('string1',url_string);
            // console.log('string2',url_string2);
            // console.log('-------------------');
            // console.log(result.data);
            localStorage.setItem("mortg_result", JSON.stringify(result.data));
         } else {
            console.log(result + "request not successful");
            return 0;
         }
      },
      error: (error) => {
         console.log(error);
      },
   });
   $.ajax({
      type: "POST",
      url: url_string2,

      success: (x) => {
         let result = JSON.parse(x);
         if (result.success) {
            localStorage.setItem("mortg_result2", JSON.stringify(result.data));
            // console.log(result.data);
         } else {
            console.log(result + "request not successful");
         }
      },
      error: (error) => {
         console.log(error);
         return 0;
      },
   });
   return 1;
}

function pushToDatabase2(mortg) {
   createSessionId();
   localStorage.setItem("session", JSON.stringify(session_id));

   let zip = JSON.parse(localStorage.getItem("mortgpg1"))[1];
   let z = [];
   for (let i = 0; i < 11; i++) {
      z[i] = Object.values(mortg.results[0])[i + 1];
   }
   /*    
   // Assign the greater value to down_payment$
   let calc_down = ((Number(z[0])*Number(z[1]))/100).toFixed(2)
   z[2] = Number(z[2])>Number(calc_down)? z[2]: calc_down
 */
   z[2] = $("#mortgresulte3").val() || $("#mortgresulte3").attr("placeholder");

   // $('#mortgresulte3')
   // .attr('placeholder',z[2])

   let url_string = `https://wealthsurance.com/calculators/?calculator=mortgage&session_id=${session_id}&ip_address=${ip}&data={"price" : ${z[0]},"amount" : ${z[5]} ,"down" : ${z[2]},"interest" : ${z[6]},"duration" : ${z[7]},"hoaDue" : ${z[8]},"propTax" : ${z[9]},"propIns" : ${z[10]},"stPmi" : ${z[3]},"fnPmi" : ${z[4]}}&type=2&zipcode=${zip}`;
   let url_string2 = `https://wealthsurance.com/calculators/?calculator=mortgage&session_id=${session_id}&ip_address=${ip}&data={"price" : ${z[0]},"amount" : ${z[5]} ,"down" : ${z[2]},"interest" : ${z[6]},"duration" : ${z[7]},"hoaDue" : ${z[8]},"propTax" : ${z[9]},"propIns" : ${z[10]},"stPmi" : ${z[3]},"fnPmi" : ${z[4]}}&type=1&zipcode=${zip}`;

   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         if (result.success) {
            localStorage.setItem("mortg_result", JSON.stringify(result.data));
            updateTables(2, result.data);
            createAmmortizationTable(2);
            drawGraph(2, result.data);

            $(".error-text-container").removeClass("opacity-in");

            $("#year-btn").addClass("active-btn");
            $("#month-btn").removeClass("active-btn");

            $(".refi-output-table,.toggle-btn-grp").removeClass("d-none");
            $("#amm-monthly").addClass("d-none");
            setTimeout(() => {
               $(".error-text-container").removeClass("z-index");
            }, 900);
            $(".ammortization-btn,.ammortization-table-container").removeClass(
               "d-none"
            );
         } else {
            console.log(result + "request not successful");
            let alert_text =
               "Cannot fetch data from the database. Please try again later \nWe are sorry for the inconvenience.";
            alert(alert_text);
            return;
         }
      },
      error: (error) => {
         console.log(error);
      },
   });
   // monthly
   $.ajax({
      type: "POST",
      url: url_string2,

      success: (x) => {
         let result = JSON.parse(x);
         if (result.success) {
            localStorage.setItem("mortg_result2", JSON.stringify(result.data));
            createAmmortizationTable2(2);
         } else {
            console.log(result + "request not successful");
         }
      },
      error: (error) => {
         console.log(error);
      },
   });
}

function updatePlaceholders(x) {
   switch (x) {
      case 1:
         const z = JSON.parse(localStorage.getItem("mortgpg1"));
         if (z[3] == "") {
            z[3] = ((Number(z[0]) * Number(z[2])) / 100).toFixed(2);
         }
         if (z[2] == "") {
            z[2] = ((Number(z[3]) * 100) / Number(z[0])).toFixed(2);
         }
         $("#mortgresulte1").attr("placeholder", z[0]);
         for (let i = 2; i <= 11; i++) {
            $("#mortgresulte" + i).attr("placeholder", z[i]);
         }

         break;

      //recalculate
      case 2:
         [
            {
               house_price: a[0],
               "down_payment%": a[1],
               down_payment$: a[2],
               pmi: a[3],
               pmi_stops_at: a[4],
               interest_rate: a[5],
               loan_amount: a[6],
               loan_duration: a[7],
               annual_hoa_dues: a[8],
               annual_property_taxes: a[9],
               annual_property_insurance: a[10],
            },
         ] = mortg.results;

         for (let i = 0; i < 11; i++) {
            if (i == 2) {
               continue;
            } else {
               $("#mortgresulte" + (i + 1)).attr("placeholder", a[i]);
            }
         }
         break;
   }
}

function updateTables(x, y = undefined) {
   let data = undefined;
   if (x == 1) {
      data = JSON.parse(localStorage.getItem("mortg_result"));
   } else {
      data = y;
   }
   let dataM = Object.values(data.dataM);
   let dataY = Object.values(data.dataY);

   for (let i = 0; i < 5; i++) {
      $("#mortgresult1c1r" + (i + 1)).text(dataM[i]);
   }
   for (let i = 0; i < 5; i++) {
      $("#mortgresult1c2r" + (i + 1)).text(dataY[i]);
   }
   $("#mortgresult2c1r1").text(data.payFirstM);
   $("#mortgresult2c1r2").text(data.totalPmiPayment);
   $("#mortgresult2c1r3").text(data.pmiDuration);
}

// ammortization table
function updateAmmortizationTable(years) {
   let data = undefined;
   let nYears = years;
   data = JSON.parse(localStorage.getItem("mortg_result"));

   //for c1-5
   for (let j = 1; j <= nYears; j++) {
      for (let i = 0; i < 5; i++) {
         $(`#ayr${j}c${i + 2}`).text(
            Object.values(data.amortizationSc[12 * j])[i]
         );
      }
   }
   // for c1 and c7
   for (let i = 1; i <= nYears; i++) {
      $(`#ayr${i}c1`).text(i);
   }
   for (let i = 1; i <= nYears; i++) {
      $(`#ayr${i}c7`).text(i);
   }
}
function createAmmortizationTable(x) {
   let nYears = undefined;
   if (x == 1) {
      nYears = JSON.parse(localStorage.getItem("mortgpg1"))[8];
   } else {
      nYears = mortg.results[0].loan_duration;
   }

   let str = "";
   let yearStr = "";
   for (let i = 1; i <= nYears; i++) {
      for (let j = 1; j <= 7; j++) {
         str += `<td id="ayr${i}c${j}">0</td>`;
      }
      yearStr += `<tr> ${str} </tr>`;
      str = "";
   }
   let initialStr = `<tr>
          <td>Period</td>
          <td>Balance</td>
          <td>Principal</td>
          <td>Interest</td>
          <td>Payment</td>
          <td>PMI Pay</td>
          <td>Year</td>
     </tr> `;

   let finalStr = initialStr + `<tr>${yearStr}</tr>`;
   // console.log(finalStr)

   $("#amm-yearly").html(finalStr);

   // console.log(x,nYears)
   updateAmmortizationTable(nYears);
}
// monthly
function updateAmmortizationTable2(months) {
   let data = undefined;
   let nMonths = months;
   data = JSON.parse(localStorage.getItem("mortg_result2"));

   //for c1-5
   for (let j = 1; j <= nMonths; j++) {
      for (let i = 0; i < 5; i++) {
         $(`#amr${j}c${i + 2}`).text(Object.values(data.amortizationSc[j])[i]);
      }
   }
   // for c1 and c7
   for (let i = 1; i <= nMonths; i++) {
      $(`#amr${i}c1`).text(i);
   }
   for (let i = 1; i <= nMonths; i++) {
      $(`#amr${i}c7`).text(i);
   }
}
function createAmmortizationTable2(x) {
   let nMonths = undefined;
   if (x == 1) {
      nMonths = JSON.parse(localStorage.getItem("mortgpg1"))[8] * 12;
   } else {
      nMonths = mortg.results[0].loan_duration * 12;
   }

   let str = "";
   let yearStr = "";
   for (let i = 1; i <= nMonths; i++) {
      for (let j = 1; j <= 7; j++) {
         str += `<td id="amr${i}c${j}">0</td>`;
      }
      yearStr += `<tr> ${str} </tr>`;
      str = "";
   }
   let initialStr = `<tr>
          <td>Period</td>
          <td>Balance</td>
          <td>Principal</td>
          <td>Interest</td>
          <td>Payment</td>
          <td>PMI Pay</td>
          <td>Month</td>
     </tr> `;

   let finalStr = initialStr + `<tr>${yearStr}</tr>`;
   // console.log(finalStr)

   $("#amm-monthly").html(finalStr);

   updateAmmortizationTable2(nMonths);
}

//down payment
function detectChange1() {
   let z = $("#mortgpg1e3").val();
   if (z == "") {
      $("#mortgpg1e4").prop("disabled", false);
      $("#mortgpg1e4").attr("placeholder", "Enter amount");
   } else {
      $("#mortgpg1e4").prop("disabled", true);
      let down_amount = (
         (Number($("#mortgpg1e1").val()) * Number($("#mortgpg1e3").val())) /
         100
      ).toFixed(2);
      $("#mortgpg1e4").attr("placeholder", down_amount);
   }
}
function detectChange2() {
   let z = $("#mortgpg1e4").val();
   if (z == "") {
      $("#mortgpg1e3").prop("disabled", false);
      $("#mortgpg1e3").attr("placeholder", "Enter Percentage");
   } else {
      $("#mortgpg1e3").prop("disabled", true);
      let down_percentage = (Number(z) * 100) / Number($("#mortgpg1e1").val());
      $("#mortgpg1e3").attr("placeholder", down_percentage.toFixed(2));
   }
}

//loan amount
function detectChange5() {
   let loan = undefined;
   let down_payment = undefined;
   if (
      $("#mortgpg1e1").val() == "" ||
      ($("#mortgpg1e3").val() == "" && $("#mortgpg1e4").val() == "")
      // ||$('#mortgpg1e4').attr('placeholder') ==''
   ) {
      $("#mortgpg1e8").attr("placeholder", "Loan amount");
      return;
   } else {
      down_payment =
         $("#mortgpg1e4").val() || $("#mortgpg1e4").attr("placeholder");
      loan = Number($("#mortgpg1e1").val()) - Number(down_payment);
      $("#mortgpg1e8").attr("placeholder", loan.toFixed(2));
   }
}

// ____reCalculate___

let local_data = JSON.parse(localStorage.getItem("mortgpg1"));
if (
   local_data == 0 ||
   local_data == null ||
   local_data == undefined ||
   local_data == ""
) {
   // do nothing
} else {
   if (local_data[3] == "") {
      local_data[3] = (
         (Number(local_data[0]) * Number(local_data[2])) /
         100
      ).toFixed(2);
   }
   if (local_data[2] == "") {
      local_data[2] = (
         (Number(local_data[3]) * 100) /
         Number(local_data[0])
      ).toFixed(2);
   }
}

function detectChange3() {
   let z = $("#mortgresulte2").val();
   if (z == "") {
      $("#mortgresulte3").prop("disabled", false);
      $("#mortgresulte3").attr("placeholder", local_data[3]);
   } else {
      $("#mortgresulte3").prop("disabled", true);
      let down_amount = (
         (Number($("#mortgresulte1").val()) *
            Number($("#mortgresulte2").val())) /
         100
      ).toFixed(2);
      $("#mortgresulte3").attr("placeholder", down_amount);
   }
}
function detectChange4() {
   let z = $("#mortgresulte3").val();
   if (z == "") {
      $("#mortgresulte2").prop("disabled", false);
      $("#mortgresulte2").attr("placeholder", local_data[2]);
   } else {
      $("#mortgresulte2").prop("disabled", true);
      let down_percentage =
         (Number(z) * 100) / Number($("#mortgresulte1").val());
      $("#mortgresulte2").attr("placeholder", down_percentage.toFixed(2));
   }
}

function detectChange6() {
   let loan = undefined;
   let down_payment = undefined;
   if (
      $("#mortgresulte1").val() == "" ||
      ($("#mortgresulte2").val() == "" && $("#mortgresulte3").val() == "")
   ) {
      $("#mortgresulte7").val("");
      return;
   } else {
      down_payment =
         $("#mortgresulte3").val() || $("#mortgresulte3").attr("placeholder");
      loan = Number($("#mortgresulte1").val()) - Number(down_payment);
      $("#mortgresulte7").val(loan.toFixed(2));
   }
}

/* ----------- Validation ----------- */
function next() {
   //  change next button's action
   function loaderPromise() {
      let update = new Promise((resolve) => {
         resolve(updateLoader(1, 1));
      });
      return update;
   }
   loaderPromise().then(() => {
      let t = pushToDatabase1(mortg);
      if (t) {
         setTimeout(() => {
            window.open("mortgage_result.html", "_self");
         }, 1410);
      } else {
         let alert_text =
            "Cannot fetch data from the database. Please try again later \nWe are sorry for the inconvenience.";
         alert(alert_text);
      }
   });
}

$.validator.addMethod(
   "require_from_group",
   function (value, element, options) {
      var $fields = $(options[1], element.form),
         $fieldsFirst = $fields.eq(0),
         validator = $fieldsFirst.data("valid_req_grp")
            ? $fieldsFirst.data("valid_req_grp")
            : $.extend({}, this),
         isValid =
            $fields.filter(function () {
               return validator.elementValue(this);
            }).length >= options[0];

      // Store the cloned validator for future validation
      $fieldsFirst.data("valid_req_grp", validator);

      // If element isn't being validated, run each require_from_group field's validation rules
      if (!$(element).data("being_validated")) {
         $fields.data("being_validated", true);
         $fields.each(function () {
            validator.element(this);
         });
         $fields.data("being_validated", false);
      }
      return isValid;
   },
   $.validator.format("Please fill at least {0} of these fields.")
);

$.validator.addMethod(
   "down_amount",
   function (value) {
      let isValid = value < Number($("#mortgpg1e1").val());

      return isValid;
   },
   "Down payment amount should be smaller than house price"
);
$.validator.addMethod(
   "down_amount2",
   function (value) {
      let isValid = value < Number($("#mortgresulte1").val());

      return isValid;
   },
   "Down payment amount should be smaller than house price"
);

$("#mortgForm").validate({
   errorPlacement: function (error, element) {
      for (let i = 1; i <= 12; i++) {
         if (element.is("#mortgpg1e" + i)) {
            error.appendTo("#error" + i);
         }
      }
   },
   rules: {
      mortgpg1e1: {
         required: true,
         number: true,
         min: 0.1,
      },
      mortgpg1e2: {
         required: true,
         digits: true,
         min: 0,
      },
      mortgpg1e3: {
         // required: true,
         require_from_group: [1, ".down_payment"],
         number: true,
         range: [0, 100],
      },
      mortgpg1e4: {
         // required: true,
         number: true,
         min: 0,
         down_amount: true,
      },
      mortgpg1e5: {
         required: true,
         number: true,
         range: [0, 5],
      },
      mortgpg1e6: {
         required: true,
         number: true,
         range: [0, 30],
      },
      mortgpg1e7: {
         required: true,
         number: true,
         range: [0, 20],
      },
      mortgpg1e9: {
         required: true,
         digits: true,
         range: [0, 45],
      },
      mortgpg1e10: {
         required: true,
         number: true,
         min: 0,
      },
      mortgpg1e11: {
         required: true,
         number: true,
         min: 0.1,
      },
      mortgpg1e12: {
         required: true,
         number: true,
         min: 0.1,
      },
   },
   messages: {
      mortgpg1e1: { min: "Value should be greater than zero" },
      mortgpg1e3: {
         require_from_group:
            "Please enter atleast one of the fields: down payment percentage / down payment amount",
      },
      mortgpg1e9: { digits: "Please enter only positive integers" },
      // mortgpg1e10: { digits: "Please enter only positive integers" },
      // mortgpg1e11: {
      //    digits: "Please enter only positive integers",
      //    min: "Value should be greater than zero",
      // },
      // mortgpg1e12: {
      //    digits: "Please enter only positive integers",
      //    min: "Value should be greater than zero",
      // },
   },
});
$("#mortgRecalcForm").validate({
   errorPlacement: function (error, element) {
      for (let i = 1; i <= 11; i++) {
         if (element.is("#mortgresulte" + i)) {
            error.appendTo("#eresulte" + i);
         }
      }
   },
   rules: {
      mortgresulte1: {
         required: true,
         number: true,
         min: 0.1,
      },
      // mortgpg1e2: {
      //    required: true,
      //    digits: true,
      //    min: 0,
      // },
      mortgresulte2: {
         // required: true,
         number: true,
         range: [0, 100],
      },
      mortgresulte3: {
         require_from_group: [1, ".down_payment"],
         // required: true,
         number: true,
         min: 0,
         down_amount2: true,
      },
      mortgresulte4: {
         required: true,
         number: true,
         range: [0, 5],
      },
      mortgresulte5: {
         required: true,
         number: true,
         range: [0, 30],
      },
      mortgresulte6: {
         required: true,
         number: true,
         range: [0, 20],
      },
      mortgresulte8: {
         required: true,
         digits: true,
         range: [0, 45],
      },
      mortgresulte9: {
         required: true,
         number: true,
         min: 0,
      },
      mortgresulte10: {
         required: true,
         number: true,
         min: 0.1,
      },
      mortgresulte11: {
         required: true,
         number: true,
         min: 0.1,
      },
   },
   messages: {
      mortgresulte1: { min: "Value should be greater than 0" },
      mortgresulte3: {
         require_from_group:
            "Please enter atleast one of the fields: down payment percentage / down payment amount",
      },
      mortgresulte9: { digits: "Please enter only positive integers" },
      mortgresulte10: {
         digits: "Please enter only positive integers",
         min: "Value should be greater than zero",
      },
      mortgresulte11: {
         digits: "Please enter only positive integers",
         min: "Value should be greater than zero",
      },
   },
});

$("#mortgFormSubmit").on("click", () => {
   if ($("#mortgForm").valid()) {
      next();
   } else {
      // console.log('invalid form');
   }
});
