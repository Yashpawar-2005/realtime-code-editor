import jwt from 'jsonwebtoken'
const jwtsecret="yash"
export const generateToken=(userid,res)=>{
    const token=jwt.sign({userid},jwtsecret,{expiresIn:"2d"})
    res.cookie("jwt",token,{
        httpOnly:true,
        sameSite:"strict"
    })
}
