"use strict";
function updateResultArray(data) {
   let max = Object.values(data).length;
   for (let i = 1; i <=max; i++) {
      let y = Object.values(data[i])
      y.unshift(`${i}`)
      result_array.push(y);
   }
   console.log(result_array);
}

let result_array = [["Parameter", "Asset", "Liability", "Net worth"]];

let x = JSON.parse(localStorage.getItem("nw_result"));
updateResultArray(x)  


google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);


function drawChart() {
   var data = google.visualization.arrayToDataTable(result_array)
   //    [
   //    ["Parameter", "Asset", "Liability", "Net worth"],
   //    ["1", 100000, 240000, 150000],
   //    ["2", 140000, 220000, 150000],
   //    ["3", 110000, 190000, 150000],
   //    ["4", 130000, 170000, 150000],
   //    ["5", 170000, 130000, 150000],
   //    ["6", 150000, 150000, 150000],
   //    ["7", 140000, 190000, 150000],
   //    ["8", 110000, 180000, 150000],
   //    ["9", 170000, 130000, 150000],
   //    ["10", 180000, 120000, 150000],
   //    ["11", 190000, 110000, 150000],
   //    ["12", 180000, 100000, 150000],
   //    ["13", 140000, 160000, 150000],
   //    ["14", 130000, 170000, 150000],
   //    ["15", 150000, 150000, 150000],
   //    ["16", 130000, 170000, 150000],
   //    ["17", 110000, 190000, 150000],
   //    ["18", 160000, 140000, 150000],
   //    ["19", 100000, 180000, 150000],
   //    ["20", 110000, 190000, 150000],
   // ]);

   var formatter = new google.visualization.NumberFormat({
      prefix: "$",
      negativeColor: "red",
      negativeParens: true,
   });
   formatter.format(data, 1);
   formatter.format(data, 2);
   formatter.format(data, 3);

   var options = {
      series: [
         { color: "#00196C" },
         { color: "#FFA114" },
         { color: "#707070" },
      ],
      chartArea: { width: "70%", height: "80%" },
      isStacked: true,
      // width: 500,
      // height: 300,
      legend: {
         position: "bottom",
      },
      bar: { groupWidth: "70%" },
      vAxis: {
         format: "currency",
         // gridlines: { count: 4 },
         baselineColor: "black",
         // textStyle: {
         //    bold: true,
         // }
      },
      hAxis: {
         gridlines: { count: 4 },
         baselineColor: "red",
         // textStyle: {
         //    bold: true,
         // }
      },
   };

   var chart = new google.visualization.ColumnChart(
      document.getElementById("nw-chart_div")
   );
   chart.draw(data, options);
}
