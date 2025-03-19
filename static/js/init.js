// --------------------------------------------------------------------------
// CREATE YEAR & ROUND DROPDOWNS
// --------------------------------------------------------------------------

// // Flag to track if the dropdown has been changed at least once
// let isFirstChange = true;

// document.getElementsByClassName('dropdown').addEventListener('change', function() {
//     if (isFirstChange) {
//         let main = document.querySelector('.main');
        
//         // Add the 'visible' class to show the .main
//         main.classList.add('visible');
        
//         // Set the flag to false so it doesn't toggle again
//         isFirstChange = false;
//     }
// });

// create the year array
let years = []
for (let year = 2008; year < 2025; year++) {
    years.push(year)
};

// identify its location in index.html
let yearDropdown = d3.select('#yearDropdown');

// create dropdown
years.forEach((year) => {
    let chosen = yearDropdown.append("option")
    chosen.text(year)
});


// create the round array
let rounds = ['64', '32', 'Sweet Sixteen', 'Elite Eight', 'Final Four', 'Finals', 'Winner']

// identify its location in index.html
let roundDropdown = d3.select('#roundDropdown');

// create dropdown
rounds.forEach((round) => {
    let chosen = roundDropdown.append("option")
    chosen.text(round)
})

  
// --------------------------------------------------------------------------
// FUNCTION - CURATE/UPDATE PLOT(S) WHEN DROPDOWN YEAR IS CHOSEN 
// --------------------------------------------------------------------------

// function when an option is chosen from the dropdown
function yearChanged(selectedYear){
  ethanPlot(parseInt(selectedYear)) // ethan
  let ethanPlotTitle = `ethan this is the title placeholder for ur plot lalala`;
  document.getElementById('ethanPlot').innerHTML = ethanPlotTitle;
};


