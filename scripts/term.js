"use strict";

//____ Objects and collections

let te = {
   //te = term insurance
   page1: [],
   page2: [],
   page3: [],
   page2new:[],
   results: [],
};

//_____ functions

function pushToDatabase1(te) {
   createSessionId();
   let [a = 28, b = "married", c = 1] = te.page1;
   b = b == "married" ? 1 : 2;
   let d = te.page2new; 
   // let [d] = te.page2;
   // let [e, f, g] = te.page3;
   let [g1, g2, g3] = te.page2[0].mortgage;
   let [h1, h2, h3] = te.page2[0].credit;
   let [i1, i2, i3] = te.page2[0].vehicle;
   let [j1, j2, j3] = te.page2[0].student;
   let [k1, k2, k3] = te.page2[0].bank;
   let [l1, l2, l3] = te.page2[0].personal;
   let [m1, m2, m3] = te.page2[0].others;

   let [n1, n2] = te.page3[0].college;
   let [o1, o2] = te.page3[0].medical;
   let [p1, p2] = te.page3[0].planned;
   let [q1, q2] = te.page3[0].financial;
   let [r1, r2] = te.page3[0].others;

   let debt_input_total = te.page2[0].total;
   let expense_input_total = te.page3[0].total;

   let max_years = 30;

   // let arr = [
   //    Number(g3),
   //    Number(h3),
   //    Number(i3),
   //    Number(j3),
   //    Number(k3),
   //    Number(l3),
   //    Number(m3),
   // ];
   // let largest_no = arr[0];
   // arr.forEach((x) => {
   //    if (x > largest_no) {
   //       largest_no = x;
   //    }
   // });
   // max_years = largest_no;

   let url_debt = {
      0: { type: 1, amount: g1, interest: g2, years: g3 },
      1: { type: 2, amount: h1, interest: h2, years: h3 },
      2: { type: 3, amount: i1, interest: i2, years: i3 },
      3: { type: 4, amount: j1, interest: j2, years: j3 },
      4: { type: 5, amount: k1, interest: k2, years: k3 },
      5: { type: 6, amount: l1, interest: l2, years: l3 },
      6: { type: 7, amount: m1, interest: m2, years: m3 },
   };

   let url_expenses = {
      0: { type: 1, amount: n1, years: n2 },
      1: { type: 2, amount: o1, years: o2 },
      2: { type: 3, amount: p1, years: p2 },
      3: { type: 4, amount: q1, years: q2 },
      4: { type: 5, amount: r1, years: r2 },
   };

   let debt_calc =
      Number(g1) +
      Number(h1) +
      Number(i1) +
      Number(j1) +
      Number(k1) +
      Number(l1) +
      Number(m1);
   let expense_calc =
      Number(n1) + Number(o1) + Number(p1) + Number(q1) + Number(r1);

   let debt_total = debt_input_total > debt_calc ? debt_input_total : debt_calc;
   let expense_total =
      expense_input_total > expense_calc ? expense_input_total : expense_calc;

   let url_string = `https://wealthsurance.com/calculators/?calculator=term&session_id=${session_id}&ip_address=${ip}&age=${a}&status=${b}&child_count=${c}&annual_income=${d}&debt=${JSON.stringify(
      url_debt
   )}&expense=${JSON.stringify(
      url_expenses
   )}&debt_amount=${debt_total}&expense_amount=${expense_total}&year=${max_years}`;

   // console.log(url_string)
   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         // console.log(url_string);
         // console.log(x);
         let result = JSON.parse(x);
         localStorage.setItem("te_result", JSON.stringify(result));
      },
      error: (error) => {
         console.log(error);
      },
   });
}

