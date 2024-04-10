document.addEventListener('DOMContentLoaded', function() {


let currentColor = document.getElementById("activecolortext").innerHTML;
let colorButton = document.getElementById("activecolor")
let colorWheel = ['Red','Orange','Yellow','Green','Blue','Purple','Black','Brown','White']


function colorIndexSelector(colorChosen,colorWheelArray) {
    let currentColorIndex = colorWheelArray.findIndex((value) => value === colorChosen)
    if (currentColorIndex === (colorWheelArray.length - 1)) {
        currentColorIndex = 0
    } else {
        currentColorIndex += 1
    }
    return currentColorIndex
}

function returnNewColor(colorIndex,colorWheelArray) {
    return colorWheelArray[colorIndex]
}

function updateColor(colorWheelArray) {
    document.getElementById("activecolortext").innerHTML = returnNewColor(colorIndexSelector(currentColor,colorWheel),colorWheelArray)
    currentColor = returnNewColor(colorIndexSelector(currentColor,colorWheel),colorWheelArray);
    document.getElementById("activecolor").style.backgroundColor = (currentColor.toLowerCase());
    if (currentColor === 'White' || currentColor === 'Yellow') {
        document.getElementById('activecolortext').style.color = 'black'
    } else {
        document.getElementById('activecolortext').style.color = 'white'
    }
    if (currentColor === 'Black') {
        document.getElementById('activecolor').style.borderColor = 'white'
    } else {
        document.getElementById('activecolor').style.borderColor = 'black'
    }
}

colorButton.addEventListener("click",function() {updateColor(colorWheel)})

let canvas = document.getElementById('canvas')

function createCanvas(rows,cols) {
    canvas.style.setProperty('--grid-rows',rows);
    canvas.style.setProperty('--grid-cols', cols);
    for (step = 0; step < (rows * cols); step++) {
    let cell = document.createElement("div");
    cell.innerText = " ";
    canvas.appendChild(cell).className = "gridItem"
    canvas.appendChild(cell).id = (`gridNumber` + step);
}
}

createCanvas(32,32)

function clearCanvas() {
    let gridItems = document.getElementsByClassName("gridItem");
    while (gridItems.length > 0) {
        gridItems[0].remove();
    }
}

function clearAndCreate(newsize) {
    clearCanvas()
    createCanvas(newsize,newsize)
    let gridItems = document.getElementsByClassName("gridItem");
    for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].addEventListener("click", changeColor);
    }
}

document.getElementById('sizeslider').addEventListener('change', function() {
    clearAndCreate(document.getElementById('sizeslider').value);
});


function changeColor(event) {
    let colorPicker = currentColor.toLowerCase();
    console.log(colorPicker);
    console.log(event.currentTarget);
    event.currentTarget.style.backgroundColor = colorPicker;
}

let gridItems = document.getElementsByClassName("gridItem");
for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener("click", changeColor);
}
});