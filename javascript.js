let grid = [];
let currentColor = 'black';
let isClicked = false;

// to initally set up the grid
updateGrid(144);
updateGridText(12);

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
    let opacityValue = target.style.opacity;
    if (opacityValue == 1) {
        return;
    }
    opacityValue = Number(opacityValue) + 0.1;
    target.style.opacity = opacityValue;
}

function updateSquareDom (e) {
    let target = e.target;
    target.style.background = currentColor;
    changeOpacity(target);
}