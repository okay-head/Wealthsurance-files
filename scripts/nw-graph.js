"use strict";

// $(".shadow-element").removeClass("hidden");

function drawGraph() {
   
function updateResultArray(data) {
   let max = Object.values(data).length;
   for (let i = 1; i <= max; i++) {
      let y = Object.values(data[i]);
      y.unshift(`${i}`);
      result_array.push(y);
   }
   // console.log(result_array);
}

let result_array = [["Parameter", "Assets", "Liabilities", "Net worth"]];

let x = JSON.parse(localStorage.getItem("nw_result"));
updateResultArray(x);

let new_array = []
let new_array_length = Math.round(result_array.length/2)

for (let i = 0; i <= new_array_length; i++) {
   new_array.push(result_array[i])
}


google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
   var data2 = google.visualization.arrayToDataTable(result_array);
   var data1 = google.visualization.arrayToDataTable(new_array)

   var formatter = new google.visualization.NumberFormat({
      prefix: "$",
      // negativeColor: "red",
      // negativeParens: true,
      pattern:'#,###',
   });
   formatter.format(data1, 1);
   formatter.format(data1, 2);
   formatter.format(data1, 3);
   formatter.format(data2, 1);
   formatter.format(data2, 2);
   formatter.format(data2, 3);

   var options = {
      series: [
         { color: "#00196C" },
         { color: "#FFA114" },
         { color: "#707070" },
      ],
      animation:{
         duration: 1000,
         easing: 'out',
         startup: true,
       },
      //  vAxis: {minValue:0, maxValue:1000}

      // chartArea: { width: "70%", height: "80%" },
      chartArea: {
         height: "100%",
         width: "58%",
         top: "9%",
         bottom: "8%",
         // left: "13%",
         // right:0,
      },
      height: "100%",
      width: "100%",
      isStacked: true,
      // width: 500,
      // height: 300,
      legend: {
         position: "none",
      },
      bar: { groupWidth: "55%" },
      vAxis: {
         format: "$#,###",
         // maxValue: 600000,
         // gridlines: { count: 4 },
         // title: "Thousands of dollars",
         baselineColor: "black",
         textStyle: {
            // bold: true,
         }
      },
      hAxis: {
         gridlines: { count: 4 },
         baselineColor: "red",
         // title: "No of years",
         // textStyle: {
         //    bold: true,
         // }
      },
   };
   var options2 = {
      series: [
         { color: "#00196C" },
         { color: "#FFA114" },
         { color: "#707070" },
      ],

      animation:{
         duration: 1000,
         easing: 'out',
         startup: true,
       },
      backgroundColor: { fill:'transparent' },
      chartArea: {
         height: "60%",
         width: "60%",
         // top: 0,
         // left: 0,
         right:"18%",
         // bottom: 0,
      },
      height: "100%",
      width: "100%",
      isStacked: true,
      // width: 500,
      // height: 300,
      legend: {
         position: "bottom",
      },
      bar: { groupWidth: "60%" },
      vAxis: {
         format: "currency",
         // format: "$#,###",
         // gridlines: { count: 4 },
         // title: "Thousands of dollars",
         baselineColor: "black",
         // textStyle: {
         //    bold: true,
         // }
      },
      hAxis: {
         gridlines: { count: 4 },
         baselineColor: "red",
         title: "No of years",
         // textStyle: {
         //    bold: true,
         // }
      },
   };

   var chart = new google.visualization.ColumnChart(
      document.getElementById("nw-chart_div")
   );
   var chart2 = new google.visualization.ColumnChart(
      document.getElementById("nw_enlarged_chart")
   );
   chart.draw(data1, options);
   $('#toggle_modal_chart').one('click',()=>{
      chart2.draw(data2, options2);
   })
}

}