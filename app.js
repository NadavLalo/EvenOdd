const readline = require('readline-sync');

const gameTurn = (playersData, turnWinner, randomNum, round, winningScore) => {
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

const gameStart = () => {
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
        gameTurn(players, players.p1, randomNum, round, winningScore);
      } else {
        gameTurn(players, players.p2, randomNum, round, winningScore);
      }
      round++;
    }
  };