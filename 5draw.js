///////////Рисование//////////////
let isInput = false;
let lastTableNumber = 0; // Переменная для хранения номера последнего добавленного стола

//Рисование кабинета
const drawRoom = (e) => {
    //ctx.strokeRect(endMouseX, endMouseY, prevMouseX - endMouseX, prevMouseY - endMouseY);
    if (shiftKey) {
        // Рассчитать размеры прямоугольника, чтобы стороны были параллельны осям
        const width = endMouseX - prevMouseX;
        const height = endMouseY - prevMouseY;
        if (width >= 0 && height >= 0) { // Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY, width, width);
        } else if (width < 0 && height >= 0) { // Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY, width, -width);
        } else if (width >= 0 && height < 0) { // Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY, width, -width);
        } else if (width < 0 && height < 0) { // Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY, width, width);
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
        if (width >= 0 && height >= 0) { // Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY, width, width);
        } else if (width < 0 && height >= 0) { // Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY, width, -width);
        } else if (width >= 0 && height < 0) { // Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY, width, -width);
        } else if (width < 0 && height < 0) { // Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY, width, width);
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
    let radius = Math.abs((prevMouseX - endMouseX) / 2);
    ctx.arc(prevMouseX + radius, prevMouseY + radius, radius, 0, 2 * Math.PI); // Создание круга в соответствии с положением указателя мыши
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
            ctx.lineTo(prevMouseX, prevMouseY - (prevMouseY - endMouseY));
            ctx.stroke();
        } else if (snappedAngle <= 0 && dy <= 0 || snappedAngle > 0 && dy > 0) {
            // Нарисовать линию с заданными координатами конца
            ctx.beginPath();
            ctx.moveTo(prevMouseX, prevMouseY);
            ctx.lineTo(prevMouseX + dx, prevMouseY + dy);
            ctx.stroke();
        } else if (snappedAngle > 0 && dy <= 0 || snappedAngle <= 0 && dy > 0) {
            // Нарисовать линию с заданными координатами конца
            ctx.beginPath();
            ctx.moveTo(prevMouseX, prevMouseY);
            ctx.lineTo(prevMouseX - dx, prevMouseY - dy);
            ctx.stroke();
        } else {
            if (snappedAngle == 0) {
                // Нарисовать линию с заданными координатами конца
                ctx.beginPath();
                ctx.moveTo(prevMouseX, prevMouseY);
                ctx.lineTo(prevMouseX, prevMouseY + dy);
                ctx.stroke()
            } else {
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

const drawText = (e) => {
    isInput = true;
    const mouseX = prevMouseX;
    const mouseY = prevMouseY;
    if ((mouseX < roomCoordinates[0].x2 - 5 && mouseX > roomCoordinates[0].x1 && mouseY < roomCoordinates[0].y2 - 5 && mouseY > roomCoordinates[0].y1)) {
        const inputElement = document.querySelector('#room-zero-input');
        if (!inputElement) {
            // Создание текстового поля
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'room-zero-input'; // Добавление уникального идентификатора для поиска инпута, созданного далее
            input.style.position = 'absolute';
            input.style.left = mouseX + canvas.offsetLeft + 'px';
            input.style.top = mouseY + canvas.offsetTop + 'px';
            input.style.width = '100px';
            input.style.font = '12px Arial';
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
                    ctx.fillText(text, mouseX-canvas.offsetLeft, mouseY + 15);

                    // Удаление текстового поля
                    document.body.removeChild(input);

                    canvas.focus();

                    // Удаление обработчика события keydown после нажатия клавиши Enter
                    input.removeEventListener('keydown', myEventHandlerEnter);
                    // Удаление обработчика события click вне функции
                    document.removeEventListener('click', myEventHandler);
                    addToHistory();
                    rectClear();
                    isInput = false;
                }
            }
            // Обработчик события нажатия клавиши Enter для завершения редактирования текста
            input.addEventListener('keydown', myEventHandlerEnter);
            let two = 0;

            function myEventHandler(event) {
                two++;
                if (!input.contains(event.target) && event.target !== input && two == 2) {
                    // Создание текстового узла для отображения текста
                    const text = input.value;

                    // Добавление текстового узла на холст
                    ctx.font = '12px Arial';
                    ctx.fillStyle = 'black';
                    ctx.fillText(text, mouseX-canvas.offsetLeft, mouseY + 15);

                    // Удаление текстового поля
                    document.body.removeChild(input);

                    canvas.focus();
                    // Удаление обработчика события click после клика вне поля ввода текста
                    document.removeEventListener('click', myEventHandler);
                    input.removeEventListener('keydown', myEventHandlerEnter);
                    addToHistory();
                    rectClear();
                    isInput = false;
                }
                if (two == 2) {
                    two = 0;
                }
            }

            // Добавление обработчика события click
            document.addEventListener('click', myEventHandler);
        } else {
            document.body.removeChild(inputElement);
        }
    } else {
        isInput = false;
    }
};
const drawTextRoom = (mouseX, mouseY, e) => {

    isInput = true;
    if ((mouseX < roomCoordinates[0].x2 - 10 && mouseX > roomCoordinates[0].x1 && mouseY - canvas.offsetTop < roomCoordinates[0].y2 - 10 && mouseY - canvas.offsetTop > roomCoordinates[0].y1)) {
        const inputElement = document.querySelector('#room-zero-input');
        if (!inputElement) {
            // Создание текстового поля
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'room-zero-input'; // Добавление уникального идентификатора для поиска инпута, созданного далее
            input.style.position = 'absolute';
            input.style.left = mouseX + 'px';
            input.style.top = mouseY + 'px';
            input.style.width = '100px';
            input.style.font = '12px Arial';
            input.style.fillStyle = 'black';

            // Установка начального значения текста
            input.value = '№';
            numberRoomNow = input.value;
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
                    numberRoomNow = input.value;
                    if (numberRoomNow == '№' || (roomCoordinates.some(room => room.number === numberRoomNow.replace('№', ''))))
                        alert("Не вижу номер или такой уже существует")
                    else {
                        // Создание текстового узла для отображения текста
                        const text = input.value;

                        // Добавление текстового узла на холст
                        ctx.font = '12px Arial';
                        ctx.fillStyle = 'black';
                        ctx.fillText(text, mouseX - canvas.offsetLeft, mouseY - canvas.offsetTop + 15);

                        // Сохраните координаты, когда prevMouseX больше endMouseX или prevMouseY больше endMouseY
                        if (prevMouseX > endMouseX) {
                            let temp = prevMouseX;
                            prevMouseX = endMouseX;
                            endMouseX = temp;
                        }

                        if (prevMouseY > endMouseY) {
                            let temp = prevMouseY;
                            prevMouseY = endMouseY;
                            endMouseY = temp;
                        }
                        roomCoordinates.push({ //Запись в табличку
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
                        isInput = false;
                    }
                }
            }
            // Обработчик события нажатия клавиши Enter для завершения редактирования текста
            input.addEventListener('keydown', myEventHandlerEnter);
            let two = 0;

            function myEventHandler(event) {
                numberRoomNow = input.value;
                two++;
                if (!input.contains(event.target) && event.target !== input && two == 2) {
                    if (numberRoomNow == '№' || (roomCoordinates.some(room => room.number === numberRoomNow.replace('№', ''))))
                        alert("Не вижу номер или такой уже существует")
                    else {
                        // Создание текстового узла для отображения текста
                        const text = input.value;

                        // Добавление текстового узла на холст
                        ctx.font = '12px Arial';
                        ctx.fillStyle = 'black';
                        ctx.fillText(text, mouseX - canvas.offsetLeft, mouseY - canvas.offsetTop + 15);

                        // Сохраните координаты, когда prevMouseX больше endMouseX или prevMouseY больше endMouseY
                        if (prevMouseX > endMouseX) {
                            let temp = prevMouseX;
                            prevMouseX = endMouseX;
                            endMouseX = temp;
                        }

                        if (prevMouseY > endMouseY) {
                            let temp = prevMouseY;
                            prevMouseY = endMouseY;
                            endMouseY = temp;
                        }
                        roomCoordinates.push({ //Запись в табличку
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
                        isInput = false;
                    }
                }
                if (two == 2) {
                    two = 0;
                }
            }

            // Добавление обработчика события click
            document.addEventListener('click', myEventHandler);
        } else {
            document.body.removeChild(inputElement);
        }
    } else {
        isInput = false;
    }
};
const drawTable = (e) => {
    ctx.beginPath(); // Создание нового пути для рисования прямоугольника
    
    if (shiftKey) {
        // Рассчитать размеры прямоугольника, чтобы стороны были параллельны осям
        const width = endMouseX - prevMouseX;
        const height = endMouseY - prevMouseY;
        if (width >= 0 && height >= 0) { // Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY, width, width);
        } else if (width < 0 && height >= 0) { // Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY, width, -width);
        } else if (width >= 0 && height < 0) { // Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY, width, -width);
        } else if (width < 0 && height < 0) { // Нарисовать прямоугольник с заданными размерами
            ctx.strokeRect(prevMouseX, prevMouseY, width, width);
        }
    } else {
        // Обычное рисование прямоугольника
        ctx.strokeRect(endMouseX, endMouseY, prevMouseX - endMouseX, prevMouseY - endMouseY);
    }

    let wtable, htable;
    wtable=prevMouseX - endMouseX;
    htable=prevMouseY - endMouseY;

    //ctx.rect(endMouseX, endMouseY, wtable, htable); // Создание прямоугольника в соответствии с положением указателя мыши
    ctx.stroke(); // Отрисовка прямоугольника

    // Отрисовка текста по центру прямоугольника
    ctx.font = "12px Arial"; // Установка шрифта и размера текста
    ctx.fillStyle = "black"; // Установка цвета текста
    ctx.textAlign = "center"; // Установка выравнивания текста по центру
    // Сохранение номера стола в переменной text
    text = "№" + lastTableNumber;
    ctx.fillText(text, endMouseX+wtable/2, endMouseY+htable/2); // Отрисовка текста по центру прямоугольника
};


const drawM = (e) => {

    // Нарисовать голову
    ctx.beginPath();
    //let radius = (e.clientY - prevMouseY)/7;
    let radius = Math.sqrt(Math.pow((prevMouseX - endMouseX) / 4, 2) + Math.pow((prevMouseY - endMouseY) / 7, 2))
    ctx.arc(prevMouseX + radius, prevMouseY + radius, radius, 0, 2 * Math.PI); // Создание головы в соответствии с положением указателя мыши
    ctx.stroke();

    // Нарисовать тело
    ctx.beginPath();
    ctx.moveTo(prevMouseX + radius, prevMouseY + radius * 2); // Начало тела (нижняя часть головы)
    ctx.lineTo(prevMouseX + radius, prevMouseY + radius * 5); // Конец тела
    ctx.lineWidth = 1; // Толщина линии
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    // Нарисовать руки
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY + 3 * radius); // Левая рука
    ctx.lineTo(prevMouseX + 2 * radius, prevMouseY + 3 * radius); // Правая рука
    ctx.lineWidth = 1; // Толщина линии
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    // Нарисовать ноги
    ctx.beginPath();
    ctx.moveTo(prevMouseX + radius, prevMouseY + radius * 5); // Начало ног (конец тела)
    ctx.lineTo(prevMouseX, prevMouseY + radius * 7); // Левая нога
    ctx.moveTo(prevMouseX + radius, prevMouseY + radius * 5); // Начало ног (конец тела)
    ctx.lineTo(prevMouseX + radius * 2, prevMouseY + radius * 7); // Правая нога
    ctx.lineWidth = 1; // Толщина линии
    ctx.strokeStyle = "#000000";
    ctx.stroke();
};


const drawF = (e) => {
    // Нарисовать голову
    ctx.beginPath();
    //let radius = (e.clientY - prevMouseY)/7;
    let radius = Math.sqrt(Math.pow((prevMouseX - endMouseX) / 4, 2) + Math.pow((prevMouseY - endMouseY) / 7, 2))
    ctx.arc(prevMouseX + radius, prevMouseY + radius, radius, 0, 2 * Math.PI); // Создание головы в соответствии с положением указателя мыши
    ctx.stroke();

    // Нарисовать тело
    ctx.beginPath();
    ctx.moveTo(prevMouseX + radius, prevMouseY + radius * 2); // Начало тела (нижняя часть головы)
    ctx.lineTo(prevMouseX + radius, prevMouseY + radius * 3); // Конец тела
    ctx.lineWidth = 1; // Толщина линии
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    // Нарисовать руки
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY + 3 * radius); // Левая рука
    ctx.lineTo(prevMouseX + 2 * radius, prevMouseY + 3 * radius); // Правая рука
    ctx.lineWidth = 1; // Толщина линии
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    // Нарисовать юбку
    ctx.beginPath();
    ctx.moveTo(prevMouseX + radius, prevMouseY + radius * 3); // Начало юбки
    ctx.lineTo(prevMouseX, prevMouseY + radius * 7); // Левая сторона
    ctx.moveTo(prevMouseX + radius, prevMouseY + radius * 3); // Начало юбки
    ctx.lineTo(prevMouseX + radius * 2, prevMouseY + radius * 7); // Правая сторона
    ctx.moveTo(prevMouseX, prevMouseY + radius * 7); // Начало низа
    ctx.lineTo(prevMouseX + radius * 2, prevMouseY + radius * 7); // Конец ниха
    ctx.lineWidth = 1; // Толщина линии
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
    ctx.arc(prevMouseX, prevMouseY, radius, angle, angle + Math.PI / 4, false); // Создание полуокружности в соответствии с положением указателя мыши
    ctx.stroke(); // Отрисовка полуокружности
    ctx.setLineDash([]);
};

const drawLadder = (e) => {
    // Рисование прямоугольника лестницы
    ctx.beginPath(); // Создание нового пути для рисования прямоугольника
    ctx.rect(prevMouseX, prevMouseY, endMouseX - prevMouseX, endMouseY - prevMouseY); // Создание прямоугольника в соответствии с положением указателя мыши
    ctx.stroke(); // Отрисовка прямоугольника

    if (endMouseY - prevMouseY > 0) {
        // Рисование палок лестницы
        for (let i = 1; i < (endMouseY - prevMouseY) / 10; i++) {
            ctx.beginPath(); // Создание нового пути для рисования линии
            ctx.moveTo(prevMouseX, prevMouseY + 10 * i); // Перемещение линии в положение указателя мыши
            ctx.lineTo(endMouseX, prevMouseY + 10 * i); // Создание линии в соответствии с положением указателя мыши
            ctx.stroke(); // Отрисовка линии
        }
    } else {
        // Рисование палок лестницы
        for (let i = 1; i < -(endMouseY - prevMouseY) / 10; i++) {
            ctx.beginPath(); // Создание нового пути для рисования линии
            ctx.moveTo(prevMouseX, prevMouseY - 10 * i); // Перемещение линии в положение указателя мыши
            ctx.lineTo(endMouseX, prevMouseY - 10 * i); // Создание линии в соответствии с положением указателя мыши
            ctx.stroke(); // Отрисовка линии
        }
    }

};

function rectClear() {
    const roomZero = roomCoordinates[0];
    // Очистить область за пределами прямоугольника
    ctx.clearRect(0, 0, roomZero.x1, canvas.height);
    ctx.clearRect(roomZero.x2, 0, canvas.width, canvas.height);
    ctx.clearRect(roomZero.x1, 0, roomZero.x2 - roomZero.x1, roomZero.y1);
    ctx.clearRect(roomZero.x1, roomZero.y2, roomZero.x2 - roomZero.x1, canvas.height);
}