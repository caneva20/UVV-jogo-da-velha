const game = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
];

const players = [
    {
        id: "x",
        img: {
            src: "imgs/x.jpg",
            size: {
                x: 200,
                y: 200
            }
        }
    },
    {
        id: "o",
        img: {
            src: "imgs/o.jpg",
            size: {
                x: 200,
                y: 200
            }
        }
    }
];

const winPatterns = [
    [
        [true, true, true],
        [false, false, false],
        [false, false, false],
    ],
    [
        [false, false, false],
        [true, true, true],
        [false, false, false],
    ],
    [
        [false, false, false],
        [false, false, false],
        [true, true, true],
    ],
    [
        [true, false, false],
        [true, false, false],
        [true, false, false],
    ],
    [
        [false, true, false],
        [false, true, false],
        [false, true, false],
    ],
    [
        [false, false, true],
        [false, false, true],
        [false, false, true],
    ],
    [
        [true, false, false],
        [false, true, false],
        [false, false, true],
    ],
    [
        [false, false, true],
        [false, true, false],
        [true, false, false],
    ],
];

let currentPlayerIndex = 0;

const gameEl = document.getElementById("game");
gameEl.addEventListener("click", onClick);

function onClick(e) {
    const coord = getCoord(e.target);

    const cell = getCell(coord);

    if (cell !== undefined) {
        console.log("can't play here");
        return;
    }

    let player = players[currentPlayerIndex];

    setCell(coord, player.id);

    addImg(e.target, player.img.src, player.img.size.y, player.img.size.x);

    if (checkWin()) {
        const id = players[currentPlayerIndex].id;

        setTimeout(() => {
            alert(`Player ${id.toUpperCase()} wins!`)

            reload();
        }, 25);
    } else if (checkDraw()) {
        setTimeout(() => {
            alert(`DRAW!`);

            reload();
        }, 25);
    }

    nextPlayer();
}

function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

function getCoord(el) {
    return {
        x: Number(el.getAttribute("coordX")),
        y: Number(el.getAttribute("coordY"))
    };
}

function getCell(coord) {
    return game[coord.y][coord.x];
}

function setCell(coord, value) {
    game[coord.y][coord.x] = value;
}

function checkWin() {
    const id = players[currentPlayerIndex].id;

    outer: for (pattern of winPatterns) {
        for (let y = 0; y < game.length; y++) {
            for (x = 0; x < game[y].length; x++) {
                let required = pattern[y][x];
                let cellId = game[y][x];

                if (required) {
                    if (cellId !== id) {
                        continue outer;
                    }
                }
            }
        }

        return true;
    }

    return false;
}

function checkDraw() {
    return !game.flat().any(el => el === undefined);
}

function reload() {
    window.location = window.location;
}

function addImg(parent, src, height, width) {
    let el = document.createElement("img");

    el.setAttribute('src', src);
    el.setAttribute('alt', 'na');
    el.setAttribute('height', height);
    el.setAttribute('width', width);

    parent.appendChild(el);
}