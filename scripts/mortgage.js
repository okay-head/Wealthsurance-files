'use strict'

// Graph/Table toggler
$('#graph-btn').addClass('active-btn');
$('#table').addClass('d-none');


$('#graph-btn,#table-btn').on('click', () => {
   $('#graph,#table').toggleClass('d-none')
   $('#graph-btn,#table-btn').toggleClass('active-btn')
})


//For ammortization table

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


