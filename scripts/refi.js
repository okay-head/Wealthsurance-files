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
   console.log(val)
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
      $("#refipg1e1").val(refi.page1[0]);
      $("#refipg1e2").val(refi.page1[1]);
      $("#refipg1e3").val(refi.page1[2]);
      $("#refipg1e4").val(refi.page1[3]);
      $("#refipg1e5").val(refi.page1[4]);
      $("#refipg1e6").val(refi.page1[5]);
      $("#refipg1e7").val(refi.page1[6]);
      $("#refipg1e8").val(refi.page1[7]);
   }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("refipg1") != null) {
         localStorage.removeItem("refipg1");
         refi.page1 = [];
      }

      $(".next-btn").one("click", () => {
         refi.page1 = [];
         refi.page1.push($("#refipg1e1").val());
         refi.page1.push($("#refipg1e2").val());
         refi.page1.push($("#refipg1e3").val());
         refi.page1.push($("#refipg1e4").val());
         refi.page1.push($("#refipg1e5").val());
         refi.page1.push($("#refipg1e6").val());
         refi.page1.push($("#refipg1e7").val());
         refi.page1.push($("#refipg1e8").val());

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
      annual_dues: $('#refiresulte8').val(),
      annual_property_taxes: $('#refiresulte9').val(),
      annual_property_insurance: $('#refiresulte10').val(),
   };

   refi.results.push(obj);
}


//____ Objects and collections

let refi = {
   page1: [],
   results: [],
};


