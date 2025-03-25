

// Return array or object criteria from dropdown menus
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
    let roundArr = []
    // Loop through each team
    for (const key in data) {
        let team = data[key];
    
        // Add teams' stat into arrays
        // Check Round
        if (team['Round Finished'] >= numRound){
            // Check Year
            if (team['Year'] === year || isNaN(year)){
                roundArr.push(parseFloat(team[stat]))
            }
        }
    }

    // Histogram uses array of values, Bar uses Object containing frequencies
    if (graphType === 'hist'){return (roundArr)}
    else{
        const countObject = {};
        for (const element of roundArr) {
            countObject[element] = (countObject[element] || 0) + 1;
        }
        return (countObject)
    }
}


// Returns a title that makes sense for dropdowns selected
function titleOption(year, round, stat){

    console.log('title options', round)
    let editedRound = ''
    if (round == 'Champions') {
        if (parseInt(year)) editedRound = 'tournament champion'
        else editedRound = 'tournament champions'
    } else editedRound = `teams the made the ${round}`

    let editedYear = ''
    if (parseInt(year)) editedYear = `in ${year}`
    else editedYear = 'from 2008 - 2024'

    return `${stat} of ${editedRound} ${editedYear}`
}


// Create a bar graph of team seeds for year and round selected
// Seed only
async function createBar(year, round, stat){

    try {
        // Get object of team stats and frequencies that match dropdown criteria
        let countObj = await roundArray(year, round, stat, 'bar')

        // Create Bar Chart
        let trace = {
            x: Object.keys(countObj),  // Category
            y: Object.values(countObj),  // Number of teams in category
            type: 'bar',
            marker: {
                color: 'light blue',
                line: { width: 1.5 }
            },
            // text: Object.values(countObj),  // Use y-values as hover text
            // hoverinfo: Object.values(countObj),  // Show only the text values (frequency)
        };

        // Format Bar Chart
        let layout = {
            title: {
                text: titleOption(year, round, stat)
            },
            xaxis: {
                title: {
                    text: stat,
                },
                tickmode: "linear",
                range: [0.5, 16.5]
            },
            yaxis: {
                title: {
                    text: 'Frequency'
                }
            },
            bargap: 0.2
        };

        // Display chart
        Plotly.newPlot('bubble', [trace], layout);
        console.log([trace], layout)
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
        let teamArr = await roundArray(year, round, stat, 'hist');
        
        // Create Histogram
        let trace = {
            x: teamArr,
            type: 'histogram',
            xbins: {
                start: Math.floor(Math.min(...teamArr)),
                end: Math.ceil(Math.max(...teamArr)),
                size: (Math.ceil(Math.max(...teamArr)) - Math.floor(Math.min(...teamArr))) / 10
            },
        };

        // Format Histogram
        let layout = {
            title: {
                text: titleOption(year, round, stat)
            },
            xaxis: {
                title: {
                    text: `${stat}`,
                }
            },
            yaxis: {
                title: {
                text: 'Frequency'
                }
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
init('2024', 'Round of 32', 'Seed')





// TO DO
// Make sure labels so makes sense with each dropdown option
// Fix hover information
// Color graph 
// Change other formatting?
// Use of delete Conf option