function pushToDatabase2(te) {
   createSessionId();
   // get a-d from localstorage
   let [a = 28, b = "married", c = 1] = JSON.parse(
      localStorage.getItem("tepg1")
   );
   b = b == "married" ? 1 : 2;
   let d = JSON.parse(localStorage.getItem("tepg2new"));
   //debt
   let [g1, g2, g3] = te.results[0].mortgage;
   let [h1, h2, h3] = te.results[0].credit;
   let [i1, i2, i3] = te.results[0].vehicle;
   let [j1, j2, j3] = te.results[0].student;
   let [k1, k2, k3] = te.results[0].bank;
   let [l1, l2, l3] = te.results[0].personal;
   let [m1, m2, m3] = te.results[0].others;

   //expenses
   let [n1, n2] = te.results[1].college;
   let [o1, o2] = te.results[1].medical;
   let [p1, p2] = te.results[1].planned;
   let [q1, q2] = te.results[1].financial;
   let [r1, r2] = te.results[1].others;

   let debt_input_total = te.results[0].total;
   let expense_input_total = te.results[1].total;

   let max_years = 30;

   // let arr = [
   //    Number(g3),
   //    Number(h3),
   //    Number(i3),
   //    Number(j3),
   //    Number(k3),
   //    Number(l3),
   //    Number(m3),
   // ];
   // let largest_no = arr[0];
   // arr.forEach((x) => {
   //    if (x > largest_no) {
   //       largest_no = x;
   //    }
   // });
   // max_years = largest_no;

   let url_debt = {
      0: { type: 1, amount: g1, interest: g2, years: g3 },
      1: { type: 2, amount: h1, interest: h2, years: h3 },
      2: { type: 3, amount: i1, interest: i2, years: i3 },
      3: { type: 4, amount: j1, interest: j2, years: j3 },
      4: { type: 5, amount: k1, interest: k2, years: k3 },
      5: { type: 6, amount: l1, interest: l2, years: l3 },
      6: { type: 7, amount: m1, interest: m2, years: m3 },
   };

   let url_expenses = {
      0: { type: 1, amount: n1, years: n2 },
      1: { type: 2, amount: o1, years: o2 },
      2: { type: 3, amount: p1, years: p2 },
      3: { type: 4, amount: q1, years: q2 },
      4: { type: 5, amount: r1, years: r2 },
   };

   let debt_calc =
      Number(g1) +
      Number(h1) +
      Number(i1) +
      Number(j1) +
      Number(k1) +
      Number(l1) +
      Number(m1);
   let expense_calc =
      Number(n1) + Number(o1) + Number(p1) + Number(q1) + Number(r1);

   let debt_total = debt_input_total > debt_calc ? debt_input_total : debt_calc;
   let expense_total =
      expense_input_total > expense_calc ? expense_input_total : expense_calc;

   let url_string = `https://wealthsurance.com/calculators/?calculator=term&session_id=${session_id}&ip_address=${ip}&age=${a}&status=${b}&child_count=${c}&annual_income=${d}&debt=${JSON.stringify(
      url_debt
   )}&expense=${JSON.stringify(
      url_expenses
   )}&debt_amount=${debt_total}&expense_amount=${expense_total}&year=${max_years}`;

   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         updateResult(2, result.amount, result.year);
      },
      error: (error) => {
         console.log(error);
      },
   });
}

function updateResult(x, y = undefined, z = undefined) {
   switch (x) {
      case 1:
         let amount1 = $.number((JSON.parse(localStorage.getItem("te_result")).amount))
         $(".calculated-result").text("$" + amount1);
         $(".calculated-result-2").text(
            JSON.parse(localStorage.getItem("te_result")).year
         );
         break;
      case 2:
         let amount2 = $.number( y)
         $(".calculated-result").text("$" + amount2);
         $(".calculated-result-2").text(z);
         break;
   }
   // console.log(JSON.parse(localStorage.getItem('ann_result')))
}

function page1LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("tepg1") != null) {
      te.page1 = JSON.parse(localStorage.getItem("tepg1"));
      $("#tepg1e1").val(te.page1[0]);
      $("#tepg1e2").val(te.page1[1]);
      $("#tepg1e3").val(te.page1[2]);
   }

   //push to local storage
   $(".page1 :input").change(() => {
      if (localStorage.getItem("tepg1") != null) {
         localStorage.removeItem("tepg1");
         te.page1 = [];
      }

      $(".next-btn").one("click", () => {
         te.page1 = [];
         te.page1.push($("#tepg1e1").val());
         te.page1.push($("#tepg1e2").val());
         te.page1.push($("#tepg1e3").val());

         localStorage.setItem("tepg1", JSON.stringify(te.page1));
      });
   });
}
function page2newLocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("tepg2new") != null) {
      te.page2new = JSON.parse(localStorage.getItem("tepg2new"));
      $("#tepg2new").val(te.page2new[0]);
   }

   //push to local storage
   $(".page2 :input").change(() => {
      if (localStorage.getItem("tepg2new") != null) {
         localStorage.removeItem("tepg2new");
         te.page2new = [];
      }

      $(".next-btn,.prev-btn").one("click", () => {
         te.page2new = [];
         te.page2new.push($("#tepg2new").val());

         localStorage.setItem("tepg2new", JSON.stringify(te.page2new));
      });
   });
}

