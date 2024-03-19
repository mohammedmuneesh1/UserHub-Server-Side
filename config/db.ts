// db.js

import mongoose from 'mongoose';

export function connectDB() {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
        throw new Error('DB_URL not defined');
    }

    mongoose.connect(dbUrl)
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch((error) => {
        console.error('Error occurred while connecting database:', error);
        process.exit(1); // Exit the process if unable to connect to the database
    });

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected.');
    });
}
