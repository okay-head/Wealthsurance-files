
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
      for (let i = 0; i < 12; i++) {
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
         for (let i = 0; i < 12; i++) {
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
         return update;
      }
      loaderPromise().then(() => {
         pushToDatabase1(refi)
         setTimeout(() => {
            window.open("refi_result.html", "_self");
         }, 1410);
      });
   });
}

function reCalculate() {
   $(".re-calc-btn").on("click", () => {
     storeRecalculate();
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
      new_loan_rate: $('#refiresulte6').val(),
      new_loan_duration: $('#refiresulte7').val(),
      processing_cost: $('#refiresulte8').val(),
      annual_dues: $('#refiresulte9').val(),
      annual_property_taxes: $('#refiresulte10').val(),
      annual_property_insurance: $('#refiresulte11').val(),
   };

   refi.results = [];
   refi.results.push(obj);

   updatePlaceholders(2);

   pushToDatabase2(refi);

}

function updatePlaceholders(x) {
   switch (x) {
      case 1:
         const z = JSON.parse(localStorage.getItem("refipg1"));

         for (let i = 0; i <11; i++) {
            if (i==4) {
               continue;
            }else{
               $("#refiresulte" + (i+1)).attr("placeholder", z[i]);
            }
         }
         break;

      //recalculate
      case 2:
         for (let i = 1; i <= 4; i++) {
            $("#refiresulte"+i).attr("placeholder", (Object.values(refi.results[0]))[i]);
         }
         for (let i = 5; i <= 10; i++) {
            $("#refiresulte"+(i+1)).attr("placeholder", (Object.values(refi.results[0]))[i]);
         }
         break;
   }
}


function updateTables(x) {
   switch (x) {
      case 1:
         const z = JSON.parse(localStorage.getItem("refi_result"));
         
         $('#refiresultr1c1').text(z.out_interest)
         $('#refiresultr2c1').text(z.new_interest)
         $('#refiresultr3c1').text(z.cost_saved)
         
         let old_d = Object.values(z.old_data)
         for (let i = 0; i < 5; i++) {
            $(`#refiresultr${i+4}c1`).text(old_d[i])
         }
         let new_d = Object.values(z.new_data)
         for (let i = 0; i < 5; i++) {
            $(`#refiresultr${i+4}c2`).text(new_d[i])
         }
         break;

      //recalculate
      // case 2:
      //    for (let i = 1; i <= 4; i++) {
      //       $(`#refiresultr${i}c1`).text((Object.values(refi.results[0]))[i]);
      //    }
      //    for (let i = 5; i <= 8; i++) {
      //       $(`#refiresultr${i+1}c1`).text((Object.values(refi.results[0]))[i]);
      //    }
      //    break;
   }
}

function pushToDatabase1(refi) {
   createSessionId();
   let z = [];
   for (let i = 0; i < 12; i++) {
      z[i] = refi.page1[i];
   }

   let url_string = `http://wealthsurance.com/calculators/?calculator=refi&session_id=${session_id}&ip_address=${ip}&data={"amount" : ${z[0]},"interest" : ${z[1]},"duration" : ${z[2]},"yearP" : ${z[3]},"interestN" : ${z[5]},"durationN" : ${z[6]},"hoaDue" : ${z[8]},"propTax" : ${z[9]},"propIns" : ${z[10]},"costRefinance" : ${z[7]}}&zipcode=${z[11]}&type=2`;

   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         // console.log(Object.values(result.data.old_data))
         if (result.success) {
            localStorage.setItem("refi_result", JSON.stringify(result.data));
         } else {
            console.log(result + "request not successful");
         }
      },
      error: (error) => {
         console.log(error);
      },
   });
}
function pushToDatabase2(refi) {
   createSessionId();
   let zip = (JSON.parse(localStorage.getItem('refipg1')))[11]
   let z = []
    for (let i = 0; i < 10; i++) {
       z[i] = (Object.values(refi.results[0]))[i+1]
    }

    let url_string = `http://wealthsurance.com/calculators/?calculator=refi&session_id=${session_id}&ip_address=${ip}&data={"amount" : ${z[0]},"interest" : ${z[1]},"duration" : ${z[2]},"yearP" : ${z[3]},"interestN" : ${z[4]},"durationN" : ${z[5]},"hoaDue" : ${z[7]},"propTax" : ${z[8]},"propIns" : ${z[9]},"costRefinance" : ${z[6]}}&zipcode=${zip}&type=2`;
    

    $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         if (result.success) {
            // createAmmortizationTable(2)
            localStorage.setItem("refi_result", JSON.stringify(result.data));
            updateTables(1)
         } else {
            console.log(result + "request not successful");
         }
      },
      error: (error) => {
         console.log(error);
      },
   });

}



