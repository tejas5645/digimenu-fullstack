const db=require('../db')

const getFood_group = async (req, res) => {

    try {
        const result = await db.query('select * from food_group')
        res.status(200).json({ food_groups: result.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const getFood_groupById = async (req, res) => {

    const { fid } = req.params

    try {
        const result = await db.query('select * from food_group where fid=$1', [fid]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Food_group not found" });
        }

        res.status(200).json({ food_group: result.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}


module.exports = {
    getFood_group,
    getFood_groupById
}
