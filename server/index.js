const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const adminRoutes = require('./route/admin');
require('dotenv').config();

// ...existing code...

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add this line

// ...existing code...

app.use('/api/admin', adminRoutes); // Ensure this line is correct

// ...existing code...

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in environment variables');
    process.exit(1);
}

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

// ...existing code...
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
