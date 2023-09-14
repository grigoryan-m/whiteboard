document.addEventListener("DOMContentLoaded", ()=>{
// Получаем элемент canvas (поле для рисования) из DOM
    const canvas = document.getElementById('whiteboard')
    ,brushSize = document.getElementById("brushSize");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Создаем контекст рисования 2D
    const ctx = canvas.getContext('2d');

    // Переменные для хранения состояния рисования
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Функция для начала рисования
    function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop];
    }

    // Функция для завершения рисования
    function stopDrawing() {
    isDrawing = false;
    }

    // Функция для рисования линии
    function draw(e) {
    if (!isDrawing) return; // Не рисовать, если кнопка мыши не нажата

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();

    [lastX, lastY] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop];
    }

    // Слушатели событий для начала и завершения рисования, а также рисования самой линии
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);

    brushSize.addEventListener("input", ()=>{
        ctx.lineWidth = brushSize.value;
    });
});