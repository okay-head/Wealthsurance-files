//____ Objects and collections
const [element] = document.getElementsByClassName('enlarged-chart-container')

let nw = {
   //nw = net worth
   page1: [],
   page2: [],
   page3: [],
   results: [],
};

//defaults
// $('#modal_chart').on('click',()=>{
//    modalChart()
// })
// $('#nw_enlarged_chart').addClass("shrink");

$("#toggle_modal_chart").on("click", () => {
   let top_distance = element.getBoundingClientRect().top + 30
   root.scrollTop = top_distance;
   $(
      "#nw_enlarged_chart,.shadow-element,#close_chart,.enlarged_chart_cover,.enlarged-chart-container"
   ).toggleClass("hidden");
   // $('#nw_enlarged_chart').removeClass("shrink");
});

$("body").on("keydown", (e) => {
   if (e.key == "Escape") {
      $(
         "#nw_enlarged_chart,.shadow-element,#close_chart,.enlarged_chart_cover,.enlarged-chart-container"
      ).addClass("hidden");
      // $('#nw_enlarged_chart').removeClass("shrink");
   }
});

$("#close_chart").on("click", () => {
   $(
      "#nw_enlarged_chart,.shadow-element,#close_chart,.enlarged_chart_cover,.enlarged-chart-container"
   ).addClass("hidden");
});

//functions

// Change the max width for the graph container depending on the viewport (for results page )

function changeMaxWidth() {
   let vw = $(window).width()
   $('#nw-result-container').css('maxWidth',vw-30)
   $('.enlarged-chart-container,.enlarged_chart_cover').css('maxWidth',vw-60)
}

function updatePlaceholders(x) {
   switch (x) {
      case 1:
         const pg2 = JSON.parse(localStorage.getItem("nwpg2"));
         const pg3 = JSON.parse(localStorage.getItem("nwpg3"));

         let y = Object.values(pg2[0]);
         for (let i = 0; i < 12; i++) {
            $(`#nwresultp1r${i + 1}c1`).val(y[i][0]);
            $(`#nwresultp1r${i + 1}c2`).val(y[i][1]);
         }

         let x = Object.values(pg3[0]);
         for (let i = 0; i < 7; i++) {
            $(`#nwresultp2r${i + 1}c1`).val(x[i][0]);
            $(`#nwresultp2r${i + 1}c2`).val(x[i][1]);
         }

         break;
   }
}

function pushToDatabase1(nw) {
   createSessionId();
   localStorage.setItem("session", JSON.stringify(session_id));

   let [a, b] = nw.page1;
   let pg2 = nw.page2[0];
   let pg3 = nw.page3[0];
   let [c1, c2] = pg2.primary_income;
   let [d1, d2] = pg2.real_estate;
   let [e1, e2] = pg2.vehicles;
   let [f1, f2] = pg2.household;
   let [g1, g2] = pg2.retirement_accounts;
   let [h1, h2] = pg2.stock;
   let [i1, i2] = pg2.bonds;
   let [j1, j2] = pg2.life_insurance_cash;
   let [k1, k2] = pg2.annuity;
   let [l1, l2] = pg2.bank_accounts;
   let [m1, m2] = pg2.cash;
   let [n1, n2] = pg2.other;

   let [o1, o2] = pg3.primary_mortgage;
   let [p1, p2] = pg3.other_mortgage;
   let [q1, q2] = pg3.vehicle_loans;
   let [r1, r2] = pg3.student_loans;
   let [s1, s2] = pg3.creditCard_debts;
   let [t1, t2] = pg3.personal_loans;
   let [u1, u2] = pg3.other_loans;

   let url_liablity1 = {
      0: { amount: o1, interest_rate: o2, type: 1 },
      1: { amount: p1, interest_rate: p2, type: 2 },
      2: { amount: q1, interest_rate: q2, type: 3 },
      3: { amount: r1, interest_rate: r2, type: 4 },
      4: { amount: s1, interest_rate: s2, type: 5 },
      5: { amount: t1, interest_rate: t2, type: 6 },
      6: { amount: u1, interest_rate: u2, type: 7 },
   };

   let url_asset1 = {
      0: { amount: c1, growth_rate: c2, type: 1 },
      1: { amount: d1, growth_rate: d2, type: 2 },
      2: { amount: e1, growth_rate: e2, type: 3 },
      3: { amount: f1, growth_rate: f2, type: 4 },
      4: { amount: g1, growth_rate: g2, type: 5 },
      5: { amount: h1, growth_rate: h2, type: 6 },
      6: { amount: i1, growth_rate: i2, type: 7 },
      7: { amount: j1, growth_rate: j2, type: 8 },
      8: { amount: k1, growth_rate: k2, type: 9 },
      9: { amount: l1, growth_rate: l2, type: 10 },
      10: { amount: m1, growth_rate: m2, type: 11 },
      11: { amount: n1, growth_rate: n2, type: 12 },
   };

   let url_string = `https://wealthsurance.com/calculators/?calculator=net&session_id=${session_id}&ip_address=${ip}&current_age=${a}&retirement_age=${b}&asset=${JSON.stringify(
      url_asset1
   )}&liablity=${JSON.stringify(url_liablity1)}`;
   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         if (result.success) {
            localStorage.setItem("nw_result", JSON.stringify(result.data));

            // console.log(result)
         } else {
            console.log(result + "request not successful");
         }
      },
      error: (error) => {
         console.log(error);
      },
   });
}

