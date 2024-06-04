import Pasien from "../models/PasienModel.js";
import Users from "../models/UsersModel.js";
import { Op } from "sequelize";

// REGISTRASI PASIEN 

export const RegisterPasien = async(req, res)=>{
  if(!req.session.userId) return res.status(404).json({msg: "Anda belum Login"});
  const {name, alamat, ttl, nohandphone, keluhan} = req.body;
  try {
      await Pasien.create({
        name: name,
        alamat: alamat,
        ttl: ttl,
        nohandphone: nohandphone,
        keluhan: keluhan,
        userId: req.userId
      });
      res.status(201).json({msg: "Product created Successfuly"});
    
    
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}


// MENAMPILKAN DATA PASIEN 
export const getPasienBydokter = async(req, res)=>{
  try {
    if(!req.session.dokterId) return res.status(404).json({msg: "Mohon Login terlebih dahulu"});
    let response;
    response = await Pasien.findAll({
      attributes:['uuid', 'name', 'alamat', 'ttl', 'nohandphone', 'keluhan'],
      include:[{
        model: Users, 
        attributes:['name', 'email', 'role']

      }]

    });
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}




// MENDAPAT KAN DATA PASIEN SESUAI ID REGISTER

export const getPasienByPerawat = async(req, res)=>{
  try {
    
    if(!req.session.userId) return res.status(404).json({msg: "Anda belum login"});
    // res.status(402).json({msg: req.userId});
    const response = await Pasien.findAll({
    attributes:['uuid', 'name', 'alamat', 'ttl', 'nohandphone','keluhan'],
    where:{
      userId: req.userId
    },
    include:[{
      model: Users, attributes:['name', 'email']
    }]
  })
  res.status(200).json(response);
  } catch (error) {
    
  }
}

// MENDAPATKAN DATA PASIEN BERDASARKAN ID 
export const getPasienById = async(req, res)=>{
  try {
    const response = await Pasien.findOne({
      where:{
        id: req.params.id
      }
    });
    res.json(response)
  } catch (error) {
    console.log(error.message);
    
  }
}

