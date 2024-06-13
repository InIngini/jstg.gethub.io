// Настройка холста
const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    sizeSlider = document.querySelector("#size-slider"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#color-picker"),
    clearCanvas = document.querySelector(".clear-canvas"),
    saveImg = document.querySelector(".save-img"),
    ctx = canvas.getContext("2d");

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

// Рисование прямоугольника
const drawRect = (e) => {
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
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
    ctx.beginPath(); // Создание нового пути для рисования линии
    ctx.moveTo(prevMouseX, prevMouseY); // Перемещение линии в положение указателя мыши
    ctx.lineTo(e.offsetX, e.offsetY); // Создание линии в соответствии с положением указателя мыши
    ctx.stroke(); // Отрисовка линии
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
    input.style.font='14px Arial';
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
            ctx.font = '14px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText(text, mouseX, mouseY+5);

            // Удаление текстового поля
            document.body.removeChild(input);
            canvas.focus();
        }
    });
    

};
  
let lastTableNumber = 0; // Переменная для хранения номера последнего добавленного стола

const drawTable = (e) => {
    ctx.beginPath(); // Создание нового пути для рисования прямоугольника
    ctx.rect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY); // Создание прямоугольника в соответствии с положением указателя мыши
    ctx.stroke(); // Отрисовка прямоугольника

    // Отрисовка текста по центру прямоугольника
    ctx.font = "14px Arial"; // Установка шрифта и размера текста
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
    for (let i = 1; i < (e.offsetY-prevMouseY)/20; i++) {
        ctx.beginPath(); // Создание нового пути для рисования линии
        ctx.moveTo(prevMouseX, prevMouseY + 20 * i); // Перемещение линии в положение указателя мыши
        ctx.lineTo(e.offsetX, prevMouseY + 20 * i); // Создание линии в соответствии с положением указателя мыши
        ctx.stroke(); // Отрисовка линии
    }
};



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
    const link = document.createElement("a"); // Создание элемента <a>
    link.download = `${Date.now()}.jpg`; // Передача текущей даты как значения скачивания ссылки
    link.href = canvas.toDataURL(); // Передача данных холста как значения ссылки
    link.click(); // Клик по ссылке для скачивания изображения
});

// Обработка события нажатия кнопки мыши на холсте
canvas.addEventListener("mousedown", startDraw);

// Обработка события перемещения мыши по холсту
canvas.addEventListener("mousemove", drawing);

const tableCoordinates = [];


function handleMouseUp(e) {
    if (selectedTool === "table") {

      // Сохранение координат стола в массиве
      tableCoordinates.push({
        number: lastTableNumber,
        x1: prevMouseX,
        y1: prevMouseY,
        x2: e.offsetX,
        y2: e.offsetY
      });
    }
  
    isDrawing = false;
  }
// Обработка события отпускания кнопки мыши на холсте  
canvas.addEventListener("mouseup", handleMouseUp);
  