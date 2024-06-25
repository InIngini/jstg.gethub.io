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
    savedImage; // Новый массив для хранения координат

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

        roomCoordinates.splice(0, roomCoordinates.length);
        lastTableNumber=0;

        let increase;
        // if (width<=30&&height<=30)
        // {
        //     increase=22;
        // }
        // else if (width<=50&&height<=50)
        // {
        //     increase=13;
        // }
        // else if ((width<=70&&width>50)&&height<=50){
        //     increase=13;
        // }
        // else if ((width<=70&&width>30)&&height<=50){
        //     increase=17;
        // }
        // else if ((width<=100&&width>70)&&height<=50){
        //     increase=13;
        // }
        // else if ((width<=100&&width>70)&&height<=60){
        //     increase=12;
        // }
        // else if (width<=70&&height<=70){
        //     increase=10;
        // }
        // else if ((width<=100&&width>70)&&height<=70){
        //     increase=10;
        // }
        // else if ((width<=100&&width>70)&&height<=80){
        //     increase=9;
        // }
        // else if (width<=100&&height<=100){
        //     increase=5;
        // }

        increase = Math.min(Math.floor((canvas.width - 70)/width), Math.floor((canvas.height - 70) /height));

        // Новая длина канвы
        const newWidth = width*increase;
        // Новая высота канвы
        const newHeight = height*increase;

        ctx.strokeRect(50, 50, newWidth, newHeight);
        roomCoordinates.push({
            number: 0,
            x1: 50,
            y1: 50,
            x2: 50+newWidth,
            y2: 50+newHeight
        });

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
    //ctx.strokeRect(endMouseX, endMouseY, prevMouseX - endMouseX, prevMouseY - endMouseY);
    if (shiftKey) {
        // Рассчитать размеры прямоугольника, чтобы стороны были параллельны осям
        const width = endMouseX - prevMouseX;
        const height = endMouseY - prevMouseY;
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
        ctx.strokeRect(endMouseX, endMouseY, prevMouseX - endMouseX, prevMouseY - endMouseY);
      }
}

// Рисование прямоугольника
const drawRect = (e) => {
    //ctx.strokeRect(endMouseX, endMouseY, prevMouseX - endMouseX, prevMouseY - endMouseY);
    if (shiftKey) {
        // Рассчитать размеры прямоугольника, чтобы стороны были параллельны осям
        const width = endMouseX - prevMouseX;
        const height = endMouseY - prevMouseY;
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
        ctx.strokeRect(endMouseX, endMouseY, prevMouseX - endMouseX, prevMouseY - endMouseY);
      }
}

// Рисование круга
const drawCircle = (e) => {
    ctx.beginPath(); // Создание нового пути для рисования круга
    // Получение радиуса круга в соответствии с положением указателя мыши
    //let radius = Math.sqrt(Math.pow((prevMouseX - endMouseX), 2) + Math.pow((prevMouseY - endMouseY), 2));
    let radius = Math.abs((prevMouseX - endMouseX)/2);
    ctx.arc(prevMouseX+radius, prevMouseY+radius, radius, 0, 2 * Math.PI); // Создание круга в соответствии с положением указателя мыши
    ctx.stroke();
}

// Рисование треугольника
const drawTriangle = (e) => {
    ctx.beginPath(); // Создание нового пути для рисования круга
    ctx.moveTo(prevMouseX, prevMouseY); // Перемещение треугольника в положение указателя мыши
    ctx.lineTo(endMouseX, endMouseY); // Создание первой линии в соответствии с положением указателя мыши
    ctx.lineTo(prevMouseX * 2 - endMouseX, endMouseY); // Создание нижней линии треугольника
    ctx.closePath(); // Закрытие пути треугольника, чтобы третья линия рисовалась автоматически
    ctx.stroke(); 
}

