const x = '❌';
const o = '⚫';
const points = {
	x: 0,
	o: 0,
};
let selected = x;
const empty = '◻';
const basicRow = new Array(3).fill(empty);
let board = [[...basicRow], [...basicRow], [...basicRow]];
let current = [0, 0];
let isXTurn = true;

const isWin = () => {
	const wins = [
		[
			[0, 0],
			[1, 0],
			[2, 0],
		],
		[
			[0, 1],
			[1, 1],
			[2, 1],
		],
		[
			[0, 2],
			[1, 2],
			[2, 2],
		],
		[
			[0, 0],
			[0, 1],
			[0, 2],
		],
		[
			[1, 0],
			[1, 1],
			[1, 2],
		],
		[
			[2, 0],
			[2, 1],
			[2, 2],
		],
		[
			[0, 0],
			[1, 1],
			[2, 2],
		],
		[
			[0, 2],
			[1, 1],
			[2, 0],
		],
	];

	for (let i = 0; i < wins.length; i++) {
		const currentCheck = board[wins[i][0][0]][wins[i][0][1]];
		if (currentCheck !== empty) {
			if (
				currentCheck === board[wins[i][1][0]][wins[i][1][1]] &&
				currentCheck === board[wins[i][2][0]][wins[i][2][1]]
			) {
				console.log(currentCheck, 'has won the game');
				console.log({ currentCheck });
				return currentCheck;
			}
		}
	}
};

const markSelected = toSelect => {
	resetAll();
	const row = document
		.getElementById(toSelect[0])
		.getAttribute('row')
		.split(' ');
	row[toSelect[1]] =
		board[toSelect[0]][toSelect[1]] === empty
			? selected
			: board[toSelect[0]][toSelect[1]];
	document.getElementById(toSelect[0]).setAttribute('row', row.join(' '));
};

const resetAll = () => {
	for (let i = 0; i < 3; i++) {
		document.getElementById(i).setAttribute('row', board[i].join(' '));
	}
};

const flipTurn = () => {
	isXTurn = !isXTurn;
	selected = isXTurn ? '❎' : '⚪';
};

const updatePoints = () => {
	document.getElementById('points').setAttribute('x', points.x);
	document.getElementById('points').setAttribute('o', points.o);
};

const endGame = () => {
	board = new Array(3).fill(new Array(3).fill(empty));
	current = [0, 0];
	markSelected(current);
};

const isDraw = () =>
	!board[0].includes(empty) ||
	!board[1].includes(empty) ||
	!board[2].includes(empty);

document.body.addEventListener('keydown', e => {
	switch (e.key) {
		case 'Escape':
			endGame();
			break;
		case ' ':
		case 'Enter':
			if (board[current[0]][current[1]] === empty) {
				board[current[0]][current[1]] = isXTurn ? x : o;
				let winCheck = isWin();
				console.log({ winCheck });
				if (winCheck) {
					console.log(winCheck);
					if (winCheck === x) points.x++;
					else points.o++;
					endGame();
					updatePoints();
				} else {
					if (isDraw()) {
						endGame();
					} else {
						resetAll();
						flipTurn();
					}
				}
			}
			break;

		case 'ArrowUp':
			if (current[0] === 0) current[0] = 2;
			else current[0] -= 1;
			markSelected(current);
			break;

		case 'ArrowDown':
			if (current[0] === 2) current[0] = 0;
			else current[0] += 1;
			markSelected(current);
			break;

		case 'ArrowRight':
			if (current[1] === 2) current[1] = 0;
			else current[1] += 1;
			markSelected(current);
			break;

		case 'ArrowLeft':
			if (current[1] === 0) current[1] = 2;
			else current[1] -= 1;
			markSelected(current);
			break;

		default:
			break;
	}
});

markSelected(current);