// function populateTable() {
//    $(".nw-table input, nw-results-table input").val(0);
//    return;
// }
function hideTable() {
   $(".nw-table-container").slideUp(800);
}
function showTable() {
   $(".nw-table-container").slideDown(1000);
}

function page1LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("nwpg1") != null) {
      nw.page1 = JSON.parse(localStorage.getItem("nwpg1"));
      $("#nwpg1e1").val(nw.page1[0]);
      $("#nwpg1e2").val(nw.page1[1]);
   }

   //push to local storage
   $(".page1 :input").change(() => {
      if (localStorage.getItem("nwpg1") != null) {
         localStorage.removeItem("nwpg1");
         nw.page1 = [];
      }

      $(".next-btn").one("click", () => {
         nw.page1 = [];
         nw.page1.push($("#nwpg1e1").val());
         nw.page1.push($("#nwpg1e2").val());

         localStorage.setItem("nwpg1", JSON.stringify(nw.page1));
      });
   });
}

function page2LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("nwpg2") != null) {
      nw.page2 = JSON.parse(localStorage.getItem("nwpg2"));
      let [z] = nw.page2;
      $("#nwpg2r1c1").val(z.primary_income[0]);
      $("#nwpg2r1c2").val(z.primary_income[1]);

      $("#nwpg2r2c1").val(z.real_estate[0]);
      $("#nwpg2r2c2").val(z.real_estate[1]);

      $("#nwpg2r3c1").val(z.vehicles[0]);
      $("#nwpg2r3c2").val(z.vehicles[1]);

      $("#nwpg2r4c1").val(z.household[0]);
      $("#nwpg2r4c2").val(z.household[1]);

      $("#nwpg2r5c1").val(z.retirement_accounts[0]);
      $("#nwpg2r5c2").val(z.retirement_accounts[1]);

      $("#nwpg2r6c1").val(z.stock[0]);
      $("#nwpg2r6c2").val(z.stock[1]);

      $("#nwpg2r7c1").val(z.bonds[0]);
      $("#nwpg2r7c2").val(z.bonds[1]);

      $("#nwpg2r8c1").val(z.life_insurance_cash[0]);
      $("#nwpg2r8c2").val(z.life_insurance_cash[1]);

      $("#nwpg2r9c1").val(z.annuity[0]);
      $("#nwpg2r9c2").val(z.annuity[1]);

      $("#nwpg2r10c1").val(z.bank_accounts[0]);
      $("#nwpg2r10c2").val(z.bank_accounts[1]);

      $("#nwpg2r11c1").val(z.cash[0]);
      $("#nwpg2r11c2").val(z.cash[1]);

      $("#nwpg2r12c1").val(z.other[0]);
      $("#nwpg2r12c2").val(z.other[1]);
   }

   //push to local storage
   $(".page2 :input").change(() => {
      if (localStorage.getItem("nwpg2") != null) {
         localStorage.removeItem("nwpg2");
         nw.page2 = [];
      }

      $(".next-btn,.prev-btn").one("click", () => {
         nw.page2 = [];

         const obj = {
            primary_income: [$("#nwpg2r1c1").val(), $("#nwpg2r1c2").val()],
            real_estate: [$("#nwpg2r2c1").val(), $("#nwpg2r2c2").val()],

            vehicles: [$("#nwpg2r3c1").val(), $("#nwpg2r3c2").val()],

            household: [$("#nwpg2r4c1").val(), $("#nwpg2r4c2").val()],

            retirement_accounts: [$("#nwpg2r5c1").val(), $("#nwpg2r5c2").val()],

            stock: [$("#nwpg2r6c1").val(), $("#nwpg2r6c2").val()],

            bonds: [$("#nwpg2r7c1").val(), $("#nwpg2r7c2").val()],

            life_insurance_cash: [$("#nwpg2r8c1").val(), $("#nwpg2r8c2").val()],
            annuity: [$("#nwpg2r9c1").val(), $("#nwpg2r9c2").val()],
            bank_accounts: [$("#nwpg2r10c1").val(), $("#nwpg2r10c2").val()],
            cash: [$("#nwpg2r11c1").val(), $("#nwpg2r11c2").val()],
            other: [$("#nwpg2r12c1").val(), $("#nwpg2r12c2").val()],
         };

         nw.page2.push(obj);

         localStorage.setItem("nwpg2", JSON.stringify(nw.page2));
      });
   });
}

