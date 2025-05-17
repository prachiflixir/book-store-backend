import jwt from "jsonwebtoken";



exports.generateTempPassword = () => {
let digits = '1234567890abcdefghlijklmnopqrstuvwxyz';
let passwordLength = 8;
let password = ''

for (let i = 0; i < passwordLength; i++) {
 index = Math.floor(Math.random * digits.length)
    password = password + digits[index];
    
}
return password;
}