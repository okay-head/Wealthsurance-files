"use strict";

// $(".shadow-element").removeClass("hidden");

function drawGraph(key,data=undefined) {
   let result_array1 = [
      [
         "Parameter",
         "Mortgage",
         { role: "annotation" },
         "Insurance",
         { role: "annotation" },
         "HOA",
         { role: "annotation" },
         "Taxes",
         { role: "annotation" },
      ],
   ];
   let result_array2 = [
      [
         "Parameter",
         "Mortgage",
         { role: "annotation" },
         "Insurance",
         { role: "annotation" },
         "HOA",
         { role: "annotation" },
         "Taxes",
         { role: "annotation" },
      ],
   ];

   function updateResultArray(data, arr) {
      let y = [
         `Total: ${data.total}`,
         data.repay,
         `$${data.repay}`,
         data.propIns,
         `$${data.propIns}`,
         data.hoaDue,
         `$${data.hoaDue}`,
         data.propTax,
         `$${data.propTax}`,
      ];
      switch (arr) {
         case 1:
            result_array1.push(y);
            break;
         case 2:
            result_array2.push(y);
            break;
      }
   }

   switch (key) {
      case 1:
         let zz = JSON.parse(localStorage.getItem("mortg_result")).dataY;
         let yy = JSON.parse(localStorage.getItem("mortg_result")).dataM;
      
         updateResultArray(zz, 1);
         updateResultArray(yy, 2);
         break;

      case 2:
         let zz2 = data.dataY;
         let yy2 = data.dataM;
      
         updateResultArray(zz2, 1);
         updateResultArray(yy2, 2);
         break;
   
   }
   // let zz = JSON.parse(localStorage.getItem("mortg_result")).dataY;
   // let yy = JSON.parse(localStorage.getItem("mortg_result")).dataM;

   // updateResultArray(zz, 1);
   // updateResultArray(yy, 2);

   google.charts.load("current", { packages: ["corechart"] });
   google.charts.setOnLoadCallback(drawChart);

   $('#graph-btn,#table-btn,#year-btn-g,#month-btn-g').on('click',()=>{
      drawChart()
   })


   function drawChart() {
      // var data1 = google.visualization.arrayToDataTable([
      //    [
      //       "Parameter",
      //       "Mortgage",
      //       { role: "annotation" },
      //       "Insurance",
      //       { role: "annotation" },
      //       "HOA",
      //       { role: "annotation" },
      //       "taxes",
      //       { role: "annotation" },
      //    ],
      //    [
      //       "Total: 352424",
      //       2924,
      //       "$2924",
      //       1533,
      //       "$1533",
      //       1524,
      //       "$1524",
      //       2511,
      //       "$2511",
      //    ],
      // ]);
      
      var data1 = google.visualization.arrayToDataTable(result_array1)
      
      var data2 = google.visualization.arrayToDataTable(result_array2)
      
      var formatter = new google.visualization.NumberFormat({
         prefix: "$",
         pattern: "#,###",
      });
      formatter.format(data1, 1);
      formatter.format(data1, 2);
      formatter.format(data1, 3);
      formatter.format(data1, 4);
      formatter.format(data1, 5);
      formatter.format(data1, 6);
      formatter.format(data1, 7);
      // formatter.format(data2, 3);

      var options = {
         // title:'Monthly',
         titlePosition: "out",
         // backgroundColor: 'white',
         series: [
            { color: "#bf0b30" },
            { color: "#00196c" },
            { color: "#ffa114" },
            { color: "#272727" },
         ],
         animation: {
            duration: 0,
            easing: "out",
            startup: true,
         },
         //  vAxis: {minValue:0, maxValue:1000}

         // chartArea: { width: "70%", height: "80%" },
         chartArea: {
            height: "70%",
            width: "70%",
            left: "20%",

            // top: "1%",
         },
         height: "100%",
         width: "100%",
         isStacked: true,
         legend: {
            position: "top",
            alignment: "center",
         },
         bar: { groupWidth: "35%" },
         vAxis: {
            format: "$#,###",
            // title: "Monthly",
            baselineColor: "black",
            textStyle: {
               bold: true,
            },
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

      var chart = new google.visualization.ColumnChart(
         document.getElementById("mortg_chart")
      );
      chart.draw(data1, options);
      
         var chart2 = new google.visualization.ColumnChart(
            document.getElementById("mortg_chartM")
            );
            chart2.draw(data2, options);


      // var chart2 = new google.visualization.ColumnChart(
      //    document.getElementById("mortg_chartM")
      // );
      // chart2.draw(data2, options);
   }
}

// drawGraph();
// drawGraph2();
