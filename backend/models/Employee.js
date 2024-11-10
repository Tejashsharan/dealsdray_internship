const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit mobile number!`
        }
    },
    designation: {
        type: String,
        required: [true, 'Designation is required'],
        enum: ['hr', 'manager', 'sales'],
        lowercase: true
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['male', 'female'],
        lowercase: true
    },
    course: {
        type: String,
        required: [true, 'Course is required'],
        enum: ['mca', 'bca', 'bsc'],
        lowercase: true
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: {
            validator: function(v) {
                return /\.(jpg|jpeg|png)$/i.test(v);
            },
            message: props => 'Only JPG, JPEG, and PNG files are allowed!'
        }
    }
}, {
    timestamps: true
});

// Add index for email to ensure uniqueness
employeeSchema.index({ email: 1 }, { unique: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
