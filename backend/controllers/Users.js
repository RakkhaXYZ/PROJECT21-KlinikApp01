import Users from "../models/UsersModel.js";

import argon2  from "argon2";
import path from "path";



// REGISTER

export const createUser = (req, res)=>{
  console.log('REQUEST FILE :',req.files);
  console.log('REQUEST BODY', req.body);
  if(!req.files || Object.keys(req.files).length === 0){
    return res.status(400).json({msg: "tidak ada file yang diupload"})
  }
  const name = req.body.name;
  const file = req.files.foto;

  if(!file){
    return res.status(400).json({msg: "file tidak ditemukan dalam request"});
  }
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json("invalid Images");
  if(fileSize > 5000000) return res.status(422).json({msg :"file harus berukuran 5 mb"});

  file.mv(`./public/images/${fileName}`, async(err) => {
    if(err) return res.status(500).json({msg: err.message});
    const {email, password, confPassword, nohandphone, role} = req.body;
   
    if(password !== confPassword) return res.status(400).json({msg: "Password Dan Confirm Password Tidak sesuai"});
    const hashPassword = await argon2.hash(password);
  
    try {
      await Users.create({
        name: name,
        email: email,
        password: hashPassword,
        foto: fileName,
        nohandphone: nohandphone,
        role: role,
        url: url
      });
      res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
      res.status(400).json({msg: error.message});
      
    }
 
  })
 
}

// Login 
export const Login = async(req, res) =>{
  // mengambil user berdasarkan email yang ada didatabase 
  const user = await Users.findOne({
    where:{
      email: req.body.email
    }
  });

  // jika user berdasarkan email tidak ditemukan maka akan menjalankann pesan 
  if(!user) return res.status(404).json({msg: "Pengguna Tidak ditemukan"});

  // Membuat verivikasi password 
  const match = await argon2.verify(user.password, req.body.password);
  // jika password tidak sama / tidak diisi 
  if(!match) return res.status(400).json({msg: "Password Tidak sesuai/tidak ditemukan "});

  // membuat session yang diatur berdasarkan uuid
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const foto = user.foto;
  const nohandphone = user.nohandphone;
  const role = user.role;
  res.status(200).json({uuid, name, email, foto, nohandphone, role});
}

// MENAMPILKAN USER YANG LOGIN 
export const Me = async(req, res)=> {
  if(!req.session.userId){
    return res.status(401).json({msg: "Mohon Login Terlebih dahulu"});
  }

  const user = await Users.findOne({
    attributes:['uuid', 'name', 'email', 'foto', 'nohandphone', 'role'],
    where:{
      uuid: req.session.userId
    }
  });
  if(!user) return res.status(404).json({msg: "User Tidak ditemukan"});
  res.status(200).json(user);
}


// LOGOUT

export const logout = async(req, res)=> {
  req.session.destroy((err) => {
    if(err) return res.status(400).json({msg: "Tidak Dapat Logout"});
    res.status(200).json({msg: "Anda Telah Logout"});
  });
}


// GET ALL USER 
export const getAlluser = async(req, res)=>{
  try {
    const response = await Users.findAll({
      attributes:['uuid', 'name', 'email', 'foto', 'nohandphone', 'role']
    });
    res.status(200).json({msg: response});
  } catch (error) {
    res.status(500).json({msg: error.message});
    
  }
}


// UPDATE USER 
export const updateUser = async(req, res)=> {
  const user = await Users.findOne({
    where: {
      uuid : req.params.id
    }
  });

  if(!user) return res.status(404).json({msg: "Pengguna Tidak ditemukan"});
  const {name, email, password, confPassword, foto, nohandphone, role} = req.body;
  let hashPassword;
  if(password === "" || password=== null){
    hashPassword = user.password;

  }else{
    hashPassword = await argon2.hash(password);
  }
  if(password !== confPassword) return res.status(400).json({msg: "Password dan confirm password tidak sesuai"});

  

  try {
    await Users.update({
      name: name,
      email: email,
      password: hashPassword,
      foto: foto,
      nohandphone: nohandphone,
      role: role
    },{
      where:{
        id: user.id
      }
    });
    res.status(201).json({msg: "Data User telah diedit"});
    
  } catch (error) {
    res.status(400).json({msg: error.message});
  }

}