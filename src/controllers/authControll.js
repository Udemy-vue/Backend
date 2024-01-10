// import { validationResult } from 'express-validator'
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateToken.js';

export const postlogin = async (req, res) => {
	// console.log(req.body)
  try {
    const {email, password} = req.body;
    
    var user = await User.findOne({ email });
    if(!user) throw { code: 11000 };
    // console.log('Hola mundo')
    const resultado = await user.comparePassword(password);
    // console.log(resultado);
    if(!resultado) throw { code: 12000 };


    // const token = jwt.sign({ user: user }, process.env.JWT_SECRET )
    const {token, expiresIn } = generateToken(user.id);
    
    return res.json({ token, expiresIn });

  } catch(e) {
    // statements
    // console.log(e.code);
    if(e.code === 11000 ) {
      return res.status(403).json({error: 'No existe este usuario' });
    }
    if(e.code === 12000 ) {
      return res.status(403).json({error: 'Contraseña Incorrecta' });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
}

export const postregister = async (req, res) => {
  console.log(req.body)
  // res.json({ registro: true });
  try {
    // statements
    const {email, password} = req.body;
    
    // Alternativa buscando por email
    var user = await User.findOne({ email })
    if (user) throw { code: 11000 };

    user = new User({ email, password });
    await user.save();

    return res.json({ registro: "adicionado"})
  } catch(e) {
    // statements
    // alternativa por defecto mongoose
    console.log(e.menssage);
    if(e.code === 11000) {
      return res.status(400).json({error: 'Existe este usuario'});
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
}

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email });
  } catch(e) {
    // statements
    return res.status(500).json({ error: 'error de server' });
  }
  
}