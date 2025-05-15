import userModel from "../models/user.model";
import bycrypt from 'bcrypt';
import genericHelper from "../helpers/mail.helper"

exports.createUser = async ( req, res) => {

    try {
        const emailExist = await userModel.findOne({email:req.body.email})
        if (emailExist) {
            return res.status(500).send({
              status :false,
              message :"Email Already Exists"  
            })
        }
        const mobileNoExist = await userModel.findOne({mobileNo:req.body.mobileNo})
        if (mobileNoExist) {
            return res.status(500).send({
              status :false,
              message :"Mobile Number Already Exists"  
            })
        }
        //if send random password
        
    } catch (error) {
        return res.status(500).send({
            status : false,
            message : error.message || 'Internal Server Error'

        })
    }

}