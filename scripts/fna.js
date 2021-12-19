"use strict";

//____ Objects and collections

let fna = {
   page1: [],
   page2: [],
   page3: [],
   page4: [],
   page5: [],
   results: [],
};

// default operations
// $(".download").hover(() => {
//    $(".pdf-load-screen").addClass("fade-in");
// });
// $('.print').on('click',()=>{
//    window.close()
// })

$(".download").on("click", () => {
   // if ($('#fnaRecalcForm').valid()) {
   $(".pdf-load-screen").addClass("fade-in");
   console.log("printing pdf");
   // window.open('fna_pdf.html','_blank')
   // let print_window = window.open('https://5dec-171-61-28-122.ngrok.io/fna_pdf.html','_blank')
   let print_window = window.open('https://okay-head.github.io/Wealthsurance-files/fna_pdf.html','_blank')
   
   // getPdf();


   // setTimeout(() => {
   //    print_window.close()
   // }, 5000);
   // }else{
   // console.log('trigger tooltip');
   // }
});

//_____ functions
function getPdf() {

   let url= window.location.href
   let url_string =  `https://v2.convertapi.com/convert/web/to/pdf?Secret=KKpF6ONL5EcXiwLY&Url=${url}&StoreFile=true&FileName=Financial_needs_Analysis&Zoom=1.4&PageSize=a4&MarginTop=3&MarginRight=0&MarginBottom=0&MarginLeft=0
   `

   $.ajax({
      type: "GET",
      url:url_string,
      success: (x) => {
         console.log(url_string);
         console.log(x);
         // console.log(x.Url);
         // $(".pdf-load-screen").removeClass("fade-in");
         window.open(x.Files[0].Url, "_self");
      },
      error: (e) => {
         console.log(e);
      },
   });
}

let t = undefined;

function pushToDatabase1(fna) {
   createSessionId();
   let [a, b, c] = fna.page1;
   b = b == "married" ? 1 : 2;
   let [d] = fna.page2;
   let [e, f, g] = fna.page3;
   let [h1 = 0, h2 = 0, h3 = 0] = fna.page4[0].credit;
   let [i1 = 0, i2 = 0, i3 = 0] = fna.page4[0].vehicle;
   let [j1 = 0, j2 = 0, j3 = 0] = fna.page4[0].student;
   let [k1 = 0, k2 = 0, k3 = 0] = fna.page4[0].bank;
   let [l1 = 0, l2 = 0, l3 = 0] = fna.page4[0].personal;
   let [m1 = 0, m2 = 0, m3 = 0] = fna.page4[0].others;

   let [n1 = 0, n2 = 0] = fna.page5[0].college;
   let [o1 = 0, o2 = 0] = fna.page5[0].medical;
   let [p1 = 0, p2 = 0] = fna.page5[0].planned;
   let [q1 = 0, q2 = 0] = fna.page5[0].financial;
   let [r1 = 0, r2 = 0] = fna.page5[0].others;

   let debt_input_total = fna.page4[0].total;
   let expense_input_total = fna.page5[0].total;

   let url_debt = {
      0: { type: 1, amount: h1, interest: h2, years: h3 },
      1: { type: 2, amount: i1, interest: i2, years: i3 },
      2: { type: 3, amount: j1, interest: j2, years: j3 },
      3: { type: 4, amount: k1, interest: k2, years: k3 },
      4: { type: 5, amount: l1, interest: l2, years: l3 },
      5: { type: 6, amount: m1, interest: m2, years: m3 },
   };

   let url_expenses = {
      0: { type: 1, amount: n1, years: n2 },
      1: { type: 2, amount: o1, years: o2 },
      2: { type: 3, amount: p1, years: p2 },
      3: { type: 4, amount: q1, years: q2 },
      4: { type: 5, amount: r1, years: r2 },
   };

   let debt_calc =
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

   let url_string = `https://wealthsurance.com/calculators/?calculator=fna&session_id=${session_id}&ip_address=${ip}&age=${a}&status=${b}&child_count=${c}&annual_income=${d}&mortgage={"amount":${e},"interest":${f},"years":${g}}&debt=${JSON.stringify(
      url_debt
   )}&expense=${JSON.stringify(
      url_expenses
   )}&debt_amount=${debt_total}&expense_amount=${expense_total}`;

   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         if (result.success) {
            localStorage.setItem("fna_result", JSON.stringify(result.amount));
            // console.log('inside success');
            // return 1;
            // t=1;
         } else {
            console.log(result + "request not successful");
            console.log("inside else");
            // return 0;
            // t=0;
         }
      },
      error: (error) => {
         console.log(error);
         // console.log('inside error');
         // return 0;
         // t=0;
      },
   });
   // return 1;
}
function updatePlaceholders(x) {
   switch (x) {
      case 1:
         const pg4 = JSON.parse(localStorage.getItem("fnapg4"));
         const pg5 = JSON.parse(localStorage.getItem("fnapg5"));

         let y = Object.values(pg4[0]);

         $(`#fnaresultp1r0e1`).val(y[0]);
         for (let i = 1; i <= 6; i++) {
            $(`#fnaresultp1r${i}e1`).val(y[i][0]);
            $(`#fnaresultp1r${i}e2`).val(y[i][1]);
            $(`#fnaresultp1r${i}e3`).val(y[i][2]);
         }

         let x = Object.values(pg5[0]);

         $(`#fnaresultp2r0e1`).val(x[0]);
         for (let i = 1; i <= 5; i++) {
            $(`#fnaresultp2r${i}e1`).val(x[i][0]);
            $(`#fnaresultp2r${i}e2`).val(x[i][1]);
         }

         break;

      //recalculate
      case 2:
         const debt = fna.results[0];
         const exp = fna.results[1];

         let a = Object.values(debt);

         $(`#fnaresultp1r0e1`).val(a[1]);
         for (let i = 1; i < 7; i++) {
            $(`#fnaresultp1r${i}e1`).val(a[i + 1][0]);
            $(`#fnaresultp1r${i}e2`).val(a[i + 1][1]);
            $(`#fnaresultp1r${i}e3`).val(a[i + 1][2]);
         }

         let b = Object.values(exp);

         $(`#fnaresultp2r0e1`).val(b[1]);
         for (let i = 1; i < 6; i++) {
            $(`#fnaresultp2r${i}e1`).val(b[i + 1][0]);
            $(`#fnaresultp2r${i}e2`).val(b[i + 1][1]);
         }
         break;
   }
}

