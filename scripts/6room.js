// ///////////////Отображение кабинета поближе//////////////////
// const inputNum = document.getElementById('num');
// const roomList = document.getElementById('room-list');
// const btnNum = document.getElementById('btnnum');
// let oneIMG;
// let twoIMG;
// let canW;
// let canH;
// let increasemini;

// inputNum.addEventListener('keypress', (e) => {
//     if (!/[0-9]/.test(e.key)) {
//         e.preventDefault();
//     }
// });

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

// btnNum.addEventListener('click', () => {

//     const roomNumber = inputNum.value;

//     // Проверим, существует ли номер комнаты в массиве roomCoordinates
//     const roomExists = roomCoordinates.some((room) => room.number === roomNumber);

//     if (!roomExists) 
//     {
//         alert(`Такого номера кабинета не существует`);
//     } 
//     else {
//         document.querySelector('#divTable').style.display = 'flex';
//         const room = roomCoordinates.find((room) => room.number === roomNumber);
//         if(roomNow==0)
//         {
//             oneIMG = ctx.getImageData(0, 0, canvas.width, canvas.height);

//             canW=canvas.width;
//             canH=canvas.height;

//             increasemini = Math.min(Math.floor((canW - 70)/(room.x2-room.x1)), Math.floor((canH - 70) /(room.y2-room.y1)));

//             // Новая длина канвы
//             const newWidth = (room.x2-room.x1)*increasemini;
//             // Новая высота канвы
//             const newHeight = (room.y2-room.y1)*increasemini;

//             canvas.width = canW;
//             canvas.height = canH;

//             roomNow=roomNumber;

//             ctx.strokeRect(50, 50, newWidth, newHeight);
//             //alert((newWidth-50)+ " "+(newHeight-50));
//             // Добавление текстового узла на холст
//             ctx.font = '14px Arial';
//             ctx.fillStyle = 'black';
//             ctx.fillText('№'+roomNow, (50 + (2 * newWidth / 3)), (50 + (2 * (newHeight) / 3) + 15));
//             rectClear(roomNow);
//             // Восстановление сохраненного изображения на холст
//             // if (oneIMG) {
//             //     ctx.putImageData(oneIMG, 0, 0);
//             // }
//         }
//         else
//         {
//             const roomdo = roomCoordinates.find((room) => room.number === roomNumber);

//             // Новая длина канвы
//             const newWidth = (roomdo.x2-roomdo.x1)*increasemini;
//             // Новая высота канвы
//             const newHeight = (roomdo.y2-roomdo.y1)*increasemini;

//             twoIMG = ctx.getImageData(50, 50, newWidth, newHeight);

            

//             // Восстановление сохраненного изображения на холст
//             if (oneIMG) {
//                 ctx.putImageData(oneIMG, 0, 0);
//             }
            
//             if (twoIMG){
//                 var scaledImageData = scaleImageData(twoIMG, 1/increasemini);
//                 ctx.putImageData(scaledImageData, roomdo.x1, roomdo.y1);

//             }
            
            
//         }
//     }
// });
// function scaleImageData(imageData, scale) {
//     var scaled = ctx.createImageData(imageData.width * scale, imageData.height * scale);
  
//     for(var row = 0; row < imageData.height; row++) {
//       for(var col = 0; col < imageData.width; col++) {
//         var sourcePixel = [
//           imageData.data[(row * imageData.width + col) * 4 + 0],
//           imageData.data[(row * imageData.width + col) * 4 + 1],
//           imageData.data[(row * imageData.width + col) * 4 + 2],
//           imageData.data[(row * imageData.width + col) * 4 + 3]
//         ];
//         for(var y = 0; y < scale; y++) {
//           var destRow = row * scale + y;
//           for(var x = 0; x < scale; x++) {
//             var destCol = col * scale + x;
//             for(var i = 0; i < 4; i++) {
//               scaled.data[(destRow * scaled.width + destCol) * 4 + i] =
//                 sourcePixel[i];
//             }
//           }
//         }
//       }
//     }
  
//     return scaled;
//   }