const drawLine = (e) => {
    //ctx.beginPath(); // Создание нового пути для рисования линии
    //ctx.moveTo(prevMouseX, prevMouseY); // Перемещение линии в положение указателя мыши
    //ctx.lineTo(endMouseX, endMouseY); // Создание линии в соответствии с положением указателя мыши
    //ctx.stroke(); // Отрисовка линии
    if (shiftKey) {
        // Рассчитать угол наклона линии
        const angle = Math.atan2(endMouseY - prevMouseY, endMouseX - prevMouseX);
        
        // Ограничить угол наклона значениями 0, 45, 90, 135, 180, 225, 270, 315 градусов
        const snappedAngle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4);
        
        // Рассчитать координаты конца линии с учетом ограниченного угла наклона
        const dx = Math.cos(snappedAngle) * (endMouseX - prevMouseX);
        const dy = Math.sin(snappedAngle) * (endMouseX - prevMouseX);
        //alert(Math.round(angle,2)+" "+dx+" "+dy);

        if (snappedAngle === Math.PI / 2 || snappedAngle === -Math.PI / 2) {
            // Нарисовать вертикальную линию
            ctx.beginPath();
            ctx.moveTo(prevMouseX, prevMouseY);
            ctx.lineTo(prevMouseX, prevMouseY -(prevMouseY-endMouseY));
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
        ctx.lineTo(endMouseX, endMouseY);
        ctx.stroke();
      }
};

let isInput=false;

