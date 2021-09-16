"use strict";

// _____functions

// -- Loader generator

function initLoader(pages) {
  $('.progress-bar').animate({width:`${100/pages}%`},1000);
  $('.progress-percentage')
  .text(`${Math.round(100/pages)}%`)
  .fadeTo(1500,1)
};

function updateLoader(page,pages) {
  let increment = (100/pages);
  // $('.progress-bar').animate({width: `+=${increment}%`},1000); not working since the widths reset
  $('.progress-bar').animate({width: `${page*increment}%`},1000);
  $('.progress-percentage')
  .text(`${page*(Math.round(increment))}%`)
  .fadeTo(1500,1)
}

//____ Objects and collections

let fna = {
   page1: [],
   page2: [],
   page3: [],
   page4: [],
   page5: [],
   page6: [],
};

// global actions

$('.brand').click(()=>{
  window.open('1.html');
});

// ____ on page load actions

function gotoPage(page) {
   $(() => {
      console.log(page);

      switch (page) {
         // for page 1
         case 1:
            //initialize loader 
            initLoader(5);

            // $('.navigation a').hover(()=>{
            //   $('.dropdown-arrow').animate({
            //     marginTop: '+=30px',
            //   },2000);
            // });

            //check for existing localStorage on page load
            if (localStorage.getItem("fnapg1") != null) {
               fna.page1 = JSON.parse(localStorage.getItem("fnapg1"));
               $("#fnapg1e1").val(fna.page1[0]);
               $("#fnapg1e2").val(fna.page1[1]);
               $("#fnapg1e3").val(fna.page1[2]);
            }

            //push to local storage
            $(":input").change(() => {
               if (localStorage.getItem("fnapg1") != null) {
                  localStorage.removeItem("fnapg1");
                  fna.page1 = [];
               }

               $(".next-btn").one("click", () => {
                  fna.page1 = [];
                  fna.page1.push($("#fnapg1e1").val());
                  fna.page1.push($("#fnapg1e2").val());
                  fna.page1.push($("#fnapg1e3").val());

                  localStorage.setItem("fnapg1", JSON.stringify(fna.page1));
               });
            });
            break;

          // for page 2
         case 2:
            updateLoader(2,5);

             //check for existing localStorage on page load
             if (localStorage.getItem("fnapg2") != null) {
              fna.page2 = JSON.parse(localStorage.getItem("fnapg2"));
              $("#fnapg2e1").val(fna.page2[0]);
           }
            //push to local storage
            $(":input").change(() => {
              if (localStorage.getItem("fnapg2") != null) {
                 localStorage.removeItem("fnapg2");
                 fna.page2 = [];
              }

              $(".next-btn").one("click", () => {
                 fna.page2 = [];
                 fna.page2.push($("#fnapg2e1").val());
                 console.log($("#fnapg2e1").val());
                 localStorage.setItem("fnapg2", JSON.stringify(fna.page2));
              });
           });

            break;

         case 3:
          updateLoader(3,5);

           //check for existing localStorage on page load
           if (localStorage.getItem("fnapg3") != null) {
            fna.page3 = JSON.parse(localStorage.getItem("fnapg3"));
            $("#fnapg3e1").val(fna.page3[0]);
            $("#fnapg3e2").val(fna.page3[1]);
            $("#fnapg3e3").val(fna.page3[2]);
         }

         //push to local storage
         $(":input").change(() => {
            if (localStorage.getItem("fnapg3") != null) {
               localStorage.removeItem("fnapg3");
               fna.page3 = [];
            }

            $(".next-btn").one("click", () => {
               fna.page3 = [];
               fna.page3.push($("#fnapg3e1").val());
               fna.page3.push($("#fnapg3e2").val());
               fna.page3.push($("#fnapg3e3").val());

               localStorage.setItem("fnapg3", JSON.stringify(fna.page3));
            });
         });
            break;

         case 4:
          updateLoader(4,5);           
           $('#fnapg4e1').keyup(()=>{
             $('.table').slideDown(800);
           });
           
           //add localStorage
           break;
           
           case 5:
             updateLoader(5,5);
             $('#fnapg5e1').keyup(()=>{
               $('.table').slideDown(800);
             });

              //add localStorage

            case 6:
            //  $('.calculated-result').css('width','0');
            //  $('.calculated-result').animate({
            //    width:'100%',
            //  },900);
            //  $('.calculated-result').show(1000);

            // $('.calculated-result').css('transform','translateY(50%)');
            // $('.calculated-result').hide();
            // $('.calculated-result').fadeIn(1200);
            // $('.calculated-result').fadeTo(1);
            $('.calculated-result').animate({
              opacity: 1,
            });
            $('.calculated-result').css('transform','translateY(0)');



         default:
           console.log('Bad function call');
            break;
      }
   });
}


//_____push to localStorage

/*   $('.next-btn').on('click', () => {
    fna.page1.push($('#fnapg1e1').val())
    fna.page1.push($('#fnapg1e2').val())
    fna.page1.push($('#fnapg1e3').val())

    localStorage.setItem('fna', JSON.stringify(fna))
    $('.next-btn').off('click')
  }) */
