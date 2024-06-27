///////////Размеры офиса/////////////
// Получаем элементы ввода и кнопку
var inputW = document.getElementById('W');
var inputH = document.getElementById('H');
var btn = document.getElementById('wh');
let increase;

const drawOffice = () => {

    // Получение значений ширины и высоты из элементов ввода
    const width = parseInt(inputW.value);
    const height = parseInt(inputH.value);

    if (inputW.value === "" || inputH.value === "")
        alert("Создайте офис")
    else { // Проверка, не превышают ли размеры 100
        if (width > 100 || height > 100) {
            alert('У вас не может быть такой большой офис! Максимальный размер: 100x100');
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        roomCoordinates.splice(0, roomCoordinates.length);
        lastTableNumber = 0;

        increase = Math.min(Math.floor((canvas.width - 70) / width), Math.floor((canvas.height - 70) / height));

        // Новая длина канвы
        const newWidth = width * increase;
        // Новая высота канвы
        const newHeight = height * increase;

        ctx.strokeRect(50, 50, newWidth, newHeight);
        roomCoordinates.push({
            number: 0,
            x1: 50,
            y1: 50,
            x2: 50 + newWidth,
            y2: 50 + newHeight
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