const drawText = (e) => {
    isInput=true;
    const mouseX = endMouseX - canvas.offsetLeft;
    const mouseY = endMouseY;
    if ((mouseX < roomCoordinates[0].x2-5 && mouseX > roomCoordinates[0].x1 && mouseY < roomCoordinates[0].y2-5 && mouseY > roomCoordinates[0].y1)) 
    {
        const inputElement = document.querySelector('#room-zero-input');
        if (!inputElement) {
            // Создание текстового поля
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'room-zero-input'; // Добавление уникального идентификатора для поиска инпута, созданного далее
            input.style.position = 'absolute';
            input.style.left = endMouseX+ 'px';
            input.style.top = endMouseY+ canvas.offsetTop + 'px';
            input.style.width = '100px';
            input.style.font='12px Arial';
            input.style.fillStyle = 'black';

            // Установка начального значения текста
            input.value = 'Text';

            // Добавление текстового поля в документ
            document.body.appendChild(input);
            input.focus();
            
            // Обработчик события нажатия клавиши Enter для завершения редактирования текста
            function myEventHandlerEnter(event) {
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
                    
                    // Удаление обработчика события keydown после нажатия клавиши Enter
                    input.removeEventListener('keydown', myEventHandlerEnter);
                    // Удаление обработчика события click вне функции
                    document.removeEventListener('click', myEventHandler);  
                    addToHistory();
                    rectClear();
                    isInput=false;
                }
            } 
            // Обработчик события нажатия клавиши Enter для завершения редактирования текста
            input.addEventListener('keydown', myEventHandlerEnter);
            let two = 0;
            function myEventHandler(event) {
                two++;
                if (!input.contains(event.target) && event.target !== input && two==2) {
                    // Создание текстового узла для отображения текста
                    const text = input.value;

                    // Добавление текстового узла на холст
                    ctx.font = '12px Arial';
                    ctx.fillStyle = 'black';
                    ctx.fillText(text, mouseX, mouseY+15);

                    // Удаление текстового поля
                    document.body.removeChild(input);

                    canvas.focus(); 
                    // Удаление обработчика события click после клика вне поля ввода текста
                    document.removeEventListener('click', myEventHandler);
                    input.removeEventListener('keydown', myEventHandlerEnter);
                    addToHistory();
                    rectClear();
                    isInput=false;
                }
                if(two==2)
                {
                    two=0;
                }
            }
            
            // Добавление обработчика события click
            document.addEventListener('click', myEventHandler);
        }
        else
        {
            document.body.removeChild(inputElement);
        }
    }
};
const drawTextRoom = (mouseX, mouseY,e) => {

    isInput=true;
    if ((mouseX < roomCoordinates[0].x2-10 && mouseX > roomCoordinates[0].x1 && mouseY-canvas.offsetTop < roomCoordinates[0].y2-10 && mouseY-canvas.offsetTop > roomCoordinates[0].y1)) 
    {
        const inputElement = document.querySelector('#room-zero-input');
        if (!inputElement) {
            // Создание текстового поля
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'room-zero-input'; // Добавление уникального идентификатора для поиска инпута, созданного далее
            input.style.position = 'absolute';
            input.style.left = mouseX+ 'px';
            input.style.top = mouseY  + 'px';
            input.style.width = '100px';
            input.style.font='12px Arial';
            input.style.fillStyle = 'black';

            // Установка начального значения текста
            input.value = '№';
            numberRoomNow=input.value;
            // Добавление текстового поля в документ
            document.body.appendChild(input);
            input.focus();

            // Добавить событие для элемента
            input.addEventListener('keypress', (e) => {
                if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                }
            });
            
            function myEventHandlerEnter(event) {
                if (event.key === 'Enter') {
                    numberRoomNow=input.value;
                    if(numberRoomNow=='№'||(roomCoordinates.some(room => room.number === numberRoomNow.replace('№', ''))))
                        alert("Не вижу номер или такой уже существует")
                    else
                    {
                        // Создание текстового узла для отображения текста
                        const text = input.value;
                        
                        // Добавление текстового узла на холст
                        ctx.font = '12px Arial';
                        ctx.fillStyle = 'black';
                        ctx.fillText(text, mouseX- canvas.offsetLeft, mouseY- canvas.offsetTop+15);
                        
                        roomCoordinates.push({//Запись в табличку
                            number: numberRoomNow.replace('№', ''),
                            x1: prevMouseX,
                            y1: prevMouseY,
                            x2: endMouseX,
                            y2: endMouseY
                        });
                        addToHistory();
                        // Удаление текстового поля
                        document.body.removeChild(input);

                        canvas.focus(); 
                        // Удаление обработчика события keydown после нажатия клавиши Enter
                        input.removeEventListener('keydown', myEventHandlerEnter);
                        // Удаление обработчика события click вне функции
                        document.removeEventListener('click', myEventHandler);  

                        rectClear();
                        isInput=false;
                    }
                }
            } 
            // Обработчик события нажатия клавиши Enter для завершения редактирования текста
            input.addEventListener('keydown', myEventHandlerEnter);
            let two = 0;
            function myEventHandler(event) {
                numberRoomNow=input.value;
                two++;
                if (!input.contains(event.target) && event.target !== input && two==2) {
                    if(numberRoomNow=='№'||(roomCoordinates.some(room => room.number === numberRoomNow.replace('№', ''))))
                        alert("Не вижу номер или такой уже существует")
                    else
                    {
                        // Создание текстового узла для отображения текста
                        const text = input.value;
                        
                        // Добавление текстового узла на холст
                        ctx.font = '12px Arial';
                        ctx.fillStyle = 'black';
                        ctx.fillText(text, mouseX- canvas.offsetLeft, mouseY- canvas.offsetTop+15);

                        roomCoordinates.push({//Запись в табличку
                            number: numberRoomNow.replace('№', ''),
                            x1: prevMouseX,
                            y1: prevMouseY,
                            x2: endMouseX,
                            y2: endMouseY
                        });
                        addToHistory();
                        // Удаление текстового поля
                        document.body.removeChild(input);

                        canvas.focus(); 
                        // Удаление обработчика события click после клика вне поля ввода текста
                        document.removeEventListener('click', myEventHandler);
                        input.removeEventListener('keydown', myEventHandlerEnter);

                        rectClear();
                        isInput=false;
                    }
                }
                if(two==2)
                {
                    two=0;
                }
            }
            
            // Добавление обработчика события click
            document.addEventListener('click', myEventHandler);
        }
        else
        {
            document.body.removeChild(inputElement);
        }
    }   
};
let lastTableNumber = 0; // Переменная для хранения номера последнего добавленного стола

