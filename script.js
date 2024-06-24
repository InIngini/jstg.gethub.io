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
    selectedTool = "brush",
    brushWidth = 1,
    selectedColor = "#000",
    savedImage, // Новая глобальная переменная для хранения сохраненного изображения
    savedCoordinates = []; // Новый массив для хранения координат

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

///////////Размеры офиса/////////////
// Получаем элементы ввода
// Получаем элементы ввода и кнопку
var inputW = document.getElementById('W');
var inputH = document.getElementById('H');
var btn = document.getElementById('wh');

const drawOffice = () => {

    // Получение значений ширины и высоты из элементов ввода
    const width = parseInt(inputW.value);
    const height = parseInt(inputH.value);

    if(inputW.value === "" || inputH.value === "")
        alert("Создайте офис")
    else
    {   // Проверка, не превышают ли размеры 100
        if (width > 100 || height > 100) {
            alert('У вас не может быть такой большой офис! Максимальный размер: 100x100');
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        roomCoordinates.slice(0);
        lastTableNumber=0;

        if (width<=30&&height<=30)
        {
            ctx.strokeRect(50, 50, width*22, height*22);
            roomCoordinates.push({
                number: 0,
                x1: 50,
                y1: 50,
                x2: 50+width*22,
                y2: 50+height*22
                });
        }
        else if (width<=50&&height<=50)
        {
            ctx.strokeRect(50, 50, width*13, height*13);
            roomCoordinates.push({
                number: 0,
                x1: 50,
                y1: 50,
                x2: 50+width*13,
                y2: 50+height*13
            });
        }
        else if ((width<=70&&width>50)&&height<=50){
            ctx.strokeRect(50, 50, width*13, height*13);
            roomCoordinates.push({
                number: 0,
                x1: 50,
                y1: 50,
                x2: 50+width*13,
                y2: 50+height*13
            });
        }
        else if ((width<=70&&width>30)&&height<=50){
            ctx.strokeRect(50, 50, width*17, height*17);
            roomCoordinates.push({
                number: 0,
                x1: 50,
                y1: 50,
                x2: 50+width*17,
                y2: 50+height*17
            });
        }
        else if ((width<=100&&width>70)&&height<=50){
            ctx.strokeRect(50, 50, width*13, height*13);
            roomCoordinates.push({
                number: 0,
                x1: 50,
                y1: 50,
                x2: 50+width*13,
                y2: 50+height*13
            });
        }
        else if ((width<=100&&width>70)&&height<=60){
            ctx.strokeRect(50, 50, width*12, height*12);
            roomCoordinates.push({
                number: 0,
                x1: 50,
                y1: 50,
                x2: 50+width*12,
                y2: 50+height*12
            });
        }
        else if (width<=70&&height<=70){
            ctx.strokeRect(50, 50, width*10, height*10);
            roomCoordinates.push({
                number: 0,
                x1: 50,
                y1: 50,
                x2: 50+width*10,
                y2: 50+height*10
            });
        }
        else if ((width<=100&&width>70)&&height<=70){
            ctx.strokeRect(50, 50, width*10, height*10);
            roomCoordinates.push({
                number: 0,
                x1: 50,
                y1: 50,
                x2: 50+width*11,
                y2: 50+height*11
            });
        }
        else if ((width<=100&&width>70)&&height<=80){
            ctx.strokeRect(50, 50, width*9, height*9);
            roomCoordinates.push({
                number: 0,
                x1: 50,
                y1: 50,
                x2: 50+width*9,
                y2: 50+height*9
            });
        }
        else if (width<=100&&height<=100){
            ctx.strokeRect(50, 50, width*7, height*7);
            roomCoordinates.push({
                number: 0,
                x1: 50,
                y1: 50,
                x2: 50+width*7,
                y2: 50+height*7
            });
        }
        document.querySelector('#rowroom').style.display = 'flex';
        canvas.focus();
        addToHistory();
    }
};

// Слушатель события щелчка для кнопки
btn.addEventListener('click', drawOffice);

// Ограничение ввода только для чисел
inputW.addEventListener('keypress', (e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
});

inputH.addEventListener('keypress', (e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
});


///////////Рисование//////////////
shiftKey=false;
document.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') {
      shiftKey = true;
    }
  });
  
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
      shiftKey = false;
    }
  });

