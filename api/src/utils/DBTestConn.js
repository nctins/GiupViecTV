import db from "~models/index";

const DBTestConn = async () => {
    try {
        await db.sequelize.authenticate();
        console.log("Success to connect Database");
        return true;
    } catch (error) {
        console.log("Failed to connect Database: "+ error.message)
        return false;
    }
}

export default DBTestConn;