const drawTable = (e) => {
    ctx.beginPath(); // Создание нового пути для рисования прямоугольника
    if (shiftKey) {
        // Рассчитать размеры прямоугольника, чтобы стороны были параллельны осям
        const width = endMouseX - prevMouseX;
        const height = endMouseY - prevMouseY;
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
        ctx.strokeRect(endMouseX, endMouseY, prevMouseX - endMouseX, prevMouseY - endMouseY);
      }
    //ctx.rect(endMouseX, endMouseY, prevMouseX - endMouseX, prevMouseY - endMouseY); // Создание прямоугольника в соответствии с положением указателя мыши
    ctx.stroke(); // Отрисовка прямоугольника

    // Отрисовка текста по центру прямоугольника
    ctx.font = "12px Arial"; // Установка шрифта и размера текста
    ctx.fillStyle = "black"; // Установка цвета текста
    ctx.textAlign = "center"; // Установка выравнивания текста по центру
    // Сохранение номера стола в переменной text
    text = "№"+lastTableNumber;
    ctx.fillText(text, prevMouseX-(prevMouseX - endMouseX)/2, prevMouseY-(prevMouseY - endMouseY)/2); // Отрисовка текста по центру прямоугольника
};


const drawM = (e) => {

    // Нарисовать голову
    ctx.beginPath();
    //let radius = (e.clientY - prevMouseY)/7;
    let radius =Math.sqrt(Math.pow((prevMouseX - endMouseX)/4, 2) + Math.pow((prevMouseY - endMouseY)/7, 2))
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
let radius =Math.sqrt(Math.pow((prevMouseX - endMouseX)/4, 2) + Math.pow((prevMouseY - endMouseY)/7, 2))
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
    ctx.lineTo(endMouseX, endMouseY); // Создание линии в соответствии с положением указателя мыши
    ctx.stroke(); // Отрисовка линии

    // Рисование полуокружности двери
    ctx.beginPath(); // Создание нового пути для рисования полуокружности
    let radius = Math.sqrt(Math.pow((prevMouseX - endMouseX), 2) + Math.pow((prevMouseY - endMouseY), 2));
    let angle = Math.atan2(endMouseY - prevMouseY, endMouseX - prevMouseX);
    ctx.setLineDash([5]);
    ctx.arc(prevMouseX, prevMouseY, radius, angle, angle + Math.PI/4, false); // Создание полуокружности в соответствии с положением указателя мыши
    ctx.stroke(); // Отрисовка полуокружности
    ctx.setLineDash([]);
};