//Рисование кабинета
const drawRoom = (e) => {
    //ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    if (shiftKey) {
        // Рассчитать размеры прямоугольника, чтобы стороны были параллельны осям
        const width = e.offsetX - prevMouseX;
        const height = e.offsetY - prevMouseY;
        if(width>=0&&height>=0)
        {// Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY,width,width);
        }
        else if(width<0&&height>=0)
        {// Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY,width,-width);
        }
        else if(width>=0&&height<0)
        {// Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY,width,-width);
        }
        else if(width<0&&height<0)
        {// Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY,width,width);
        }
      } else {
        // Обычное рисование прямоугольника
        ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
      }
}

// Рисование прямоугольника
const drawRect = (e) => {
    //ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    if (shiftKey) {
        // Рассчитать размеры прямоугольника, чтобы стороны были параллельны осям
        const width = e.offsetX - prevMouseX;
        const height = e.offsetY - prevMouseY;
        if(width>=0&&height>=0)
        {// Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY,width,width);
        }
        else if(width<0&&height>=0)
        {// Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY,width,-width);
        }
        else if(width>=0&&height<0)
        {// Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY,width,-width);
        }
        else if(width<0&&height<0)
        {// Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY,width,width);
        }
      } else {
        // Обычное рисование прямоугольника
        ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
      }
}

// Рисование круга
const drawCircle = (e) => {
    ctx.beginPath(); // Создание нового пути для рисования круга
    // Получение радиуса круга в соответствии с положением указателя мыши
    //let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    let radius = Math.abs((prevMouseX - e.offsetX)/2);
    ctx.arc(prevMouseX+radius, prevMouseY+radius, radius, 0, 2 * Math.PI); // Создание круга в соответствии с положением указателя мыши
    ctx.stroke();
}

// Рисование треугольника
const drawTriangle = (e) => {
    ctx.beginPath(); // Создание нового пути для рисования круга
    ctx.moveTo(prevMouseX, prevMouseY); // Перемещение треугольника в положение указателя мыши
    ctx.lineTo(e.offsetX, e.offsetY); // Создание первой линии в соответствии с положением указателя мыши
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // Создание нижней линии треугольника
    ctx.closePath(); // Закрытие пути треугольника, чтобы третья линия рисовалась автоматически
    ctx.stroke(); 
}

const drawLine = (e) => {
    //ctx.beginPath(); // Создание нового пути для рисования линии
    //ctx.moveTo(prevMouseX, prevMouseY); // Перемещение линии в положение указателя мыши
    //ctx.lineTo(e.offsetX, e.offsetY); // Создание линии в соответствии с положением указателя мыши
    //ctx.stroke(); // Отрисовка линии
    if (shiftKey) {
        // Рассчитать угол наклона линии
        const angle = Math.atan2(e.offsetY - prevMouseY, e.offsetX - prevMouseX);
        
        // Ограничить угол наклона значениями 0, 45, 90, 135, 180, 225, 270, 315 градусов
        const snappedAngle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4);
        
        // Рассчитать координаты конца линии с учетом ограниченного угла наклона
        const dx = Math.cos(snappedAngle) * (e.offsetX - prevMouseX);
        const dy = Math.sin(snappedAngle) * (e.offsetX - prevMouseX);
        //alert(Math.round(angle,2)+" "+dx+" "+dy);

        if (snappedAngle === Math.PI / 2 || snappedAngle === -Math.PI / 2) {
            // Нарисовать вертикальную линию
            ctx.beginPath();
            ctx.moveTo(prevMouseX, prevMouseY);
            ctx.lineTo(prevMouseX, prevMouseY -(prevMouseY-e.offsetY));
            ctx.stroke();
        } else if(snappedAngle<=0&&dy<=0 || snappedAngle>0&&dy>0)
        {
            // Нарисовать линию с заданными координатами конца
            ctx.beginPath();
            ctx.moveTo(prevMouseX, prevMouseY);
            ctx.lineTo(prevMouseX + dx, prevMouseY + dy);
            ctx.stroke();
        }
        else if(snappedAngle>0&&dy<=0 || snappedAngle<=0&&dy>0)
        {
            // Нарисовать линию с заданными координатами конца
            ctx.beginPath();
            ctx.moveTo(prevMouseX, prevMouseY);
            ctx.lineTo(prevMouseX - dx, prevMouseY - dy);
            ctx.stroke();
        }
        else
        {
            if(snappedAngle==0)
            {
                // Нарисовать линию с заданными координатами конца
                ctx.beginPath();
                ctx.moveTo(prevMouseX, prevMouseY);
                ctx.lineTo(prevMouseX, prevMouseY + dy);
                ctx.stroke()
            }
            else
            {
                // Нарисовать линию с заданными координатами конца
                ctx.beginPath();
                ctx.moveTo(prevMouseX, prevMouseY);
                ctx.lineTo(prevMouseX, prevMouseY - dy);
                ctx.stroke()
            }
        }
      } else {
        // Обычное рисование линии
        ctx.beginPath();
        ctx.moveTo(prevMouseX, prevMouseY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }
};

