let array = []

function drawGraph(goal,egg) {

   let nestEgg = Number(((egg/goal)*100).toFixed(0))

   array = []

   array.push(["Label", "Percentage"])
   array.push(["Potential nest egg", nestEgg])
   array.push(["Offset", (100-nestEgg)])
   // console.log(array);



google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
   var data = google.visualization.arrayToDataTable(array);

   var options = {
      //  title: 'My Daily Activities',
      pieHole: 0.68,
      legend: "none",
      slices: {
         0: { color: "#ffa114" },
         1: { color: "#707070" },
      },
      pieSliceText: "none",
      tooltip: {
         text: 'percentage',
      },
      chartArea:{
         height: '70%',
         width: '70%',
         // top: "0%",
         // bottom: "0%",
         left: "5%",
         right: "5%",
      },
      // Animation is not supported for google pie
      // animation:{
      //    duration: 5000,
      //    easing: 'out',
      //    startup: true,
      //  },

      // height: "400px",
      // width: "400px",
   };

   var chart = new google.visualization.PieChart(
      document.getElementById("chart_div")
   );
   chart.draw(data, options);
}

}