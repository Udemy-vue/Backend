import { validationResult } from 'express-validator'

export const postlogin = (req, res) => {
  // const errors = validationResult(req);

  // if(!errors.isEmpty()){
  //   return res.status(400).json({ errors: errors.array()});
  // }

	console.log(req.body)
  res.json({ login: true });
}

export const postregister = (req, res) => {
  // const errors = validationResult(req);

  // if(!errors.isEmpty()){
  //   return res.status(400).json({ errors: errors.array()});
  // }
  console.log(req.body)
  res.json({ registro: true });
}

// export const get