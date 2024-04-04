'use strict';

let mainColorInput = document.querySelector('#main-color');
let alternateColorInput = document.querySelector('#alternate-color');
let gridSize = 16;
let gridWH = 512;
let color = mainColorInput.value;
let alternateColor = alternateColorInput.value;

const grid = document.querySelector('.grid-container');
grid.style.width = gridWH + 'px';
grid.style.height = gridWH + 'px';

document.oncontextmenu = () => false;
document.querySelector('#reset').addEventListener('click', reset);
mainColorInput.addEventListener('input', changeMainColor);
alternateColorInput.addEventListener('input', changeAlternateColor);

for (let i = 0; i < gridSize * gridSize; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.width = gridWH / gridSize + 'px';
    cell.style.height = gridWH / gridSize + 'px';
    cell.addEventListener('mousedown', fillCell);
    cell.addEventListener('mouseover', fillCell);
    grid.appendChild(cell);
}

function fillCell(event) {
    event.preventDefault();
    if (event.buttons === 1) {
        event.target.style.backgroundColor = color;
        event.target.style.borderColor = color;
    } else if (event.buttons === 2) {
        event.target.style.backgroundColor = alternateColor;
        event.target.style.borderColor = alternateColor;
    }
}

function reset() {
    document.querySelectorAll('.cell').forEach((i) => {
        i.style.backgroundColor = 'white';
        i.style.borderColor = 'black';
    });
}

function changeMainColor() {
    color = mainColorInput.value;
}

function changeAlternateColor() {
    alternateColor = alternateColorInput.value;
}