const drawText = (e) => {
    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;
  
    // Создание текстового поля
    let input = document.createElement('input');
    input.type = 'text';
    input.style.position = 'absolute';
    input.style.left = e.offsetX+ 'px';
    input.style.top = e.offsetY+ canvas.offsetTop + 'px';
    input.style.width = '100px';
    input.style.font='12px Arial';
    input.style.fillStyle = 'black';

    // Установка начального значения текста
    input.value = 'Text';

    // Добавление текстового поля в документ
    document.body.appendChild(input);
    input.focus();
    
    // Обработчик события нажатия клавиши Enter для завершения редактирования текста
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            // Создание текстового узла для отображения текста
            const text = input.value;

            // Добавление текстового узла на холст
            ctx.font = '12px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText(text, mouseX, mouseY+15);

            // Удаление текстового поля
            document.body.removeChild(input);

            canvas.focus(); 
            
        }
    });
};
const drawTextRoom = (mouseX, mouseY,e) => {

    // Создание текстового поля
    let input = document.createElement('input');
    input.type = 'text';
    input.style.position = 'absolute';
    input.style.left = mouseX+ 'px';
    input.style.top = mouseY  + 'px';
    input.style.width = '100px';
    input.style.font='12px Arial';
    input.style.fillStyle = 'black';

    // Установка начального значения текста
    input.value = '№';

    // Добавление текстового поля в документ
    document.body.appendChild(input);
    input.focus();

    // Добавить событие для элемента
    input.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });
    
    // Обработчик события нажатия клавиши Enter для завершения редактирования текста
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            // Создание текстового узла для отображения текста
            const text = input.value;
            numberRoomNow=input.value;
            // Добавление текстового узла на холст
            ctx.font = '12px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText(text, mouseX- canvas.offsetLeft, mouseY- canvas.offsetTop+15);
            
            roomCoordinates.push({//Запись в табличку
                number: numberRoomNow.replace('№', ''),
                x1: prevMouseX,
                y1: prevMouseY,
                x2: e.offsetX,
                y2: e.offsetY
              });
              addToHistory()
              // Удаление текстового поля
            document.body.removeChild(input);

            canvas.focus(); 
            
        }
    });
};
let lastTableNumber = 0; // Переменная для хранения номера последнего добавленного стола

const drawTable = (e) => {
    ctx.beginPath(); // Создание нового пути для рисования прямоугольника
    if (shiftKey) {
        // Рассчитать размеры прямоугольника, чтобы стороны были параллельны осям
        const width = e.offsetX - prevMouseX;
        const height = e.offsetY - prevMouseY;
        if(width>=0&&height>=0)
        {// Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY,width,width);
        }
        else if(width<0&&height>=0)
        {// Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY,width,-width);
        }
        else if(width>=0&&height<0)
        {// Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY,width,-width);
        }
        else if(width<0&&height<0)
        {// Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY,width,width);
        }
      } else {
        // Обычное рисование прямоугольника
        ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
      }
    //ctx.rect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY); // Создание прямоугольника в соответствии с положением указателя мыши
    ctx.stroke(); // Отрисовка прямоугольника

    // Отрисовка текста по центру прямоугольника
    ctx.font = "12px Arial"; // Установка шрифта и размера текста
    ctx.fillStyle = "black"; // Установка цвета текста
    ctx.textAlign = "center"; // Установка выравнивания текста по центру
    // Сохранение номера стола в переменной text
    text = "№"+lastTableNumber;
    ctx.fillText(text, prevMouseX-(prevMouseX - e.offsetX)/2, prevMouseY-(prevMouseY - e.offsetY)/2); // Отрисовка текста по центру прямоугольника
};


