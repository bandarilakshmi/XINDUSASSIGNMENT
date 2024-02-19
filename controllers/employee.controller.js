const ObjectId = require('mongodb').ObjectID;
const employeeModel = require('../models/employeeModel');

const createEmployee = async (req, res) => {
    const {name,email,designation,salary}=req.body;
   if(!name|!email|!designation|!salary){
    res.status(400).send({ success: false, message: 'Plz make sure fields are mandatory' });

   }
    try {
        const newUser = new employeeModel();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.designation = req.body.designation;
        newUser.salary = req.body.salary;
        const userSaved = await newUser.save();
        if (userSaved) {
            res.json({ success: true, message: 'Employee saved' });
        } else {
            res.status(500).json({ success: false, message: 'Unable to save employee' });
        }
    }
    catch (err) {
        res.status(400).send({ success: false, message: err });
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.find({})
        res.status(200).send(employees)
    } catch (err) {
        res.status(200).send({ success: false, message: err })
    }
}


const employeeDetails = async (req, res,) => {
    const { _id } = req.params.id;
    try {
        const employee = await employeeModel.findById({ _id: _id })
        if (employee) {
            res.status(200).send({ success: true, message: "Employee Details", result: employee });
        } else {
            res.status(400).send({ message: "Employee not found" });
        }
    } catch (err) {
        console.log('err', err);
        res.status(400).send({ success: false, message: err.message })
    };
};


const updateEmployee = async (req, res) => {
    const { _id, name, email, designation, salary } = req.body;
    try {
        const query = { _id: ObjectId(_id) };
        const user = {};
        if (name) user.name = name;
        if (email) user.email = email;
        if (designation) user.designation = designation;
        if (salary) user.salary = salary;
        const update = {
            $set: user
        };
        const updateEmp = await employeeModel.updateOne(query, update)
        if (updateEmp.nModified) {
            res.send({ success: true, message: "Employee updated" });
        } else {
            res.status(400).send({ message: "Unable to update employee" });
        }
    }
    catch (err) {
        console.log('err in statement', err);
        res.status(400).send({ success: false, message: err.message })
    }
}

const deleteEmployee = async (req, res,) => {
    const { _id } = req.params.id;
    try {
        const empDeleted = await employeeModel.deleteOne({ _id: _id })
        if (empDeleted.n) {
            res.send({ success: true, message: "Employee deleted sucessfully" });
        } else {
            res.status(400).send({ success: false, message: "Unable to delete employee" });
        }
    }
    catch (err) {
        console.log('err in statement', err);
        res.status(400).send({ success: false, message: err.message })
    }
};

module.exports = {
    createEmployee: createEmployee,
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee,
    getEmployees: getEmployees,
    employeeDetails: employeeDetails
}