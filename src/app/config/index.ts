import dotenv from 'dotenv';
import path from 'path';


dotenv.config({path:path.join(process.cwd(),'.env')});


export default{
    port:process.env.PORT,
    defaultPassword:process.env.DEFAULT_PASSWORD,
    bcryptSaltRounds:process.env.BCRYPT_SALT_ROUNDS
}