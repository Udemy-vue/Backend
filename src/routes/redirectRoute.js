import { Router } from 'express';
import {redirectLink} from "../controllers/redirectControll.js";
// import * as linkControll from '../controllers/linkControll.js'
// import { requireToken } from '../middlewares/requireAuth.js';
// import { bodyLinkValidatos, paramsLinkValidator } from '../middlewares/validatorManager.js'
// import { validationResultExpress } from '../middlewares/Validation.js';

const redirectRoute = Router();

redirectRoute.get("/:nanoLink", redirectLink);

export default redirectRoute;