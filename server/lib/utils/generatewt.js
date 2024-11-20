import jwt from 'jsonwebtoken'

export const generateToken=(userid,res)=>{
    const token=jwt.sign({userid},process.env.JWT_SECRET,{expiresIn:"2d"})
    res.cookie("jwt",token,{
        httpOnly:true,
        sameSite:"strict"
    })
}
