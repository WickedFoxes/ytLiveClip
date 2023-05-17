const mysql_odbc = require('./db/db_conn');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const board = require('./controller/board-controller');
const view = require('./controller/view-controller');


async function launchServer(){
  const app = express();
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('layout', 'layout/layout');

  app.get('/', board.board);
  app.get('/board/:page', board.board);
  app.get('/board/:channel/:page', board.board);
  app.get('/view/:video_name', view.view);

  const port = process.env.PORT || 80;
  app.listen(port, () => {
    console.log(`Server is runing on port ${port}`);
  })
}

launchServer();