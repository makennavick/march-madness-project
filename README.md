# Sweet 16 Predictions

## Project overview
GOAL - predicting March Madness Sweet 16 outcome


## Repo

### Project Proposal
[Project proposal](projectProposal.md)


### Data Cleaning (DuVoe Moua)
1. Initial Table Extraction
&nbsp;- Used pandas.read_html() to retrieve HTML tables for a given year from the BartTorvik team stats page.
&nbsp;- Selected the first table and dropped the multi-level column index for simplicity.

2. Team Filtering
&nbsp;- Filtered the dataset to only include rows where the Team name contains "seed" (indicating NCAA tournament participants).

3. Column Cleaning
&nbsp;- Identified statistical columns that included extra ranking/notes (e.g., "121.1 2") and extracted only the main value.
&nbsp;- Columns cleaned include:
&nbsp;&nbsp;- Efficiency (AdjOE, AdjDE)
&nbsp;&nbsp;- Shooting percentages (EFG%, 2P%, 3P%, etc.)
&nbsp;&nbsp;- Turnover rates, rebound rates, tempo, and others.

4. Text Extraction
&nbsp;- Using regex, extracted additional structured information from the Team field:
&nbsp;&nbsp;- School Name – e.g., "Kansas" from "Kansas 1 seed, CHAMPS"
&nbsp;&nbsp;- Seed – e.g., "1"
&nbsp;&nbsp;- Round Finished – e.g., "CHAMPS", "Final Four", etc.

5. Loop Through All Years (2008–2025)
&nbsp;- Repeated the above process for each year and stored the cleaned DataFrame in a list.
&nbsp;- Combined all yearly data using pd.concat().

6. Added new metrics and values
&nbsp;- Adjusted Net Rating (AdjNR) = AdjOE - AdjDE
&nbsp;- Converted Round Finished to a numeric scale for modeling or ranking purposes:
&nbsp;&nbsp;- R68/R64: 0
&nbsp;&nbsp;- R32: 1
&nbsp;&nbsp;- Sweet Sixteen: 2
&nbsp;&nbsp;- Elite Eight: 3
&nbsp;&nbsp;- Final Four: 4
&nbsp;&nbsp;- Finals: 5
&nbsp;&nbsp;- CHAMPS: 6
&nbsp;- Cleared "Round Finished" data for 2025 since the tournament hasn’t concluded.

7. Final dataframe
&nbsp;- Used only columns needed in new dataframe.

8. Export
&nbsp;- Saved the final DataFrame to:
&nbsp;&nbsp;- barttorvik_all_years.csv
&nbsp;&nbsp;- final_df.json

### Webpage Design (Makenna Vick)




### Yearly Statistic Visualizations (Ethan Donoho)
The init.js file contains all the code for creating visualization under the 'Yearly Stats' section of the webpage. On the webpage, once the 'Year', 'Round', and 'Stat' dropdowns have all been selected and the 'Generate Plot' button has been pushed, the init.js file will use the selected criteria to create the corresponding visualization. The 'Year' dropdown selects which year's tournament the histogram will display. The 'Round' dropdown will display all teams that has made it to at least the chosen round in the tournament. The 'Stat' dropdown will determine which statistic will be displayed for each team that meets the given year and round. A histogram or bar graph is created displaying the given criteria. This file fetches data from the final_df.json file, found in the Data Cleaning folder of the repository. 


### Deep Learning Model (Zach Rehfuss)
- In the folder, zachs_models, are three jupyter notebooks titled, that house my Logistic regression model, my Neural network for the Sweet 16 Prediction and the my neural network with our Elite 8 prediction. There is also a png which shows a graph of the Neural Network’s prediction for the likelihood a team makes the sweet 16. For the creation of the model I began with a logistic regression to see how precise the model could be. At a glance the model looked pretty good because it was 75% accurate however when I printed the Model’s predictions I realized it was only guessing 0’s as the data was too complex for the model to feel comfortable making predictions. I then created a Neural Network. I split the Record column into Wins and losses as I realized it was reading 30-3 as a string rather than 30 wins and 3 losses. I also removed the school and conference columns as leaving them in created far too many parameters for the model to efficiently and effectively run. I then used Matplotlib to plot the graph and saved it as a PNG.

- For creating this code, The Xpert learning assistant helped me with the syntax of the list comprehension. My teacher Thomas helped with the creation of my function model by helping with the formatting to add the model’s accuracy and precision as well as how to maximize the model with the hypermode.build function. The TA Joly also helped me with plotting the graph as I was running into issues with the graph being sorted properly and having the probability tied to the school.


### Offensive and Defensive Statistical Analysis (Jonathan Bidon)
The Jupyter Notebook file March_Madness_Analysis.ipynb uses Pandas, Seaborn, and Matplotlib libraries. The key objective of this analysis was to determine whether offense or defense has a stronger impact on how far a team gets in the tournament.\

We compared offensive and defensive in-season metrics with how how far teams ended up, then we identified which specific metrics are most correlated with overall efficiency, both offensively and defensively. Throughout this process, we also visualized the trends and patterns to highlight what separates good teams from the great ones.\

We found that offensive efficiency had a 0.46 correlation to tournament success and defensive efficiency had a 0.40 correlation. While top-tier defense does seem to be a baseline requirement for tournament success, our analysis found that elite offensive efficiency often serves as the differentiating factor among championship contenders.


### Statistical Visualizations (Chandara In)
In the project, I utilized the barttorvik_all_years.csv to create visualizations by using Tableau. These dashboards help to analyze tournament trends, team performances, historical upsets and predictions. Within the dashboards, it can creates different type visualizations on how the teams advance through the rounds and compare the teams based on the point per game, defensive efficiency. It also displays past winners and their paths to the championship.\

Interactive Dashboards are used to filter by year, team, region or round and also integrate real time date for live tournament tracking. The graphs are shown to help the fans to see the results of each


## Resources
https://barttorvik.com/#
https://stackoverflow.com/questions/32400867/pandas-read-csv-from-url
https://stackoverflow.com/questions/22233488/pandas-drop-a-level-from-a-multi-level-column-index
https://stackoverflow.com/questions/68549433/pandas-drop-rows-that-do-not-contains-a-list-of-strings
https://stackoverflow.com/questions/69728541/pandas-str-extract-use-regex-to-select-all-letters-from-a-string-only-returning
https://www.reddit.com/r/datascience/comments/vxa0uc/pdread_html_vs_beautifulsoup/
https://www.reddit.com/r/datascience/comments/vxa0uc/pdread_html_vs_beautifulsoup/
https://scrapingant.com/blog/pandas-read-html-table
