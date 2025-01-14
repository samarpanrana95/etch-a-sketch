let grid = [];
let currentColor = 'black';
let isClicked = false;
let isEraser = false;
let isRainbow = false;

// to initally set up the grid
updateGrid(144);
updateGridText(12);

let containerButtons = document.querySelector('.container-buttons');
containerButtons.addEventListener("click", (e) => {
    let className = e.target.classList[1];
    if (className == undefined) {
        return;
    }
    switch (className) {
        case 'button-color-mode':
            isEraser = false;
            isRainbow = false;
            currentColor = colorPickerInput.value;
            break;
        case 'button-rainbow-mode':
            isRainbow = true;
            isEraser = false;
            break;
        case 'button-eraser':
            isEraser = true;
            isRainbow = false
            currentColor = '#fff';
            break;
        case 'button-clear':
            let value = rangeUi.value;
            let totalSquares = value * value;
            updateGrid(totalSquares);
            break;
    }
})

let colorPickerInput = document.querySelector('#color-picker-input');
colorPickerInput.addEventListener("input", (e) => {
    let target = e.target;
    let colorPickerUi = document.querySelector('.color-picker');
    colorPickerUi.style.background = target.value;
    currentColor = target.value;
    isColorChanged = true;
})

let rangeUi = document.querySelector('.input-meter-ui');
rangeUi.addEventListener("input", (e) => {
    let value = e.target.value;
    let totalSquares = value * value;
    updateGrid(totalSquares);
    updateGridText(value);
})

function updateGridText (value) {
    let rangeText = document.querySelector('.input-meter-text');
    rangeText.textContent = `${value} X ${value}`;
}

function resetGrid () {
    grid = [];
}

function resetGridDom () {
    let container = document.querySelector('.container-grid');
    container.textContent = '';
}

function updateGridDom (totalSquares) {
    resetGridDom();

    let containerGrid = document.querySelector('.container-grid');
    let rowNumber = Math.sqrt(totalSquares);
    let columnNumber = rowNumber;

    let gridItemWidth = (500 / rowNumber);

    for (let i = 0; i < totalSquares; i++) {
        let div = createCustomElement('div', 'container-grid-items');
        div.style.flexBasis = `${gridItemWidth}px`;
        div.style.opacity = 0.1;
        containerGrid.append(div);

        div.addEventListener("click", (e) => {
             updateSquareDom(e);
        })
        div.addEventListener("mouseenter", (e) => {
            if (isClicked) {
                updateSquareDom(e);
            }
        })
        div.addEventListener("mousedown", (e) => {
            if (isClicked) {
                updateSquareDom(e);
            }
        })
    }

    let container = document.querySelector('.container');
    container.addEventListener("mousedown", (e) => {
        isClicked = true;
    }, {capture:true});
    container.addEventListener("mouseup", (e) => {
        isClicked = false;
    });
}

function createCustomElement (elementTag, ...classLists) {
    let newElement = document.createElement(`${elementTag}`);
    for (let classList of classLists) {
        newElement.classList.add(`${classList}`);
    }
    return newElement;
}

function updateGrid (totalSquares) {
    resetGrid();
    for (let i = 0; i < totalSquares; i++) {
        grid.push(" ");
    }

    updateGridDom(totalSquares);
}

function colorGrid (index) {
    grid[index] = currentColor;
}

function changeOpacity (target) {
    if (isEraser) {
        target.style.opacity = 0.1;
        return;
    }
    let opacityValue = target.style.opacity;
    if (opacityValue >= 1) {
        return;
    }
    opacityValue = Number(opacityValue) + 0.1;
    target.style.opacity = opacityValue;
}

function updateSquareDom (e) {
    let target = e.target;
    if (isRainbow) {
        target.style.background = getRandomColor();
        let value = Math.random();
        if (value > 0.9) {
        }
        else {
            value += 0.05; 
        }
        target.style.opacity = value;
        return;
    }
    target.style.background = currentColor;
    changeOpacity(target);
}

function getRandomColor () {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
}