function tableDown() {
   $("#tepg2e1,#tepg3e1").on("focus", () => {
      $(".table").slideDown(800);
   });
}

function tableUp() {
   $(".next-btn,.prev-btn").on("click", () => {
      $(".table").slideUp();
   });
}

function page2LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("tepg2") != null) {
      te.page2 = JSON.parse(localStorage.getItem("tepg2"));
      let [z] = te.page2;
      setValue("#tepg2e1", z.total);
      setValue("#tepg2e2c1", z.mortgage[0]);
      setValue("#tepg2e2c2", z.mortgage[1]);
      setValue("#tepg2e2c3", z.mortgage[2]);

      setValue("#tepg2e3c1", z.credit[0]);
      setValue("#tepg2e3c2", z.credit[1]);
      setValue("#tepg2e3c3", z.credit[2]);

      setValue("#tepg2e4c1", z.vehicle[0]);
      setValue("#tepg2e4c2", z.vehicle[1]);
      setValue("#tepg2e4c3", z.vehicle[2]);

      setValue("#tepg2e5c1", z.student[0]);
      setValue("#tepg2e5c2", z.student[1]);
      setValue("#tepg2e5c3", z.student[2]);

      setValue("#tepg2e6c1", z.bank[0]);
      setValue("#tepg2e6c2", z.bank[1]);
      setValue("#tepg2e6c3", z.bank[2]);

      setValue("#tepg2e7c1", z.personal[0]);
      setValue("#tepg2e7c2", z.personal[1]);
      setValue("#tepg2e7c3", z.personal[2]);

      setValue("#tepg2e8c1", z.others[0]);
      setValue("#tepg2e8c2", z.others[1]);
      setValue("#tepg2e8c3", z.others[2]);
   }

   //push to local storage
   $(".page3 :input").change(() => {
      if (localStorage.getItem("tepg2") != null) {
         localStorage.removeItem("tepg2");
         te.page2 = [];
      }

      $(".next-btn,.prev-btn").one("click", () => {
         te.page2 = [];

         const obj = {
            total: $("#tepg2e1").val(),
            mortgage: [
               $("#tepg2e2c1").val(),
               $("#tepg2e2c2").val(),
               $("#tepg2e2c3").val(),
            ],

            credit: [
               $("#tepg2e3c1").val(),
               $("#tepg2e3c2").val(),
               $("#tepg2e3c3").val(),
            ],

            vehicle: [
               $("#tepg2e4c1").val(),
               $("#tepg2e4c2").val(),
               $("#tepg2e4c3").val(),
            ],

            student: [
               $("#tepg2e5c1").val(),
               $("#tepg2e5c2").val(),
               $("#tepg2e5c3").val(),
            ],

            bank: [
               $("#tepg2e6c1").val(),
               $("#tepg2e6c2").val(),
               $("#tepg2e6c3").val(),
            ],

            personal: [
               $("#tepg2e7c1").val(),
               $("#tepg2e7c2").val(),
               $("#tepg2e7c3").val(),
            ],

            others: [
               $("#tepg2e8c1").val(),
               $("#tepg2e8c2").val(),
               $("#tepg2e8c3").val(),
            ],
         };

         te.page2.push(obj);

         localStorage.setItem("tepg2", JSON.stringify(te.page2));
      });
   });
}

function page3LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("tepg3") != null) {
      te.page3 = JSON.parse(localStorage.getItem("tepg3"));
      // console.log(te.page3)
      let [y] = te.page3;
      // console.log(y)
      setValue("#tepg3e1", y.total);
      setValue("#tepg3e2c1", y.college[0]);
      setValue("#tepg3e2c2", y.college[1]);

      setValue("#tepg3e3c1", y.medical[0]);
      setValue("#tepg3e3c2", y.medical[1]);

      setValue("#tepg3e4c1", y.planned[0]);
      setValue("#tepg3e4c2", y.planned[1]);

      setValue("#tepg3e5c1", y.financial[0]);
      setValue("#tepg3e5c2", y.financial[1]);

      setValue("#tepg3e6c1", y.others[0]);
      setValue("#tepg3e6c2", y.others[1]);
   }

   //push to local storage
   $(".page4 :input").change(() => {
      if (localStorage.getItem("tepg3") != null) {
         localStorage.removeItem("tepg3");
         te.page3 = [];
      }

      $(".next-btn,.prev-btn").one("click", () => {
         te.page3 = [];

         const obj = {
            total: $("#tepg3e1").val(),
            college: [$("#tepg3e2c1").val(), $("#tepg3e2c2").val()],

            medical: [$("#tepg3e3c1").val(), $("#tepg3e3c2").val()],

            planned: [$("#tepg3e4c1").val(), $("#tepg3e4c2").val()],

            financial: [$("#tepg3e5c1").val(), $("#tepg3e5c2").val()],

            others: [$("#tepg3e6c1").val(), $("#tepg3e6c2").val()],
         };
         te.page3.push(obj);

         localStorage.setItem("tepg3", JSON.stringify(te.page3));
      });
   });
}

