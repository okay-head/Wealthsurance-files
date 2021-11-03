"use strict";

//____ Objects and collections

let mortg = {
   page1: [],
   results: [],
};

let a = [];

// prefill

//pmi
$('#mortgpg1e5').val(20)

// Graph/Table toggler (for ammortization schedule)
$("#graph-btn").addClass("active-btn");
$("#table").addClass("d-none");

$(".ammortization-table-container").slideUp().css("opacity", "0");

$("#graph-btn,#table-btn").on("click", () => {
   $("#graph,#table").toggleClass("d-none");
   $("#graph-btn,#table-btn").toggleClass("active-btn");
});

//For ammortization table

$(".ammortization-btn").on("click", () => {
   changeText();
   $(".ammortization-table-container").slideToggle(700);
   animateTable($("#show-table").text());
});

function changeText() {
   let x = $("#show-table").text() == "Show" ? "Hide" : "Show";
   $("#show-table").text(x);
}

function animateTable(val) {
   if (val == "Hide") {
      $(".ammortization-table-container").animate({ opacity: 1 }, 400);
   } else {
      $(".ammortization-table-container").animate({ opacity: 0 }, 400);
   }
}

//functions
function pgLocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("mortgpg1") != null) {
      mortg.page1 = JSON.parse(localStorage.getItem("mortgpg1"));
      for (let i = 0; i < 12; i++) {
         if (i==2 || i==3) {
            continue;
         }
         $("#mortgpg1e" + (i + 1)).val(mortg.page1[i]);
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
            mortg.page1.push($("#mortgpg1e" + (i + 1)).val());
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
         pushToDatabase1(mortg);
         setTimeout(() => {
            // console.log(mortg);
            window.open("mortgage_result.html", "_self");
         }, 1410);
      });
   });   
}

function reCalculate() {
   $(".re-calc-btn").on("click", () => {
      storeRecalculate();
      // console.log(mortg.results);
   });
}

function storeRecalculate() {
   //not to be stored in local storage
   let obj = {
      label: "mortg-result input",
      house_price: $("#mortgresulte1").val(),
      "down_payment%": $("#mortgresulte2").val(),
      down_payment$: $("#mortgresulte3").val(),
      pmi: $("#mortgresulte4").val(),
      pmi_stops_at: $("#mortgresulte5").val(),
      loan_amount: $("#mortgresulte7").val(),
      interest_rate: $("#mortgresulte6").val(),
      loan_duration: $("#mortgresulte8").val(),
      annual_hoa_dues: $("#mortgresulte9").val(),
      annual_property_taxes: $("#mortgresulte10").val(),
      annual_property_insurance: $("#mortgresulte11").val(),
   };
   mortg.results = [];
   mortg.results.push(obj);

   updatePlaceholders(2);

   pushToDatabase2(mortg);
}

function pushToDatabase1(mortg) {
   createSessionId();
   let z = [];
   for (let i = 0; i < 12; i++) {
      z[i] = mortg.page1[i];
   }

   if (z[3]=='') {
      z[3] = ((Number(z[0])*Number(z[2]))/100).toFixed(2)
   }

   let url_string = `http://wealthsurance.com/calculators/?calculator=mortgage&session_id=${session_id}&ip_address=${ip}&data={"price" : ${z[0]},"amount" : ${z[7]} ,"down" : ${z[3]},"interest" : ${z[6]},"duration" : ${z[8]},"hoaDue" : ${z[9]},"propTax" : ${z[10]},"propIns" : ${z[11]},"stPmi" : ${z[4]},"fnPmi" : ${z[5]}}&type=2&zipcode=${z[1]}`;

   $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         if (result.success) {
            localStorage.setItem("mortg_result", JSON.stringify(result.data));
         } else {
            console.log(result + "request not successful");
         }
      },
      error: (error) => {
         console.log(error);
      },
   });
}

function pushToDatabase2(mortg) {
   createSessionId();
   let zip = (JSON.parse(localStorage.getItem('mortgpg1')))[1]
   let z = []
   for (let i = 0; i < 11; i++) {
      z[i] = (Object.values(mortg.results[0]))[i+1]
   }
   // Assign the greater value to down_payment$
   let calc_down = ((Number(z[0])*Number(z[1]))/100).toFixed(2)
   z[2] = Number(z[2])>Number(calc_down)? z[2]: calc_down

   $('#mortgresulte3')
   .attr('placeholder',z[2])
   .val(z[2])

    let url_string = `http://wealthsurance.com/calculators/?calculator=mortgage&session_id=${session_id}&ip_address=${ip}&data={"price" : ${z[0]},"amount" : ${z[5]} ,"down" : ${z[2]},"interest" : ${z[6]},"duration" : ${z[7]},"hoaDue" : ${z[8]},"propTax" : ${z[9]},"propIns" : ${z[10]},"stPmi" : ${z[3]},"fnPmi" : ${z[4]}}&type=2&zipcode=${zip}`

    $.ajax({
      type: "POST",
      url: url_string,

      success: (x) => {
         let result = JSON.parse(x);
         if (result.success) {
            localStorage.setItem("mortg_result", JSON.stringify(result.data));
            updateTables(2,result.data)
            createAmmortizationTable(2)
         } else {
            console.log(result + "request not successful");
         }
      },
      error: (error) => {
         console.log(error);
      },
   });

}

