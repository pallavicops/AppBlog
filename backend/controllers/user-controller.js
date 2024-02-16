import User from "../model/users";
import bcritp from "bcryptjs";
// getAllUasrs is a middleware function that will be used to get all the users from the database.
export const getAllUasrs = async(req, res, next)=>{
    let users;
    try{
        users = await User.find();
        

    } catch(err){
console.log(err);
    }
    if(!users){
        return res.status(404).json({message: "No users found"});
    }
    return res.status(200).json({users});
};
// signup is a middleware function that will be used to create a new user in the database.

export const signup = async(req,res,next)=>{
    const {name, email, password} = req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
      return  console.log(err);
    }

    if(existingUser){
        return res.status(400).json({message: "User already exists! Login Instead"});
    }
    const hashedPassword = bcritp.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });
    

    try{
       await user.save();
    } catch(err){
       return console.log(err);
    }
    return res.status(201).json({user});
    };

    // login is a middleware function that will be used to login the user.
    export const login = async(req,res,next)=>{
        const {email, password} = req.body;

        let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
      return  console.log(err);
    }

    if(!existingUser){
        return res.status(404).json({message: "Could not identify user, credentials seem to be wrong"});
    }

    const isPasswardCorrect = bcritp.compareSync(password, existingUser.password);
        if(!isPasswardCorrect){
            return res.status(400).json({message: "Incorrect Password"});

        }
        return res.status(200).json({message: "Login Successful!", user: existingUser});
    };