const drawM = (e) => {

    // Нарисовать голову
    ctx.beginPath();
    //let radius = (e.clientY - prevMouseY)/7;
    let radius =Math.sqrt(Math.pow((prevMouseX - e.offsetX)/4, 2) + Math.pow((prevMouseY - e.offsetY)/7, 2))
    ctx.arc(prevMouseX+radius, prevMouseY+radius, radius, 0, 2 * Math.PI); // Создание головы в соответствии с положением указателя мыши
    ctx.stroke();
  
    // Нарисовать тело
    ctx.beginPath();
    ctx.moveTo(prevMouseX+radius, prevMouseY + radius*2); // Начало тела (нижняя часть головы)
    ctx.lineTo(prevMouseX + radius, prevMouseY + radius*5); // Конец тела
    ctx.lineWidth = 2; // Толщина линии
    ctx.strokeStyle = "#000000";
    ctx.stroke();
  
    // Нарисовать руки
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY +3*radius); // Левая рука
    ctx.lineTo(prevMouseX + 2*radius, prevMouseY +3*radius); // Правая рука
    ctx.lineWidth = 2; // Толщина линии
    ctx.strokeStyle = "#000000";
    ctx.stroke();
  
    // Нарисовать ноги
    ctx.beginPath();
    ctx.moveTo(prevMouseX + radius, prevMouseY + radius*5); // Начало ног (конец тела)
    ctx.lineTo(prevMouseX, prevMouseY + radius*7); // Левая нога
    ctx.moveTo(prevMouseX + radius, prevMouseY + radius*5); // Начало ног (конец тела)
    ctx.lineTo(prevMouseX + radius*2, prevMouseY + radius*7); // Правая нога
    ctx.lineWidth = 2; // Толщина линии
    ctx.strokeStyle = "#000000";
    ctx.stroke();
};
  
  
const drawF = (e) => {
// Нарисовать голову
ctx.beginPath();
//let radius = (e.clientY - prevMouseY)/7;
let radius =Math.sqrt(Math.pow((prevMouseX - e.offsetX)/4, 2) + Math.pow((prevMouseY - e.offsetY)/7, 2))
ctx.arc(prevMouseX+radius, prevMouseY+radius, radius, 0, 2 * Math.PI); // Создание головы в соответствии с положением указателя мыши
ctx.stroke();

// Нарисовать тело
ctx.beginPath();
ctx.moveTo(prevMouseX+radius, prevMouseY + radius*2); // Начало тела (нижняя часть головы)
ctx.lineTo(prevMouseX + radius, prevMouseY + radius*3); // Конец тела
ctx.lineWidth = 2; // Толщина линии
ctx.strokeStyle = "#000000";
ctx.stroke();

// Нарисовать руки
ctx.beginPath();
ctx.moveTo(prevMouseX, prevMouseY +3*radius); // Левая рука
ctx.lineTo(prevMouseX + 2*radius, prevMouseY +3*radius); // Правая рука
ctx.lineWidth = 2; // Толщина линии
ctx.strokeStyle = "#000000";
ctx.stroke();

// Нарисовать юбку
ctx.beginPath();
ctx.moveTo(prevMouseX + radius, prevMouseY + radius*3); // Начало юбки
ctx.lineTo(prevMouseX, prevMouseY + radius*7); // Левая сторона
ctx.moveTo(prevMouseX + radius, prevMouseY + radius*3); // Начало юбки
ctx.lineTo(prevMouseX + radius*2, prevMouseY + radius*7); // Правая сторона
ctx.moveTo(prevMouseX, prevMouseY + radius*7); // Начало низа
ctx.lineTo(prevMouseX + radius*2, prevMouseY + radius*7); // Конец ниха
ctx.lineWidth = 2; // Толщина линии
ctx.strokeStyle = "#000000";
ctx.stroke();
};
  
