//////////////Маусдаун, маусмув и маусап, click, change/////////////////
let endMouseX = 0,
    endMouseY = 0;
const tableCoordinates = [];
const roomCoordinates = [];
let roomNow = 0;
let numberRoomNow;
// Начало рисования
const startDraw = (e) => {
    removAfterToHistory();
    if (selectedTool != 'null' && isInput != true) {
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
        roomNow=0;
        if (selectedTool === "text") {
            isDrawing = false;
            drawText(e);
        } else if (selectedTool === "table") {
            // Найдите текущую комнату, в которую попадает курсор мыши
            for (const room of roomCoordinates) {
                if (room.number!=0 && prevMouseX >= room.x1 && prevMouseX <= room.x2 && prevMouseY >= room.y1 && prevMouseY <= room.y2) {
                    roomZero = room;
                    roomNow=room.number;
                    break;
                }
            }
            const tableInRoom = tableCoordinates.filter(table => table.numberroom === roomNow);
            if (tableInRoom.length > 0) {
                lastTableNumber = tableInRoom[tableInRoom.length - 1].number;
            } else {
                lastTableNumber = 0;
            }

            for (let i = 0; i < tableCoordinates.length; i++) {
                const table = tableCoordinates[i];
            
                if(table.numberroom===roomNow)
                {
                    if (Math.abs(prevMouseX - table.x1) < 15)
                    prevMouseX = table.x1;
                    if (Math.abs(prevMouseX - table.x2) < 15)
                    prevMouseX = table.x2;
                    if (Math.abs(prevMouseY - table.y1) < 15)
                    prevMouseY = table.y1;
                    if (Math.abs(prevMouseY - table.y2) < 15)
                    prevMouseY = table.y2;
                }
            }

            lastTableNumber++;
            drawTable();
        } else if (selectedTool === "room" || selectedTool === "rectangle" || selectedTool === "ladder") {

            for (let i = 0; i < roomCoordinates.length; i++) {
                const room = roomCoordinates[i];
              
                if (Math.abs(prevMouseX - room.x1) < 15)
                  prevMouseX = room.x1;
                if (Math.abs(prevMouseX - room.x2) < 15)
                  prevMouseX = room.x2;
                if (Math.abs(prevMouseY - room.y1) < 15)
                  prevMouseY = room.y1;
                if (Math.abs(prevMouseY - room.y2) < 15)
                  prevMouseY = room.y2;
              }
              
        }
        rectClear();
    }
}
// Рисование
const drawing = (e) => {
    if (!isDrawing) return; // Если isDrawing равно false, выйти из функции
    ctx.putImageData(snapshot, 0, 0); // Добавление скопированных данных холста на этот холст

    endMouseX = e.offsetX;
    endMouseY = e.offsetY;

    if (selectedTool != 'null') {
        // const roomZero = roomCoordinates[0];
        // if (Math.abs(endMouseX - roomZero.x1) < 15 || endMouseX - roomZero.x1 < 0)
        //     endMouseX = roomZero.x1;
        // if (Math.abs(endMouseX - roomZero.x2) < 15 || endMouseX - roomZero.x2 > 0)
        //     endMouseX = roomZero.x2;
        // if (Math.abs(endMouseY - roomZero.y1) < 15 || endMouseY - roomZero.y1 < 0)
        //     endMouseY = roomZero.y1;
        // if (Math.abs(endMouseY - roomZero.y2) < 15 || endMouseY - roomZero.y2 > 0)
        //     endMouseY = roomZero.y2;
        let roomZero = null;
        if(selectedTool === "room" || selectedTool === "ladder" || selectedTool==="rectangle")
        {
            roomZero=roomCoordinates[0];
        }
        else
        {
            // Найдите текущую комнату, в которую попадает курсор мыши
            for (const room of roomCoordinates) {
                if (room.number!=0 && prevMouseX >= room.x1 && prevMouseX <= room.x2 && prevMouseY >= room.y1 && prevMouseY <= room.y2) {
                    roomZero = room;
                    roomNow=room.number;
                    break;
                }
            }
            if(roomNow==0)
                roomZero=roomCoordinates[0];
        }
        // Если текущая комната найдена, обновите границы
        if (roomZero && selectedTool != "door") {
            if (Math.abs(endMouseX - roomZero.x1) < 15 || endMouseX - roomZero.x1 < 0)
                endMouseX = roomZero.x1;
            if (Math.abs(endMouseX - roomZero.x2) < 15 || endMouseX - roomZero.x2 > 0)
                endMouseX = roomZero.x2;
            if (Math.abs(endMouseY - roomZero.y1) < 15 || endMouseY - roomZero.y1 < 0)
                endMouseY = roomZero.y1;
            if (Math.abs(endMouseY - roomZero.y2) < 15 || endMouseY - roomZero.y2 > 0)
                endMouseY = roomZero.y2;
        }
        if(selectedTool === "room" || selectedTool === "lader")
        {
            for (let i = 1; i < roomCoordinates.length; i++) {
                const room = roomCoordinates[i];
                if (Math.abs(endMouseX - room.x1) < 15)
                endMouseX = room.x1;
                if (Math.abs(endMouseX - room.x2) < 15)
                endMouseX = room.x2;
                if (Math.abs(endMouseY - room.y1) < 15)
                endMouseY = room.y1;
                if (Math.abs(endMouseY - room.y2) < 15)
                endMouseY = room.y2;
                
            }
        } 

        if (selectedTool === "table") 
        {
            for (let i = 0; i < tableCoordinates.length; i++) {
                const table = tableCoordinates[i];
            
                if(table.numberroom===roomNow)
                {
                    if (Math.abs(endMouseX - table.x1) < 15)
                    endMouseX = table.x1;
                    if (Math.abs(endMouseX - table.x2) < 15)
                    endMouseX = table.x2;
                    if (Math.abs(endMouseY - table.y1) < 15)
                    endMouseY = table.y1;
                    if (Math.abs(endMouseY - table.y2) < 15)
                    endMouseY = table.y2;
                }
            }
        }
          

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
        } else if (selectedTool === "triangle") {
            drawTriangle(e);
        } else if (selectedTool === "line") {
            drawLine(e);
        } else if (selectedTool === "room") {
            drawRoom(e);
        } else if (selectedTool === "table") {
            drawTable(e);
        } else if (selectedTool === "m") {
            drawM(e);
        } else if (selectedTool === "f") {
            drawF(e);
        } else if (selectedTool === "door") {
            drawDoor(e);
        } else if (selectedTool === "ladder") {
            drawLadder(e);
        }
        rectClear();
    }
}

