// fetch('https://imgur.com/60HHc2C').then(async (response) => {
//     let received = 0;

//     // Получаем поток в переменную
//     const reader = response.body.getReader();

//     // Считываем общую длину данных
//     const contentLength = parseInt(response.headers.get('Content-Length'), 10);

//     while (true) {
//         // После вызова read() возвращается объект, в котором
//         // done — boolean-значение о том закончилась ли информация
//         // value — массив байт, которые пришли в этот раз
//         const { done, value } = await reader.read();

//         if (done) {
//             console.log('Получено 100%');
//             break;
//         }

//         received += Math.ceil(contentLength / value.length);

//         console.log(`Получено ${received}%`);
//     }
// });
