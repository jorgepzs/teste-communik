import  swaggerUI  from 'swagger-ui-express';
import express = require("express");
import { AppDataSource } from "./dataBase/data-source";
import routes from "./routes";
import swaggerDocument from '../swagger.json'
AppDataSource.initialize()
  .then(async () => {
    const app = express();

    const port = process.env.PORT;

    app.use(express.json());

    app.use(routes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  

    app.listen(port || 3000, () =>
      console.log(`Server is Running on port ${port || 3000}`)
    );
  })
  .catch((error) => console.log(error));
