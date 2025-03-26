DROP TABLE IF EXISTS barttorvik_all_years;

CREATE TABLE barttorvik_all_years (
    Year INT,
    Seed INT,
    School VARCHAR(100),
    Round_Finished FLOAT,
    Conf VARCHAR(50),
    G INT,
    Rec VARCHAR(10),
    AdjOE FLOAT,
    AdjDE FLOAT,
    AdjNR FLOAT,
    Barthag FLOAT,
    EFG FLOAT,
    EFGD FLOAT,
    TOR FLOAT,
    TORD FLOAT,
    ORB FLOAT,
    DRB FLOAT,
    FTR FLOAT,
    FTRD FLOAT,
    TwoP FLOAT,      -- Represents 2P%
    TwoPD FLOAT,     -- Represents 2P%D
    ThreeP FLOAT,    -- Represents 3P%
    ThreePD FLOAT,   -- Represents 3P%D
    ThreePR FLOAT,   -- Represents 3PR
    ThreePRD FLOAT,  -- Represents 3PRD
    Adj_T FLOAT,
    WAB FLOAT
);

SELECT *
FROM barttorvik_all_years
WHERE Year = 2023;

SELECT *
FROM barttorvik_all_years
WHERE Seed = 1;