function pushToDatabase2(fna) {
   createSessionId();
   // get a-g from localstorage
   let [a = 28, b = "married", c = 1] = JSON.parse(
      localStorage.getItem("fnapg1")
   );
   b = b == "married" ? 1 : 2;
   let [d] = JSON.parse(localStorage.getItem("fnapg2"));
   let [e, f, g] = JSON.parse(localStorage.getItem("fnapg3"));

   //debt
   let x1 = fna.results[0];
   let x2 = fna.results[1];
   let [h1, h2, h3] = x1.credit;
   let [i1, i2, i3] = x1.vehicle;
   let [j1, j2, j3] = x1.student;
   let [k1, k2, k3] = x1.bank;
   let [l1, l2, l3] = x1.personal;
   let [m1, m2, m3] = x1.others;

   //expenses
   let [n1, n2] = x2.college;
   let [o1, o2] = x2.medical;
   let [p1, p2] = x2.planned;
   let [q1, q2] = x2.financial;
   let [r1, r2] = x2.others;

   let debt_input_total = x1.total;
   let expense_input_total = x2.total;

   let url_debt = {
      0: { type: 1, amount: h1, interest: h2, years: h3 },
      1: { type: 2, amount: i1, interest: i2, years: i3 },
      2: { type: 3, amount: j1, interest: j2, years: j3 },
      3: { type: 4, amount: k1, interest: k2, years: k3 },
      4: { type: 5, amount: l1, interest: l2, years: l3 },
      5: { type: 6, amount: m1, interest: m2, years: m3 },
   };

   let url_expenses = {
      0: { type: 1, amount: n1, years: n2 },
      1: { type: 2, amount: o1, years: o2 },
      2: { type: 3, amount: p1, years: p2 },
      3: { type: 4, amount: q1, years: q2 },
      4: { type: 5, amount: r1, years: r2 },
   };

   let debt_calc =
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

   let url_string = `https://wealthsurance.com/calculators/?calculator=fna&session_id=${session_id}&ip_address=${ip}&age=${a}&status=${b}&child_count=${c}&annual_income=${d}&mortgage={"amount":${e},"interest":${f},"years":${g}}&debt=${JSON.stringify(
      url_debt
   )}&expense=${JSON.stringify(
      url_expenses
   )}&debt_amount=${debt_total}&expense_amount=${expense_total}`;

   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         if (result.success) {
            updateResult(2, result.amount);
         } else {
            console.log(result + "request not successful");
            let alert_text =
               "Cannot fetch data from the database. Please try again later \nWe are sorry for the inconvenience.";
            alert(alert_text);
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
         let amount1 = $.number(JSON.parse(localStorage.getItem("fna_result")));
         $(".calculated-result").text("$" + amount1);
         break;
      case 2:
         let amount2 = $.number(y);
         $(".calculated-result").text("$" + amount2);
         break;
   }
}

