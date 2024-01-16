import jwt from 'jsonwebtoken';
import { TokenErrors } from '../utils/generateToken.js';

export const requireRefreshToken = (req, res, next) => {
	try {
		const Rtoken = req.cookies.refeshToken;
    if (!Rtoken) {
      throw { code: 12000 };
    }
    // console.log(Rtoken)
    const {uid} = jwt.verify(Rtoken, process.env.JWT_REFERSH);

    req.uid = uid;

    next();
	} catch(e) {
		// statements
		console.log(e);
		if (e.code === 12000) {
      return res.status(403).json({error: 'No existe el token'});
    }
    return res
      .status(401)
      .json({ error: TokenErrors[e.message] || 'Error desconocido en el token' });
	}
}