// 1. Deposite some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount on a single line
// 4. Spin the slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. asking to play again
console.log("Hi Welcome");
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 20,
    B: 10,
    C: 10,
    D: 5
};
const SYMBOLS_VALUES = {
    A: 1,
    B: 2,
    C: 2,
    D: 4
};

const balanceAmount = () => {
    while (true) {
        const dmoney = prompt("Enter deposit money: ");
        const depositeMoney = parseFloat(dmoney);
        if (isNaN(depositeMoney) || depositeMoney <= 0) {
            console.log("Enter a valid amount, please try again!");
        } else {
            return depositeMoney;
        }
    }
};

const numberOfLines = () => {
    while (true) {
        const lines = prompt("Enter number of lines to bet (1-3): ");
        const linesCount = parseFloat(lines);
        if (isNaN(linesCount) || linesCount <= 0 || linesCount > 3) {
            console.log("Enter valid lines, please try again!");
        } else {
            return linesCount;
        }
    }
};

const getBetAmount = (balanceAmount, numberOfLines) => {
    while (true) {
        const bet = prompt("Enter bet amount on single line: ");
        const betAmount = parseFloat(bet);
        const maxBet = balanceAmount / numberOfLines;
        if (isNaN(betAmount) || betAmount <= 0 || betAmount > maxBet) {
            console.log(`Enter a valid amount up to ${maxBet.toFixed(2)} per line!`);
        } else {
            return betAmount;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    const reelSymbols = [...symbols];
    for (let i = 0; i < ROWS; i++) {
        const reel = [];
        for (let j = 0; j < COLS; j++) {
            const symbolIndex = Math.floor(Math.random() * reelSymbols.length);
            reel.push(reelSymbols[symbolIndex]);
            reelSymbols.splice(symbolIndex, 1);
        }
        reels.push(reel);
        console.log(reel);
    }

    return reels;
};

const getResult = (reelMatrix, bet, numberOfLines) => {
    let winngCount = 0;
    let resultSum = 0;
    for (let i = 0; i < numberOfLines; i++) {
        const row = reelMatrix[i];
        const allEqual = row.every(symbol => symbol === row[0]);
        if (allEqual) {
            winngCount += 1;
            resultSum += bet * 2 * SYMBOLS_VALUES[row[0]];
        }
    }
    console.log("Number of wins: " + winngCount);
    return { winngCount, resultSum };
};

const game = () => {
    while (true) {
        let balance = balanceAmount();
        const lines = numberOfLines();
        const bet = getBetAmount(balance, lines);
        balance -= (bet * lines);


        const reelMatrix = spin();
        const { winngCount, resultSum } = getResult(reelMatrix, bet, lines);
        if (winngCount > 0) {
            console.log(`Congrats! You won on ${winngCount} lines, earning $${resultSum}`);
            balance += (resultSum + bet);
        }
        else {
            console.log("Loose😐😥One More Try !!");

        }


        console.log("Your updated balance is: $" + balance);
        if (balance > 0) {
            let ask = prompt("Wanna play again? (y/n): ");
            if (ask.toLowerCase() !== 'y') {
                console.log("Thank you for playing visit agian!!")
                return false;
            }

        } else {
            console.log("Game over! No more balance.");
            return false;
        }
    }
};

game();