const drawDoor = (e) => {
    // Рисование палки двери
    ctx.beginPath(); // Создание нового пути для рисования линии
    ctx.moveTo(prevMouseX, prevMouseY); // Перемещение линии в положение указателя мыши
    ctx.lineTo(e.offsetX, e.offsetY); // Создание линии в соответствии с положением указателя мыши
    ctx.stroke(); // Отрисовка линии

    // Рисование полуокружности двери
    ctx.beginPath(); // Создание нового пути для рисования полуокружности
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    let angle = Math.atan2(e.offsetY - prevMouseY, e.offsetX - prevMouseX);
    ctx.setLineDash([5]);
    ctx.arc(prevMouseX, prevMouseY, radius, angle, angle + Math.PI/4, false); // Создание полуокружности в соответствии с положением указателя мыши
    ctx.stroke(); // Отрисовка полуокружности
    ctx.setLineDash([]);
};

const drawLadder = (e) => {
    // Рисование прямоугольника лестницы
    ctx.beginPath(); // Создание нового пути для рисования прямоугольника
    ctx.rect(prevMouseX, prevMouseY, e.offsetX-prevMouseX, e.offsetY-prevMouseY); // Создание прямоугольника в соответствии с положением указателя мыши
    ctx.stroke(); // Отрисовка прямоугольника

    // Рисование палок лестницы
    for (let i = 1; i < (e.offsetY-prevMouseY)/10; i++) {
        ctx.beginPath(); // Создание нового пути для рисования линии
        ctx.moveTo(prevMouseX, prevMouseY + 10 * i); // Перемещение линии в положение указателя мыши
        ctx.lineTo(e.offsetX, prevMouseY + 10 * i); // Создание линии в соответствии с положением указателя мыши
        ctx.stroke(); // Отрисовка линии
    }
};
/////////ктрл+зт, ктрл+у////////////
// Стек действий (для отмены)
// Массив для хранения истории изменений
let history = [];
let historyIndex = -1;
let roomChet = 0; 

function removAfterToHistory(){
    // Получаем текущий индекс в истории
    let currentIndex = historyIndex;

    // Если есть значения после текущего, удаляем их из истории
    if (currentIndex < history.length - 1) {
        history = history.slice(0, currentIndex + 1);
        if (stage == 1) {
            roomCoordinates.splice(-roomChet);
            roomChet=0;
        }
    }
    
}

// Функция для добавления состояния в историю
function addToHistory() {
  // Сохраняем текущее состояние canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  history.push(imageData);
  historyIndex++;
}

// Функция для отмены изменений (Ctrl+Z)
function undo() {
  if (historyIndex > -1) {
    historyIndex--;
    ctx.putImageData(history[historyIndex], 0, 0);
    if (stage == 1) {
        roomChet++;
    }
  }
  
}

// Функция для повтора изменений (Ctrl+Y)
function redo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    ctx.putImageData(history[historyIndex], 0, 0);
    if (stage == 1) {
        roomChet--;
    }
  }
}


// Состояние нажатия клавиш
let isCtrlPressed = false;
let isZPressed = false;
let isYPressed = false;

// Глобальный обработчик событий клавиатуры
document.addEventListener('keydown', (event) => {
    if(event.ctrlKey||event.key.toLowerCase() === 'z'|| event.key.toLowerCase() === 'я'||event.key.toLowerCase() === 'y'|| event.key.toLowerCase() === 'н')
    {  // Проверяем состояние нажатия клавиш
        if (event.ctrlKey) {
            isCtrlPressed = true;
        }
        if (event.key.toLowerCase() === 'z'|| event.key.toLowerCase() === 'я') {
            isZPressed = true;
        }
        if (event.key.toLowerCase() === 'y'|| event.key.toLowerCase() === 'н') {
            isYPressed = true;
        }
    }
    else
    {
        isCtrlPressed = false;
        isZPressed = false;
        isYPressed = false;
    }

  // Если нажаты Ctrl + Z, отменяем стандартное поведение
  if (isCtrlPressed && isZPressed) {
    event.preventDefault();
    undo(event.target);
    isCtrlPressed = false;
    isZPressed = false;
    isYPressed = false;
  }
  // Если нажаты Ctrl + Y, отменяем стандартное поведение
  else if (isCtrlPressed && isYPressed) {
    event.preventDefault();
    redo(event.target);
    isCtrlPressed = false;
    isZPressed = false;
    isYPressed = false;
  }
});

