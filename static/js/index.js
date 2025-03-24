
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
for (let year = 2024; year >= 1939; year--) {
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
    'CONF - Conference',
    'G - Games',
    'REC - Record',
    'ADJOE - Adjust Offensive Efficiency',
    'ADJDE - Adjusted Defensive Efficiency',
    'BARTHAG - Power Rating (Change of beating average D1 Team)',
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
    'ADJ T. - Adjusted Tempo (Posessions per 40 Minutes)',
    'WAB - Wins Above Bubble'
]
stats.forEach((stat) => {
    abbr = stat.split(' - ')[0]
    statsDropdown.append('option')
        .attr('value', abbr) // Use the part before the " - " as value
        .text(stat); // Set the text to the full stat description
});


// --------------------------------------------------------------------------
// FUNCTION - CURATE/UPDATE PLOT(S) WHEN DROPDOWNs IS CHOSEN 
// --------------------------------------------------------------------------

// function when all dropdowns are chosen & button is clicked
function submit(){
    year = document.getElementById('yearDropdown').value
    round = document.getElementById('roundDropdown').value
    stat = 'Seed'
    // stat = document.getElementById('statsDropdown').value
    init(year, round, stat) // ethan
    console.log('did it work')
    // let ethanPlotTitle = `ethan this is the title placeholder for ur plot lalala`;
    // document.getElementById('ethanPlot').innerHTML = ethanPlotTitle;
};


