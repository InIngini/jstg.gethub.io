# jstg.gethub.io
<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>JS Mini App</title>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
            }
            .toolbar {
                background-color: #FF4D4D;
                padding: 10px;
                display: flex;
                flex-direction: row;
                justify-content:center;
                align-items: center;
            }
            #toolbar_size{
                display: flex;
                flex-direction: column;
                justify-content:center;
                align-items: center;
            }
            #toolbar_size label{
                margin-top: 5px;
            }
            .toolbar div, .toolbar button {
                margin-right: 10px;
            }
            .toolbar input {
                width: 50px;
                margin-left: 5px;
            }
            .toolbar button {
                padding: 5px 10px;
                background-color: white;
                border: 1px solid black;
                cursor: pointer;
            }
            .toolbar button:hover {
                background-color: #f0f0f0;
            }
            #canvas {
                width: 100%;
                height: 100%;
                background-color: white;
                border: 1px solid black;
            }
            .shape {
                width: 80px;
                height: 70px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid black;
                background-color: #f0f0f0
            }
            .shape svg {
                width: 52px;
                height: 52px;
            }
        </style>
    </head>
    <body>
        <div class="toolbar">
            <div id="toolbar_size">
                <label>Размеры офиса:</label>
                <label>W: <input type="text"></label>
                <label>H: <input type="text"></label>
            </div>
            <div>Добавить сущность:</div>
            <button class="shape" id="rectangle"><svg><rect width="100%" height="100%" fill="none" stroke="black"></rect></svg></button>
            <button class="shape" id="circle"><svg><circle cx="50%" cy="50%" r="50%" fill="none" stroke="black"></circle></svg></button>
            <button class="shape" id="polygon"><svg><polygon points="25,0 50,50 0,50" fill="none" stroke="black"></polygon></svg></button>
            <button class="shape" id="line"><svg><line x1="0" y1="0" x2="100%" y2="100%" stroke="black"></line></svg></button>
            <button class="shape" id="text"><svg><text x="50%" y="50%" text-anchor="middle">Text</text></svg></button>
            <button>Сохранить</button>
        </div>
        <canvas id="canvas"></canvas>
    
        <script>
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

        </script>
    </body>
</html>