//////////////Маусдаун, маусмув и маусап/////////////////
// Начало рисования
const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; // Передача текущей позиции мыши X в качестве значения prevMouseX
    prevMouseY = e.offsetY; // Передача текущей позиции мыши Y в качестве значения prevMouseY
    ctx.beginPath(); // Создание нового пути для рисования
    ctx.lineWidth = brushWidth; // Передача размера кисти как ширины линии
    ctx.strokeStyle = selectedColor; // Передача selectedColor как стиля обводки
    ctx.fillStyle = selectedColor; // Передача selectedColor как стиля заливки
    // Копирование данных холста и передача в качестве значения snapshot.. это предотвращает перетаскивание изображения
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (selectedTool === "text"){
        
        isDrawing=false;
        drawText(e);
    }
    else if (selectedTool === "table") {
        if (tableCoordinates.length > 0) {
          lastTableNumber = tableCoordinates[tableCoordinates.length - 1].number;
        } else {
          lastTableNumber = 0;
        }
      
        lastTableNumber++;
      }
    else if (selectedTool === "room"){
        const roomZero = roomCoordinates[0];
        if(Math.abs(prevMouseX-roomZero.x1)<15)
            prevMouseX = roomZero.x1;
        if(Math.abs(prevMouseX-roomZero.x2)<15)
            prevMouseX = roomZero.x2;
        if(Math.abs(prevMouseY-roomZero.y1)<15)
            prevMouseY = roomZero.y1;
        if(Math.abs(prevMouseY-roomZero.y2)<15)
            prevMouseY = roomZero.y2;
    }
    
}

// Рисование
const drawing = (e) => {
    if (!isDrawing) return; // Если isDrawing равно false, выйти из функции
    ctx.putImageData(snapshot, 0, 0); // Добавление скопированных данных холста на этот холст

    if (selectedTool === "brush" || selectedTool === "eraser") {
        // Если выбранный инструмент - ластик, то установить стиль обводки в белый, 
        // чтобы закрасить существующее содержимое холста белым цветом, иначе установить цвет обводки в selectedColor
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        
        ctx.lineTo(e.offsetX, e.offsetY); // Создание линии в соответствии с положением указателя мыши
        ctx.stroke(); // Рисование/заполнение линии цветом
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    } else if (selectedTool === "triangle"){
        drawTriangle(e);
    } else if (selectedTool === "line"){
        drawLine(e);
    } else if (selectedTool === "room"){
        drawRoom(e);
    } else if (selectedTool === "table"){
        drawTable(e);
    } else if (selectedTool === "m"){
        drawM(e);
    } else if (selectedTool === "f"){
        drawF(e);
    } else if (selectedTool === "door"){
        drawDoor(e);
    } else if (selectedTool === "ladder"){
        drawLadder(e);
    }
}

// Обработка событий кнопок инструментов
toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { // Добавление события клика для всех опций инструментов
        // Удаление класса active с предыдущей опции и добавление его к текущей нажатой опции
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    });
});

// Обработка события изменения размера кисти
sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value);

// Обработка события изменения цвета
colorPicker.addEventListener("change", () => {
    // Передача выбранного значения цвета из палитры в фон последней кнопки цвета
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

// Обработка события нажатия на кнопку очистки холста
clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка всего холста
    setCanvasBackground();
});

// Обработка события нажатия на кнопку сохранения изображения
saveImg.addEventListener("click", () => {
    // Получение координат выделенной области
    const { n, x1, y1, x2, y2 } = roomCoordinates[0];
    // Вычисление размеров выделенной области
    const width2 = x2+50;
    const height2 = y2+50;
    savedImage = ctx.getImageData(0, 0, width2, height2);
    
    const width1 = canvas.width;
    const height1 = canvas.height;

    canvas.width = width2;
    canvas.height = height2;
    
    if (savedImage) {
        ctx.putImageData(savedImage, 0, 0);
    }

    const link = document.createElement("a"); // Создание элемента <a>
    link.download = `${Date.now()}.jpg`; // Передача текущей даты как значения скачивания ссылки
    link.href = canvas.toDataURL(); // Передача данных холста как значения ссылки
    link.click(); // Клик по ссылке для скачивания изображения

    // const byteString = atob(imageUrl.substring("data:image/png;base64,".length));
    // const bytes = new Uint8Array(byteString.length);
    // for (let i = 0; i < byteString.length; i++) {
    // bytes[i] = byteString.charCodeAt(i);
    // }
    // const sqlite3 = require("sqlite3").verbose();
    // const db = new sqlite3.Database("database.sqlite");

    // db.run("INSERT INTO images (image) VALUES (?)", [bytes], (err) => {
    //     if (err) {
    //         // Обработка ошибки
    //     } else {
    //         // Изображение успешно сохранено в базе данных
    //     }
    // });

    canvas.width = width1;
    canvas.height = height1;
    
    if (savedImage) {
        ctx.putImageData(savedImage, 0, 0);
    }
});

