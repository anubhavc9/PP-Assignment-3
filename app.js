const express = require('express');
const mongoose = require('mongoose');

// Using a local MongoDB database
// const url = 'mongodb://localhost/PP_Assignment_3';

// Using MongoDB Atlas Cloud Database
const url =
    'mongodb+srv://Anubhav123:Anubhav123@cluster0.sdhjc.mongodb.net/PP_Assignment_3?retryWrites=true&w=majority';

const app = express();
const port = process.env.PORT || 9000;
app.use(express.json());

const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose.connect(url, {
        useNewUrlParser: true
    },
    err => err ? console.log(err) : console.log('Connected to database')
);

app.get('/', (req, res) => {
    res.status(200).send('Home route loaded!');
});

const mealsRouter = require('./routes/meals');
app.use('/meals', mealsRouter);

const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);

const chefsRouter = require('./routes/chefs');
app.use('/chefs', chefsRouter);

app.listen(port, () => {
    console.log(`Backend server started at port ${port}`);
});