function page3LocalStorage() {
   //check for existing localStorage on page load
   // populateTable()
   if (localStorage.getItem("nwpg3") != null) {
      nw.page3 = JSON.parse(localStorage.getItem("nwpg3"));
      let [z] = nw.page3;
      $("#nwpg3r1c1").val(z.primary_mortgage[0]);
      $("#nwpg3r1c2").val(z.primary_mortgage[1]);

      $("#nwpg3r2c1").val(z.other_mortgage[0]);
      $("#nwpg3r2c2").val(z.other_mortgage[1]);

      $("#nwpg3r3c1").val(z.vehicle_loans[0]);
      $("#nwpg3r3c2").val(z.vehicle_loans[1]);

      $("#nwpg3r4c1").val(z.student_loans[0]);
      $("#nwpg3r4c2").val(z.student_loans[1]);

      $("#nwpg3r5c1").val(z.creditCard_debts[0]);
      $("#nwpg3r5c2").val(z.creditCard_debts[1]);

      $("#nwpg3r6c1").val(z.personal_loans[0]);
      $("#nwpg3r6c2").val(z.personal_loans[1]);

      $("#nwpg3r7c1").val(z.other_loans[0]);
      $("#nwpg3r7c2").val(z.other_loans[1]);
   }
   // else{
   //    populateTable()
   // }

   //push to local storage
   $(".page3 :input").change(() => {
      if (localStorage.getItem("nwpg3") != null) {
         localStorage.removeItem("nwpg3");
         nw.page3 = [];
      }

      $(".next-btn,.prev-btn").one("click", () => {
         nw.page3 = [];

         const obj = {
            primary_mortgage: [$("#nwpg3r1c1").val(), $("#nwpg3r1c2").val()],
            other_mortgage: [$("#nwpg3r2c1").val(), $("#nwpg3r2c2").val()],

            vehicle_loans: [$("#nwpg3r3c1").val(), $("#nwpg3r3c2").val()],

            student_loans: [$("#nwpg3r4c1").val(), $("#nwpg3r4c2").val()],

            creditCard_debts: [$("#nwpg3r5c1").val(), $("#nwpg3r5c2").val()],

            personal_loans: [$("#nwpg3r6c1").val(), $("#nwpg3r6c2").val()],

            other_loans: [$("#nwpg3r7c1").val(), $("#nwpg3r7c2").val()],
         };

         nw.page3.push(obj);

         localStorage.setItem("nwpg3", JSON.stringify(nw.page3));
      });
   });

   // store even if the input is unchanged
   $(".next-btn,.prev-btn").one("click", () => {
      nw.page3 = [];

      const obj = {
         primary_mortgage: [$("#nwpg3r1c1").val(), $("#nwpg3r1c2").val()],
         other_mortgage: [$("#nwpg3r2c1").val(), $("#nwpg3r2c2").val()],

         vehicle_loans: [$("#nwpg3r3c1").val(), $("#nwpg3r3c2").val()],

         student_loans: [$("#nwpg3r4c1").val(), $("#nwpg3r4c2").val()],

         creditCard_debts: [$("#nwpg3r5c1").val(), $("#nwpg3r5c2").val()],

         personal_loans: [$("#nwpg3r6c1").val(), $("#nwpg3r6c2").val()],

         other_loans: [$("#nwpg3r7c1").val(), $("#nwpg3r7c2").val()],
      };

      nw.page3.push(obj);

      localStorage.setItem("nwpg3", JSON.stringify(nw.page3));
   });
}