function page1LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("fnapg1") != null) {
      fna.page1 = JSON.parse(localStorage.getItem("fnapg1"));
      $("#fnapg1e1").val(fna.page1[0]);
      $("#fnapg1e2").val(fna.page1[1]);
      $("#fnapg1e3").val(fna.page1[2]);
   }

   //push to local storage
   $(".page1 :input").change(() => {
      if (localStorage.getItem("fnapg1") != null) {
         localStorage.removeItem("fnapg1");
         fna.page1 = [];
      }

      $(".next-btn").on("click", () => {
         fna.page1 = [];
         fna.page1.push($("#fnapg1e1").val());
         fna.page1.push($("#fnapg1e2").val());
         fna.page1.push($("#fnapg1e3").val());

         localStorage.setItem("fnapg1", JSON.stringify(fna.page1));
      });
   });
}

// --page2--
function page2LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("fnapg2") != null) {
      fna.page2 = JSON.parse(localStorage.getItem("fnapg2"));
      $("#fnapg2e1").val(fna.page2[0]);
   }
   //push to local storage
   $(".page2 :input").change(() => {
      if (localStorage.getItem("fnapg2") != null) {
         localStorage.removeItem("fnapg2");
         fna.page2 = [];
      }

      $(".next-btn,.prev-btn").on("click", () => {
         fna.page2 = [];
         fna.page2.push($("#fnapg2e1").val());
         localStorage.setItem("fnapg2", JSON.stringify(fna.page2));
      });
   });
}

//page3
function page3LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("fnapg3") != null) {
      fna.page3 = JSON.parse(localStorage.getItem("fnapg3"));
      $("#fnapg3e1").val(fna.page3[0]);
      $("#fnapg3e2").val(fna.page3[1]);
      $("#fnapg3e3").val(fna.page3[2]);
   }

   //push to local storage
   $(".page3 :input").change(() => {
      if (localStorage.getItem("fnapg3") != null) {
         localStorage.removeItem("fnapg3");
         fna.page3 = [];
      }

      $(".next-btn,.prev-btn").on("click", () => {
         fna.page3 = [];
         fna.page3.push($("#fnapg3e1").val());
         fna.page3.push($("#fnapg3e2").val());
         fna.page3.push($("#fnapg3e3").val());

         localStorage.setItem("fnapg3", JSON.stringify(fna.page3));
      });
   });
}

//table
function tableDown() {
   $("#fnapg4e1,#fnapg5e1").on("focus", () => {
      $(".table").slideDown(800);
   });
}

function tableUp() {
   // table glitch
   $(".next-btn,.prev-btn").on("click", () => {
      $(".table").slideUp();
   });
}

