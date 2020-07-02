if (typeof window === 'undefined') {
  global.window = {};
}

const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server')

const renderMarkup = (str) => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Document</title>
      </head>
      <body>
        <div id="root">${str}</div>
      </body>
    </html>`;
}

const server = (port) => {
  const app = express();

  app.use(express.static('dist'))
  app.get('/search', (req, res) => {
    const html = renderMarkup(renderToString(SSR))
    console.log('SSR', SSR)
    res.status(200).send(html)
  })

  app.listen(port, () => {
    console.log('Server is running on port' + port)
  })
}

server(process.env.PORT || 3000)

