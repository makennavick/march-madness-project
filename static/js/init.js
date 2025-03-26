

// Return array or object based off of criteria from dropdown menus
async function roundArray(year, round, stat, graphType){

    // Fetch the json data
    const response = await fetch('Data_cleaning/final_df.json');
    const data = await response.json();

    // Encode round name to numeric
    let numRound = false
    if (round == 'Champions') numRound = 6
    else if (round == 'Finals') numRound = 5
    else if (round == 'Final Four') numRound = 4
    else if (round == 'Elite Eight') numRound = 3
    else if (round == 'Sweet Sixteen') numRound = 2
    else if (round == 'Round of 32') numRound = 1
    else if (round == 'Round of 64') numRound = 0

    // Create array of teams for each round made
    let criteriaArr = [] // Teams that meet dropdown criteria
    let allYearsArr = [] // From all years to keep x-axis bounds constant

    // Loop through each team
    for (const key in data) {
        let team = data[key];
    
        // Add teams' stat into arrays
        allYearsArr.push(parseFloat(team[stat]))
        // Check Round
        if (team['Round Finished'] >= numRound){
            // Check Year
            if (team['Year'] === year || isNaN(year)){
                criteriaArr.push(parseFloat(team[stat]))
            }
        }
    }

    // Histogram uses array of values, Bar uses Object containing frequencies
    if (graphType === 'hist'){return {criteriaArr, allYearsArr}}
    else{
        const countObject = {};
        for (const element of criteriaArr) {
            countObject[element] = (countObject[element] || 0) + 1;
        }
        return countObject
    }
}


// Returns a title that makes sense for dropdowns selected
function titleOption(year, round, stat){

    let editedRound = ''
    if (round == 'Champions') {
        if (parseInt(year)) editedRound = 'Tournament Champion'
        else editedRound = 'Tournament Champions'
    } else editedRound = `Teams that Made the ${round}`

    let editedYear = ''
    if (parseInt(year)) editedYear = `in ${year}`
    else editedYear = 'From 2008 - 2024'

    return `${stat} of ${editedRound} ${editedYear}`
}


// Create a bar graph of team seeds for year and round selected
// Seed only
async function createBar(year, round, stat){

    try {
        // Get object of team stats and frequencies that match dropdown criteria
        let countObj  = await roundArray(year, round, stat, 'bar')

        // Create Bar Chart
        let trace = {
            x: Object.keys(countObj),  // Category
            y: Object.values(countObj),  // Number of teams in category
            type: 'bar',
            marker: {
                color: 'rgb(56, 156, 221)', // Bin Color
                line: {
                    color: 'white smoke',  // Border Color
                    width: 1.5        // Border Thickness
                }
            },
            hoverinfo: 'none' // No information on hover
        };

        // Format Bar Chart
        let layout = {
            title: {
                text: titleOption(year, round, stat) // Title of graph
            },
            xaxis: {
                title: {
                    text: stat, // x-axis title
                },
                tickmode: "linear", // Constant width of bins
                range: [0.1, 16.9] // Range of bins
            },
            yaxis: {
                title: {
                    text: 'Frequency' // y-axis title
                },
                dtick: 1 // Increment y-axis ticks by 1
            },
            bargap: 0.2 // Gap between bars
        };

        // Display chart
        Plotly.newPlot('bubble', [trace], layout);
    } 
    catch (error) {
        console.error("Error in createHist:", error); // log if error in fetching data
    }
}


// Create a Histogram of team stat for year and round selected
// Continuous data only
async function createHist(year, round, stat){

    try {
        // Get array of teams that match dropdown criteria
        let {criteriaArr: teamArr, allYearsArr: allYearsData} = await roundArray(year, round, stat, 'hist');

        // Bounds of stat for all years and rounds so x-axis is static
        let start = Math.floor(Math.min(...allYearsData))
        let end = Math.ceil(Math.max(...allYearsData))
        let size = (Math.ceil(Math.max(...allYearsData)) - Math.floor(Math.min(...allYearsData))) / 10

        let tickVals = Array.from({length: 11}, (_, i) => start + i * size); // Array of x-tick values
        let tickText = tickVals.map(val => val.toFixed(1)); // Round values to 1 decimal point

        // Create Histogram
        let trace = {
            x: teamArr,
            type: 'histogram',
            // x-axis bounds
            xbins: {
                start: start,
                end: end,
                size: size
            },
            marker: {
                color: 'rgb(56, 156, 221)', // Bin color
                line: {
                    color: 'white smoke', // Border color
                    width: 1.5 // Border Thickness
                }
            },
            hoverinfo: 'none' // No display on hover
        };

        // Format Histogram
        let layout = {
            title: {
                text: titleOption(year, round, stat) // Graph Title
            },
            xaxis: {
                title: {
                    text: `${stat}`, // x-axis title
                },
                dtick: size, // Tick marks match bin size
                tickmode: "array", // Reads tickVals as array
                tickvals: tickVals,  // Set tick values at bin margins
                ticktext: tickText,   // Labels match bin edges
                range: [start - (size * 0.25), end + (size * 0.25)] // Shifts x-axis in slightly
            },
            yaxis: {
                title: {
                text: 'Frequency' // y-axis title
                },
                dtick: 1 // Increment y-axis ticks by 1
            },
        };

        // Display Histogram
        var data = [trace];
        Plotly.newPlot('bubble', data, layout);

    } 
    catch (error) {
        console.error("Error in createHist:", error); // log if error in fetching data
    }
}


// Create Graph
function init(year, round, stat){
    if (['Conf', 'Seed'].includes(stat)){createBar(parseInt(year), round, stat, 'Bar')} // Categorical statistic, create bar graph
    else createHist(parseInt(year), round, stat, 'Hist') // Numeric statistic, create histogram
}

// Create an initial graph when page is first loaded
init('2024', 'Sweet Sixteen', 'AdjOE')