function page4LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("fnapg4") != null) {
      fna.page4 = JSON.parse(localStorage.getItem("fnapg4"));
      // console.log(fna.page4)
      let [z] = fna.page4;
      // console.log(z)
      setValue("#fnapg4e1", z.total);
      setValue("#fnapg4e2c1", z.credit[0]);
      setValue("#fnapg4e2c2", z.credit[1]);
      setValue("#fnapg4e2c3", z.credit[2]);

      setValue("#fnapg4e3c1", z.vehicle[0]);
      setValue("#fnapg4e3c2", z.vehicle[1]);
      setValue("#fnapg4e3c3", z.vehicle[2]);

      setValue("#fnapg4e4c1", z.student[0]);
      setValue("#fnapg4e4c2", z.student[1]);
      setValue("#fnapg4e4c3", z.student[2]);

      setValue("#fnapg4e5c1", z.bank[0]);
      setValue("#fnapg4e5c2", z.bank[1]);
      setValue("#fnapg4e5c3", z.bank[2]);

      setValue("#fnapg4e6c1", z.personal[0]);
      setValue("#fnapg4e6c2", z.personal[1]);
      setValue("#fnapg4e6c3", z.personal[2]);

      setValue("#fnapg4e7c1", z.others[0]);
      setValue("#fnapg4e7c2", z.others[1]);
      setValue("#fnapg4e7c3", z.others[2]);
   }

   //push to local storage
   $(".page4 :input").change(() => {
      if (localStorage.getItem("fnapg4") != null) {
         localStorage.removeItem("fnapg4");
         fna.page4 = [];
      }

      $(".next-btn,.prev-btn").on("click", () => {
         fna.page4 = [];

         const obj = {
            total: $("#fnapg4e1").val(),
            credit: [
               $("#fnapg4e2c1").val(),
               $("#fnapg4e2c2").val(),
               $("#fnapg4e2c3").val(),
            ],

            vehicle: [
               $("#fnapg4e3c1").val(),
               $("#fnapg4e3c2").val(),
               $("#fnapg4e3c3").val(),
            ],

            student: [
               $("#fnapg4e4c1").val(),
               $("#fnapg4e4c2").val(),
               $("#fnapg4e4c3").val(),
            ],

            bank: [
               $("#fnapg4e5c1").val(),
               $("#fnapg4e5c2").val(),
               $("#fnapg4e5c3").val(),
            ],

            personal: [
               $("#fnapg4e6c1").val(),
               $("#fnapg4e6c2").val(),
               $("#fnapg4e6c3").val(),
            ],

            others: [
               $("#fnapg4e7c1").val(),
               $("#fnapg4e7c2").val(),
               $("#fnapg4e7c3").val(),
            ],
         };

         fna.page4.push(obj);

         localStorage.setItem("fnapg4", JSON.stringify(fna.page4));
      });
   });

   //glitch push to local storage even when the input fields do not change, but are prefilled

   // if ($(':input').val()!=0) {
   //    $(".next-btn").on("click", () => {
   //       fna.page4 = [];

   //       const obj = {
   //          total: $("#fnapg4e1").val(),
   //          credit: [
   //             $("#fnapg4e2c1").val(),
   //             $("#fnapg4e2c2").val(),
   //             $("#fnapg4e2c3").val(),
   //          ],

   //          vehicle: [
   //             $("#fnapg4e3c1").val(),
   //             $("#fnapg4e3c2").val(),
   //             $("#fnapg4e3c3").val(),
   //          ],

   //          student: [
   //             $("#fnapg4e4c1").val(),
   //             $("#fnapg4e4c2").val(),
   //             $("#fnapg4e4c3").val(),
   //          ],

   //          bank: [
   //             $("#fnapg4e5c1").val(),
   //             $("#fnapg4e5c2").val(),
   //             $("#fnapg4e5c3").val(),
   //          ],

   //          personal: [
   //             $("#fnapg4e6c1").val(),
   //             $("#fnapg4e6c2").val(),
   //             $("#fnapg4e6c3").val(),
   //          ],

   //          others: [
   //             $("#fnapg4e7c1").val(),
   //             $("#fnapg4e7c2").val(),
   //             $("#fnapg4e7c3").val(),
   //          ],
   //       };

   //       fna.page4.push(obj);

   //       localStorage.setItem("fnapg4", JSON.stringify(fna.page4));
   //    });

   // }
}

//page 5
function page5LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("fnapg5") != null) {
      fna.page5 = JSON.parse(localStorage.getItem("fnapg5"));
      let [y] = fna.page5;
      setValue("#fnapg5e1", y.total);
      setValue("#fnapg5e2c1", y.college[0]);
      setValue("#fnapg5e2c3", y.college[1]);

      setValue("#fnapg5e3c1", y.medical[0]);
      setValue("#fnapg5e3c3", y.medical[1]);

      setValue("#fnapg5e4c1", y.planned[0]);
      setValue("#fnapg5e4c3", y.planned[1]);

      setValue("#fnapg5e5c1", y.financial[0]);
      setValue("#fnapg5e5c3", y.financial[1]);

      setValue("#fnapg5e6c1", y.others[0]);
      setValue("#fnapg5e6c3", y.others[1]);
   }

   //push to local storage
   $(".page5 :input").change(() => {
      if (localStorage.getItem("fnapg5") != null) {
         localStorage.removeItem("fnapg5");
         fna.page5 = [];
      }

      $(".next-btn,.prev-btn").on("click", () => {
         fna.page5 = [];

         const obj = {
            total: $("#fnapg5e1").val(),
            college: [$("#fnapg5e2c1").val(), $("#fnapg5e2c3").val()],

            medical: [$("#fnapg5e3c1").val(), $("#fnapg5e3c3").val()],

            planned: [$("#fnapg5e4c1").val(), $("#fnapg5e4c3").val()],

            financial: [$("#fnapg5e5c1").val(), $("#fnapg5e5c3").val()],

            others: [$("#fnapg5e6c1").val(), $("#fnapg5e6c3").val()],
         };
         fna.page5.push(obj);

         localStorage.setItem("fnapg5", JSON.stringify(fna.page5));

         // pushToDatabase1()
      });
   });
}

