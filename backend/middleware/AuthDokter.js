import Dokter from "../models/DokterModels.js";


export const verifyDokter = async(req, res, next)=>{
  if(!req.session.dokterId){
    return res.status(401).json({msg: "Mohon Login ke akun anda"});

  }
  const dokter = Dokter.findOne({
    where:{
      uuid: req.params.dokterId
    }
  });
  if(!dokter) return res.status(404).json({msg: "Pengguna tidak ditemukan"});

  req.dokterId = dokter.id;
  req.spesialis = dokter.spesialis;

  next();
}