const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const partsRoutes = require('./routes/parts'); 
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/parts', partsRoutes); 
app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://localhost:27017/CarPartsDB')
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error(err));

app.listen(5000, () => console.log('Server running on port 5000'));