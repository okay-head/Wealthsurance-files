//____ Objects and collections

let nw = {
   //nw = net worth
   page1: [],
   page2: [],
   page3: [],
   results: [],
};

//defaults

//functions
function pushToDatabase1(nw) {
   createSessionId();
   let [a, b] = nw.page1;
   let pg2 = nw.page2[0];
   let [c1, c2] = pg2.primary_income;
   let [d1, d2] = pg2.real_estate;
   let [e1, e2] = pg2.vehicles;
   let [f1, f2] = pg2.household;
   let [g1, g2] = pg2.retirement_accounts;
   let [h1, h2] = pg2.stock;
   let [i1, i2] = pg2.bonds;
   let [j1, j2] = pg2.life_insurance_cash;
   let [k1, k2] = pg2.annuity;
   let [l1, l2] = pg2.bank_accounts;
   let [m1, m2] = pg2.cash;
   let [n1, n2] = pg2.other;

   let pg3 = nw.page3[0];
   let [o1, o2] = pg3.primary_mortgage;
   let [p1, p2] = pg3.other_mortgage;
   let [q1, q2] = pg3.vehicle_loans;
   let [r1, r2] = pg3.student_loans;
   let [s1, s2] = pg3.creditCard_debts;
   let [t1, t2] = pg3.personal_loans;
   let [u1, u2] = pg3.other_loans;

   // let url_asset = `asset={"0":{"amount":${c1},"growth_rate":${c2},"type":1},
   // "1":{"amount":${d1},"growth_rate":${d2},"type":2},"2":{"amount":${e1},"growth_rate":${e2},"type":3},"3":{"amount":${f1},"growth_rate":${f2},"type":4},`


   let url_liablity1 = {"0":{"amount":o1,"interest_rate":o2,"type":1},"1":{"amount":p1,"interest_rate":p2,"type":2},"2":{"amount":q1,"interest_rate":q2,"type":3},"3":{"amount":r1,"interest_rate":r2,"type":4},"4":{"amount":s1,"interest_rate":s2,"type":5},"5":{"amount":t1,"interest_rate":t2,"type":6},"6":{"amount":u1,"interest_rate":u2,"type":7}}

   let url_asset1 ={"0":{"amount":c1,"growth_rate":c2,"type":1},"1":{"amount":d1,"growth_rate":d2,"type":2},"2":{"amount":e1,"growth_rate":e2,"type":3},"3":{"amount":f1,"growth_rate":f2,"type":4},"4":{"amount":g1,"growth_rate":g2,"type":5},"5":{"amount":h1,"growth_rate":h2,"type":6},"6":{"amount":i1,"growth_rate":i2,"type":7},"7":{"amount":j1,"growth_rate":j2,"type":8},"8":{"amount":k1,"growth_rate":k2,"type":9},"9":{"amount":l1,"growth_rate":l2,"type":10},"10":{"amount":m1,"growth_rate":m2,"type":11},"11":{"amount":n1,"growth_rate":n2,"type":12}}

   let url_string =  `http://wealthsurance.com/calculators/?calculator=net&session_id=prasad123&ip_address=139.5.30.66&current_age=${a}&retirement_age=${b}&asset=${JSON.stringify(url_asset1)}&liablity=${JSON.stringify(url_liablity1)}`
   // let url_string = `http://wealthsurance.com/calculators/?calculator=net&session_id=prasad123&ip_address=139.5.30.66&current_age=${a}&retirement_age=${b}&asset={"0":{"amount":${c1},"growth_rate":${c2},"type":1},"1":{"amount":${d1},"growth_rate":${d2},"type":2},"2":{"amount":${e1},"growth_rate":${e2},"type":3},"3":{"amount":${f1},"growth_rate":${f2},"type":4},"4":{"amount":${g1},"growth_rate":${g2},"type":5},"5":{"amount":${h1},"growth_rate":${h2},"type":6},"6":{"amount":${i1},"growth_rate":${i2},"type":7},"7":{"amount":${j1},"growth_rate":${j2},"type":8},"8":{"amount":${k1},"growth_rate":${k2},"type":9},"9":{"amount":${l1},"growth_rate":${l2},"type":10},"10":{"amount":${m1},"growth_rate":${m2},"type":11},"11":{"amount":${n1},"growth_rate":${n2},"type":12}}&liablity={"0":{"amount":${o1},"interest_rate":${o2},"type":1},"1":{"amount":${p1},"interest_rate":${p2},"type":2},"2":{"amount":${q1},"interest_rate":${q2},"type":3},"3":{"amount":${r1},"interest_rate":${r2},"type":4},"4":{"amount":${s1},"interest_rate":${s2},"type":5},"5":{"amount":${t1},"interest_rate":${t2},"type":6},"6":{"amount":${u1},"interest_rate":${u2},"type":7}}`

   $.ajax({
      type: "POST",
      url: url_string,
      // url: `http://wealthsurance.com/calculators/?calculator=net&session_id=prasad123&ip_address=139.5.30.66&current_age=35&retirement_age=65&asset={"0" : {"amount" : 500000, "growth_rate" : 2, "type" : 0}}&liablity={"0" : {"amount" : 400000, "interest_rate" : 10, "type" : 1}, "1" : {"amount" : 30000, "interest_rate" : 20, "type" : 2}}`,
      // url: `http://wealthsurance.com/calculators/?calculator=net&session_id=prasad123&ip_address=139.5.30.66&current_age=${a}&retirement_age=${b}&asset={'0':{'amount':${c1},'growth_rate':${c2},'type':1},'1':{'amount':${d1},'growth_rate':${d2},'type':2},'2':{'amount':${e1},'growth_rate':${e2},'type':3},'3':{'amount':${f1},'growth_rate':${f2},'type':4},'4':{'amount':${g1},'growth_rate':${g2},'type':5},'5':{'amount':${h1},'growth_rate':${h2},'type':6},'6':{'amount':${i1},'growth_rate':${i2},'type':7},'7':{'amount':${j1},'growth_rate':${j2},'type':8},'8':{'amount':${k1},'growth_rate':${k2},'type':9},'9':{'amount':${l1},'growth_rate':${l2},'type':10},'10':{'amount':${m1},'growth_rate':${m2},'type':11},'11':{'amount':${n1},'growth_rate':${n2},'type':12},}&liablity={'0':{'amount':${o1},'interest_rate':${o2},'type':1},'1':{'amount':${p1},'interest_rate':${p2},'type':2},'2':{'amount':${q1},'interest_rate':${q2},'type':3},'3':{'amount':${r1},'interest_rate':${r2},'type':4},'4':{'amount':${s1},'interest_rate':${s2},'type':5},'5':{'amount':${t1},'interest_rate':${t2},'type':6},'6':{'amount':${u1},'interest_rate':${u2},'type':7},}`,      

      success: (x) => {
         console.log(url_string)
         console.log(x);
         // let result = JSON.parse(x);
         // if (result.success) {
         //    // localStorage.setItem("ann_result", JSON.stringify(result.data));

         //    console.log(result)
         // } else {
         //    console.log(result + "request not successful");
         // }
      },
      error: (error) => {
         console.log(error);
      },
   });
}

