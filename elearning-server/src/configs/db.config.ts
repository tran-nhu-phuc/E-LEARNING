import mysql2 from 'mysql2';
import { config } from 'dotenv';
import { Sequelize } from 'sequelize';

config();
const sequelize = new Sequelize("bjnygsiqaed6ixdojjh9", "u1sjvhxmdiq1u6uw", "PtMjPkpb53Qn4AnMW86U", {
    host: "bjnygsiqaed6ixdojjh9-mysql.services.clever-cloud.com",
    dialect: 'mysql'
})

export default sequelize;