// function next() {
//    //  change next button's action
//    $(".next-btn").on("click", () => {
//       function loaderPromise() {
//          let update = new Promise((resolve) => {
//             resolve(updateLoader(5, 5));
//          });
//          return update;
//       }

//       loaderPromise().then(() => {
//          pushToDatabase1(fna);
//          setTimeout(() => {
//             window.open("fna_result.html", "_self");
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
      total: $("#fnaresultp1r0e1").val(),
      credit: [
         $("#fnaresultp1r1e1").val(),
         $("#fnaresultp1r1e2").val(),
         $("#fnaresultp1r1e3").val(),
      ],
      vehicle: [
         $("#fnaresultp1r2e1").val(),
         $("#fnaresultp1r2e2").val(),
         $("#fnaresultp1r2e3").val(),
      ],
      student: [
         $("#fnaresultp1r3e1").val(),
         $("#fnaresultp1r3e2").val(),
         $("#fnaresultp1r3e3").val(),
      ],
      bank: [
         $("#fnaresultp1r4e1").val(),
         $("#fnaresultp1r4e2").val(),
         $("#fnaresultp1r4e3").val(),
      ],
      personal: [
         $("#fnaresultp1r5e1").val(),
         $("#fnaresultp1r5e2").val(),
         $("#fnaresultp1r5e3").val(),
      ],
      others: [
         $("#fnaresultp1r6e1").val(),
         $("#fnaresultp1r6e2").val(),
         $("#fnaresultp1r6e3").val(),
      ],
   };

   let expenses = {
      label: "expenses",
      total: $("#fnaresultp2r0e1").val(),
      college: [$("#fnaresultp2r1e1").val(), $("#fnaresultp2r1e2").val()],
      medical: [$("#fnaresultp2r2e1").val(), $("#fnaresultp2r2e2").val()],
      planned: [$("#fnaresultp2r3e1").val(), $("#fnaresultp2r3e2").val()],
      financial: [$("#fnaresultp2r4e1").val(), $("#fnaresultp2r4e2").val()],
      others: [$("#fnaresultp2r5e1").val(), $("#fnaresultp2r5e2").val()],
   };
   fna.results = [];
   fna.results.push(debt);
   fna.results.push(expenses);

   pushToDatabase2(fna);
   // there's actually no need
   // updatePlaceholders(2)
}

/* ----- Validation -----*/

// Page1 validation
$("#page1Form").validate({
   // errorElement: "span#error1",
   errorPlacement: function (error, element) {
      if (element.is("#fnapg1e1")) {
         error.appendTo("#error1");
      } else if (element.is("#fnapg1e3")) {
         error.appendTo("#error3");
      }
   },
   rules: {
      fnapg1e1: {
         required: true,
         // integer:true,
         digits: true,
         range: [1, 90],
      },
      fnapg1e3: {
         required: true,
         // integer:true,
         digits: true,
         range: [0, 20],
         // maxlength: 1024
      },
   },
   messages: {
      fnapg1e1: {
         required: "Please enter your age",
         digits: "Please enter only positive integers",
      },
      //  fnapg1e2:
      //  {
      //    required: "Please enter your marital status."
      // },
      fnapg1e3: {
         required: "Please enter this information.",
         digits: "Please enter only positive integers",

         // maxlength: jQuery.format("Please limit the message to {0} letters!")
      },
   },
});

//page 2 validation
$("#page2Form").validate({
   errorPlacement: function (error) {
      error.appendTo("#error4");
   },
   rules: {
      fnapg2e1: {
         required: true,
         number: true,
         min: 1,
      },
   },
   messages: {
      fnapg2e1: {
         required: "Please enter your income",
         min: "Income should be greater than 0",
      },
   },
});

