//////Этапы/////
let stageOneIMG; //первое изображение
let stage = 0;
const buttonWhat = document.getElementById("buttonWhat");
const buttonWhatObratno = document.getElementById("buttonWhatObratno");
// Слушатель события щелчка для кнопки
buttonWhatObratno.addEventListener('click', obratno);
buttonWhat.addEventListener('click', vpered);

vpered();

function vpered() {
    if (stage == 1 && !roomCoordinates[0]) {
        alert("Создайте офис");
    } else if (stage != 3) {
        if (stage == 0)
            stageOneIMG = ctx.getImageData(0, 0, canvas.width, canvas.height);
        stage = stage + 1;
        changeStage();
    }

}

function obratno() {
    if (stage != 1) {
        stage = stage - 1;
        // if(stage==1)
        // {
        //     // Создаем окно подтверждения
        //     const confirm = window.confirm("Все рисунки пропадут. Продолжать?");
        //     // Проверяем ответ пользователя
        //     if (confirm) {
        //         changeStage();
        //         if(stage==1)
        //             document.querySelector('#rowroom').style.display = 'flex';
        //     }
        //     else
        //     stage++;
        // }
        // else{
        //     changeStage();
        // }
        changeStage();
        if (stage == 1)
            document.querySelector('#rowroom').style.display = 'flex';
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
            //ctx.putImageData(stageOneIMG, 0, 0);
            selectedTool = "null";
            selectedColor = "#000";
            stageElement.innerHTML = "Этап 1";
            whatElement.innerHTML = "задайте размеры офиса <p>и нарисуйте кабинеты</p>";
            document.querySelector('#divsize').style.display = 'flex';
            //document.querySelector('#rowroom').style.display = 'flex';
            break;
        case 2:
            stageOneIMG = ctx.getImageData(0, 0, canvas.width, canvas.height);
            selectedTool = "null";
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
            selectedTool = "null";
            stageElement.innerHTML = "Этап 3";
            whatElement.innerHTML = "сохраните</p>";
            document.querySelector('.row.buttons').style.display = 'flex';
            break;
    }


}