const mongoose = require('mongoose');
const { log } = require('../utils/logger');

async function connectToDatabase(uri) {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        log('Connected to MongoDB', 'success');
    } catch (error) {
        log(`MongoDB connection error: ${error.message}`, 'error');
        process.exit(1);
    }
}

module.exports = { connectToDatabase };
