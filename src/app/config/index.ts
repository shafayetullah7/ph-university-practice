import dotenv from 'dotenv';
import path from 'path';


dotenv.config({path:path.join(process.cwd(),'.env')});


export default{
    NODE_ENV:process.env.NODE_ENV,
    port:process.env.PORT,
    defaultPassword:process.env.DEFAULT_PASSWORD,
    bcryptSaltRounds:process.env.BCRYPT_SALT_ROUNDS,
    dbUri: process.env.DB_URI,
}