function updatePlaceholders(x) {
   switch (x) {
      case 1:
         const z = JSON.parse(localStorage.getItem("mortgpg1"));
         if (z[3]=='') {
            z[3] = ((Number(z[0])*Number(z[2]))/100).toFixed(2)
         }
         if (z[2]=='') {
           z[2]=Number(z[3])*100/ Number(z[0])
         }
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

function updateTables(x,y=undefined) {
   let data = undefined
   if (x==1) {
      data = JSON.parse(localStorage.getItem('mortg_result'))
  }else{
      data = y;
  }
   let dataM = Object.values(data.dataM)
   let dataY = Object.values(data.dataY)

   for (let i = 0; i <5; i++) {
      $('#mortgresult1c1r'+(i+1)).text(dataM[i])
   }
   for (let i = 0; i <5; i++) {
      $('#mortgresult1c2r'+(i+1)).text(dataY[i])
   }
   $('#mortgresult2c1r1').text(data.payFirstM)
   $('#mortgresult2c1r2').text(data.totalPmiPayment)
   $('#mortgresult2c1r3').text(data.pmiDuration)
}
// ammortization table
function updateAmmortizationTable(years) {
   let data = undefined
   let nYears = years;
   // if (x==1) {
   //    data =JSON.parse(localStorage.getItem('mortg_result'))
   // }else{
      //    data =JSON.parse(localStorage.getItem('mortg_result'))
      // }
   data =JSON.parse(localStorage.getItem('mortg_result'))


   //for c1-5
   for (let j = 1; j <= nYears; j++) {
      for (let i = 0; i <5; i++) {
         $(`#ayr${j}c${i+2}`).text(
            Object.values(data.amortizationSc[12*j])[i]
         )
      }
   }
   // for c1 and c7
   for (let i = 1; i <= nYears; i++) {
      $(`#ayr${i}c1`).text(i)
   }
   for (let i = 1; i <= nYears; i++) {
      $(`#ayr${i}c7`).text(1)
   }
   
}
function createAmmortizationTable(x) {
   let nYears = undefined;
   if (x==1) {
      nYears = (JSON.parse(localStorage.getItem("mortgpg1")))[8];
   }else{
      nYears = mortg.results[0].loan_duration;
   }
   
   let str = ''
   let yearStr = ''
   for (let i = 1; i <= nYears; i++) {
      for (let j = 1; j <= 7; j++) {         
         str+=`<td id="ayr${i}c${j}">0</td>`
      }
      yearStr+=`<tr> ${str} </tr>`
      str=''

   }
   let initialStr = `<tr>
          <td>Period</td>
          <td>Balance</td>
          <td>Principal</td>
          <td>Interest</td>
          <td>Payment</td>
          <td>PMI Pay</td>
          <td>Year</td>
     </tr> `

   let finalStr = initialStr+ `<tr>${yearStr}</tr>`
   // console.log(finalStr)

   $(".ammortization-table").html(finalStr);

   // console.log(x,nYears)
   updateAmmortizationTable(nYears)
}


function detectChange1() {
   let z = $('#mortgpg1e3').val()
   if (z == '') {
      $('#mortgpg1e4').prop('disabled',false)
      $('#mortgpg1e4').attr('placeholder','Enter amount')
   } else {
      $('#mortgpg1e4').prop('disabled',true)
      let down_amount= (Number($('#mortgpg1e1').val())*Number($('#mortgpg1e3').val())/100).toFixed(2)
      $('#mortgpg1e4').attr('placeholder',down_amount)
   }
}  
function detectChange2() {
   let z = $('#mortgpg1e4').val()
   if (z == '') {
      $('#mortgpg1e3').prop('disabled',false)
      $('#mortgpg1e3').attr('placeholder','Enter Percentage')
   } else {
      $('#mortgpg1e3').prop('disabled',true)
      let down_percentage =Number(z)*100/ Number($('#mortgpg1e1').val())
      $('#mortgpg1e3').attr('placeholder',down_percentage)
   }
}
const t1 = window.setInterval(detectChange1,10)
const t2 = window.setInterval(detectChange2,10)
