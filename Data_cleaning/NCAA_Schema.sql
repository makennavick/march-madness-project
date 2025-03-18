DROP TABLE IF EXISTS NCAA_Tournament_Stats;

CREATE TABLE NCAA_Tournament_Stats (
    Year INT,
    Rk INT,
    School VARCHAR(100),
    Seed_Rank VARCHAR(10),
    Round_Finished VARCHAR(50),
    Conf VARCHAR(10),
    G INT,
    Rec VARCHAR(10),
    AdjOE FLOAT,
    AdjDE FLOAT,
    Barthag FLOAT,
    EFG_ FLOAT,       
    EFGD_ FLOAT,      
    TOR FLOAT,
    TORD FLOAT,
    ORB FLOAT,
    DRB FLOAT,
    FTR FLOAT,
    FTRD FLOAT,
    TwoP_ FLOAT,      
    TwoPD_ FLOAT,     
    ThreeP_ FLOAT,    
    ThreePD_ FLOAT,   
    ThreePR FLOAT,    
    ThreePRD FLOAT,   
    Adj_T FLOAT,
    WAB FLOAT,
    PRIMARY KEY (Year, Rk)
);


SELECT * 
FROM NCAA_Tournament_Stats 
WHERE Year = 2009;