const express = require('express');
const cors = require('cors')
const routes = require('./routes');

const app = express();

app.use(cors())
app.use(express.json())
app.use(routes)

/**
 * Método HTTP
 * 
 * GET: Buscar uma informação no back-end
 * POST: Criar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

 /**
  * Query Params:
  * Route Params:
  * Request Body:
  */


app.listen(3333);