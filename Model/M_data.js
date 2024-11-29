//implimented by sadasivan.
//db require
var db = require('../util/database')


module.exports = {


    //functionality for task creation
    M_create_details: async (title, description) => {

        try {
            var [query] = await db.query('INSERT INTO tb_details (title,description,status) VALUES  (?,?,?)', [title, description, 'pending'])


            var db_id = query.insertId;
            if (query.insertId > 0) {

                var [query_1] = await db.query('SELECT id,title,description,status FROM tb_details where id = ?', db_id)
                return query_1[0];
            } else {
                return 0;
            }
        } catch (error) {
            console.log(error)
        }
    },


    //functionality for get all task 
    M_get_details: async () => {
        try {
            var [query] = await db.query('SELECT id,title,description,status FROM tb_details');
            if (query) {
                return query;
            }
            else {
                return 0;
            }
        } catch (error) {
            console.log(error)
        }
    },


    //functionality for task updation based on status
    M_update_task: async (status, id) => {
        try {
            var [query] = await db.query('UPDATE tb_details SET status = ? WHERE id = ? ', [status, id]);


            if (query.affectedRows > 0) {
                var [query_1] = await db.query('SELECT id,title,description,status FROM tb_details where id = ?', id)
                return query_1[0];
            }
            else {
                return 0;
            }
        } catch (error) {
            console.log(error)
        }
    },



    //functionality for task deletion
    M_delte_task: async (id) => {
        try {
            var [query] = await db.query('DELETE FROM tb_details WHERE id=?', id)

            if (query.affectedRows > 0) {
                return 1;
            }
            else {
                return 0;
            }
        } catch (error) {
            console.log(error)
        }
    },


    //functionality for task filtering
    M_filter_task: async (status) => {
        try {

            var [query] = await db.query('SELECT id,title,description,status FROM tb_details where status = ?', [status])

            return query;
        } catch (error) {
            console.log(error)
        }

    }
}