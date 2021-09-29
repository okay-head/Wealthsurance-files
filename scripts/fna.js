"use strict";

//_____ functions
function page1LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("fnapg1") != null) {
      fna.page1 = JSON.parse(localStorage.getItem("fnapg1"));
      $("#fnapg1e1").val(fna.page1[0]);
      $("#fnapg1e2").val(fna.page1[1]);
      $("#fnapg1e3").val(fna.page1[2]);
   }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("fnapg1") != null) {
         localStorage.removeItem("fnapg1");
         fna.page1 = [];
      }

      $(".next-btn").one("click", () => {
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
   $(":input").change(() => {
      if (localStorage.getItem("fnapg2") != null) {
         localStorage.removeItem("fnapg2");
         fna.page2 = [];
      }

      $(".next-btn").one("click", () => {
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
   $(":input").change(() => {
      if (localStorage.getItem("fnapg3") != null) {
         localStorage.removeItem("fnapg3");
         fna.page3 = [];
      }

      $(".next-btn").one("click", () => {
         fna.page3 = [];
         fna.page3.push($("#fnapg3e1").val());
         fna.page3.push($("#fnapg3e2").val());
         fna.page3.push($("#fnapg3e3").val());

         localStorage.setItem("fnapg3", JSON.stringify(fna.page3));
      });
   });
}

//table
function table() {
   $("#fnapg4e1,#fnapg5e1").keyup(() => {
      $(".table").slideDown(800);
   });

   // table glitch
   $(".next-btn,.prev-btn").on("click", () => {
      $(".table").slideUp();
   });
}

function page4LocalStorage() {
   // localStorage

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
   $(":input").change(() => {
      if (localStorage.getItem("fnapg4") != null) {
         localStorage.removeItem("fnapg4");
         fna.page4 = [];
      }

      $(".next-btn").one("click", () => {
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
}

//page 5
function page5LocalStorage() {
   // localStorage

   //check for existing localStorage on page load
   if (localStorage.getItem("fnapg5") != null) {
      fna.page5 = JSON.parse(localStorage.getItem("fnapg5"));
      // console.log(fna.page5)
      let [y] = fna.page5;
      // console.log(y)
      setValue("#fnapg5e1", y.total);
      setValue("#fnapg5e2c1", y.college[0]);
      setValue("#fnapg5e2c2", y.college[1]);
      setValue("#fnapg5e2c3", y.college[2]);

      setValue("#fnapg5e3c1", y.medical[0]);
      setValue("#fnapg5e3c2", y.medical[1]);
      setValue("#fnapg5e3c3", y.medical[2]);

      setValue("#fnapg5e4c1", y.planned[0]);
      setValue("#fnapg5e4c2", y.planned[1]);
      setValue("#fnapg5e4c3", y.planned[2]);

      setValue("#fnapg5e5c1", y.financial[0]);
      setValue("#fnapg5e5c2", y.financial[1]);
      setValue("#fnapg5e5c3", y.financial[2]);

      setValue("#fnapg5e6c1", y.others[0]);
      setValue("#fnapg5e6c2", y.others[1]);
      setValue("#fnapg5e6c3", y.others[2]);
   }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("fnapg5") != null) {
         localStorage.removeItem("fnapg5");
         fna.page5 = [];
      }

      $(".next-btn").one("click", () => {
         fna.page5 = [];

         const obj = {
            total: $("#fnapg5e1").val(),
            college: [
               $("#fnapg5e2c1").val(),
               $("#fnapg5e2c2").val(),
               $("#fnapg5e2c3").val(),
            ],

            medical: [
               $("#fnapg5e3c1").val(),
               $("#fnapg5e3c2").val(),
               $("#fnapg5e3c3").val(),
            ],

            planned: [
               $("#fnapg5e4c1").val(),
               $("#fnapg5e4c2").val(),
               $("#fnapg5e4c3").val(),
            ],

            financial: [
               $("#fnapg5e5c1").val(),
               $("#fnapg5e5c2").val(),
               $("#fnapg5e5c3").val(),
            ],

            others: [
               $("#fnapg5e6c1").val(),
               $("#fnapg5e6c2").val(),
               $("#fnapg5e6c3").val(),
            ],
         };
         fna.page5.push(obj);

         localStorage.setItem("fnapg5", JSON.stringify(fna.page5));
      });
   });
}

function next() {
   //  change next button's action
   $(".next-btn").on("click", () => {
      function loaderPromise() {
         let update = new Promise((resolve) => {
            resolve(updateLoader(5, 5));
         });

         //----- @prasad -----
         function pushToDatabase() {
            console.log(fna);
         }
         // ------------------

         return update;
      }

      loaderPromise().then(() => {
         setTimeout(() => {
            window.open("6.html", "_self");
         }, 1000);
      });
   });

   //change the functionality back when prev button is pressed
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
      college: [
         $("#fnaresultp2r1e1").val(), 
         $("#fnaresultp2r1e2").val(),
         $("#fnaresultp2r1e3").val(),
      ],
      medical: [
         $("#fnaresultp2r2e1").val(),
         $("#fnaresultp2r2e2").val(),
         $("#fnaresultp2r2e3").val(),
      ],
      planned: [
         $("#fnaresultp2r3e1").val(),
         $("#fnaresultp2r3e2").val(),
         $("#fnaresultp2r3e3").val(),
      ],
      financial: [
         $("#fnaresultp2r4e1").val(),
         $("#fnaresultp2r4e2").val(),
         $("#fnaresultp2r4e3").val(),
      ],
      others: [
         $("#fnaresultp2r5e1").val(),
         $("#fnaresultp2r5e2").val(),
         $("#fnaresultp2r5e3").val(),
      ],
   };

   fna.results.push(debt);
   fna.results.push(expenses);
}

function reCalculate() {
   // ---@error ---
   let flag = true;

   if ($('#fnaresultp1r0e1').val()!=='') {
      flag = false;
   }
   $(":input").on("change", () => {
      // not working
      if ($('#fnaresultp1r0e1').val()!=='') {
         flag = false;
      }
   });


   $("#re-calc").on("click", () => {
      if (flag) {
         window.alert("One or more of the input fields are empty!");
      }else{
         storeRecalculate();  
         // @prasad push to database
         console.log(fna.results)
      }
      // more actions
   });
}

//____ Objects and collections

let fna = {
   page1: [],
   page2: [],
   page3: [],
   page4: [],
   page5: [],
   results: [
      /* 
      {
         label: "debt",
         total: 999,
         credit: [amount,interest,years],
         vehicle: [amount,interest,years],
         student: [amount,interest,years],
         bank: [amount,interest,years],
         personal: [amount,interest,years],
         others: [amount,interest,years],
      },
      {
         label: "expenses",
         total: 777,
         college: [amount,interest,years],
         medical: [amount,interest,years],
         planned: [amount,interest,years],
         financial: [amount,interest,years],
         others: [amount,interest,years],
      }, 
      */
   ],
};

// ____ global actions

// ____ on page load actions

// function gotoPage(page) {
//    $(() => {
//       // console.log(page);

//       switch (page) {
//          // ________ page 1 ___________
//          case 1:
//             //initialize loader
//             initLoader();

//             //check for existing localStorage on page load
//             if (localStorage.getItem("fnapg1") != null) {
//                fna.page1 = JSON.parse(localStorage.getItem("fnapg1"));
//                $("#fnapg1e1").val(fna.page1[0]);
//                $("#fnapg1e2").val(fna.page1[1]);
//                $("#fnapg1e3").val(fna.page1[2]);
//             }

//             //push to local storage
//             $(":input").change(() => {
//                if (localStorage.getItem("fnapg1") != null) {
//                   localStorage.removeItem("fnapg1");
//                   fna.page1 = [];
//                }

//                $(".next-btn").one("click", () => {
//                   fna.page1 = [];
//                   fna.page1.push($("#fnapg1e1").val());
//                   fna.page1.push($("#fnapg1e2").val());
//                   fna.page1.push($("#fnapg1e3").val());

//                   localStorage.setItem("fnapg1", JSON.stringify(fna.page1));
//                });
//             });

//             break;

//          // ________ page 2 ___________
//          case 2:
//             updateLoader(1, 5);

//             //check for existing localStorage on page load
//             if (localStorage.getItem("fnapg2") != null) {
//                fna.page2 = JSON.parse(localStorage.getItem("fnapg2"));
//                $("#fnapg2e1").val(fna.page2[0]);
//             }
//             //push to local storage
//             $(":input").change(() => {
//                if (localStorage.getItem("fnapg2") != null) {
//                   localStorage.removeItem("fnapg2");
//                   fna.page2 = [];
//                }

//                $(".next-btn").one("click", () => {
//                   fna.page2 = [];
//                   fna.page2.push($("#fnapg2e1").val());
//                   localStorage.setItem("fnapg2", JSON.stringify(fna.page2));
//                });
//             });

//             break;

//          // ________ page 3 ___________

//          case 3:
//             updateLoader(2, 5);

//             //check for existing localStorage on page load
//             if (localStorage.getItem("fnapg3") != null) {
//                fna.page3 = JSON.parse(localStorage.getItem("fnapg3"));
//                $("#fnapg3e1").val(fna.page3[0]);
//                $("#fnapg3e2").val(fna.page3[1]);
//                $("#fnapg3e3").val(fna.page3[2]);
//             }

//             //push to local storage
//             $(":input").change(() => {
//                if (localStorage.getItem("fnapg3") != null) {
//                   localStorage.removeItem("fnapg3");
//                   fna.page3 = [];
//                }

//                $(".next-btn").one("click", () => {
//                   fna.page3 = [];
//                   fna.page3.push($("#fnapg3e1").val());
//                   fna.page3.push($("#fnapg3e2").val());
//                   fna.page3.push($("#fnapg3e3").val());

//                   localStorage.setItem("fnapg3", JSON.stringify(fna.page3));
//                });
//             });
//             break;

//          // ________ page 4 ___________
//          case 4:
//             updateLoader(3, 5);

//             $("#fnapg4e1").keyup(() => {
//                $(".table").slideDown(800);
//             });

//             // table glitch
//             $(".next-btn,.prev-btn").on("click", () => {
//                $(".table").slideUp();
//             });

//             // localStorage

//             //check for existing localStorage on page load
//             if (localStorage.getItem("fnapg4") != null) {
//                fna.page4 = JSON.parse(localStorage.getItem("fnapg4"));
//                // console.log(fna.page4)
//                let [z] = fna.page4;
//                // console.log(z)
//                setValue("#fnapg4e1", z.total);
//                setValue("#fnapg4e2c1", z.credit[0]);
//                setValue("#fnapg4e2c2", z.credit[1]);
//                setValue("#fnapg4e2c3", z.credit[2]);

//                setValue("#fnapg4e3c1", z.vehicle[0]);
//                setValue("#fnapg4e3c2", z.vehicle[1]);
//                setValue("#fnapg4e3c3", z.vehicle[2]);

//                setValue("#fnapg4e4c1", z.student[0]);
//                setValue("#fnapg4e4c2", z.student[1]);
//                setValue("#fnapg4e4c3", z.student[2]);

//                setValue("#fnapg4e5c1", z.bank[0]);
//                setValue("#fnapg4e5c2", z.bank[1]);
//                setValue("#fnapg4e5c3", z.bank[2]);

//                setValue("#fnapg4e6c1", z.personal[0]);
//                setValue("#fnapg4e6c2", z.personal[1]);
//                setValue("#fnapg4e6c3", z.personal[2]);

//                setValue("#fnapg4e7c1", z.others[0]);
//                setValue("#fnapg4e7c2", z.others[1]);
//                setValue("#fnapg4e7c3", z.others[2]);
//             }

//             //push to local storage
//             $(":input").change(() => {
//                if (localStorage.getItem("fnapg4") != null) {
//                   localStorage.removeItem("fnapg4");
//                   fna.page4 = [];
//                }

//                $(".next-btn").one("click", () => {
//                   fna.page4 = [];

//                   const obj = {
//                      total: $("#fnapg4e1").val(),
//                      credit: [
//                         $("#fnapg4e2c1").val(),
//                         $("#fnapg4e2c2").val(),
//                         $("#fnapg4e2c3").val(),
//                      ],

//                      vehicle: [
//                         $("#fnapg4e3c1").val(),
//                         $("#fnapg4e3c2").val(),
//                         $("#fnapg4e3c3").val(),
//                      ],

//                      student: [
//                         $("#fnapg4e4c1").val(),
//                         $("#fnapg4e4c2").val(),
//                         $("#fnapg4e4c3").val(),
//                      ],

//                      bank: [
//                         $("#fnapg4e5c1").val(),
//                         $("#fnapg4e5c2").val(),
//                         $("#fnapg4e5c3").val(),
//                      ],

//                      personal: [
//                         $("#fnapg4e6c1").val(),
//                         $("#fnapg4e6c2").val(),
//                         $("#fnapg4e6c3").val(),
//                      ],

//                      others: [
//                         $("#fnapg4e7c1").val(),
//                         $("#fnapg4e7c2").val(),
//                         $("#fnapg4e7c3").val(),
//                      ],
//                   };

//                   fna.page4.push(obj);

//                   localStorage.setItem("fnapg4", JSON.stringify(fna.page4));
//                });
//             });
//             break;

//          // ________ page 5 ___________
//          case 5:
//             updateLoader(4, 5);
//             $("#fnapg5e1").keyup(() => {
//                $(".table").slideDown(800);
//             });

//             // table glitch
//             $(".next-btn,.prev-btn").on("click", () => {
//                $(".table").slideUp();
//             });
//             // localStorage

//             //check for existing localStorage on page load
//             if (localStorage.getItem("fnapg5") != null) {
//                fna.page5 = JSON.parse(localStorage.getItem("fnapg5"));
//                // console.log(fna.page5)
//                let [y] = fna.page5;
//                // console.log(y)
//                setValue("#fnapg5e1", y.total);
//                setValue("#fnapg5e2c1", y.college[0]);
//                setValue("#fnapg5e2c2", y.college[1]);
//                setValue("#fnapg5e2c3", y.college[2]);

//                setValue("#fnapg5e3c1", y.medical[0]);
//                setValue("#fnapg5e3c2", y.medical[1]);
//                setValue("#fnapg5e3c3", y.medical[2]);

//                setValue("#fnapg5e4c1", y.planned[0]);
//                setValue("#fnapg5e4c2", y.planned[1]);
//                setValue("#fnapg5e4c3", y.planned[2]);

//                setValue("#fnapg5e5c1", y.financial[0]);
//                setValue("#fnapg5e5c2", y.financial[1]);
//                setValue("#fnapg5e5c3", y.financial[2]);

//                setValue("#fnapg5e6c1", y.others[0]);
//                setValue("#fnapg5e6c2", y.others[1]);
//                setValue("#fnapg5e6c3", y.others[2]);
//             }

//             //push to local storage
//             $(":input").change(() => {
//                if (localStorage.getItem("fnapg5") != null) {
//                   localStorage.removeItem("fnapg5");
//                   fna.page5 = [];
//                }

//                $(".next-btn").one("click", () => {
//                   fna.page5 = [];

//                   const obj = {
//                      total: $("#fnapg5e1").val(),
//                      college: [
//                         $("#fnapg5e2c1").val(),
//                         $("#fnapg5e2c2").val(),
//                         $("#fnapg5e2c3").val(),
//                      ],

//                      medical: [
//                         $("#fnapg5e3c1").val(),
//                         $("#fnapg5e3c2").val(),
//                         $("#fnapg5e3c3").val(),
//                      ],

//                      planned: [
//                         $("#fnapg5e4c1").val(),
//                         $("#fnapg5e4c2").val(),
//                         $("#fnapg5e4c3").val(),
//                      ],

//                      financial: [
//                         $("#fnapg5e5c1").val(),
//                         $("#fnapg5e5c2").val(),
//                         $("#fnapg5e5c3").val(),
//                      ],

//                      others: [
//                         $("#fnapg5e6c1").val(),
//                         $("#fnapg5e6c2").val(),
//                         $("#fnapg5e6c3").val(),
//                      ],
//                   };
//                   fna.page5.push(obj);

//                   localStorage.setItem("fnapg5", JSON.stringify(fna.page5));
//                });
//             });

//             //  change next button's action
//             $(".next-btn").on("click", () => {
//                function loaderPromise() {
//                   let update = new Promise((resolve) => {
//                      resolve(updateLoader(5, 5));
//                   });

//                   //----- @prasad -----
//                   function pushToDatabase() {
//                      console.log(fna);
//                   }
//                   // ------------------

//                   return update;
//                }

//                loaderPromise().then(() => {
//                   setTimeout(() => {
//                      window.open("6.html", "_self");
//                   }, 2000);
//                });
//             });

//             //change the functionality back when prev button is pressed
//             $(".prev-btn").on("click", () => {
//                $(".next-btn").off();
//                $(".next-btn").on("click", () => {
//                   mySiema.next();
//                });
//             });

//          // ________ page 6 ___________

//          case 6:
//             $(".calculated-result")
//                .animate({ opacity: 1 })
//                .css("transform", "translateY(0)");

//          default:
//             console.log("200");
//             break;
//       }
//    });
// }