function next() {
   //  change next button's action
   // $(".next-btn").on("click", changeButtonBehaviour);

   function loaderPromise() {
      let update = new Promise((resolve) => {
         resolve(updateLoader(3, 3));
      });
      return update;
   }
   loaderPromise().then(() => {
      pushToDatabase1(nw);
      setTimeout(() => {
         window.open("netWorth_result.html", "_self");
      }, 1410);
   });
}

function pushToDatabase2(arr) {
   createSessionId();
   localStorage.setItem("session", JSON.stringify(session_id));

   let [a, b] = JSON.parse(localStorage.getItem("nwpg1"));
   let ast = arr[0];
   let lbt = arr[1];
   let [c1, c2] = ast.primary_income;
   let [d1, d2] = ast.real_estate;
   let [e1, e2] = ast.vehicles;
   let [f1, f2] = ast.household;
   let [g1, g2] = ast.retirement_accounts;
   let [h1, h2] = ast.stock;
   let [i1, i2] = ast.bonds;
   let [j1, j2] = ast.life_insurance_cash;
   let [k1, k2] = ast.annuity;
   let [l1, l2] = ast.bank_accounts;
   let [m1, m2] = ast.cash;
   let [n1, n2] = ast.other;

   let [o1, o2] = lbt.primary_mortgage;
   let [p1, p2] = lbt.other_mortgage;
   let [q1, q2] = lbt.vehicle_loans;
   let [r1, r2] = lbt.student_loans;
   let [s1, s2] = lbt.creditCard_debts;
   let [t1, t2] = lbt.personal_loans;
   let [u1, u2] = lbt.other_loans;

   let url_liablity1 = {
      0: { amount: o1, interest_rate: o2, type: 1 },
      1: { amount: p1, interest_rate: p2, type: 2 },
      2: { amount: q1, interest_rate: q2, type: 3 },
      3: { amount: r1, interest_rate: r2, type: 4 },
      4: { amount: s1, interest_rate: s2, type: 5 },
      5: { amount: t1, interest_rate: t2, type: 6 },
      6: { amount: u1, interest_rate: u2, type: 7 },
   };

   let url_asset1 = {
      0: { amount: c1, growth_rate: c2, type: 1 },
      1: { amount: d1, growth_rate: d2, type: 2 },
      2: { amount: e1, growth_rate: e2, type: 3 },
      3: { amount: f1, growth_rate: f2, type: 4 },
      4: { amount: g1, growth_rate: g2, type: 5 },
      5: { amount: h1, growth_rate: h2, type: 6 },
      6: { amount: i1, growth_rate: i2, type: 7 },
      7: { amount: j1, growth_rate: j2, type: 8 },
      8: { amount: k1, growth_rate: k2, type: 9 },
      9: { amount: l1, growth_rate: l2, type: 10 },
      10: { amount: m1, growth_rate: m2, type: 11 },
      11: { amount: n1, growth_rate: n2, type: 12 },
   };

   let url_string = `https://wealthsurance.com/calculators/?calculator=net&session_id=${session_id}&ip_address=${ip}&current_age=${a}&retirement_age=${b}&asset=${JSON.stringify(
      url_asset1
   )}&liablity=${JSON.stringify(url_liablity1)}`;

   // console.log(url_string)

   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         // console.log(x);
         let result = JSON.parse(x);
         if (result.success) {
            localStorage.setItem("nw_result", JSON.stringify(result.data));

            drawGraph();
            $(".error-text-container").removeClass("opacity-in");
            setTimeout(() => {
               $(".error-text-container").removeClass("z-index");
            }, 800);
            // $(".error-text-container").addClass("fade");
            // console.log(result)
         } else {
            console.log(result + "request not successful");
         }
      },
      error: (error) => {
         console.log(error);
      },
   });
}

