import { RequestHandler } from "express";
import httpStatus from 'http-status';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const routeNotFoundHandler:RequestHandler = (req,res,next) =>{
    return res.status(httpStatus.NOT_FOUND).json({
        success:false,
        message:'API not found !!!',
        error:''
    })
}