$("#page3Form").validate({
   errorPlacement: function (error, element) {
      if (element.is("#fnapg3e1")) {
         error.appendTo("#error3e1");
      } else if (element.is("#fnapg3e2")) {
         error.appendTo("#error3e2");
      } else if (element.is("#fnapg3e3")) {
         error.appendTo("#error3e3");
      }
   },
   rules: {
      fnapg3e1: {
         required: true,
         number: true,
         min: 0,
      },
      fnapg3e2: {
         required: true,
         number: true,
         range: [0, 100],
      },
      fnapg3e3: {
         required: true,
         number: true,
         range: [1, 45],
      },
   },
   messages: {
      fnapg3e1: {
         required: "This field is required",
         min: "Mortgage should be greater than 0",
         number: "Mortgage should be greater than 0",
      },
      fnapg3e2: {
         required: "This field is required",
         range: "Please enter a value between 0-100",
      },
      fnapg3e3: {
         required: "This field is required",
         digits: "Please enter only positive integers",
      },
   },
});

$("#page4Form").validate({
   errorPlacement: function (error, element) {
      if (element.is("#fnapg4e1")) {
         error.appendTo("#error4e1");
      }
      for (let i = 2; i <= 7; i++) {
         if (element.is(`#fnapg4e${i}c1`)) {
            error.appendTo(`#error4e${i}c1`);
         }
         if (element.is(`#fnapg4e${i}c2`)) {
            error.appendTo(`#error4e${i}c2`);
         }
         if (element.is(`#fnapg4e${i}c3`)) {
            error.appendTo(`#error4e${i}c3`);
         }
      }
   },
   rules: {
      fnapg4e1: {
         required: true,
         number: true,
         min: 0,
      },
      //  fnapg4e2c1,fnapg4e3c1,fnapg4e4c1,fnapg4e5c1,fnapg4e6c1,fnapg4e7c1: {number: true,min:1},

      fnapg4e2c1: { number: true, min: 1 },
      fnapg4e3c1: { number: true, min: 1 },
      fnapg4e4c1: { number: true, min: 1 },
      fnapg4e5c1: { number: true, min: 1 },
      fnapg4e6c1: { number: true, min: 1 },
      fnapg4e7c1: { number: true, min: 1 },

      fnapg4e2c2: { number: true, range: [0, 100] },
      fnapg4e3c2: { number: true, range: [0, 100] },
      fnapg4e4c2: { number: true, range: [0, 100] },
      fnapg4e5c2: { number: true, range: [0, 100] },
      fnapg4e6c2: { number: true, range: [0, 100] },
      fnapg4e7c2: { number: true, range: [0, 100] },

      fnapg4e2c3: { number: true, min: 1 },
      fnapg4e3c3: { number: true, min: 1 },
      fnapg4e4c3: { number: true, min: 1 },
      fnapg4e5c3: { number: true, min: 1 },
      fnapg4e6c3: { number: true, min: 1 },
      fnapg4e7c3: { number: true, min: 1 },
   },
   messages: {
      fnapg4e1: {
         required: "This field is required",
         min: "Debt cannot be negative",
      },
      fnapg4e2c1: { min: "Value should be greater than 0" },
      fnapg4e3c1: { min: "Value should be greater than 0" },
      fnapg4e4c1: { min: "Value should be greater than 0" },
      fnapg4e5c1: { min: "Value should be greater than 0" },
      fnapg4e6c1: { min: "Value should be greater than 0" },
      fnapg4e7c1: { min: "Value should be greater than 0" },

      fnapg4e2c2: { range: "Please enter a value between 0-100" },
      fnapg4e3c2: { range: "Please enter a value between 0-100" },
      fnapg4e4c2: { range: "Please enter a value between 0-100" },
      fnapg4e5c2: { range: "Please enter a value between 0-100" },
      fnapg4e6c2: { range: "Please enter a value between 0-100" },
      fnapg4e7c2: { range: "Please enter a value between 0-100" },

      fnapg4e2c3: { min: "Value should be greater than 0" },
      fnapg4e3c3: { min: "Value should be greater than 0" },
      fnapg4e4c3: { min: "Value should be greater than 0" },
      fnapg4e5c3: { min: "Value should be greater than 0" },
      fnapg4e6c3: { min: "Value should be greater than 0" },
      fnapg4e7c3: { min: "Value should be greater than 0" },
   },
});

