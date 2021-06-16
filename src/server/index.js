const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const route = require('../route');
const app = express();

mongoose.connect('mongodb+srv://dell:value123@cluster0.vuve5.mongodb.net/db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

app.use(cors());
app.use(express.json());
app.use(route);
app.use('/uploads', express.static('uploads'));

app.listen(process.env.PORT || 3000, () => console.log('runing server'));