// Обработка события нажатия кнопки мыши на холсте
canvas.addEventListener("mousedown", startDraw);

// Обработка события перемещения мыши по холсту
canvas.addEventListener("mousemove", drawing);

const tableCoordinates = [];
const roomCoordinates = [];
let roomNow;
let numberRoomNow;

function handleMouseUp(e) {
    removAfterToHistory();
    
    if (selectedTool === "table") {

      // Сохранение координат стола в массиве
      tableCoordinates.push({
        number: lastTableNumber,
        numberroom: roomNow, 
        x1: prevMouseX,
        y1: prevMouseY,
        x2: e.offsetX,
        y2: e.offsetY
      });
      //alert(prevMouseX+" "+prevMouseY+" "+e.offsetX+" "+e.offsetY);
    }
    isDrawing = false;
    if (selectedTool == "room" &&  Math.abs(prevMouseX-e.offsetX)>30 && Math.abs(prevMouseY-e.offsetY)>30)
    {
        const mouseX = prevMouseX - (2*(prevMouseX-e.offsetX)/3);
        const mouseY = prevMouseY +canvas.offsetTop- (2*(prevMouseY-e.offsetY)/3);
        drawTextRoom(mouseX,mouseY,e);
    }
    else
        addToHistory();
  }
// Обработка события отпускания кнопки мыши на холсте  
canvas.addEventListener("mouseup", handleMouseUp);
  
//////Этапы/////

const buttonWhat = document.getElementById("buttonWhat");
// Слушатель события щелчка для кнопки
buttonWhat.addEventListener('click', vpered);

const buttonWhatObratno = document.getElementById("buttonWhatObratno");
// Слушатель события щелчка для кнопки
buttonWhatObratno.addEventListener('click', obratno);

let stage = 0;
vpered();
        
function vpered()
{
    if(stage==1 && !roomCoordinates[0])
    {
        alert("Создайте офис");
    }
    else if(stage!=3)
    {
        stage=stage+1;
        changeStage();
    }
    
}
function obratno()
{
    if(stage!=1)
    {
        stage=stage-1;
        changeStage();
    }    
    
}

function changeStage() {

    // Скрытие всех дивов
    document.querySelectorAll('.row').forEach(row => row.style.display = 'none');
    document.querySelector('#stagewhat').style.display = 'flex';
    document.querySelector('#wh').style.display = 'flex';

    history = [];
    historyIndex = -1;

    // Отображение дивов для текущего этапа
    switch (stage) {
      case 1:
        stageElement.innerHTML = "Этап 1";
        whatElement.innerHTML = "задайте размеры офиса <p>и нарисуйте кабинеты</p>";
        document.querySelector('#divsize').style.display = 'flex';
        //document.querySelector('#rowroom').style.display = 'flex';
        break;
      case 2:
        //тут надо засунуть сохранение промежуточных данных в бд
        stageElement.innerHTML = "Этап 2";
        whatElement.innerHTML = "создайте интерьер <p>и расставьте столы</p>";  
        const rows = document.querySelectorAll('.row');
        for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = 'flex';
        }
        document.querySelector('#divsize').style.display = 'none';
        document.querySelector('#rowroom').style.display = 'none';
        document.querySelector('.row.buttons').style.display = 'none';
        break;
      case 3:
        stageElement.innerHTML = "Этап 3";
        whatElement.innerHTML = "сохраните</p>";  
        document.querySelector('.row.buttons').style.display = 'flex';
        break;
    }
  
    
  }
  