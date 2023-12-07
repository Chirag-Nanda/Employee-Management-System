const employeeModel = require("../model/employeeModel");

module.exports = {
    update: (req,res)=>{
        const Name = req.body.name;
        const Id = req.body.userId;
        const Email = req.body.email;
        employeeModel.findOne
    },

    delete: async (req, res) => {
        const Name = req.body.name;
        const Id = req.body.userId;
        const Email = req.body.email;
        try {
            const Employee = employeeModel.findOne({ name: Name, userId: Id, email: Email });
            if (!Employee) {
                res.status(400).json({
                    success: false,
                    message: "Employee not found",
                })
            }
            await employeeModel.findByIdAndDelete(Employee._id);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: err,
            });
        }

    },



};