function handleMouseUp(e) {

    if (selectedTool != 'null' && isInput != true) {
        //removAfterToHistory();

        if (selectedTool === "table") {

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
        if (selectedTool == "room" && Math.abs(prevMouseX - endMouseX) > 30 && Math.abs(prevMouseY - endMouseY) > 30) {
            const mouseX = prevMouseX - (2 * (prevMouseX - endMouseX) / 3);
            const mouseY = prevMouseY + canvas.offsetTop - (2 * (prevMouseY - endMouseY) / 3);
            drawTextRoom(mouseX, mouseY, e);
        } else {
            addToHistory();
        }

        rectClear();
    }
}

// Обработка события нажатия кнопки мыши на холсте
canvas.addEventListener("mousedown", startDraw);

// Обработка события перемещения мыши по холсту
canvas.addEventListener("mousemove", drawing);

// Обработка события отпускания кнопки мыши на холсте  
canvas.addEventListener("mouseup", handleMouseUp);

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
    const {
        n,
        x1,
        y1,
        x2,
        y2
    } = roomCoordinates[0];
    // Вычисление размеров выделенной области
    const width2 = x2 + 50;
    const height2 = y2 + 50;
    savedImage = ctx.getImageData(0, 0, width2, height2);

    const width1 = canvas.width;
    const height1 = canvas.height;

    //canvas.width = width2;
    //canvas.height = height2;

    if (savedImage) {
        ctx.putImageData(savedImage, 0, 0);
    }

    const link = document.createElement("a"); // Создание элемента <a>
    link.download = `${Date.now()}.jpg`; // Передача текущей даты как значения скачивания ссылки
    link.href = canvas.toDataURL(); // Передача данных холста как значения ссылки
    link.click(); // Клик по ссылке для скачивания изображения

    document.querySelector('#rowinput').style.display = 'flex';

    const copyInput = document.getElementById("copyInput");
    const copyButton = document.getElementById("copyButton");

    // Отсортировать массив по номеру кабинета
    tableCoordinates.sort((a, b) => a.numberroom - b.numberroom);

    let text = "";

    // Перебрать отсортированный массив
    for (let i = 0; i < tableCoordinates.length; i++) {
        const table = tableCoordinates[i];

        // Начать новую строку для каждого кабинета
        if (i === 0 || table.numberroom !== tableCoordinates[i - 1].numberroom) {
            text += `\nКабинет ${table.numberroom}: `;
        }

        // Добавить координаты стола в строку
        text += `Стол ${table.number} (${table.x1 < 1000 ? (table.x1 < 100 ? "00" : "0") : ""}${table.x1}, ${table.y1 < 1000 ? (table.y1 < 100 ? "00" : "0") : ""}${table.y1}, ${table.x2 < 1000 ? (table.x2 < 100 ? "00" : "0") : ""}${table.x2}, ${table.y2 < 1000 ? (table.y2 < 100 ? "00" : "0") : ""}${table.y2}) `;
    }

    copyInput.value = text;

    copyButton.addEventListener("click", function() {
        copyInput.select();
        document.execCommand("copy");
    });

    //как выглядят таблицы
    // tableCoordinates.push({
    //     number: lastTableNumber,
    //     numberroom: roomNow,
    //     x1: prevMouseX,
    //     y1: prevMouseY,
    //     x2: endMouseX,
    //     y2: endMouseY
    // });
    // roomCoordinates.push({ //Запись в табличку
    //     number: numberRoomNow.replace('№', ''),
    //     x1: prevMouseX,
    //     y1: prevMouseY,
    //     x2: endMouseX,
    //     y2: endMouseY
    // });



    //canvas.width = width1;
    //canvas.height = height1;

    // if (savedImage) {
    //     ctx.putImageData(savedImage, 0, 0);
    // }
});
