document.addEventListener("DOMContentLoaded", () => {
    const shapes = document.querySelectorAll('.shape');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

let isDrawing = false;
let shapeType = '';
let startX;
let startY;
let prevX;
let prevY;
let paths = []; // Массив для хранения путей фигур

for (let i = 0; i < shapes.length; i++) {
shapes[i].addEventListener('click', (e) => {
    shapeType = e.target.id;
});
}

canvas.addEventListener('mousedown', (e) => {
isDrawing = true;
startX = e.offsetX;
startY = e.offsetY;
prevX = e.offsetX;
prevY = e.offsetY;
paths.push([]); // Создать новый путь для новой фигуры
});

canvas.addEventListener('mousemove', (e) => {
if (!isDrawing) return;

switch (shapeType) {
    case 'rectangle':
    ctx.strokeStyle = 'black';
    // Изменить координаты прямоугольника так, чтобы он следовал за мышью
    ctx.strokeRect(startX, startY, e.offsetX - startX, e.offsetY - startY);
    break;
    case 'circle':
    ctx.strokeStyle = 'black';
    // Изменить координаты круга так, чтобы он следовал за мышью
    ctx.beginPath();
    ctx.arc(startX, startY, Math.sqrt((e.offsetX - startX),  2 + (e.offsetY - startY),  2), 0, 2 * Math.PI);
    ctx.stroke();
    break;
    case 'polygon':
    ctx.strokeStyle = 'black';
    // Изменить координаты многоугольника так, чтобы он следовал за мышью
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(startX, e.offsetY);
    ctx.lineTo(startX, startY);
    ctx.stroke();
    break;
    case 'line':
    ctx.strokeStyle = 'black';
    // Изменить координаты линии так, чтобы она следовала за мышью
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    break;
    case 'text':
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    // Изменить координаты текста так, чтобы он следовал за мышью
    ctx.fillText('Text', e.offsetX, e.offsetY);
    break;
}

paths[paths.length - 1].push({
    type: shapeType,
    x: e.offsetX,
    y: e.offsetY
});

// Обновить значения prevX и prevY координатами курсора мыши
prevX = e.offsetX;
prevY = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
isDrawing = false;
});
});