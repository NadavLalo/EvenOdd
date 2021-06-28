const readline = require('readline-sync');
const fs = require('fs');
const path = './gameHistory.txt';

const getWinningScore = () => {
  const bestOf = readline.question('Best of how many?');
  const winningScore = Math.floor(bestOf / 2) + 1;

  return { bestOf, winningScore };
};

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
    fs.appendFileSync(
      'gameHistory.txt',
      `${turnWinner.name} Won with a score of ${winningScore} \n`
    );
    return turnWinner;
  }
};

const startGame = () => {
  console.log('One on One Mode');
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

  const winningInfo = getWinningScore();

  let round = 1;

  fs.appendFileSync(
    'gameHistory.txt',
    `${new Date()}\nPlayers: ${players.p1.name}, ${players.p2.name}\nBest of ${
      winningInfo.bestOf
    }\n`
  );

  while (
    players.p1.score < winningInfo.winningScore &&
    players.p2.score < winningInfo.winningScore
  ) {
    const randomNum = Math.floor(Math.random() * 19) - 5;
    gameTurn(players, randomNum, round, winningInfo.winningScore);
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

const bossFight = player => {
  console.log(`${player.name} VS Boss`);
  const players = {
    p1: player,
    p2: { name: 'Boss', score: 0 },
  };
  let winner;
  const winningInfo = getWinningScore();
  fs.appendFileSync(
    'gameHistory.txt',
    `${player.name} VS Boss \nBest of ${winningInfo.bestOf}\n`
  );
  let round = 1;
  while (
    players.p1.score < winningInfo.winningScore &&
    players.p2.score < winningInfo.winningScore
  ) {
    const randomNum = Math.floor(Math.random() * 19) - 5;

    if (randomNum < 0 && randomNum % 2 === 0) continue;
    winner = gameTurn(players, randomNum, round, winningInfo.winningScore);
  }
  console.log(`${winner.name} Wins the game!`);
};

const startTournemant = () => {
  console.log('Tournament Mode');
  let numOfPlayers = +readline.question('Enter how many players: \n');
  while (numOfPlayers < 2 || numOfPlayers > 7 || isNaN(numOfPlayers)) {
    numOfPlayers = +readline.question(
      'Players amount must be between 2 and 7. Please try again \n'
    );
  }

  const players = getPlayers(numOfPlayers);
  const winningInfo = getWinningScore();
  let highestScore = 0;
  let round = 1;

  let winner;

  fs.appendFileSync(
    'gameHistory.txt',
    `${new Date()}\nPlayers: ${JSON.stringify(
      players.map(player => player.name)
    )} \nBest of ${winningInfo.bestOf}\n`
  );
  while (highestScore < winningInfo.winningScore) {
    const randomPlayer1Idx = Math.floor(Math.random() * players.length);
    const randomPlayer2Idx = Math.floor(Math.random() * players.length);

    if (randomPlayer1Idx === randomPlayer2Idx) continue;

    const participants = {
      p1: players[randomPlayer1Idx],
      p2: players[randomPlayer2Idx],
    };

    const randomNum = Math.floor(Math.random() * 19) - 5;
    winner = gameTurn(participants, randomNum, round, winningInfo.winningScore);

    if (players[randomPlayer1Idx].score > highestScore) {
      highestScore = players[randomPlayer1Idx].score;
    } else if (players[randomPlayer2Idx].score > highestScore) {
      highestScore = players[randomPlayer2Idx].score;
    }
    round++;
  }

  bossFight({ ...winner, score: 0 });
};

const init = () => {
  if (fs.existsSync(path)) {
    const fileData = fs.readFileSync(path);
    console.log('Game History');
    console.log(fileData.toString('utf-8'));
  }

  console.log('Choose Game Mode');
  let userChoice = +readline.question(
    'Enter 1 for One on One, or 2 for tournament mode: \n'
  );

  while (userChoice !== 1 && userChoice !== 2) {
    userChoice = +readline.question('Invalid value. Please try again: \n');
  }

  if (userChoice === 1) {
    startGame();
  } else if (userChoice === 2) {
    startTournemant();
  }
};

init();