// function reCalculate() {
//    $("#re-calc").on("click", () => {
//       storeRecalculate();

//       // console.log(nw.results);
//    });
// }

function storeRecalculate() {
   //not to be stored in local storage
   let assets = {
      label: "assets",
      primary_income: [$("#nwresultp1r1c1").val(), $("#nwresultp1r1c2").val()],
      real_estate: [$("#nwresultp1r2c1").val(), $("#nwresultp1r2c2").val()],
      vehicles: [$("#nwresultp1r3c1").val(), $("#nwresultp1r3c2").val()],
      household: [$("#nwresultp1r4c1").val(), $("#nwresultp1r4c2").val()],
      retirement_accounts: [
         $("#nwresultp1r5c1").val(),
         $("#nwresultp1r5c2").val(),
      ],
      stock: [$("#nwresultp1r6c1").val(), $("#nwresultp1r6c2").val()],
      bonds: [$("#nwresultp1r7c1").val(), $("#nwresultp1r7c2").val()],
      life_insurance_cash: [
         $("#nwresultp1r8c1").val(),
         $("#nwresultp1r8c2").val(),
      ],
      annuity: [$("#nwresultp1r9c1").val(), $("#nwresultp1r9c2").val()],
      bank_accounts: [$("#nwresultp1r10c1").val(), $("#nwresultp1r10c2").val()],
      cash: [$("#nwresultp1r11c1").val(), $("#nwresultp1r11c2").val()],
      other: [$("#nwresultp1r12c1").val(), $("#nwresultp1r12c2").val()],
   };

   let liabilities = {
      label: "liabilities",
      primary_mortgage: [
         $("#nwresultp2r1c1").val(),
         $("#nwresultp2r1c2").val(),
      ],
      other_mortgage: [$("#nwresultp2r2c1").val(), $("#nwresultp2r2c2").val()],
      vehicle_loans: [$("#nwresultp2r3c1").val(), $("#nwresultp2r3c2").val()],
      student_loans: [$("#nwresultp2r4c1").val(), $("#nwresultp2r4c2").val()],
      creditCard_debts: [
         $("#nwresultp2r5c1").val(),
         $("#nwresultp2r5c2").val(),
      ],
      personal_loans: [$("#nwresultp2r6c1").val(), $("#nwresultp2r5c2").val()],
      other_loans: [$("#nwresultp2r7c1").val(), $("#nwresultp2r5c2").val()],
   };

   nw.results = [];
   nw.results.push(assets);
   nw.results.push(liabilities);

   pushToDatabase2(nw.results);
}

// ----- Validation ------

function validateForm(x) {
   switch (x) {
      case 1:
         if ($(`#page${x}Form`).valid()) {
            return mySiema.next();
         }
         break;
      case 2:
         validateForm2("#page2Form", 2);
         break;
      case 3:
         validateForm2("#page3Form", 2);
         break;
   }
}

$.validator.addMethod(
   "min_age",
   function (value) {
      let isValid = value > Number($("#nwpg1e1").val());

      return isValid;
   },
   "Age should be greater than current age"
);