// function next() {
//    //  change next button's action
//    $(".next-btn").on("click", () => {
//       function loaderPromise() {
//          let update = new Promise((resolve) => {
//             resolve(updateLoader(3, 3));
//          });
//          return update;
//       }

//       loaderPromise().then(() => {
//          pushToDatabase1(te);
//          setTimeout(() => {
//             window.open("termInsurance_result.html", "_self");
//          }, 1410);
//       });
//    });

//    //change the functionality back when prev button is pressed
//    $(".prev-btn").on("click", () => {
//       $(".next-btn")
//          .text("Next")
//          .off()
//          .on("click", () => {
//             mySiema.next();
//          });
//    });
// }

function storeRecalculate() {
   //not to be stored in local storage
   let debt = {
      label: "debt",
      total: $("#teresultp1r0e1").val(),
      mortgage: [
         $("#teresultp1r1e1").val(),
         $("#teresultp1r1e2").val(),
         $("#teresultp1r1e3").val(),
      ],
      credit: [
         $("#teresultp1r2e1").val(),
         $("#teresultp1r2e2").val(),
         $("#teresultp1r2e3").val(),
      ],
      vehicle: [
         $("#teresultp1r3e1").val(),
         $("#teresultp1r3e2").val(),
         $("#teresultp1r3e3").val(),
      ],
      student: [
         $("#teresultp1r4e1").val(),
         $("#teresultp1r4e2").val(),
         $("#teresultp1r4e3").val(),
      ],
      bank: [
         $("#teresultp1r5e1").val(),
         $("#teresultp1r5e2").val(),
         $("#teresultp1r5e3").val(),
      ],
      personal: [
         $("#teresultp1r6e1").val(),
         $("#teresultp1r6e2").val(),
         $("#teresultp1r6e3").val(),
      ],
      others: [
         $("#teresultp1r7e1").val(),
         $("#teresultp1r7e2").val(),
         $("#teresultp1r7e3").val(),
      ],
   };

   let expenses = {
      label: "expenses",
      total: $("#teresultp2r0e1").val(),
      college: [$("#teresultp2r1e1").val(), $("#teresultp2r1e2").val()],
      medical: [$("#teresultp2r2e1").val(), $("#teresultp2r2e2").val()],
      planned: [$("#teresultp2r3e1").val(), $("#teresultp2r3e2").val()],
      financial: [$("#teresultp2r4e1").val(), $("#teresultp2r4e2").val()],
      others: [$("#teresultp2r5e1").val(), $("#teresultp2r5e2").val()],
   };
   te.results = [];
   te.results.push(debt);
   te.results.push(expenses);
   pushToDatabase2(te);
}

function reCalculate() {
   $("#re-calc").on("click", () => {
      validateFormRecalc('#teRecalcForm',2);
      // storeRecalculate();
   });
}

function updatePlaceholders(x) {
   switch (x) {
      case 1:
         const pg2 = JSON.parse(localStorage.getItem("tepg2"));
         const pg3 = JSON.parse(localStorage.getItem("tepg3"));

         let y = Object.values(pg2[0]);
         $(`#teresultp1r0e1`).val(y[0]);

         for (let i = 1; i <= 7; i++) {
            $(`#teresultp1r${i}e1`).val(y[i][0]);
            $(`#teresultp1r${i}e2`).val(y[i][1]);
            $(`#teresultp1r${i}e3`).val(y[i][2]);
         }

         let x = Object.values(pg3[0]);
         $(`#teresultp2r0e1`).val(x[0]);
         for (let i = 1; i <= 5; i++) {
            $(`#teresultp2r${i}e1`).val(x[i][0]);
            $(`#teresultp2r${i}e2`).val(x[i][1]);
         }

         break;

      //recalculate
      // case 2:
      //    for (let i = 1; i <= 4; i++) {
      //       $("#refiresulte" + i).attr(
      //          "placeholder",
      //          Object.values(refi.results[0])[i]
      //       );
      //    }
      //    for (let i = 5; i <= 10; i++) {
      //       $("#refiresulte" + (i + 1)).attr(
      //          "placeholder",
      //          Object.values(refi.results[0])[i]
      //       );
      //    }
      //    break;
   }
}

