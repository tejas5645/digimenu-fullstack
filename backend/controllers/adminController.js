const db = require("../db");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await db.query("SELECT * FROM adminn WHERE username=$1", [username]);

        if (admin.rows.length === 0) {
            return res.status(403).json({ message: "Not Found" });
        }

        if (username === admin.rows[0].username && password === admin.rows[0].passwords) {
            req.session.admin = username; // Store admin session
            return res.status(200).json({ message: "Login successful!" });
        }

        res.status(401).json({ message: "Invalid credentials" });
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

const admin = (req, res) => {
    try {
        console.log("Session Data:", req.session);

        if (req.session && req.session.admin) {
            return res.status(200).json({ message: "This is Admin panel" });
        }

        return res.status(403).json({ message: "Unauthorized! Admins only, Please login to continue" });
    } catch (err) {
        console.error("Admin Route Error:", err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

const checkSession = async (req, res) => {
    try {
        if (req.session.admin) {
            return res.status(200).json({ loggedIn: true, admin: req.session.admin });
        }
        res.status(200).json({ loggedIn: false });
    } catch (err) {
        console.error("Check Session Error:", err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error("Logout Error:", err.message);
                return res.status(500).json({ message: "Logout failed" });
            }
            res.status(200).json({ message: "Logged out successfully" });
        });
    } catch (err) {
        console.error("Logout Error:", err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

//Menu 
const postMenu = async (req, res) => {

    try {

        if (req.session && req.session.admin) {

            const { mname, mtype, mqty, price } = req.body

            if (!mname || !mtype || !mqty || !price) {
                return res.status(400).json({ message: "All fields are required" })
            }

            console.log(mname)

            const checkMenu = await db.query('select * from menu_card where mname ilike $1', [mname])
            if (checkMenu.rows.length !== 0) {
                return res.status(404).json({ message: "Menu already exists" })
            }

            const checkFoodGroup = await db.query('select * from food_group where fid=$1', [mtype])
            if (checkFoodGroup.rows.length === 0) {
                return res.status(404).json({ message: "Food_Group not found" })
            }

            const checkQuantity = await db.query('select * from qty where qid=$1', [mqty])
            if (checkQuantity.rows.length === 0) {
                return res.status(404).json({ message: "Quantity not found" })
            }

            const result = await db.query('INSERT INTO menu_card(mname,mtype,mqty,price) VALUES ($1,$2,$3,$4) RETURNING *', [mname, mtype, mqty, price])
            res.status(201).json({ status: 201, message: "Added Successfully", menu: result.rows[0] })
        }
        else {
            return res.status(403).json({ message: "Unauthorized! Admins only, Please login to continue" });
        }

    }

    catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const putMenu = async (req, res) => {
    try {

        if (req.session && req.session.admin) {

            const { mid } = req.params

            const checkMenu = await db.query('select * from menu_card where mid=$1', [mid])
            if (checkMenu.rows.length === 0) {
                return res.status(404).json({ message: "Menu not found" })
            }

            const { mname, mtype, mqty, price } = req.body

            if (!mname || !mtype || !mqty || !price) {
                return res.status(400).json({ message: "All fields are required" })
            }

            const checkFoodGroup = await db.query('select * from food_group where fid=$1', [mtype])
            if (checkFoodGroup.rows.length === 0) {
                return res.status(404).json({ message: "Food_Group not found" })
            }

            const checkQuantity = await db.query('select * from qty where qid=$1', [mqty])
            if (checkQuantity.rows.length === 0) {
                return res.status(404).json({ message: "Quantity not found" })
            }

            const result = await db.query('UPDATE menu_card SET mname=$1,mtype=$2,mqty=$3,price=$4 WHERE mid=$5 RETURNING *', [mname, mtype, mqty, price, mid])
            res.status(200).json({ message: "Updated Successfully", menu: result.rows })
        }
        else {
            return res.status(403).json({ message: "Unauthorized! Admins only, Please login to continue" });
        }


    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const putMenuPrice = async (req, res) => {

    
    try {

        if (req.session && req.session.admin){

            const { mid } = req.params
            const checkMenu = await db.query('select * from menu_card where mid=$1', [mid])
            if (checkMenu.rows.length === 0) {
                return res.status(404).json({ message: "Menu not found" })
            }
    
            const { price } = req.body
    
            if (!price) {
                res.status(400).json({ message: "All fields are required" })
            }
    
            const result = await db.query('UPDATE menu_card SET price=$1 WHERE mid=$2 RETURNING *', [price, mid])
            res.status(200).json({ message: "Price Updated Successfully", menu: result.rows })
        }
        else {
            return res.status(403).json({ message: "Unauthorized! Admins only, Please login to continue" });
        }


    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const deleteMenu = async (req, res) => {

    
    try {
        if (req.session && req.session.admin){
            const { mid } = req.params
            const checkMenu = await db.query('select * from menu_card where mid=$1', [mid])
            if (checkMenu.rows.length === 0) {
                return res.status(404).json({ message: "Menu not found" })
            }
    
            await db.query('delete from menu_card where mid=$1', [mid])
            res.status(200).json({ message: "Deleted Successfully" })
        }
        else {
            return res.status(403).json({ message: "Unauthorized! Admins only, Please login to continue" });
        }


    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }

}

//Food_group
const postFoodgroup = async (req, res) => {

    try {

        if (req.session && req.session.admin){

            const { fg_name } = req.body;
    
            if (!fg_name) {
                return res.status(400).json({ message: "All fields are required" });
            }
    
            const checkFood_group = await db.query('select * from food_group where fg_name=$1', [fg_name]);
            if (checkFood_group.rows.length > 0) {
                return res.status(404).json({ message: "Food_group already exists" });
            }
    
            const result = await db.query('INSERT INTO food_group(fg_name) VALUES ($1) RETURNING *', [fg_name])
            res.status(201).json({ message: "Added Successfully", food_group: result.rows[0] });
        }
        else {
            return res.status(403).json({ message: "Unauthorized! Admins only, Please login to continue" });
        }


    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const putFoodgroup = async (req, res) => {

    
    try {

        if (req.session && req.session.admin){

            const { fid } = req.params
            const checkFood_group = await db.query('select * from food_group where fid=$1', [fid]);
            if (checkFood_group.rows.length === 0) {
                return res.status(404).json({ message: "Food_group not found" });
            }
    
            const { fg_name } = req.body
    
            if (!fg_name) {
                return res.status(400).json({ message: "All fields are required" });
            }
    
            const result = await db.query('UPDATE food_group SET fg_name=$1 WHERE fid=$2 RETURNING *', [fg_name, fid])
            res.status(200).json({ message: "Updated Successfully", food_group: result.rows })
        }

        else {
            return res.status(403).json({ message: "Unauthorized! Admins only, Please login to continue" });
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const deleteFoodgroup = async (req, res) => {

    
    try {

        if (req.session && req.session.admin){

            const { fid } = req.params
            const checkFood_group = await db.query('select * from food_group where fid=$1', [fid]);
            if (checkFood_group.rows.length === 0) {
                return res.status(404).json({ message: "Food_group not found" });
            }
    
            await db.query('delete from food_group where fid=$1', [fid])
            res.status(200).json({ message: "Deleted Successfully" })
        }
        else {
            return res.status(403).json({ message: "Unauthorized! Admins only, Please login to continue" });
        }


    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

//Quantity
const postQuantity = async (req, res) => {

    try {

        if (req.session && req.session.admin){

            const { qtype } = req.body
    
            if (!qtype) {
                res.status(400).json({ message: "All fields are required" })
            }
    
            const checkQtype = await db.query('select * from qty where qtype=$1', [qtype])
            if (checkQtype.rows.length > 0) {
                return res.status(404).json({ message: "Qauntity already exists" })
            }
    
            const result = await db.query('INSERT INTO qty(qtype) VALUES ($1) RETURNING *', [qtype])
            res.status(201).json({ message: "Added Successfully", qtype: result.rows })

        }
        else {
            return res.status(403).json({ message: "Unauthorized! Admins only, Please login to continue" });
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const putQuantity = async (req, res) => {

    
    try {

        if (req.session && req.session.admin){


            const { qid } = req.params
            const checkQuantity = await db.query('select * from qty where qid=$1', [qid])
            if (checkQuantity.rows.length === 0) {
                return res.status(404).json({ message: "Quantity not found" })
            }
    
            const { qtype } = req.body
            const result = await db.query('UPDATE qty SET qtype=$1 WHERE qid=$2 RETURNING *', [qtype, qid])
            res.status(200).json({ message: "Updated Successfully", qtype: result.rows })
        }
        else {
            return res.status(403).json({ message: "Unauthorized! Admins only, Please login to continue" });
        }


    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const deleteQuantity = async (req, res) => {
    
    try {

        if (req.session && req.session.admin){
            const { qid } = req.params
            const checkQuantity = await db.query('select * from qty where qid=$1', [qid])
            if (checkQuantity.rows.length === 0) {
                return res.status(404).json({ message: "Quantity not found" })
            }
    
            await db.query('delete from qty where qid=$1', [qid])
            res.status(200).json({ message: "Deleted Successfully" })
        }
        else {
            return res.status(403).json({ message: "Unauthorized! Admins only, Please login to continue" });
        }


    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}


module.exports = {
    login,
    admin,

    postMenu,
    putMenu,
    putMenuPrice,
    deleteMenu,

    postFoodgroup,
    putFoodgroup,
    deleteFoodgroup,

    postQuantity,
    putQuantity,
    deleteQuantity,

    checkSession,
    logout
};
