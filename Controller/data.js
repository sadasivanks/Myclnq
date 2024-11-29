//implimented by sadasivan.
//model require
var model = require('../Model/M_data')

module.exports = {

    //functionality for task creation
    create_task: async (req, res) => {
        try {
            var title = req.body.title;
            var description = req.body.description;


            if (!title) {
                return res.status(400).json({
                    "message": "Title are required."
                });
            }

          
            if (!description) {
                return res.status(400).json({
                    "message": "Description are required."
                });
            }


            var result = await model.M_create_details(title, description)


            if (result != 0) {
                res.status(200).json({
                    "message": "Task created successfully",
                    "task": result
                })
            }
            else {
                res.status(400).json({ "message": "Task created Failed" })
            }
        } catch (error) {
            console.log(error)
        }
    },


    //functionality for get all task 
    get_all_tasks: async (req, res) => {
        try {
            var result = await model.M_get_details()

            if (result != 0) {
                res.status(200).json(result)
            }
            else {
                res.status(400).json({ msg: "Get details failed" })
            }

        } catch (error) {
            console.log(error)
        }
    },


    //functionality for task update based on status
    update_task: async (req, res) => {
        try {

            var status = req.body.status;
            var id = req.params.id;


            var result = await model.M_update_task(status, id);
            if (result != 0) {
                res.status(200).json({
                    "message": "Task updated successfully",
                    "task": result
                })
            }
            else {
                res.status(400).json({
                    "error": "Task not found"

                })
            }
        } catch (error) {
            console.log(error)
        }
    },


    //functionality for task deletion
    delete_task: async (req, res) => {
        try {
            var id = req.params.id;

            var result = await model.M_delte_task(id);
            if (result === 1) {
                res.status(200).json({ "message": "Task deleted successfully" })
            }
            else {
                res.status(400).json({ "error": "Task not found" })
            }
        } catch (error) {
            console.log(error)
        }
    },


    //functionality for task filter
    filter_task: async (req, res) => {
        try {
            var status = req.params.status;

            var result = await model.M_filter_task(status)

            if (result) {
                res.status(200).json(result)

            }
            else {
                res.status(400).json({ "message": 'No data found' })
            }
        } catch (error) {
            console.log(error)
        }
    }





}