const drawLadder = (e) => {
    // Рисование прямоугольника лестницы
    ctx.beginPath(); // Создание нового пути для рисования прямоугольника
    ctx.rect(prevMouseX, prevMouseY, endMouseX-prevMouseX, endMouseY-prevMouseY); // Создание прямоугольника в соответствии с положением указателя мыши
    ctx.stroke(); // Отрисовка прямоугольника

    if(endMouseY-prevMouseY>0)
    {
        // Рисование палок лестницы
        for (let i = 1; i < (endMouseY-prevMouseY)/10; i++) {
            ctx.beginPath(); // Создание нового пути для рисования линии
            ctx.moveTo(prevMouseX, prevMouseY + 10 * i); // Перемещение линии в положение указателя мыши
            ctx.lineTo(endMouseX, prevMouseY + 10 * i); // Создание линии в соответствии с положением указателя мыши
            ctx.stroke(); // Отрисовка линии
        }
    }
    else{
        // Рисование палок лестницы
        for (let i = 1; i < -(endMouseY-prevMouseY)/10; i++) {
            ctx.beginPath(); // Создание нового пути для рисования линии
            ctx.moveTo(prevMouseX, prevMouseY - 10 * i); // Перемещение линии в положение указателя мыши
            ctx.lineTo(endMouseX, prevMouseY - 10 * i); // Создание линии в соответствии с положением указателя мыши
            ctx.stroke(); // Отрисовка линии
        }
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
    
    if(selectedTool!='null'&&isInput!=true)
    {
        isDrawing = true;
        prevMouseX = e.offsetX; // Передача текущей позиции мыши X в качестве значения prevMouseX
        prevMouseY = e.offsetY; // Передача текущей позиции мыши Y в качестве значения prevMouseY
        endMouseX = e.offsetX;
        endMouseY = e.offsetY;
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
        else if (selectedTool === "room" || selectedTool === "rectangle" || selectedTool === "ladder"){
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
        rectClear();
    }
}

let endMouseX=0, endMouseY=0;
// Рисование
const drawing = (e) => {
    if (!isDrawing) return; // Если isDrawing равно false, выйти из функции
    ctx.putImageData(snapshot, 0, 0); // Добавление скопированных данных холста на этот холст

    endMouseX = e.offsetX;
    endMouseY = e.offsetY;

    if(selectedTool!='null')
    {
        const roomZero = roomCoordinates[0];
        if(Math.abs(endMouseX-roomZero.x1)<15||endMouseX-roomZero.x1<0)
            endMouseX=roomZero.x1;
        if(Math.abs(endMouseX-roomZero.x2)<15||endMouseX-roomZero.x2>0)
            endMouseX=roomZero.x2;
        if(Math.abs(endMouseY-roomZero.y1)<15||endMouseY-roomZero.y1<0)
            endMouseY=roomZero.y1;
        if(Math.abs(endMouseY-roomZero.y2)<15||endMouseY-roomZero.y2>0)
            endMouseY=roomZero.y2;

        if (selectedTool === "brush" || selectedTool === "eraser") {
            // Если выбранный инструмент - ластик, то установить стиль обводки в белый, 
            // чтобы закрасить существующее содержимое холста белым цветом, иначе установить цвет обводки в selectedColor
            ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
            
            ctx.lineTo(endMouseX, endMouseY); // Создание линии в соответствии с положением указателя мыши
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
        rectClear();
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

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => { // adding click event to all color button
        // removing selected class from the previous option and adding on current clicked option
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        // passing selected btn background color as selectedColor value
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

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
let roomNow=0;
let numberRoomNow;

function handleMouseUp(e) {

    if(selectedTool!='null'&&isInput!=true)
    {
        removAfterToHistory();
        
        if (selectedTool === "table") {

        // Сохранение координат стола в массиве
        tableCoordinates.push({
            number: lastTableNumber,
            numberroom: roomNow, 
            x1: prevMouseX,
            y1: prevMouseY,
            x2: endMouseX,
            y2: endMouseY
        });
        //alert(prevMouseX+" "+prevMouseY+" "+endMouseX+" "+endMouseY);
        }
        isDrawing = false;
        if (selectedTool == "room" &&  Math.abs(prevMouseX-endMouseX)>30 && Math.abs(prevMouseY-endMouseY)>30)
        {
            const mouseX = prevMouseX - (2*(prevMouseX-endMouseX)/3);
            const mouseY = prevMouseY +canvas.offsetTop- (2*(prevMouseY-endMouseY)/3);
            drawTextRoom(mouseX,mouseY,e);
        }
        else
        {
            addToHistory();
        }
        
        rectClear();
    }
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
let stageOneIMG;//первое изображение
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
        if(stage==0)
            stageOneIMG = ctx.getImageData(0, 0, canvas.width, canvas.height);
        stage=stage+1;
        changeStage();
    }
    
}
function obratno()
{
    if(stage!=1)
    {
        stage=stage-1;
        if(stage==1)
        {
            // Создаем окно подтверждения
            const confirm = window.confirm("Все рисунки пропадут. Продолжать?");
            // Проверяем ответ пользователя
            if (confirm) {
                changeStage();
                if(stage==1)
                    document.querySelector('#rowroom').style.display = 'flex';
            }
            else
            stage++;
        }
        else{
            changeStage();
        }
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
        ctx.putImageData(stageOneIMG, 0, 0);
        selectedTool="null";
        selectedColor="#000";
        stageElement.innerHTML = "Этап 1";
        whatElement.innerHTML = "задайте размеры офиса <p>и нарисуйте кабинеты</p>";
        document.querySelector('#divsize').style.display = 'flex';
        //document.querySelector('#rowroom').style.display = 'flex';
        break;
      case 2:
        stageOneIMG = ctx.getImageData(0, 0, canvas.width, canvas.height);
        selectedTool="null";
        addToHistory();
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
        selectedTool="null";
        stageElement.innerHTML = "Этап 3";
        whatElement.innerHTML = "сохраните</p>";  
        document.querySelector('.row.buttons').style.display = 'flex';
        break;
    }
  
    
}
function rectClear()
{
    const roomZero = roomCoordinates[0];
    // Очистить область за пределами прямоугольника
    ctx.clearRect(0, 0, roomZero.x1, canvas.height);
    ctx.clearRect(roomZero.x2, 0, canvas.width, canvas.height);
    ctx.clearRect(roomZero.x1, 0, roomZero.x2 - roomZero.x1, roomZero.y1);
    ctx.clearRect(roomZero.x1, roomZero.y2, roomZero.x2 - roomZero.x1, canvas.height);
}

///////////////Отображение кабинета поближе//////////////////
// const inputNum = document.getElementById('num');

// inputNum.addEventListener('keypress', (e) => {
//     if (!/[0-9]/.test(e.key)) {
//         e.preventDefault();
//     }
// });

// const roomList = document.getElementById('room-list');

// // Отображаем список комнат при наведении на поле ввода
// inputNum.addEventListener('input', () => {
//   roomList.style.visibility = 'visible';
//   // Очистите предыдущие совпадения
//   roomList.innerHTML = '';

//   // Получите введенное значение
//   const value = inputNum.value;

//   // Найдите совпадающие элементы в списке datalist
//   for (const room of roomCoordinates) {
//     room.number = room.number.toString();  // Преобразуйте номер в строку
//     if (room.number.includes(value)) {
//         const option = document.createElement('option');
//         option.value = room.number;
//         option.label = `${room.number}`;
//         roomList.appendChild(option);
//     }
//   }
// });

// // Скрываем список комнат при потере фокуса
// inputNum.addEventListener('blur', () => {
//   roomList.style.visibility = 'hidden';
// });

// const btnNum = document.getElementById('btnnum');
// let oneIMG;
// let twoIMG;
// let canW;
// let canH;
// btnNum.addEventListener('click', () => {

//     const roomNumber = inputNum.value;

//     // Проверим, существует ли номер комнаты в массиве roomCoordinates
//     const roomExists = roomCoordinates.some((room) => room.number === roomNumber);

//     if (!roomExists) 
//     {
//         alert(`Такого номера кабинета не существует`);
//     } 
//     else {
//         const room = roomCoordinates.find((room) => room.number === roomNumber);
//         if(roomNow==0)
//         {
//             oneIMG = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
//             canW=canvas.width;
//             canH=canvas.height;

//             let increasemini = Math.min(Math.floor((canW - 70)/(room.x2-room.x1)), Math.floor((canH - 70) /(room.y2-room.y1)));

//             // Новая длина канвы
//             const newWidth = (room.x2-room.x1)*increasemini;
//             // Новая высота канвы
//             const newHeight = (room.y2-room.y1)*increasemini;
            
//             canvas.width = newWidth;
//             canvas.height = newHeight;
            
//             roomNow=roomNumber;

//             // Восстановление сохраненного изображения на холст
//             if (oneIMG) {
//                 ctx.putImageData(oneIMG, 0, 0);
//             }
//         }
//         else
//         {
//             twoIMG = ctx.getImageData(0, 0, canvas.width, canvas.height);
//             canvas.width = canH;
//             canvas.height = canW;
//             // Восстановление сохраненного изображения на холст
//             if (oneIMG) {
//                 ctx.putImageData(, 0, 0);
//             }

//         }
//     }
// });
