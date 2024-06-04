import Dokter from "../models/DokterModels.js";
import Pasien from "../models/PasienModel.js";
import Skedule from "../models/SchduleModels.js";


export const sessionPasien = async(req, res)=>{
  const {namaDokter, namaPasien} = req.body;

  const dokter = await Dokter.findOne({
    where:{
      name: namaDokter
    }
  });

  const pasien = await Pasien.findOne({
    where:{
      name: namaPasien

    }
  })

  console.log(pasien);

  if(!dokter && !pasien) return res.status(404).json({msg: "Data Dokter tidak ditemuak"});
  
  req.session.dokterId = dokter.uuid;
  req.session.pasienId = pasien.uuid;
 
  const namadokter = dokter.name;
  const spesialis = dokter.spesialis;
  const namapasien = pasien.name;
  const keluhan = pasien.keluhan;

  res.status(200).json({namadokter, spesialis, namapasien, keluhan});
}