$("#page5Form").validate({
   errorPlacement: function (error, element) {
      if (element.is("#fnapg5e1")) {
         error.appendTo("#error5e1");
      }
      for (let i = 2; i <= 6; i++) {
         if (element.is(`#fnapg5e${i}c1`)) {
            error.appendTo(`#error5e${i}c1`);
         }
         if (element.is(`#fnapg5e${i}c3`)) {
            error.appendTo(`#error5e${i}c3`);
         }
      }
   },
   rules: {
      fnapg5e1: {
         required: true,
         number: true,
         min: 0,
      },
      fnapg5e2c1: { number: true, min: 1 },
      fnapg5e3c1: { number: true, min: 1 },
      fnapg5e4c1: { number: true, min: 1 },
      fnapg5e5c1: { number: true, min: 1 },
      fnapg5e6c1: { number: true, min: 1 },

      fnapg5e2c3: { number: true, min: 0 },
      fnapg5e3c3: { number: true, min: 0 },
      fnapg5e4c3: { number: true, min: 0 },
      fnapg5e5c3: { number: true, min: 0 },
      fnapg5e6c3: { number: true, min: 0 },
   },
   messages: {
      fnapg5e1: {
         required: "This field is required",
         min: "Value cannot be negative",
      },
      fnapg5e2c1: { min: "Value should be greater than 0" },
      fnapg5e3c1: { min: "Value should be greater than 0" },
      fnapg5e4c1: { min: "Value should be greater than 0" },
      fnapg5e5c1: { min: "Value should be greater than 0" },
      fnapg5e6c1: { min: "Value should be greater than 0" },

      fnapg5e2c3: { min: "Value should be greater than 0" },
      fnapg5e3c3: { min: "Value should be greater than 0" },
      fnapg5e4c3: { min: "Value should be greater than 0" },
      fnapg5e5c3: { min: "Value should be greater than 0" },
      fnapg5e6c3: { min: "Value should be greater than 0" },
   },
});

