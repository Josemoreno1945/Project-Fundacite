import app from "./app.js"
import cors from 'cors';
import express from 'express'
import {PORT} from "./config.js"
import usersRoutes from "./routes/users.routes.js"
import docRoutes from "./routes/doc.routes.js"
import proyRoutes from "./routes/proy.routes.js"
import catRoutes from "./routes/cate.routes.js"

import morgan from 'morgan'




app.use(morgan('dev'))
app.use(express.json())
app.use(cors());
app.use(usersRoutes)
app.use(docRoutes)
app.use(proyRoutes)
app.use(catRoutes)
app.listen(PORT);
console.log("Server on port",PORT)