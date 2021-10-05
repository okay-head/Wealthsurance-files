"use strict";
//functions
function page1LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("tepg1") != null) {
      te.page1 = JSON.parse(localStorage.getItem("tepg1"));
      $("#tepg1e1").val(te.page1[0]);
      $("#tepg1e2").val(te.page1[1]);
      $("#tepg1e3").val(te.page1[2]);
   }

   //push to local storage
   $(":input").change(() => {
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

function table() {
   $("#tepg2e1,#tepg3e1").keyup(() => {
      $(".table").slideDown(800);
   });

   // table glitch
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
   $(":input").change(() => {
      if (localStorage.getItem("tepg2") != null) {
         localStorage.removeItem("tepg2");
         te.page2 = [];
      }

      $(".next-btn").one("click", () => {
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
      setValue("#tepg3e2c3", y.college[2]);

      setValue("#tepg3e3c1", y.medical[0]);
      setValue("#tepg3e3c2", y.medical[1]);
      setValue("#tepg3e3c3", y.medical[2]);

      setValue("#tepg3e4c1", y.planned[0]);
      setValue("#tepg3e4c2", y.planned[1]);
      setValue("#tepg3e4c3", y.planned[2]);

      setValue("#tepg3e5c1", y.financial[0]);
      setValue("#tepg3e5c2", y.financial[1]);
      setValue("#tepg3e5c3", y.financial[2]);

      setValue("#tepg3e6c1", y.others[0]);
      setValue("#tepg3e6c2", y.others[1]);
      setValue("#tepg3e6c3", y.others[2]);
   }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("tepg3") != null) {
         localStorage.removeItem("tepg3");
         te.page3 = [];
      }

      $(".next-btn").one("click", () => {
         te.page3 = [];

         const obj = {
            total: $("#tepg3e1").val(),
            college: [
               $("#tepg3e2c1").val(),
               $("#tepg3e2c2").val(),
               $("#tepg3e2c3").val(),
            ],

            medical: [
               $("#tepg3e3c1").val(),
               $("#tepg3e3c2").val(),
               $("#tepg3e3c3").val(),
            ],

            planned: [
               $("#tepg3e4c1").val(),
               $("#tepg3e4c2").val(),
               $("#tepg3e4c3").val(),
            ],

            financial: [
               $("#tepg3e5c1").val(),
               $("#tepg3e5c2").val(),
               $("#tepg3e5c3").val(),
            ],

            others: [
               $("#tepg3e6c1").val(),
               $("#tepg3e6c2").val(),
               $("#tepg3e6c3").val(),
            ],
         };
         te.page3.push(obj);

         localStorage.setItem("tepg3", JSON.stringify(te.page3));
      });
   });
}

function next() {
   //  change next button's action
   $(".next-btn").on("click", () => {
      function loaderPromise() {
         let update = new Promise((resolve) => {
            resolve(updateLoader(3, 3));
         });

         //----- @prasad -----
         function pushToDatabase() {
            console.log(te);
         }
         // ------------------

         return update;
      }

      loaderPromise().then(() => {
         setTimeout(() => {
            window.open("termInsurance_result.html", "_self");
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
      college: [
         $("#teresultp2r1e1").val(),
         $("#teresultp2r1e2").val(),
         $("#teresultp2r1e3").val(),
      ],
      medical: [
         $("#teresultp2r2e1").val(),
         $("#teresultp2r2e2").val(),
         $("#teresultp2r2e3").val(),
      ],
      planned: [
         $("#teresultp2r3e1").val(),
         $("#teresultp2r3e2").val(),
         $("#teresultp2r3e3").val(),
      ],
      financial: [
         $("#teresultp2r4e1").val(),
         $("#teresultp2r4e2").val(),
         $("#teresultp2r4e3").val(),
      ],
      others: [
         $("#teresultp2r5e1").val(),
         $("#teresultp2r5e2").val(),
         $("#teresultp2r5e3").val(),
      ],
   };

   te.results.push(debt);
   te.results.push(expenses);
}

function reCalculate() {
   // ---@error check ---

   $("#re-calc").on("click", () => {
      storeRecalculate();

      // @prasad push to database
      console.log(te.results);

      // more actions
   });
}

//____ Objects and collections

let te = {
   //te = term insurance
   page1: [],
   page2: [],
   page3: [],
   results: [],
};

//global actions

// ____ on page load actions

// function gotoPage(page) {
//    $(() => {
//       switch (page) {
//          // ________ page 1 ___________
//          case 1:
//             //initialize loader
//             initLoader();

//             //check for existing localStorage on page load
//             if (localStorage.getItem("tepg1") != null) {
//                te.page1 = JSON.parse(localStorage.getItem("tepg1"));
//                $("#tepg1e1").val(te.page1[0]);
//                $("#tepg1e2").val(te.page1[1]);
//                $("#tepg1e3").val(te.page1[2]);
//             }

//             //push to local storage
//             $(":input").change(() => {
//                if (localStorage.getItem("tepg1") != null) {
//                   localStorage.removeItem("tepg1");
//                   te.page1 = [];
//                }

//                $(".next-btn").one("click", () => {
//                   te.page1 = [];
//                   te.page1.push($("#tepg1e1").val());
//                   te.page1.push($("#tepg1e2").val());
//                   te.page1.push($("#tepg1e3").val());

//                   localStorage.setItem("tepg1", JSON.stringify(te.page1));
//                });
//             });

//             break;

//          // ________ page 2 ___________
//          case 2:
//             updateLoader(1, 3);
//             $("#tepg2e1").keyup(() => {
//                $(".table").slideDown(800);
//             });

//             // table glitch
//             $(".next-btn").on("click", () => {
//                $(".table").slideUp();
//             });
//             $(".prev-btn").on("click", () => {
//                $(".table").slideUp();
//             });

//             // localStorage

//             //check for existing localStorage on page load
//             if (localStorage.getItem("tepg2") != null) {
//                te.page2 = JSON.parse(localStorage.getItem("tepg2"));
//                // console.log(te.page4)
//                let [z] = te.page2;
//                // console.log(z)
//                setValue("#tepg2e1", z.total);
//                setValue("#tepg2e2c1", z.mortgage[0]);
//                setValue("#tepg2e2c2", z.mortgage[1]);
//                setValue("#tepg2e2c3", z.mortgage[2]);

//                setValue("#tepg2e3c1", z.credit[0]);
//                setValue("#tepg2e3c2", z.credit[1]);
//                setValue("#tepg2e3c3", z.credit[2]);

//                setValue("#tepg2e4c1", z.vehicle[0]);
//                setValue("#tepg2e4c2", z.vehicle[1]);
//                setValue("#tepg2e4c3", z.vehicle[2]);

//                setValue("#tepg2e5c1", z.student[0]);
//                setValue("#tepg2e5c2", z.student[1]);
//                setValue("#tepg2e5c3", z.student[2]);

//                setValue("#tepg2e6c1", z.bank[0]);
//                setValue("#tepg2e6c2", z.bank[1]);
//                setValue("#tepg2e6c3", z.bank[2]);

//                setValue("#tepg2e7c1", z.personal[0]);
//                setValue("#tepg2e7c2", z.personal[1]);
//                setValue("#tepg2e7c3", z.personal[2]);

//                setValue("#tepg2e8c1", z.others[0]);
//                setValue("#tepg2e8c2", z.others[1]);
//                setValue("#tepg2e8c3", z.others[2]);
//             }

//             //push to local storage
//             $(":input").change(() => {
//                if (localStorage.getItem("tepg2") != null) {
//                   localStorage.removeItem("tepg2");
//                   te.page2 = [];
//                }

//                $(".next-btn").one("click", () => {
//                   te.page2 = [];

//                   const obj = {
//                      total: $("#tepg2e1").val(),
//                      mortgage: [
//                         $("#tepg2e2c1").val(),
//                         $("#tepg2e2c2").val(),
//                         $("#tepg2e2c3").val(),
//                      ],

//                      credit: [
//                         $("#tepg2e3c1").val(),
//                         $("#tepg2e3c2").val(),
//                         $("#tepg2e3c3").val(),
//                      ],

//                      vehicle: [
//                         $("#tepg2e4c1").val(),
//                         $("#tepg2e4c2").val(),
//                         $("#tepg2e4c3").val(),
//                      ],

//                      student: [
//                         $("#tepg2e5c1").val(),
//                         $("#tepg2e5c2").val(),
//                         $("#tepg2e5c3").val(),
//                      ],

//                      bank: [
//                         $("#tepg2e6c1").val(),
//                         $("#tepg2e6c2").val(),
//                         $("#tepg2e6c3").val(),
//                      ],

//                      personal: [
//                         $("#tepg2e7c1").val(),
//                         $("#tepg2e7c2").val(),
//                         $("#tepg2e7c3").val(),
//                      ],

//                      others: [
//                         $("#tepg2e8c1").val(),
//                         $("#tepg2e8c2").val(),
//                         $("#tepg2e8c3").val(),
//                      ],
//                   };

//                   te.page2.push(obj);

//                   localStorage.setItem("tepg2", JSON.stringify(te.page2));
//                });
//             });
//             break;

//          // ________ page 5 ___________
//          case 3:
//             updateLoader(2, 3);
//             $("#tepg3e1").keyup(() => {
//                $(".table").slideDown(800);
//             });

//             // table glitch
//             $(".next-btn").on("click", () => {
//                $(".table").slideUp();
//             });
//             $(".prev-btn").on("click", () => {
//                $(".table").slideUp();
//             });

//             // localStorage

//             //check for existing localStorage on page load
//             if (localStorage.getItem("tepg3") != null) {
//                te.page3 = JSON.parse(localStorage.getItem("tepg3"));
//                // console.log(te.page3)
//                let [y] = te.page3;
//                // console.log(y)
//                setValue("#tepg3e1", y.total);
//                setValue("#tepg3e2c1", y.college[0]);
//                setValue("#tepg3e2c2", y.college[1]);
//                setValue("#tepg3e2c3", y.college[2]);

//                setValue("#tepg3e3c1", y.medical[0]);
//                setValue("#tepg3e3c2", y.medical[1]);
//                setValue("#tepg3e3c3", y.medical[2]);

//                setValue("#tepg3e4c1", y.planned[0]);
//                setValue("#tepg3e4c2", y.planned[1]);
//                setValue("#tepg3e4c3", y.planned[2]);

//                setValue("#tepg3e5c1", y.financial[0]);
//                setValue("#tepg3e5c2", y.financial[1]);
//                setValue("#tepg3e5c3", y.financial[2]);

//                setValue("#tepg3e6c1", y.others[0]);
//                setValue("#tepg3e6c2", y.others[1]);
//                setValue("#tepg3e6c3", y.others[2]);
//             }

//             //push to local storage
//             $(":input").change(() => {
//                if (localStorage.getItem("tepg3") != null) {
//                   localStorage.removeItem("tepg3");
//                   te.page3 = [];
//                }

//                $(".next-btn").one("click", () => {
//                   te.page3 = [];

//                   const obj = {
//                      total: $("#tepg3e1").val(),
//                      college: [
//                         $("#tepg3e2c1").val(),
//                         $("#tepg3e2c2").val(),
//                         $("#tepg3e2c3").val(),
//                      ],

//                      medical: [
//                         $("#tepg3e3c1").val(),
//                         $("#tepg3e3c2").val(),
//                         $("#tepg3e3c3").val(),
//                      ],

//                      planned: [
//                         $("#tepg3e4c1").val(),
//                         $("#tepg3e4c2").val(),
//                         $("#tepg3e4c3").val(),
//                      ],

//                      financial: [
//                         $("#tepg3e5c1").val(),
//                         $("#tepg3e5c2").val(),
//                         $("#tepg3e5c3").val(),
//                      ],

//                      others: [
//                         $("#tepg3e6c1").val(),
//                         $("#tepg3e6c2").val(),
//                         $("#tepg3e6c3").val(),
//                      ],
//                   };
//                   te.page3.push(obj);

//                   localStorage.setItem("tepg3", JSON.stringify(te.page3));
//                });
//             });

//             //  change next button's action
//             $(".next-btn").on("click", () => {
//                function loaderPromise() {
//                   let update = new Promise((resolve) => {
//                      resolve(updateLoader(3, 3));
//                   });

//                   //----- @prasad -----
//                   function pushToDatabase() {
//                      console.log(te);
//                   }
//                   // ------------------

//                   return update;
//                }

//                loaderPromise().then(() => {
//                   setTimeout(() => {
//                      window.open("result.html", "_self");
//                   }, 1000);
//                });
//             });

//             //change the functionality back when back button is pressed
//             $(".prev-btn").on("click", () => {
//                $(".next-btn").off();
//                $(".next-btn").on("click", () => {
//                   mySiema.next();
//                });
//             });

//          // ________ page 4 ___________

//          case 4:
//             $(".calculated-result")
//                .animate({ opacity: 1 })
//                .css("transform", "translateY(0)");

//          default:
//             console.log("200");
//             break;
//       }
//    });
// }