function populateTable() {
   $(".nw-table input, nw-results-table input").val(0);
   return;
}
function hideTable() {
   $(".nw-table-container").slideUp(800);
}
function showTable() {
   $(".nw-table-container").slideDown(1000);
}

function page1LocalStorage() {
   //check for existing localStorage on page load
   if (localStorage.getItem("nwpg1") != null) {
      nw.page1 = JSON.parse(localStorage.getItem("nwpg1"));
      $("#nwpg1e1").val(nw.page1[0]);
      $("#nwpg1e2").val(nw.page1[1]);
   }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("nwpg1") != null) {
         localStorage.removeItem("nwpg1");
         nw.page1 = [];
      }

      $(".next-btn").one("click", () => {
         nw.page1 = [];
         nw.page1.push($("#nwpg1e1").val());
         nw.page1.push($("#nwpg1e2").val());

         localStorage.setItem("nwpg1", JSON.stringify(nw.page1));
      });
   });
}

function page2LocalStorage() {
   // populateTable()
   //check for existing localStorage on page load
   if (localStorage.getItem("nwpg2") != null) {
      nw.page2 = JSON.parse(localStorage.getItem("nwpg2"));
      let [z] = nw.page2;
      $("#nwpg2r1c1").val(z.primary_income[0]);
      $("#nwpg2r1c2").val(z.primary_income[1]);

      $("#nwpg2r2c1").val(z.real_estate[0]);
      $("#nwpg2r2c2").val(z.real_estate[1]);

      $("#nwpg2r3c1").val(z.vehicles[0]);
      $("#nwpg2r3c2").val(z.vehicles[1]);

      $("#nwpg2r4c1").val(z.household[0]);
      $("#nwpg2r4c2").val(z.household[1]);

      $("#nwpg2r5c1").val(z.retirement_accounts[0]);
      $("#nwpg2r5c2").val(z.retirement_accounts[1]);

      $("#nwpg2r6c1").val(z.stock[0]);
      $("#nwpg2r6c2").val(z.stock[1]);

      $("#nwpg2r7c1").val(z.bonds[0]);
      $("#nwpg2r7c2").val(z.bonds[1]);

      $("#nwpg2r8c1").val(z.life_insurance_cash[0]);
      $("#nwpg2r8c2").val(z.life_insurance_cash[1]);

      $("#nwpg2r9c1").val(z.annuity[0]);
      $("#nwpg2r9c2").val(z.annuity[1]);

      $("#nwpg2r10c1").val(z.bank_accounts[0]);
      $("#nwpg2r10c2").val(z.bank_accounts[1]);

      $("#nwpg2r11c1").val(z.cash[0]);
      $("#nwpg2r11c2").val(z.cash[1]);

      $("#nwpg2r12c1").val(z.other[0]);
      $("#nwpg2r12c2").val(z.other[1]);
   }
   // else{
   //    populateTable()
   // }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("nwpg2") != null) {
         localStorage.removeItem("nwpg2");
         nw.page2 = [];
      }

      $(".next-btn").one("click", () => {
         nw.page2 = [];

         const obj = {
            primary_income: [$("#nwpg2r1c1").val(), $("#nwpg2r1c2").val()],
            real_estate: [$("#nwpg2r2c1").val(), $("#nwpg2r2c2").val()],

            vehicles: [$("#nwpg2r3c1").val(), $("#nwpg2r3c2").val()],

            household: [$("#nwpg2r4c1").val(), $("#nwpg2r4c2").val()],

            retirement_accounts: [$("#nwpg2r5c1").val(), $("#nwpg2r5c2").val()],

            stock: [$("#nwpg2r6c1").val(), $("#nwpg2r6c2").val()],

            bonds: [$("#nwpg2r7c1").val(), $("#nwpg2r7c2").val()],

            life_insurance_cash: [$("#nwpg2r8c1").val(), $("#nwpg2r8c2").val()],
            annuity: [$("#nwpg2r9c1").val(), $("#nwpg2r9c2").val()],
            bank_accounts: [$("#nwpg2r10c1").val(), $("#nwpg2r10c2").val()],
            cash: [$("#nwpg2r11c1").val(), $("#nwpg2r11c2").val()],
            other: [$("#nwpg2r12c1").val(), $("#nwpg2r12c2").val()],
         };

         nw.page2.push(obj);

         localStorage.setItem("nwpg2", JSON.stringify(nw.page2));
      });
   });
}