$("#page1Form").validate({
   errorPlacement: function (error, element) {
      if (element.is("#nwpg1e1")) {
         error.appendTo("#error1");
      } else if (element.is("#nwpg1e2")) {
         error.appendTo("#error2");
      }
   },
   rules: {
      nwpg1e1: {
         required: true,
         digits: true,
         range: [18, 90],
      },
      nwpg1e2: {
         required: true,
         digits: true,
         range: [18, 90],
         min_age: true,
      },
   },
   messages: {
      nwpg1e1: {
         digits: "Please enter only positive integers",
      },
      nwpg1e2: {
         digits: "Please enter only positive integers",
      },
   },
});
$("#page2Form").validate({
   errorPlacement: function (error, element) {
      for (let i = 1; i <= 12; i++) {
         if (element.is(`#nwpg2r${i}c1`)) {
            error.appendTo(`#epg2r${i}c1`);
         }
      }
      for (let i = 1; i <= 12; i++) {
         if (element.is(`#nwpg2r${i}c2`)) {
            error.appendTo(`#epg2r${i}c2`);
         }
      }
   },
   rules: {
      nwpg2r1c1: {
         required: true,
         number: true,
         min: 1,
      },
      nwpg2r11c1: {
         required: true,
         number: true,
         min: 1,
      },
      nwpg2r10c1: {
         required: true,
         number: true,
         min: 1,
      },
      nwpg2r2c1: {
         number: true,
         min: 1,
      },
      nwpg2r3c1: {
         number: true,
         min: 1,
      },
      nwpg2r4c1: {
         number: true,
         min: 1,
      },
      nwpg2r5c1: {
         number: true,
         min: 1,
      },
      nwpg2r6c1: {
         number: true,
         min: 1,
      },
      nwpg2r7c1: {
         number: true,
         min: 1,
      },
      nwpg2r8c1: {
         number: true,
         min: 1,
      },
      nwpg2r9c1: {
         number: true,
         min: 1,
      },
      nwpg2r12c1: {
         number: true,
         min: 1,
      },

      nwpg2r1c2: {
         required: true,
         number: true,
         range: [0, 20],
      },
      nwpg2r11c2: {
         required: true,
         number: true,
         range: [0, 20],
      },
      nwpg2r10c2: {
         required: true,
         number: true,
         range: [0, 20],
      },
      nwpg2r2c2: {
         number: true,
         range: [0, 20],
      },
      nwpg2r3c2: {
         number: true,
         range: [0, 20],
      },
      nwpg2r4c2: {
         number: true,
         range: [0, 20],
      },
      nwpg2r5c2: {
         number: true,
         range: [0, 20],
      },
      nwpg2r6c2: {
         number: true,
         range: [0, 20],
      },
      nwpg2r7c2: {
         number: true,
         range: [0, 20],
      },
      nwpg2r8c2: {
         number: true,
         range: [0, 20],
      },
      nwpg2r9c2: {
         number: true,
         range: [0, 20],
      },
      nwpg2r12c2: {
         number: true,
         range: [0, 20],
      },
   },
});
$("#page3Form").validate({
   errorPlacement: function (error, element) {
      for (let i = 1; i <= 7; i++) {
         if (element.is(`#nwpg3r${i}c1`)) {
            error.appendTo(`#epg3r${i}c1`);
         }
      }
      for (let i = 1; i <= 7; i++) {
         if (element.is(`#nwpg3r${i}c2`)) {
            error.appendTo(`#epg3r${i}c2`);
         }
      }
   },
   rules: {
      nwpg3r1c1: {
         number: true,
         min: 0,
      },
      nwpg3r2c1: {
         number: true,
         min: 0,
      },
      nwpg3r3c1: {
         number: true,
         min: 0,
      },
      nwpg3r4c1: {
         number: true,
         min: 0,
      },
      nwpg3r5c1: {
         number: true,
         min: 0,
      },
      nwpg3r6c1: {
         number: true,
         min: 0,
      },
      nwpg3r7c1: {
         number: true,
         min: 0,
      },

      nwpg3r1c2: {
         number: true,
         range: [0, 20],
      },
      nwpg3r2c2: {
         number: true,
         range: [0, 20],
      },
      nwpg3r3c2: {
         number: true,
         range: [0, 20],
      },
      nwpg3r4c2: {
         number: true,
         range: [0, 20],
      },
      nwpg3r5c2: {
         number: true,
         range: [0, 20],
      },
      nwpg3r6c2: {
         number: true,
         range: [0, 20],
      },
      nwpg3r7c2: {
         number: true,
         range: [0, 20],
      },
   },
});

