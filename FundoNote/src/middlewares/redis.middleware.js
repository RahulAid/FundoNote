import { client } from "../config/redis";
import HttpStatus from 'http-status-codes';


export const redisCheck = async ( req,res, next) => {
    const data = await client.get('getalldata');
    console.log("redis data-------- ",data)
    if (data.length > 0) {
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: JSON.parse(data),
            message: "Notes fetched successfully from Redis"
            
        });
    } else {
        console.log("data----------",data)
        next();
    }
}