function page3LocalStorage() {
   //check for existing localStorage on page load
   // populateTable()
   if (localStorage.getItem("nwpg3") != null) {
      nw.page3 = JSON.parse(localStorage.getItem("nwpg3"));
      let [z] = nw.page3;
      $("#nwpg3r1c1").val(z.primary_mortgage[0]);
      $("#nwpg3r1c2").val(z.primary_mortgage[1]);

      $("#nwpg3r2c1").val(z.other_mortgage[0]);
      $("#nwpg3r2c2").val(z.other_mortgage[1]);

      $("#nwpg3r3c1").val(z.vehicle_loans[0]);
      $("#nwpg3r3c2").val(z.vehicle_loans[1]);

      $("#nwpg3r4c1").val(z.student_loans[0]);
      $("#nwpg3r4c2").val(z.student_loans[1]);

      $("#nwpg3r5c1").val(z.creditCard_debts[0]);
      $("#nwpg3r5c2").val(z.creditCard_debts[1]);

      $("#nwpg3r6c1").val(z.personal_loans[0]);
      $("#nwpg3r6c2").val(z.personal_loans[1]);

      $("#nwpg3r7c1").val(z.other_loans[0]);
      $("#nwpg3r7c2").val(z.other_loans[1]);
   }
   // else{
   //    populateTable()
   // }

   //push to local storage
   $(":input").change(() => {
      if (localStorage.getItem("nwpg3") != null) {
         localStorage.removeItem("nwpg3");
         nw.page3 = [];
      }

      $(".next-btn").one("click", () => {
         nw.page3 = [];

         const obj = {
            primary_mortgage: [$("#nwpg3r1c1").val(), $("#nwpg3r1c2").val()],
            other_mortgage: [$("#nwpg3r2c1").val(), $("#nwpg3r2c2").val()],

            vehicle_loans: [$("#nwpg3r3c1").val(), $("#nwpg3r3c2").val()],

            student_loans: [$("#nwpg3r4c1").val(), $("#nwpg3r4c2").val()],

            creditCard_debts: [$("#nwpg3r5c1").val(), $("#nwpg3r5c2").val()],

            personal_loans: [$("#nwpg3r6c1").val(), $("#nwpg3r6c2").val()],

            other_loans: [$("#nwpg3r7c1").val(), $("#nwpg3r7c2").val()],
         };

         nw.page3.push(obj);

         localStorage.setItem("nwpg3", JSON.stringify(nw.page3));
      });
   });
}

