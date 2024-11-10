import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Dashboard = () => {
    const navigate = useNavigate()
    const [showAddEmployee, setShowAddEmployee] = useState(false)
    const [showViewEmployee, setShowViewEmployee] = useState(false)
    const [employees, setEmployees] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: "",
        image: ""
    })
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [showHome, setShowHome] = useState(true)
    const [alert, setAlert] = useState({ show: false, message: '', type: '' })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const showAlert = (message, type = 'error') => {
        setAlert({ show: true, message, type })
        setTimeout(() => {
            setAlert({ show: false, message: '', type: '' })
        }, 3000) // Hide alert after 3 seconds
    }

    const handleAddEmployee = async (e) => {
        e.preventDefault()
        
        if (!formData.name.trim()) {
            showAlert('Name is required')
            return
        }
        if (!formData.email.trim()) {
            showAlert('Email is required')
            return
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            showAlert('Please enter a valid email')
            return
        }
        if (!formData.mobile.trim()) {
            showAlert('Mobile number is required')
            return
        }
        if (!/^\d{10}$/.test(formData.mobile)) {
            showAlert('Please enter a valid 10-digit mobile number')
            return
        }
        if (!formData.designation) {
            showAlert('Please select a designation')
            return
        }
        if (!formData.gender) {
            showAlert('Please select a gender')
            return
        }
        if (!formData.course) {
            showAlert('Please select a course')
            return
        }
        try {
            const res = await fetch("http://localhost:5000/api/employee/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Authorization")}`
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            
            if (res.ok) {
                showAlert('Employee added successfully', 'success')
                setShowAddEmployee(false)
                setFormData({
                    name: "", email: "", mobile: "", 
                    designation: "", gender: "", course: "", image: ""
                })
                handleViewEmployee()
            } else if(!res.ok) {
                showAlert(data.message || 'Failed to add employee')
            }
        } catch (error) {
            showAlert('Something went wrong. Please try again.')
        }
    }

    const handleViewEmployee = async () => {
        setShowViewEmployee(!showViewEmployee)
        setShowAddEmployee(false)
        setShowHome(false)
        const res = await fetch("http://localhost:5000/api/employee/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("Authorization")}`
            }
        })
        const data = await res.json()
        if (res.ok) {
            setEmployees(data)
            setShowViewEmployee(true)
        }
    }

    const handleViewHome = () => {
        setShowHome(!showHome)
        setShowAddEmployee(false)
        setShowViewEmployee(false)

    }

    const handleUpdate = async (id) => {
        if (!selectedEmployee.name.trim()) {
            showAlert('Name is required')
            return
        }
        if (!selectedEmployee.email.trim()) {
            showAlert('Email is required')
            return
        }
        if (!/\S+@\S+\.\S+/.test(selectedEmployee.email)) {
            showAlert('Please enter a valid email')
            return
        }
        if (!selectedEmployee.mobile.trim()) {
            showAlert('Mobile number is required')
            return
        }
        if (!/^\d{10}$/.test(selectedEmployee.mobile)) {
            showAlert('Please enter a valid 10-digit mobile number')
            return
        }

        try {
            const res = await fetch(`http://localhost:5000/api/employee/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Authorization")}`
                },
                body: JSON.stringify(selectedEmployee)
            })
            const data = await res.json()
            
            if (res.ok) {
                showAlert('Employee updated successfully', 'success')
                setSelectedEmployee(null)
                handleViewEmployee()
            } else {
                showAlert(data.message || 'Failed to update employee')
            }
        } catch (error) {
            showAlert('Something went wrong. Please try again.')
        }
    }

    return (
        <div className="dashboard-container">
            {alert.show && (
                <div className={`alert alert-${alert.type}`}>
                    {alert.message}
                </div>
            )}

            <nav className="dashboard-nav">
                <ul>
                    <li onClick={handleViewHome}>Home</li>
                    <li onClick={()=>{setShowAddEmployee(!showAddEmployee);setShowViewEmployee(false);setShowHome(false)}}>Add Employee</li>
                    <li onClick={handleViewEmployee}>View Employee</li>
                    <li onClick={() => navigate("/")}>Logout</li>
                </ul>
            </nav>

            {showHome && (
                <div className="home-container">
                    <h1>Welcome to the Dashboard</h1>
                </div>
            )}

            {showAddEmployee && (
                <form className="employee-form" onSubmit={handleAddEmployee}>
                    <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
                    <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                    <input name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Mobile" />
                    <select name="designation" value={formData.designation} onChange={handleInputChange}>
                        <option value="">Select Designation</option>
                        <option value="hr">HR</option>
                        <option value="manager">Manager</option>
                        <option value="sales">Sales</option>
                    </select>
                    <select name="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <select name="course" value={formData.course} onChange={handleInputChange}>
                        <option value="">Select Course</option>
                        <option value="mca">MCA</option>
                        <option value="bca">BCA</option>
                        <option value="bsc">BSc</option>
                    </select>
                    <input name="image" value={formData.image} onChange={handleInputChange} placeholder="Image URL" />
                    <button type="submit" className="submit-btn">Add Employee</button>
                </form>
            )}

            {showViewEmployee && (
                <div className="table-container">
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Designation</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee._id}>
                                    {selectedEmployee && selectedEmployee._id === employee._id ? (
                                        <>
                                            <td><input className="edit-input" value={selectedEmployee.name} onChange={e => setSelectedEmployee({...selectedEmployee, name: e.target.value})} /></td>
                                            <td><input className="edit-input" value={selectedEmployee.email} onChange={e => setSelectedEmployee({...selectedEmployee, email: e.target.value})} /></td>
                                            <td><input className="edit-input" value={selectedEmployee.mobile} onChange={e => setSelectedEmployee({...selectedEmployee, mobile: e.target.value})} /></td>
                                            <td>
                                                <select 
                                                    className="edit-input" 
                                                    value={selectedEmployee.designation} 
                                                    onChange={e => setSelectedEmployee({...selectedEmployee, designation: e.target.value})}
                                                >
                                                    <option value="hr">HR</option>
                                                    <option value="manager">Manager</option>
                                                    <option value="sales">Sales</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select 
                                                    className="edit-input" 
                                                    value={selectedEmployee.gender} 
                                                    onChange={e => setSelectedEmployee({...selectedEmployee, gender: e.target.value})}
                                                >
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select 
                                                    className="edit-input" 
                                                    value={selectedEmployee.course} 
                                                    onChange={e => setSelectedEmployee({...selectedEmployee, course: e.target.value})}
                                                >
                                                    <option value="mca">MCA</option>
                                                    <option value="bca">BCA</option>
                                                    <option value="bsc">BSc</option>
                                                </select>
                                            </td>
                                            <td className="action-buttons">
                                                <button className="save-btn" onClick={() => handleUpdate(employee._id)}>Save</button>
                                                <button className="cancel-btn" onClick={() => setSelectedEmployee(null)}>Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{employee.name}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.mobile}</td>
                                            <td>{employee.designation}</td>
                                            <td>{employee.gender}</td>
                                            <td>{employee.course}</td>
                                            <td>
                                                <button className="edit-btn" onClick={() => setSelectedEmployee(employee)}>Edit</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Dashboard
