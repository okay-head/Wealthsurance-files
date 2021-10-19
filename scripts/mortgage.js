'use strict'

// Graph/Table toggler (for ammortization schedule)
$('#graph-btn').addClass('active-btn');
$('#table').addClass('d-none');

$(".ammortization-table-container")
.slideUp()
.css('opacity','0');

$('#graph-btn,#table-btn').on('click', () => {
   $('#graph,#table').toggleClass('d-none')
   $('#graph-btn,#table-btn').toggleClass('active-btn')
})


//For ammortization table

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


function next() {
   //  change next button's action
   $(".next-btn").on("click", () => {
      function loaderPromise() {
         let update = new Promise((resolve) => {
            resolve(updateLoader(1, 1));
         });
         //----- @prasad -----
         function pushToDatabase() {
            console.log(mortg);
         }
         // ------------------
         return update;
      }
      loaderPromise().then(() => {
         setTimeout(() => {
            window.open("mortgage_result.html", "_self");
         }, 1410);
      });
   });
}


//functions
function pgLocalStorage() {
 
   //check for existing localStorage on page load
   if (localStorage.getItem("mortgpg1") != null) {
      mortg.page1 = JSON.parse(localStorage.getItem("mortgpg1")); 
      for (let i = 0; i < 11; i++) {
         $('#mortgpg1e'+(i+1)).val(mortg.page1[i]);
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
         for (let i = 0; i < 11; i++) {
            mortg.page1.push($("#mortgpg1e"+(i+1)).val());
         }
         localStorage.setItem("mortgpg1", JSON.stringify(mortg.page1));
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
            console.log(mortg);
         }
         // ------------------
         return update;
      }
      loaderPromise().then(() => {
         setTimeout(() => {
            window.open("mortgage_result.html", "_self");
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
     console.log(mortg.results)
   //   ----------
   
   });
}

function storeRecalculate() {
   //not to be stored in local storage
   let obj = {
      'label':'mortg-result input',
      'house_price': $('#mortgresulte1').val(),
      'down_payment%': $('#mortgresulte2').val(),
      'down_payment$': $('#mortgresulte3').val(),
      'pmi': $('#mortgresulte4').val(),
      'pmi_stops_at': $('#mortgresulte5').val(),
      'loan_amount': $('#mortgresulte6').val(),
      'interest_rate': $('#mortgresulte7').val(),
      'loan_duration': $('#mortgresulte8').val(),
      'annual_hoa_dues': $('#mortgresulte9').val(),
      'annual_property_taxes': $('#mortgresulte10').val(),
      'annual_property_insurance': $('#mortgresulte11').val(),
   };

   mortg.results.push(obj);
}


//____ Objects and collections

let mortg = {
   page1: [],
   results: [],
};