$("#nwRecalcForm").validate({
   errorPlacement: function (error, element) {
      for (let i = 1; i <= 12; i++) {
         if (element.is(`#nwresultp1r${i}c1`)) {
            error.appendTo(`#eresultp1r${i}c1`);
         }
         if (element.is(`#nwresultp1r${i}c2`)) {
            error.appendTo(`#eresultp1r${i}c2`);
         }
         if (element.is(`#nwresultp2r${i}c1`)) {
            error.appendTo(`#eresultp2r${i}c1`);
         }
         if (element.is(`#nwresultp2r${i}c2`)) {
            error.appendTo(`#eresultp2r${i}c2`);
         }
      }
   },
   rules: {
      nwresultp1r1c1: {
         required: true,
         number: true,
         min: 1,
      },
      nwresultp1r11c1: {
         required: true,
         number: true,
         min: 1,
      },
      nwresultp1r10c1: {
         required: true,
         number: true,
         min: 1,
      },
      nwresultp1r2c1: {
         number: true,
         min: 1,
      },
      nwresultp1r3c1: {
         number: true,
         min: 1,
      },
      nwresultp1r4c1: {
         number: true,
         min: 1,
      },
      nwresultp1r5c1: {
         number: true,
         min: 1,
      },
      nwresultp1r6c1: {
         number: true,
         min: 1,
      },
      nwresultp1r7c1: {
         number: true,
         min: 1,
      },
      nwresultp1r8c1: {
         number: true,
         min: 1,
      },
      nwresultp1r9c1: {
         number: true,
         min: 1,
      },
      nwresultp1r12c1: {
         number: true,
         min: 1,
      },

      nwresultp1r1c2: {
         required: true,
         number: true,
         range: [0, 20],
      },
      nwresultp1r11c2: {
         required: true,
         number: true,
         range: [0, 20],
      },
      nwresultp1r10c2: {
         required: true,
         number: true,
         range: [0, 20],
      },
      nwresultp1r2c2: {
         number: true,
         range: [0, 20],
      },
      nwresultp1r3c2: {
         number: true,
         range: [0, 20],
      },
      nwresultp1r4c2: {
         number: true,
         range: [0, 20],
      },
      nwresultp1r5c2: {
         number: true,
         range: [0, 20],
      },
      nwresultp1r6c2: {
         number: true,
         range: [0, 20],
      },
      nwresultp1r7c2: {
         number: true,
         range: [0, 20],
      },
      nwresultp1r8c2: {
         number: true,
         range: [0, 20],
      },
      nwresultp1r9c2: {
         number: true,
         range: [0, 20],
      },
      nwresultp1r12c2: {
         number: true,
         range: [0, 20],
      },

      // liabilities

      nwresultp2r1c1: {
         number: true,
         min: 0,
      },
      nwresultp2r2c1: {
         number: true,
         min: 0,
      },
      nwresultp2r3c1: {
         number: true,
         min: 0,
      },
      nwresultp2r4c1: {
         number: true,
         min: 0,
      },
      nwresultp2r5c1: {
         number: true,
         min: 0,
      },
      nwresultp2r6c1: {
         number: true,
         min: 0,
      },
      nwresultp2r7c1: {
         number: true,
         min: 0,
      },

      nwresultp2r1c2: {
         number: true,
         range: [0, 20],
      },
      nwresultp2r2c2: {
         number: true,
         range: [0, 20],
      },
      nwresultp2r3c2: {
         number: true,
         range: [0, 20],
      },
      nwresultp2r4c2: {
         number: true,
         range: [0, 20],
      },
      nwresultp2r5c2: {
         number: true,
         range: [0, 20],
      },
      nwresultp2r6c2: {
         number: true,
         range: [0, 20],
      },
      nwresultp2r7c2: {
         number: true,
         range: [0, 20],
      },
   },
});

function reCalculate() {
   $("#re-calc").on("click", () => {
      validateFormRecalc("#nwRecalcForm", 2);
      // storeRecalculate();
   });
}