function nextPage() {
   function loaderPromise() {
      let update = new Promise((resolve) => {
         resolve(updateLoader(4, 4));
      });
      return update;
   }

   loaderPromise().then(() => {
      pushToDatabase1(te);
      setTimeout(() => {
         window.open("termInsurance_result.html", "_self");
      }, 1410);
   });
}

/* ---------- Validation ---------- */

$("#page1Form").validate({
   errorPlacement: function (error, element) {
      if (element.is("#tepg1e1")) {
         error.appendTo("#error1e1");
      } else if (element.is("#tepg1e3")) {
         error.appendTo("#error1e3");
      }
   },
   rules: {
      tepg1e1: {
         required: true,
         digits: true,
         range: [1, 90],
      },
      tepg1e3: {
         required: true,
         digits: true,
         range: [0, 20],
      },
   },
   messages: {
      tepg1e1: {
         required: "Please enter your age",
         digits: "Please enter only positive integers",
      },
      tepg1e3: {
         required: "Please enter this information.",
         digits: "Please enter only positive integers",
      },
   },
});

$("#page2Form").validate({
   errorPlacement: function (error) {
      error.appendTo("#error2newe1");
   },
   rules: {
      tepg2new: {
         required: true,
         number:true,
         min:1,
      },
   },
   messages: {
      tepg2new: {
         required: "Please enter your income",
         min: "Income should be greater than 0"
      },
   },
});

$("#page3Form").validate({
   errorPlacement: function (error, element) {
      if (element.is("#tepg2e1")) {
         error.appendTo("#error2e1");
      }
      for (let i = 2; i <= 8; i++) {
         if (element.is(`#tepg2e${i}c1`)) {
            error.appendTo(`#error2e${i}c1`);
         }
      }
      for (let i = 2; i <= 8; i++) {
         if (element.is(`#tepg2e${i}c2`)) {
            error.appendTo(`#error2e${i}c2`);
         }
      }
      for (let i = 2; i <= 8; i++) {
         if (element.is(`#tepg2e${i}c3`)) {
            error.appendTo(`#error2e${i}c3`);
         }
      }
   },
   rules: {
      tepg2e1: {
          required: true,
          number: true,
          min:0
       },
      
       tepg2e2c1: {number: true,min:1},
       tepg2e3c1: {number: true,min:1},
       tepg2e4c1: {number: true,min:1},
       tepg2e5c1: {number: true,min:1},
       tepg2e6c1: {number: true,min:1},
       tepg2e7c1: {number: true,min:1},
       tepg2e8c1: {number: true,min:1},
       
       tepg2e2c2: {number: true,range:[0,100]},
       tepg2e3c2: {number: true,range:[0,100]},
       tepg2e4c2: {number: true,range:[0,100]},
       tepg2e5c2: {number: true,range:[0,100]},
       tepg2e6c2: {number: true,range:[0,100]},
       tepg2e7c2: {number: true,range:[0,100]},
       tepg2e8c2: {number: true,range:[0,100]},
       
       tepg2e2c3: {number: true,min:1},
       tepg2e3c3: {number: true,min:1},
       tepg2e4c3: {number: true,min:1},
       tepg2e5c3: {number: true,min:1},
       tepg2e6c3: {number: true,min:1},
       tepg2e7c3: {number: true,min:1},
       tepg2e8c3: {number: true,min:1},
   },
   messages: {
      tepg2e1: {
          required: "This field is required" ,
          min: "Debt cannot be negative",
   },
   tepg2e2c1:{min:"Value should be greater than 0"},
   tepg2e3c1:{min:"Value should be greater than 0"},
   tepg2e4c1:{min:"Value should be greater than 0"},
   tepg2e5c1:{min:"Value should be greater than 0"},
   tepg2e6c1:{min:"Value should be greater than 0"},
   tepg2e7c1:{min:"Value should be greater than 0"},
   tepg2e8c1:{min:"Value should be greater than 0"},

   tepg2e2c2:{range:"Please enter a value between 0-100"},
   tepg2e3c2:{range:"Please enter a value between 0-100"},
   tepg2e4c2:{range:"Please enter a value between 0-100"},
   tepg2e5c2:{range:"Please enter a value between 0-100"},
   tepg2e6c2:{range:"Please enter a value between 0-100"},
   tepg2e7c2:{range:"Please enter a value between 0-100"},
   tepg2e8c2:{range:"Please enter a value between 0-100"},

   tepg2e2c3:{min:"Value should be greater than 0"},
   tepg2e3c3:{min:"Value should be greater than 0"},
   tepg2e4c3:{min:"Value should be greater than 0"},
   tepg2e5c3:{min:"Value should be greater than 0"},
   tepg2e6c3:{min:"Value should be greater than 0"},
   tepg2e7c3:{min:"Value should be greater than 0"},
   tepg2e8c3:{min:"Value should be greater than 0"},
   },
});

