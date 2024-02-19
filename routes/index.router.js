const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/employee.controller');
const jwtHelper = require('../config/jwtHelper');


router.post('/createEmployee',jwtHelper.verifyJwtToken,ctrlUser.createEmployee);
router.get('/getEmployees',jwtHelper.verifyJwtToken,ctrlUser.getEmployees);
router.put('/updateEmployee',jwtHelper.verifyJwtToken,ctrlUser.updateEmployee);
router.post('/deleteEmployee/:id',jwtHelper.verifyJwtToken,ctrlUser.deleteEmployee);
router.post('/employeeDetails/:id',jwtHelper.verifyJwtToken,ctrlUser.employeeDetails);



module.exports = router;



