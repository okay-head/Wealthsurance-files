
//____ Objects and collections

let refi = {
   page1: [],
   results: [],
};

let a = []

$(".ammortization-table-container")
.slideUp()
.css('opacity','0');

$(".ammortization-btn").on("click", () => {
   changeText()
   // animateTable(changeText())
   $(".ammortization-table-container")
   .slideToggle(700);
   // .animate({'opacity':1},400)
   animateTable($('#show-table').text())
})

function changeText() {
   let x = $("#show-table").text() == 'Show' ? 'Hide' : 'Show';
   $("#show-table").text(x);
}

function animateTable(val){
   if (val=='Hide') {
      $('.ammortization-table-container').animate({'opacity':1},400)
   }else{
      $('.ammortization-table-container').animate({'opacity':0},400)
   }
}

// ----------- ⬆ for ammortization table -----------

//functions
function pgLocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("refipg1") != null) {
      refi.page1 = JSON.parse(localStorage.getItem("refipg1"));
      for (let i = 0; i < 9; i++) {
         $("#refipg1e"+(i+1)).val(refi.page1[i]);
      }
   }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("refipg1") != null) {
         localStorage.removeItem("refipg1");
         refi.page1 = [];
      }

      $(".next-btn").one("click", () => {
         refi.page1 = [];
         for (let i = 0; i < 9; i++) {
            refi.page1.push($("#refipg1e"+(i+1)).val());
         }
         localStorage.setItem("refipg1", JSON.stringify(refi.page1));
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
            console.log(refi);
         }
         // ------------------
         return update;
      }
      loaderPromise().then(() => {
         setTimeout(() => {
            window.open("refi_result.html", "_self");
         }, 1410);
      });
   });
}

function reCalculate() {
   $(".re-calc-btn").on("click", () => {
      /*      - - -
      
      some error checking

              - - - 
      */
     storeRecalculate();

   // ----------  
   // @prasad
   // Push to database and calculate results
     console.log(refi.results)
   //   ----------
   
   });
}

function storeRecalculate() {
   //not to be stored in local storage
   let obj = {
      label:'refi-result input',
      original_loan_amount: $('#refiresulte1').val(),
      original_loan_duration: $('#refiresulte2').val(),
      original_loan_rate: $('#refiresulte3').val(),
      years_passed: $('#refiresulte4').val(),
      new_loan_rate: $('#refiresulte5').val(),
      new_loan_duration: $('#refiresulte6').val(),
      processing_cost: $('#refiresulte7').val(),
      annual_dues: $('#refiresulte9').val(),
      annual_property_taxes: $('#refiresulte9').val(),
      annual_property_insurance: $('#refiresulte10').val(),
   };

   refi.results.push(obj);
}

function updatePlaceholders(x) {
   switch (x) {
      case 1:
         const z = JSON.parse(localStorage.getItem("mortgpg1"));
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
            $("#mortgresulte" + (i + 1)).attr("placeholder", a[i]);
         }
         break;
   }
}