$("#page4Form").validate({
   errorPlacement: function (error, element) {
      if (element.is("#tepg3e1")) {
         error.appendTo("#error3e1");
      }
      for (let i = 2; i <= 6; i++) {
         if (element.is(`#tepg3e${i}c1`)) {
            error.appendTo(`#error3e${i}c1`);
         }
      }
      for (let i = 2; i <= 6; i++) {
         if (element.is(`#tepg3e${i}c2`)) {
            error.appendTo(`#error3e${i}c2`);
         }
      }
      for (let i = 2; i <= 6; i++) {
         if (element.is(`#tepg3e${i}c3`)) {
            error.appendTo(`#error3e${i}c3`);
         }
      }
   },
   rules: {
      tepg3e1: {
          required: true,
          number: true,
          min:0
       },
      
       tepg3e2c1: {number: true,min:1},
       tepg3e3c1: {number: true,min:1},
       tepg3e4c1: {number: true,min:1},
       tepg3e5c1: {number: true,min:1},
       tepg3e6c1: {number: true,min:1},
       
       tepg3e2c2: {number: true,min:1},
       tepg3e3c2: {number: true,min:1},
       tepg3e4c2: {number: true,min:1},
       tepg3e5c2: {number: true,min:1},
       tepg3e6c2: {number: true,min:1},
   },
   messages: {
      tepg3e1: {
          required: "This field is required" ,
          min: "Value cannot be negative",
   },
   tepg3e2c1:{min:"Value should be greater than 0"},
   tepg3e3c1:{min:"Value should be greater than 0"},
   tepg3e4c1:{min:"Value should be greater than 0"},
   tepg3e5c1:{min:"Value should be greater than 0"},
   tepg3e6c1:{min:"Value should be greater than 0"},

   tepg3e2c2:{min:"Value should be greater than 0"},
   tepg3e3c2:{min:"Value should be greater than 0"},
   tepg3e4c2:{min:"Value should be greater than 0"},
   tepg3e5c2:{min:"Value should be greater than 0"},
   tepg3e6c2:{min:"Value should be greater than 0"},
   },
});


function validateForm(x) {
   if ($(`#page${x}Form`).valid()) {
      if (x !== 4) {
         if (x!==3) {
            return mySiema.next();
            // tableUp();
         }else{
            tableUp()
            return mySiema.next();

         }
      } else if (x == 4) {
         // next()
         tableUp();
         nextPage();
      }
   }
}

