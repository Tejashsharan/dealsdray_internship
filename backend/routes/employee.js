const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const middleware = require('../middleware/middleware');

// Create a new employee
router.post('/', middleware, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const employee = new Employee(req.body);
        const savedEmployee = await employee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(400).json({ 
            message: error.message,
            errors: error.errors 
        });
    }
});

// Get all employees
router.get('/', middleware, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an employee by ID
router.put('/:id', middleware, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ 
            message: error.message,
            errors: error.errors 
        });
    }
});

// Delete an employee by ID
router.delete('/:id', middleware, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get employee by ID
router.get('/:id', middleware, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const employee = await Employee.findById(req.params.id);
        
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
