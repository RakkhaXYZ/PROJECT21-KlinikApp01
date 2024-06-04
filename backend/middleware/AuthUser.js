import Users from "../models/UsersModel.js";

// Membuat fungsi verifikasi user untuk melakukan verifikasi user jika user tidak login maka tidak akan melakukan aksi tersebut
export const verifyUser = async(req, res, next)=>{
try {
  if(!req.session.userId){
    return res.status(401).json({msg: "Tidak dapat akses sebelum login"});
  }
  const user = await Users.findOne({
    where:{
      uuid: req.session.userId
    }
  });
  if(!user) return res.status(404).json({msg: "User Tidak ditemukan"});
  req.userId = user.id;
  req.role = user.role;
  next();
} catch (error) {
  res.status(500).json({msg: error.message});
}
}

export const RegisterOnly = async(req, res, next)=>{
  const user =  await Users.findOne({
    where:{
      uuid: req.session.userId
    }
  });
  if(!user) return res.status(403).json({msg: "User Tidak ditemukan"});
  if(user.role !== "register") return res.status(403).json({msg: "Akses Terlarang"});
  next();
}