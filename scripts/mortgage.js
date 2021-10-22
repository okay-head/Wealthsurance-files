'use strict'

//____ Objects and collections

let mortg = {
   page1: [],
   results: [],
};

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
   $(".ammortization-table-container")
   .slideToggle(700);
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
      for (let i = 0; i < 12; i++) {
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
         for (let i = 0; i < 12; i++) {
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
         return update;
      }
      loaderPromise().then(() => {
         // pushToDatabase1(mortg)
         setTimeout(() => {
            console.log(mortg)

            window.open("mortgage_result.html", "_self");
         }, 1410);
      });
   });
}

function reCalculate() {
   $(".re-calc-btn").on("click", () => {

     storeRecalculate();

     console.log(mortg.results)
   
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


function pushToDatabase1(mortg) {
   createSessionId();
   let [a, b, c, d, e, f, g] = mortg.page1;

   // let url_string = `http://wealthsurance.com/calculators/?calculator=college&session_id=${session_id}&ip_address=${ip}&child_name=${a}&curr_age=${b}&college_year=${c}&year_in_college=${d}&coll_expense=${f}&to_fund_percent=${e}&to_fund_amnt=${
   //    ((f * e) / 100).toFixed(2)
   // }&inv_rate=${g}`;

   let url_string = `http://wealthsurance.com/calculators/?calculator=mortgage&session_id=prasad123&ip_address=139.5.30.66&data={"price" : 500000,"amount" : 450000 ,"down" : 50000,"interest" : 3.5,"duration" : 30,"hoaDue" : 2400,"propTax" : 15000,"propIns" : 1500,"stPmi" : 1,"fnPmi" : 20}&type=1`

   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         console.log(x)
      //    let result = JSON.parse(x);
      //    console.log(result.amount);
      //    console.log(url_string);

      //    if (result.success) {
      //       localStorage.setItem("mortg_result", JSON.stringify(result.amount));
      //    } else {
      //       console.log(result + "request not successful");
      //    }
      // },
      // error: (error) => {
      //    console.log(error);
      },
   });
}

function pushToDatabase2(mortg) {
   createSessionId()
   let [{ 
      'name': a,
      'current_age': b,
      'age_entering_mortg': c,
      'mortg_years': d,
      'annual_mortg_expenses': e,
      'portion_funded%': f,
      'investment_rate': g,
   }] = mortg.results

   let url_string = `http://wealthsurance.com/calculators/?calculator=college&session_id=${session_id}&ip_address=${ip}&child_name=${a}&curr_age=${b}&college_year=${c}&year_in_college=${d}&coll_expense=${e}&to_fund_percent=${f}&to_fund_amnt=${
      ((f * e) / 100).toFixed(2)
   }&inv_rate=${g}`;

   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         if (result.success) {
            updateResult(2,result.amount)
         } else {
            console.log(result + "request not successful");
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
         $(".calculated-result").text(
            "$" + JSON.parse(localStorage.getItem("mortg_result"))
         );
         break;
      case 2:
         $(".calculated-result").text("$" + y);
         break;
   }
}

function updatePlaceholders(x) {
   switch (x) {
      case 1:
         const z = JSON.parse(localStorage.getItem("mortgpg1"));
         for (let i = 0; i < 4; i++) {
            $("#mortgpg1resulte" + (i + 1)).attr("placeholder", z[i]);
         }
         $("#mortgpg1resulte5").attr("placeholder", z[5]);
         $("#mortgpg1resulte6").attr("placeholder", z[4]);
         $("#mortgpg1resulte7").attr(
            "placeholder",
            z[5] * (z[4] / 100).toFixed(2)
         );
         $("#mortgpg1resulte8").attr("placeholder",z[6])

         break;

      //recalculate
      case 2:
         [
            {
               "name": a[0],
               "current_age": a[1],
               "age_entering_mortg": a[2],
               "mortg_years": a[3],
               "annual_mortg_expenses": a[4],
               "portion_funded%": a[5],
               "investment_rate":a[6],
            },
         ] = mortg.results;

         for (let i = 0; i < 6; i++) {
            $("#mortgpg1resulte" + (i + 1)).attr("placeholder", a[i]);
         }

         let calc = a[5] * (a[4] / 100).toFixed(2);
         $("#mortgpg1resulte7").attr("placeholder", calc);
         $("#mortgpg1resulte7").val(calc);

         $("#mortgpg1resulte8").attr("placeholder", a[6]);
         break;
   }
}

