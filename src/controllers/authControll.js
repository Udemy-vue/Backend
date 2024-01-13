// import { validationResult } from 'express-validator'
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateToken, generateRefresheToken } from '../utils/generateToken.js';

export const postlogin = async (req, res) => {
	// console.log(req.body)
  try {
    const {email, password} = req.body;
    
    var user = await User.findOne({ email });
    if(!user) throw { code: 11000 };
    // console.log('Hola mundo')
    const resultado = await
    user.comparePassword(password);
    // console.log(resultado);
    if(!resultado) throw { code: 12000 };


    // const token = jwt.sign({ user: user }, process.env.JWT_SECRET )
    const {token, expiresIn } = generateToken(user.id);

    generateRefresheToken(user.id, res);

    // res.cookie('token', token, {
    //   httpOnly: true, 
    //   secure: !(process.env.MODO === 'developer')
    // });
    // console.log({token, expiresIn })
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
    // console.log('asdfasdf');
    const user = await User.findById(req.uid).lean();

    return res.json({ email: user.email, uid: user._id });

  } catch(e) {
    // statements
    return res.status(500).json({ error: 'error de server' });
  } 
}

export const refeshToken = async (req, res) => {
  try {
    const Rtoken = req.cookies.refeshToken;
    if (!Rtoken) {
      throw { code: 12000 };
    }
    // console.log(Rtoken)
    const {uid} = jwt.verify(Rtoken, process.env.JWT_REFERSH);

    // console.log(payload)
    const {token, expiresIn } = generateToken(uid);
   
    return res.json({ token, expiresIn });

  } catch(e) {
    // statements
    console.log(e);
    if (e.code === 12000) {
      return res.status(403).json({error: 'No existe el token'});
    }

    const TokenErrors = {
      "invalid signature": "La firma del JWT no es válida",
      "jwt expired": "JWT expirado",
      "invalid token": "Token no válido",
      "No Bearer": "Utiliza formato Bearer",
      "jwt malformed": "JWT formato no valido"
    }

    return res
      .status(401)
      .send({ error: TokenErrors[e.message] || 'Error desconocido en el token' });
  }
}

export const logout = (req, res) => {
  res.clearCookie('refeshToken');
  res.json({ ok: true });
} 