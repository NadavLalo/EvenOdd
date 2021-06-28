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
