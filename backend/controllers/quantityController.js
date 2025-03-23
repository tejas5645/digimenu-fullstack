const db = require('../db')

const getQuantity = async (req, res) => {

    try {
        const result = await db.query('select * from qty')
        res.status(200).json({ qtypes: result.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')

    }
}

const getQuantityById = async (req, res) => {

    const { qid } = req.params

    try {
        const result = await db.query('select * from qty where qid=$1', [qid])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Quantity not found" })
        }

        res.status(200).json({ qtypes: result.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}



module.exports = {
    getQuantity,
    getQuantityById
}
