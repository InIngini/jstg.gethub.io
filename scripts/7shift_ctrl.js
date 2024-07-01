/////////shift, ктрл+зт, ктрл+у////////////
let history = [];// Массив для хранения истории изменений
let selectedHistory =[];
let historyIndex = -1;
let shiftKey = false;
// Состояние нажатия клавиш
let isCtrlPressed = false;
let isZPressed = false;
let isYPressed = false;

//Shift
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

//Ctrl
function removAfterToHistory() {
    // Получаем текущий индекс в истории
    let currentIndex = historyIndex;

    // Если есть значения после текущего, удаляем их из истории
    if (currentIndex < history.length - 1) {
        history = history.slice(0, currentIndex + 1);
        
        for (let i = currentIndex+1; i < selectedHistory.length; i++) 
        {
            const item = selectedHistory[i];
            if (item === "room") {
                roomCoordinates.pop();
            } else if (item === "table") {
                tableCoordinates.pop();
            }
        }
      
        if (selectedHistory) {
          selectedHistory.splice(currentIndex + 1);
        }
    }
}

// Функция для добавления состояния в историю
function addToHistory() {
    // Сохраняем текущее состояние canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    history.push(imageData);
    historyIndex++;
    selectedHistory.push(selectedTool);
}

// Функция для отмены изменений (Ctrl+Z)
function undo() {
    if (historyIndex > -1) {
        historyIndex--;
        ctx.putImageData(history[historyIndex], 0, 0);
    }

}

// Функция для повтора изменений (Ctrl+Y)
function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        ctx.putImageData(history[historyIndex], 0, 0);
    }
}


// Глобальный обработчик событий клавиатуры
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.key.toLowerCase() === 'z' || event.key.toLowerCase() === 'я' || event.key.toLowerCase() === 'y' || event.key.toLowerCase() === 'н') { // Проверяем состояние нажатия клавиш
        if (event.ctrlKey) {
            isCtrlPressed = true;
        }
        if (event.key.toLowerCase() === 'z' || event.key.toLowerCase() === 'я') {
            isZPressed = true;
        }
        if (event.key.toLowerCase() === 'y' || event.key.toLowerCase() === 'н') {
            isYPressed = true;
        }
    } else {
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