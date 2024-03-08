const express = require("express");
const cors = require("cors");
const  mongoose = require('mongoose');
require("dotenv").config();

const userRouter = require("./routes/User-routes");

const app = express();

app.use(express.json());

app.use("/user",userRouter);

app.use('/api/auth', require('./routes/authenticationRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
//app.use('/api/vehicle', require('./routes/vehicleRouter'));

//product router
const productRouter = require("./routes/productRoutes.js");
app.use("/product", productRouter);

//event router
const eventRouter = require("./routes/eventRoutes.js");
app.use("/event", eventRouter);

//location router
const locationRouter = require("./routes/locationRoutes.js");
app.use("/location", locationRouter);

//vehicle router
const vehicleRouter = require("./routes/vehicleRouter.js");
app.use("/vehicle", vehicleRouter);


const initialize = async () => {
    try {
      await mongoose.connect(process.env.MONGO_CONNECT_URL);
      console.log("Mongodb connection success!");
    } catch (e) {
      console.log(e);
    }
  };
  
  const startServer = async () => {
    await initialize();
    app.listen(process.env.PORT || 8000);
    console.log('Server started');
  };
  
  startServer();