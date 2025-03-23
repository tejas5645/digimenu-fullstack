const db = require('../db')

const getMenu = async (req, res) => {

    try {
        
        const result = await db.query('select * from menu_card ')

        res.status(200).json({ menu: result.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')

    }
}

const getMenuById = async (req, res) => {

    const { mid } = req.params

    try {

        const checkMenu = await db.query('select mid,mname,fg_name,qtype,price from menu_card,food_group,qty where mid=$1 and menu_card.mtype=food_group.fid and menu_card.mqty=qty.qid', [mid])
        if (checkMenu.rows.length === 0) {
            return res.status(404).json({ message: "Menu not found" })
        }


        const result = await db.query('select mid,mname,fg_name,qtype,price from menu_card,food_group,qty where  mid=$1 and menu_card.mtype=food_group.fid and menu_card.mqty=qty.qid', [mid])
        res.status(200).json({ menu: result.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const getMenuByName = async (req, res) => {

    const { nm } = req.params

    try {
        const checkMenu = await db.query('select mid,mname,fg_name,qtype,price from menu_card,food_group,qty where mname ilike $1 and  menu_card.mtype=food_group.fid and menu_card.mqty=qty.qid', [`%${nm}%`]) //use ilike for case insesitivity
        if (checkMenu.rows.length === 0) {
            return res.status(404).json({ message: "Not found" })
        }

        res.status(200).json({ menu: checkMenu.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}


module.exports = {
    getMenu,
    getMenuById,
    getMenuByName
}
