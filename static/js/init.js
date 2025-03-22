

// Create arrays of seeds who made it to each round
async function roundArray(year, round, stat){
    const response = await fetch('Data_cleaning/final_df.json');
    const data = await response.json();

    console.log(data)
    // returns team array once resolved
    return new Promise((resolve) => {

        // Encode round name to numeric
            // Explaination:
                // If round selected is 'Sweet Sixteen'
                // Gives teams that lost that in the Sweet Sixteen
                // Not all teams that MADE the Sweet Sixteen
            // To get all teams that made round or better:
                // if (round >= numRound){
        let numRound = false
        if (round == 'Champions') numRound = 6
        else if (round == 'Finals') numRound = 5
        else if (round == 'Final Four') numRound = 4
        else if (round == 'Elite Eight') numRound = 3
        else if (round == 'Sweet Sixteen') numRound = 2
        else if (round == 'Round of 32') numRound = 1
        else if (round == 'Round of 64') numRound = 0

        // Create array of teams for each round made
        let madeToRound = []

        // Loop through each team
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                let team = data[key];
            
                // Add teams' seeds into arrays

                // Check Round
                if (team['Round Finished'] >= numRound){
                    // Check Year
                    if (team['Year'] === year || isNaN(year)){
                        madeToRound.push(parseInt(team[stat]))
                    }

                } 

            }
        }

        console.log('array function', madeToRound)

        const countObject = {};
        for (const element of madeToRound) {
            countObject[element] = (countObject[element] || 0) + 1;
        }
        console.log(countObject)

        resolve(countObject)
    })
}


// Create a histogram of team seeds that have made it to specific round
// x=seed, y=freq
async function createRoundHistogram(year, round, stat){

    // Get array of teams that match dropdown criteria
    let countObj = await roundArray(year, round, stat)
    console.log('histogram', countObj)

    // // Create Histogram
    // let trace = {
    // x: Object.values(countObj),
    // type: 'histogram',
    // xbins: {
    //     start: 1,  
    //     end: 16,   
    //     size: 1     
    // },
    // };

    // let layout = {
    // title: {
    //     text: `Frequncy of ${stat} that made ${round}`
    // },
    // xaxis: {
    //     dtick: 1,
    //     range: [1, 17],
    //     tickvals: Array.from({length: 16}, (_, i) => i + 1.5),
    //     title: {
    //         text: `${stat}`,
    //     }
    // },
    // yaxis: {
    //     title: {
    //     text: 'Frequency'
    //     }
    // },
    // };

    // var data = [trace];
    // Plotly.newPlot('bubble', data, layout);


    // Create Bar Chart
    let trace = {
        x: Object.keys(countObj),  
        y: Object.values(countObj),  
        type: 'bar',
        marker: {
            color: 'light blue',
            line: { width: 1.5 }
        }
    };

    let layout = {
        title: `Frequency of ${stat} that made ${round}`,
        xaxis: {
            title: `${stat}`,
            tickmode: "linear",
            dtick: 1,  // Keep only integer labels
            range: [0.5, 16.5] // Ensure bars are centered
        },
        yaxis: {
            title: 'Frequency'
        },
        bargap: 0.2
    };

    Plotly.newPlot('bubble', [trace], layout);

}


// On Dropdown options changed
function dropdownChanged(year, round, stat){
    createRoundHistogram(parseInt(year), round, stat)
};


// Testing function
function init(year, round, stat){
    dropdownChanged(year, round, stat)
}

// init('2016', 'Elite Eight', 'Seed')





// Order of Functions
    // init(year, round, stat)
        // calls dropdownChanged(year, round, stat)
            // calls createRoundHistogram(year, round, stat)
                // let teamArray = await roundArray(year, round, stat)
            // Graph Updated


// TO DO LIST

// Additional Graphs
    // Add ability to include other stat ratings via another dropdown

// All Columns in Dataset

    // Filters
        // Year: 2008
        // Round Finished: 6

    // Numeric (Histogram)
        // 2P%: "54.8"
        // 2P%D: "40.9"
        // 3P%: "39.9"
        // 3P%D: "34.0"
        // 3PR: "29.2"
        // 3PRD: "38.1"
        // Adj T.: "69.5"
        // AdjDE: 85.9
        // AdjNR: 35.2
        // AdjOE: 121.1
        // DRB: "29.0"
        // EFG%: "56.3"
        // EFGD%: "44.8"
        // FTR: "37.5"
        // FTRD: "30.8"
        // ORB: "38.0"
        // WAB: "+9.9"
        // TOR: "18.7"
        // TORD: "22.9"

    // Categorical (Bar Graph)
        // Rec: "30–3"
        // Conf: "B12"
        // Seed: "1"

    // Not sure how to use?
        // G: "33"
        // School: "Kansas"
        // Barthag: ".9810"


// Stat Definitions
    // CONF	- Conference
    // G - Games
    // REC - Record
    // ADJOE - Adjusted Offensive Efficiency
    // ADJDE - Adjusted Defensive Efficiency
    // BARTHAG - Power Rating (Change of beating average D1 Team)
    // EFG%	- Effective Field Goal Percentage (Offensive)
    // EFGD% - 	Effective Field Goal Percentage (Defensive)
    // TOR - Turnover Percentage (Offensive)
    // TORD	- Turnover Percentage (Defensive)
    // ORB - Rebound Percentage (Offensive)
    // DRB - Rebound Percentage (Defensive)
    // FTR - Free Throw Rate (Offensive)
    // FTRD - Free Throw Rate (Defensive)
    // 2P% - Two Point Percentage (Offensive)
    // 2P%D	- Two Point Percentage (Defensive)
    // 3P% - Three Point Percentage (Offensive)
    // 3P%D - Three Point Percentage (Defensive)
    // 3PR - Three Point Rate (Offensive)
    // 3PRD - Three Point Rate (Defensive)
    // ADJ T. - Adjusted Tempo (Posessions per 40 Minutes)
    // WAB - Wins Above Bubble

async function getStats(){
    const response = await fetch('data/final_df.json');
    const data = await response.json();
    console.log(data[0])

    let stats = ['AdjOE', 'AdjDE', 'Barthag', 'EFG%', 'EFGD%', 'TOR', 'TORD', 'ORB', 'DRB', 'FTR', 'FTRD', '2P%', '2P%D', '3P%', '3P%D', '3PR', '3PRD', 'Adj T.', 'WAB']
    stats.forEach((element) => {
        let statArr = []
        for (const key in data) {
            statArr.push(parseFloat(data[key][element]))
        }
        console.log(`${element}: (${Math.ceil(Math.max(...statArr))} - ${Math.floor(Math.min(...statArr))})`)
    });
    
}
// getStats()
