const http = require('http');

let counters = {
    '/': 0,
    '/about': 0
};

function renderPage(title, link, linkText, counter) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            <h1>${title}</h1>
            <p>Эта страница была просмотрена ${counter} раз(а).</p>
            <a href="${link}">${linkText}</a>
        </body>
        </html>
    `;
}

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        counters['/'] += 1;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(renderPage('Главная страница', '/about', 'Перейти на страницу About', counters['/']));
    } else if (req.url === '/about') {
        counters['/about'] += 1;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(renderPage('Страница About', '/', 'Вернуться на главную страницу', counters['/about']));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>404 Not Found</title>
            </head>
            <body>
                <h1>404 Not Found</h1>
                <p>Страница не найдена. Вернуться на <a href="/">главную</a>.</p>
            </body>
            </html>
        `);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