function next() {
   //  change next button's action
   $(".next-btn").on("click", () => {
      function loaderPromise() {
         let update = new Promise((resolve) => {
            resolve(updateLoader(3, 3));
         });

         return update;
      }

      loaderPromise().then(() => {
         setTimeout(() => {
            //----- @ajax -----
            pushToDatabase1(nw);
            console.log(nw);
            // ------------------
            window.open("netWorth_result.html", "_self");
         }, 1410);
      });
   });

   //change the functionality back when back button is pressed
   $(".prev-btn").on("click", () => {
      $(".next-btn")
         .text("Next")
         .off()
         .on("click", () => {
            mySiema.next();
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
      console.log(nw.results);
      //   ----------
   });
}

function storeRecalculate() {
   //not to be stored in local storage
   let assets = {
      label: "assets",
      primary_income: [$("#nwresultp1r1c1").val(), $("#nwresultp1r1c2").val()],
      real_estate: [$("#nwresultp1r2c1").val(), $("#nwresultp1r2c2").val()],
      vehicles: [$("#nwresultp1r3c1").val(), $("#nwresultp1r3c2").val()],
      household: [$("#nwresultp1r4c1").val(), $("#nwresultp1r4c2").val()],
      retirement_accounts: [
         $("#nwresultp1r5c1").val(),
         $("#nwresultp1r5c2").val(),
      ],
      stock: [$("#nwresultp1r6c1").val(), $("#nwresultp1r6c2").val()],
      bonds: [$("#nwresultp1r7c1").val(), $("#nwresultp1r7c2").val()],
      life_insurance_cash: [
         $("#nwresultp1r8c1").val(),
         $("#nwresultp1r8c2").val(),
      ],
      annuity: [$("#nwresultp1r9c1").val(), $("#nwresultp1r9c2").val()],
      bank_accounts: [$("#nwresultp1r10c1").val(), $("#nwresultp1r10c2").val()],
      cash: [$("#nwresultp1r11c1").val(), $("#nwresultp1r11c2").val()],
      other: [$("#nwresultp1r12c1").val(), $("#nwresultp1r12c2").val()],
   };

   let liabilities = {
      label: "liabilities",
      primary_mortgage: [
         $("#nwresultp2r1c1").val(),
         $("#nwresultp2r1c2").val(),
      ],
      other_mortgage: [$("#nwresultp2r2c1").val(), $("#nwresultp2r2c2").val()],
      vehicle_loans: [$("#nwresultp2r3c1").val(), $("#nwresultp2r3c2").val()],
      student_loans: [$("#nwresultp2r4c1").val(), $("#nwresultp2r4c2").val()],
      creditCard_debts: [
         $("#nwresultp2r5c1").val(),
         $("#nwresultp2r5c2").val(),
      ],
      personal_loans: [$("#nwresultp2r6c1").val(), $("#nwresultp2r5c2").val()],
      other_loans: [$("#nwresultp2r7c1").val(), $("#nwresultp2r5c2").val()],
   };

   nw.results.push(assets);
   nw.results.push(liabilities);
}
