
// --------------------------------------------------------------------------
// CREATE BRACKET DROPDOWN
// --------------------------------------------------------------------------

// fetch past bracket images
bracketData = {}
function loadPastBracketData() {
    fetch('static/webpage_stuff/past_brackets.txt')
        .then(response => response.text()) // Get the text content
        .then(data => {
        try {
            bracketData = JSON.parse(data); // Parse the text as JSON
            console.log("Bracket data loaded: ", bracketData);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
        })
        .catch(error => {
        console.error('Error fetching the file:', error);
        });
}

// identify dropdown location in index.html & create dropdown
let bracketDropdown = d3.select('#bracketDropdown');
for (let year = 2025; year >= 1939; year--) {
    bracketDropdown.append("option").text(year)
};

// function to launch image
function bracketImage(){
    year = document.getElementById('bracketDropdown').value;
    console.log(year);
    if (bracketData[year]) {
        document.getElementById('bracket').src = bracketData[year];
        console.log('Updated image link:', bracketData[year]);
        // make border styling visible
        document.querySelector('#bracket').classList.add('visible');
    } else if (year==2025) {
        document.getElementById('bracket').src = 'https://www.ncaa.com/_flysystem/public-s3/styles/original/public-s3/images/2025/03/24/2025-mens-sweet-16-bracket.jpg?itok=7Kc2ZHkf';
        document.querySelector('#bracket').classList.add('visible');
    } else {
        console.log('Bracket data for the selected year not loaded yet.');
    }
    
}

// load data
loadPastBracketData();

// --------------------------------------------------------------------------
// CREATE YEAR, ROUND, & STAT DROPDOWNS
// --------------------------------------------------------------------------

// identify each dropdown's location in index.html & create dropdown

// year 
let yearDropdown = d3.select('#yearDropdown');
for (let year = 2008; year < 2025; year++) {
    yearDropdown.append("option").text(year)
};

// round
let roundDropdown = d3.select('#roundDropdown');
let rounds = ['Round of 64', 'Round of 32', 'Sweet Sixteen', 'Elite Eight', 'Final Four', 'Finals', 'Champions'];
rounds.forEach((round) => {
    roundDropdown.append("option")
        .text(round)
});

// stats
let statsDropdown = d3.select('#statsDropdown');
let stats = [
    'Conf - Conference',
    'Seed',
    'AdjOE - Adjust Offensive Efficiency',
    'AdjDE - Adjusted Defensive Efficiency',
    'Barthag - Power Rating (Change of beating average D1 Team)',
    'EFG% - Effective Field Goal Percentage (Offensive)',
    'EFGD% -  Effective Field Goal Percentage (Defensive)',
    'TOR - Turnover Percentage (Offensive)',
    'TORD - Turnover Percentage (Defensive)',
    'ORB - Rebound Percentage (Offensive)',
    'DRB - Rebound Percentage (Defensive)',
    'FTR - Free Throw Rate (Offensive)',
    'FTRD - Free Throw Rate (Defensive)',
    '2P% - Two Point Percentage (Offensive)',
    '2P%D - Two Point Percentage (Defensive)',
    '3P% - Three Point Percentage (Offensive)',
    '3P%D - Three Point Percentage (Defensive)',
    '3PR - Three Point Rate (Offensive)',
    '3PRD - Three Point Rate (Defensive)',
    'Adj T. - Adjusted Tempo (Posessions per 40 Minutes)',
    'WAB - Wins Above Bubble'
]
stats.forEach((stat) => {
    abbr = stat.split(' - ')[0]
    statsDropdown.append('option')
        .attr('value', abbr) // Use the part before the " - " as value
        .text(stat); // Set the text to the full stat description
});


// --------------------------------------------------------------------------
// FUNCTION - CURATE/UPDATE PLOT(S) WHEN DROPDOWN IS CHOSEN 
// --------------------------------------------------------------------------

// function when all dropdowns are chosen & button is clicked
function submit(){
    year = document.getElementById('yearDropdown').value
    round = document.getElementById('roundDropdown').value
    stat = document.getElementById('statsDropdown').value
    init(year, round, stat)
    console.log('did it work')
    // let ethanPlotTitle = `ethan this is the title placeholder for ur plot lalala`;
    // document.getElementById('ethanPlot').innerHTML = ethanPlotTitle;
};






// let currentZoom = 1;
// let minZoom = 1;
// let maxZoom = 3;
// let stepSize = 0.1;

// let container = document.getElementById("image-container");

// function zoomImage(direction)
// {
//     let newZoom = currentZoom + direction * stepSize;

//     // Limit the zoom level to the minimum and maximum
//     // values
//     if (newZoom < minZoom || newZoom > maxZoom) {
//         return;
//     }

//     currentZoom = newZoom;

//     // Update the CSS transform of the image to scale it
//     let image
//         = document.querySelector("#image-container img");
//     image.style.transform = "scale(" + currentZoom + ")";
// }

// container.addEventListener("click", function(event) {
//     // Zoom in or out based on the scroll direction
//     let direction = event.deltaY > 0 ? -1 : 1;
//     zoomImage(direction);
// });