$("#fnaRecalcForm").validate({
   errorPlacement: function (error, element) {
      if (element.is("#fnaresultp1r0e1")) {
         error.appendTo("#eresultp1r0e1");
      }
      if (element.is("#fnaresultp2r0e1")) {
         error.appendTo("#eresultp2r0e1");
      }
      for (let i = 1; i <= 6; i++) {
         if (element.is(`#fnaresultp1r${i}e1`)) {
            error.appendTo(`#eresultp1r${i}e1`);
         }
         if (element.is(`#fnaresultp1r${i}e2`)) {
            error.appendTo(`#eresultp1r${i}e2`);
         }
         if (element.is(`#fnaresultp1r${i}e3`)) {
            error.appendTo(`#eresultp1r${i}e3`);
         }
      }
      for (let i = 1; i <= 5; i++) {
         if (element.is(`#fnaresultp2r${i}e1`)) {
            error.appendTo(`#eresultp2r${i}e1`);
         }
         if (element.is(`#fnaresultp2r${i}e2`)) {
            error.appendTo(`#eresultp2r${i}e2`);
         }
      }
   },

   rules: {
      fnaresultp1r0e1: {
         required: true,
         number: true,
         min: 0,
      },
      fnaresultp1r1e1: { number: true, min: 1 },
      fnaresultp1r2e1: { number: true, min: 1 },
      fnaresultp1r3e1: { number: true, min: 1 },
      fnaresultp1r4e1: { number: true, min: 1 },
      fnaresultp1r5e1: { number: true, min: 1 },
      fnaresultp1r6e1: { number: true, min: 1 },

      fnaresultp1r1e2: { number: true, range: [0, 100] },
      fnaresultp1r2e2: { number: true, range: [0, 100] },
      fnaresultp1r3e2: { number: true, range: [0, 100] },
      fnaresultp1r4e2: { number: true, range: [0, 100] },
      fnaresultp1r5e2: { number: true, range: [0, 100] },
      fnaresultp1r6e2: { number: true, range: [0, 100] },

      fnaresultp1r1e3: { number: true, min: 1 },
      fnaresultp1r2e3: { number: true, min: 1 },
      fnaresultp1r3e3: { number: true, min: 1 },
      fnaresultp1r4e3: { number: true, min: 1 },
      fnaresultp1r5e3: { number: true, min: 1 },
      fnaresultp1r6e3: { number: true, min: 1 },

      // page2
      fnaresultp2r0e1: {
         required: true,
         number: true,
         min: 0,
      },

      fnaresultp2r1e1: { number: true, min: 1 },
      fnaresultp2r2e1: { number: true, min: 1 },
      fnaresultp2r3e1: { number: true, min: 1 },
      fnaresultp2r4e1: { number: true, min: 1 },
      fnaresultp2r5e1: { number: true, min: 1 },

      fnaresultp2r1e2: { number: true, min: 1 },
      fnaresultp2r2e2: { number: true, min: 1 },
      fnaresultp2r3e2: { number: true, min: 1 },
      fnaresultp2r4e2: { number: true, min: 1 },
      fnaresultp2r5e2: { number: true, min: 1 },
   },
   messages: {
      fnaresultp1r0e1: {
         min: "Debt cannot be negative",
      },
      fnaresultp2r0e1: {
         min: "Value cannot be negative",
      },
      fnaresultp1r1e1: { min: "Value should be greater than 0" },
      fnaresultp1r2e1: { min: "Value should be greater than 0" },
      fnaresultp1r3e1: { min: "Value should be greater than 0" },
      fnaresultp1r4e1: { min: "Value should be greater than 0" },
      fnaresultp1r5e1: { min: "Value should be greater than 0" },
      fnaresultp1r6e1: { min: "Value should be greater than 0" },

      fnaresultp1r1e2: { range: "Please enter a value between 0-100" },
      fnaresultp1r2e2: { range: "Please enter a value between 0-100" },
      fnaresultp1r3e2: { range: "Please enter a value between 0-100" },
      fnaresultp1r4e2: { range: "Please enter a value between 0-100" },
      fnaresultp1r5e2: { range: "Please enter a value between 0-100" },
      fnaresultp1r6e2: { range: "Please enter a value between 0-100" },

      fnaresultp1r1e3: { min: "Value should be greater than 0" },
      fnaresultp1r2e3: { min: "Value should be greater than 0" },
      fnaresultp1r3e3: { min: "Value should be greater than 0" },
      fnaresultp1r4e3: { min: "Value should be greater than 0" },
      fnaresultp1r5e3: { min: "Value should be greater than 0" },
      fnaresultp1r6e3: { min: "Value should be greater than 0" },

      // page2
      fnaresultp2r1e1: { min: "Value should be greater than 0" },
      fnaresultp2r2e1: { min: "Value should be greater than 0" },
      fnaresultp2r3e1: { min: "Value should be greater than 0" },
      fnaresultp2r4e1: { min: "Value should be greater than 0" },
      fnaresultp2r5e1: { min: "Value should be greater than 0" },

      fnaresultp2r1e2: { min: "Value should be greater than 0" },
      fnaresultp2r2e2: { min: "Value should be greater than 0" },
      fnaresultp2r3e2: { min: "Value should be greater than 0" },
      fnaresultp2r4e2: { min: "Value should be greater than 0" },
      fnaresultp2r5e2: { min: "Value should be greater than 0" },
   },
});

function validateForm(x) {
   if ($(`#page${x}Form`).valid()) {
      if (x !== 5) {
         if (x !== 4) {
            return mySiema.next();
         } else {
            tableUp();
            return mySiema.next();
         }
      } else if (x == 5) {
         // next()
         tableUp();
         nextPage();
      }
   }
   // else{
   //    doSomething(checkInvalid())
   // }
}

function nextPage() {
   function loaderPromise() {
      let update = new Promise((resolve) => {
         resolve(updateLoader(5, 5));
      });
      return update;
   }

   loaderPromise().then(() => {
      pushToDatabase1(fna); //should execute after page5 localStorage gets executed but works here as well
      setTimeout(() => {
         window.open("fna_result.html", "_self");
      }, 1410);

      // console.log(t);
      // if (t) {
      //    setTimeout(() => {
      //       // window.open("fna_result.html", "_self");
      //    }, 1410);
      // }else{
      //    let alert_text = 'Cannot fetch data from the database. Please try again later \nWe are sorry for the inconvenience.'
      //    alert(alert_text)
      // }
   });
}

function reCalculate() {
   $("#re-calc").on("click", () => {
      validateFormRecalc("#fnaRecalcForm", 3);
      // storeRecalculate();
   });
}
