const userModel =  require("../models/user.model");
const bycrypt =  require('bcrypt');
const genericHelper =  require("../helpers/mail.helper")

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
        //if generate random password
        // const tempPassword = genericHelper.generateTempPassword();

        // create user object
        const user = {
            userName : req.body.userName,
            email : req.body.email,
            password : bycrypt(req.body.password),
            mobileNo : req.body.mobileNo

        }

        const savedUser = await userModel.create(user);

        //send mail to email for password

        return res.status(200).send({
            status :true,
            message : "User Created Successfully",
            data:savedUser
        })


    } catch (error) {
        return res.status(500).send({
            status : false,
            message : error.message || 'Internal Server Error'

        })
    }

}