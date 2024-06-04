import Dokter from "../models/DokterModels.js";
import Spesialis from "../models/SpesialisModels.js";

import  argon2  from "argon2";
import path from 'path';
import fs from 'fs';
import { where } from "sequelize";


// REGISTER DOKTER 

export const createDokter = (req, res)=>{
  if(req.files === null) return res.status(400).json({msg: "No file Uploaded"});
  const name = req.body.name;
  const file = req.files.foto;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/dokter/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];
  if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json("Invalid Images");
  if(fileSize > 5000000) return res.status(422).json({msg: "file anda terlalu besar gunakan file ddibawah 5mb"});

  file.mv(`./public/images/dokter/${fileName}`, async(err)=> {
    if(err) return res.status(500).json({msg: err.message});
    const {email, password, confPassword, spesialis} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan confirm password tidak sesuai"});
    const hashPassword = await argon2.hash(password);
    
    try {

      const seps = await Spesialis.findOne({
        where:{
          name: spesialis
        }
      });

      const spesialisId = seps.id;
      
      await Dokter.create({
        name: name,
        email: email,
        foto: fileName,
        url: url,
        spesialis: spesialis,
        password: hashPassword,
        spesialisId: spesialisId,


      });
      
      res.status(201).json({msg: "Product telah ditambahkan"});
    } catch (error) {
      console.log(error.message);
      
    }


  });
}

// LOGIN DOKTER 
export const LoginDokter = async(req, res) =>{
  const dokter = await Dokter.findOne({
    where:{
      email: req.body.email
    }
  });
  if(!dokter) return res.status(404).json({msg: "Akun tidak ditemukan"});
  const match = await argon2.verify(dokter.password, req.body.password);
  if(!match) return res.status(400).json({msg: "Password tidak sesuai/ditemukan"});

  req.session.dokterId = dokter.uuid;
  const uuid = dokter.uuid;
  const name = dokter.name;
  const email = dokter.email;
  const foto = dokter.foto;
  const url = dokter.url;
  const spesialis = dokter.spesialis;

  res.status(200).json({uuid, name, email, foto, url, spesialis});
}


// Dapatkan Data Dokter yang Login 

export const MeDokter = async(req, res)=>{
  if(!req.session.dokterId){
    return res.status(401).json({msg: "Mohon Login Terlebih dahulu"});

  }

  const dokter = await Dokter.findOne({
    attributes:['uuid', 'name', 'email', 'foto', 'spesialis'],
    where:{
      uuid: req.session.dokterId
    }
  });

  if(!dokter) return res.status(400).json({msg: "User tidak ditemukan"});
  res.status(200).json(dokter)
}