$('#teRecalcForm').validate({
   errorPlacement: function (error, element) {
      if (element.is("#teresultp1r0e1")) {
         error.appendTo("#eresultp1r0e1");
      }
      if (element.is("#teresultp2r0e1")) {
         error.appendTo("#eresultp2r0e1");
      }
      for (let i = 1; i <= 7; i++) {
         if (element.is(`#teresultp1r${i}e1`)) {
            error.appendTo(`#eresultp1r${i}e1`);
         }
         if (element.is(`#teresultp1r${i}e2`)) {
            error.appendTo(`#eresultp1r${i}e2`);
         }
         if (element.is(`#teresultp1r${i}e3`)) {
            error.appendTo(`#eresultp1r${i}e3`);
         }
      }
      for (let i = 1; i <= 5; i++) {
         if (element.is(`#teresultp2r${i}e1`)) {
            error.appendTo(`#eresultp2r${i}e1`);
         }
         if (element.is(`#teresultp2r${i}e2`)) {
            error.appendTo(`#eresultp2r${i}e2`);
         }
      }
   },

   rules: {
      teresultp1r0e1: { 
         required: true,
          number: true,
          min:0
      },
      teresultp1r1e1: {number: true,min:1},
      teresultp1r2e1: {number: true,min:1},
      teresultp1r3e1: {number: true,min:1},
      teresultp1r4e1: {number: true,min:1},
      teresultp1r5e1: {number: true,min:1},
      teresultp1r6e1: {number: true,min:1},
      teresultp1r7e1: {number: true,min:1},
      
      teresultp1r1e2: {number: true,range:[0,100]},
      teresultp1r2e2: {number: true,range:[0,100]},
      teresultp1r3e2: {number: true,range:[0,100]},
      teresultp1r4e2: {number: true,range:[0,100]},
      teresultp1r5e2: {number: true,range:[0,100]},
      teresultp1r6e2: {number: true,range:[0,100]},
      teresultp1r7e2: {number: true,range:[0,100]},
      
      teresultp1r1e3: {number: true,min:1},
      teresultp1r2e3: {number: true,min:1},
      teresultp1r3e3: {number: true,min:1},
      teresultp1r4e3: {number: true,min:1},
      teresultp1r5e3: {number: true,min:1},
      teresultp1r6e3: {number: true,min:1},
      teresultp1r7e3: {number: true,min:1},


      // page2
      teresultp2r0e1: { 
         required: true,
          number: true,
          min:0
      },

      teresultp2r1e1: {number: true,min:1},
      teresultp2r2e1: {number: true,min:1},
      teresultp2r3e1: {number: true,min:1},
      teresultp2r4e1: {number: true,min:1},
      teresultp2r5e1: {number: true,min:1},

      teresultp2r1e2: {number: true,min:1},
      teresultp2r2e2: {number: true,min:1},
      teresultp2r3e2: {number: true,min:1},
      teresultp2r4e2: {number: true,min:1},
      teresultp2r5e2: {number: true,min:1},

   },
   messages: {
      teresultp1r0e1:{
         min: "Debt cannot be negative"
      },
      teresultp2r0e1:{
         min: "Value cannot be negative"
      },
   teresultp1r1e1:{min:"Value should be greater than 0"},
   teresultp1r2e1:{min:"Value should be greater than 0"},
   teresultp1r3e1:{min:"Value should be greater than 0"},
   teresultp1r4e1:{min:"Value should be greater than 0"},
   teresultp1r5e1:{min:"Value should be greater than 0"},
   teresultp1r6e1:{min:"Value should be greater than 0"},
   teresultp1r7e1:{min:"Value should be greater than 0"},

   teresultp1r1e2:{range:"Please enter a value between 0-100"},
   teresultp1r2e2:{range:"Please enter a value between 0-100"},
   teresultp1r3e2:{range:"Please enter a value between 0-100"},
   teresultp1r4e2:{range:"Please enter a value between 0-100"},
   teresultp1r5e2:{range:"Please enter a value between 0-100"},
   teresultp1r6e2:{range:"Please enter a value between 0-100"},
   teresultp1r7e2:{range:"Please enter a value between 0-100"},

   teresultp1r1e3:{min:"Value should be greater than 0"},
   teresultp1r2e3:{min:"Value should be greater than 0"},
   teresultp1r3e3:{min:"Value should be greater than 0"},
   teresultp1r4e3:{min:"Value should be greater than 0"},
   teresultp1r5e3:{min:"Value should be greater than 0"},
   teresultp1r6e3:{min:"Value should be greater than 0"},
   teresultp1r7e3:{min:"Value should be greater than 0"},

   // page2
   teresultp2r1e1:{min:"Value should be greater than 0"},
   teresultp2r2e1:{min:"Value should be greater than 0"},
   teresultp2r3e1:{min:"Value should be greater than 0"},
   teresultp2r4e1:{min:"Value should be greater than 0"},
   teresultp2r5e1:{min:"Value should be greater than 0"},

   teresultp2r1e2:{min:"Value should be greater than 0"},
   teresultp2r2e2:{min:"Value should be greater than 0"},
   teresultp2r3e2:{min:"Value should be greater than 0"},
   teresultp2r4e2:{min:"Value should be greater than 0"},
   teresultp2r5e2:{min:"Value should be greater than 0"},
   }

});




