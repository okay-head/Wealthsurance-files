"use strict";

//functions
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
         //----- @prasad -----
         function pushToDatabase() {
            console.log(ann);
         }
         // ------------------
         return update;
      }
      loaderPromise().then(() => {
         setTimeout(() => {
            window.open("annuity_result.html", "_self");
         }, 1410);
      });
   });
}

function showResult() {
   $(".calculated-result")
      .animate({ opacity: 1 })
      .css("transform", "translateY(0)");
}
//____ Objects and collections

let ann = {
   page1: [],
};

// ____ on page load actions

function gotoPage(page) {
   $(() => {
      switch (page) {
         // ________ page 1 ___________
         case 1:
            //initialize loader
            initLoader();

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
               });
            });

            //  change next button's action
            $(".next-btn").on("click", () => {
               function loaderPromise() {
                  let update = new Promise((resolve) => {
                     resolve(updateLoader(1, 1));
                  });

                  //----- @prasad -----
                  function pushToDatabase() {
                     console.log(ann);
                  }
                  // ------------------

                  return update;
               }

               loaderPromise().then(() => {
                  setTimeout(() => {
                     window.open("result.html", "_self");
                  }, 1510);
               });
            });

            break;

         case 2:
            $(".calculated-result")
               .animate({ opacity: 1 })
               .css("transform", "translateY(0)");
      }
   });
}
