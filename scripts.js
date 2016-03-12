var grid = [[0, 0, 0, 0, 0], // 0 = no ship / unclicked
            [0, 0, 0, 0, 0], // 1 = ship / unclicked
            [0, 0, 0, 0, 0], // 2 = no ship / clicked
            [0, 0, 0, 0, 0], // 3 = ship / clicked
            [0, 0, 0, 0, 0]];

var shipLocation = [0, 0];
var score = 0;
var scoreAverage = 0;
var ended = false;

var scores = [];

function loadPage() {
    generateShips();
}

function generateShips() {
    var shipX = Math.floor((Math.random() * 5));
    var shipY = Math.floor((Math.random() * 5));
    var shipID = "" + shipX + shipY;
 //   alert(shipID);
    grid[shipX][shipY] = 1;
    shipLocation = [shipX, shipY];
}

function onClick(id) {
    var clickedShipX = id[0];
    var clickedShipY = id[1];
    if (!ended) {
        if (grid[clickedShipX][clickedShipY] == 1) {
            document.getElementById(id).style.backgroundColor = "red";
            grid[clickedShipX][clickedShipY] = 3;
            score += 20;
            updateScore(score);
            endGame(score);
        } else if(grid[clickedShipX][clickedShipY] == 0) {
            score--;
            updateScore(score);
            document.getElementById(id).style.backgroundColor = "grey";
            grid[clickedShipX][clickedShipY] = 2;
        }
    } else {
        document.getElementById("alertFont").innerHTML = "The game has ended, you got a score of " + score + ".";
    }
}

function updateScore(score) {
    document.getElementById("scoreFont").innerHTML = "<strong>Score: </strong>" + score;
}

function endGame(score) {
    ended = true;
    document.getElementById("alertFont").innerHTML = "The game has ended, you got a score of "+score+".";
}

function reset() {
    if (ended) {
        document.getElementById("scoreListFont").innerHTML = document.getElementById("scoreListFont").innerHTML + "<br />" + score;
        scores[scores.length] = score;
        score = 0;
        updateScore(score);
        averageScore = calculateAverageScore();
        document.getElementById("averageScoresFont").innerHTML = "<strong>Average Score: </strong> " + averageScore;
        for (var o = 0; o < grid.length; o++) {
            for (var i = 0; i < grid.length; i++) {
                var gridID = "" + o + i;
                document.getElementById(gridID).style.backgroundColor = "blue";
                grid[o][i] = 0;
            }
        }
        generateShips();
        document.getElementById("alertFont").innerHTML = "";
        ended = false;
    } else {
        document.getElementById("alertFont").innerHTML = "Please end the game before resetting it."
    }
}

function calculateAverageScore() {
    var totalScores = 0;
    var answer = 0;
    for (var i = 0; i < scores.length; i++) {
        totalScores += scores[i];
    }
    return totalScores / scores.length;
}
