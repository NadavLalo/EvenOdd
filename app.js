const readline = require('readline-sync');

const gameTurn = (playersData, randomNum, round, winningScore) => {
  const turnWinner = randomNum % 2 === 0 ? playersData.p1 : playersData.p2;

  turnWinner.score++;

  console.log(
    `Round #${round}, random number is ${randomNum}, ${turnWinner.name} scored!`
  );

  console.log(
    `Status: ${playersData.p1.name}: ${playersData.p1.score}, ${playersData.p2.name}: ${playersData.p2.score}`
  );

  if (turnWinner.score === winningScore) {
    console.log(`${turnWinner.name} Wins!`);
  }
};

const startGame = () => {
  const players = {
    p1: {
      name: readline.question('Enter Player 1 Name: \n'),
      score: 0,
    },
    p2: {
      name: readline.question('Enter Player 2 Name: \n'),
      score: 0,
    },
  };

  const bestOf = readline.question('Best of how many?');
  const winningScore = Math.floor(bestOf / 2) + 1;

  let round = 1;

  while (players.p1.score < winningScore && players.p2.score < winningScore) {
    const randomNum = Math.floor(Math.random() * 19) - 5;
    if (randomNum % 2 === 0) {
      gameTurn(players, players[0], randomNum, round, winningScore);
    } else {
      gameTurn(players, players[1], randomNum, round, winningScore);
    }
    round++;
  }
};

const getPlayers = (numOfPlayers = 2) => {
  const players = [];
  for (let i = 1; i <= numOfPlayers; i++) {
    const playerInfo = {
      name: readline.question(`Enter Player ${i} Name: \n`),
      score: 0,
    };
    players.push(playerInfo);
  }
  return players;
};

const startTournemant = () => {
  let numOfPlayers = +readline.question('Enter how many players: \n');
  while (numOfPlayers < 2 || numOfPlayers > 7 || isNaN(numOfPlayers)) {
    numOfPlayers = +readline.question(
      'Players amount must be between 2 and 7. Please try again \n'
    );
  }

  const players = getPlayers(numOfPlayers);
  const bestOf = readline.question('Best of how many?');
  const winningScore = Math.floor(bestOf / 2) + 1;
  let highestScore = 0;
  let round = 1;

  while (highestScore < winningScore) {
    const randomPlayer1Idx = Math.floor(Math.random() * players.length);
    const randomPlayer2Idx = Math.floor(Math.random() * players.length);

    if (randomPlayer1Idx === randomPlayer2Idx) continue;

    const participants = {
      p1: players[randomPlayer1Idx],
      p2: players[randomPlayer2Idx],
    };

    const randomNum = Math.floor(Math.random() * 19) - 5;
    gameTurn(participants, randomNum, round, winningScore);

    if (players[randomPlayer1Idx].score > highestScore) {
      highestScore = players[randomPlayer1Idx].score;
    } else if (players[randomPlayer2Idx].score > highestScore) {
      highestScore = players[randomPlayer2Idx].score;
    }
    round++;
  }
};

startGame();

// startTournemant();
