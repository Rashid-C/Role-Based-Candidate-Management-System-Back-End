// scripts/createAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected:', conn.connection.host);

        // Check if admin exists
        const adminExists = await Admin.findOne({ email: 'admin@example.com' });
        console.log('Existing admin:', adminExists);

        if (adminExists) {
            console.log('Admin already exists');
            process.exit(0);
        }

        // Create new admin
        const adminData = {
            username: 'admin',
            email: 'admin@example.com',
            password: 'admin123',
            fullName: 'System Admin'
        };

        const admin = await Admin.create(adminData);
        console.log('Admin created successfully:', {
            id: admin._id,
            username: admin.username,
            email: admin.email,
            fullName: admin.fullName
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit(0);
    }
};

createAdmin();