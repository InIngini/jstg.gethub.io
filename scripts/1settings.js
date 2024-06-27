/////////////////Настройка холста////////////////////////
const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    sizeSlider = document.querySelector("#size-slider"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#color-picker"),
    clearCanvas = document.querySelector(".clear-canvas"),
    saveImg = document.querySelector(".save-img"),
    ctx = canvas.getContext("2d");
const stageElement = document.getElementById("stage");
const whatElement = document.getElementById("what");

// Глобальные переменные с начальными значениями
let prevMouseX, prevMouseY, snapshot,
    isDrawing = false,
    selectedTool = "null",
    brushWidth = 1,
    selectedColor = "#000",
    savedImage;

// Установить цвет фона холста
const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor; // Установка цвета заливки обратно в selectedColor, это будет цвет кисти.
}

// Обработка события загрузки окна
window.addEventListener("load", () => {
    // Установка ширины/высоты холста.. offsetwidth/height возвращает видимую ширину/высоту элемента
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
    addToHistory();
});
// Обработка события изменения размера окна
window.addEventListener("resize", () => {
    // Сохранение текущего изображения холста
    savedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // Установка ширины/высоты холста.. offsetwidth/height возвращает видимую ширину/высоту элемента
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    // Восстановление сохраненного изображения на холст
    if (savedImage) {
        ctx.putImageData(savedImage, 0, 0);
    }
});