'use strict';

const mainColorInput = document.querySelector('#main-color');
const alternateColorInput = document.querySelector('#alternate-color');
const gridSizeInput = document.querySelector('#grid-size');
const rainbowModeInput = document.querySelector('#rainbow-mode');
const grid = document.querySelector('.grid-container');

let gridWH = 512;
let gridSize = gridSizeInput.value;
let color = mainColorInput.value;
let alternateColor = alternateColorInput.value;

grid.style.width = gridWH + 'px';
grid.style.height = gridWH + 'px';

document.oncontextmenu = () => false;
document.querySelector('#reset').addEventListener('click', reset);
document.addEventListener('DOMContentLoaded', makeGrid);
mainColorInput.addEventListener('input', changeMainColor);
alternateColorInput.addEventListener('input', changeAlternateColor);
gridSizeInput.addEventListener('input', makeGrid);
rainbowModeInput.addEventListener('input', () => {
    mainColorInput.classList.toggle('hidden');
    alternateColorInput.classList.toggle('hidden');
});

function makeGrid() {
    while (grid.firstChild) grid.removeChild(grid.firstChild);
    gridSize = gridSizeInput.value;
    document.querySelector('#grid-size-value').textContent = gridSize + 'x' + gridSize;
    for (let i = 0; i < gridSize * gridSize; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = gridWH / gridSize + 'px';
        cell.style.height = gridWH / gridSize + 'px';
        cell.addEventListener('mousedown', fillCell);
        cell.addEventListener('mouseover', fillCell);
        grid.appendChild(cell);
    }
}

function fillCell(event) {
    event.preventDefault();
    if (event.buttons === 1) {
        if (!rainbowModeInput.checked) {
            event.target.style.backgroundColor = color;
            event.target.style.borderColor = color;
        } else {
            let color = randomColor();
            event.target.style.backgroundColor = color;
            event.target.style.borderColor = color;
        }
    } else if (event.buttons === 2) {
        if (!rainbowModeInput.checked) {
            event.target.style.backgroundColor = alternateColor;
            event.target.style.borderColor = alternateColor;
        } else {
            event.target.style.backgroundColor = 'white';
            event.target.style.borderColor = '#F0F0F0';
        }
    }
}

function reset() {
    document.querySelectorAll('.cell').forEach((i) => {
        i.style.backgroundColor = 'white';
        i.style.borderColor = '#F0F0F0';
    });
}

function changeMainColor() {
    color = mainColorInput.value;
}

function changeAlternateColor() {
    alternateColor = alternateColorInput.value;
}

function randomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}
