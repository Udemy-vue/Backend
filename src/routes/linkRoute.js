import express from 'express';
import * as linkControll from '../controllers/linkControll.js'
import { requireToken } from '../middlewares/requireAuth.js';
import { bodyLinkValidatos, paramsLinkValidator } from '../middlewares/validatorManager.js'
import { validationResultExpress } from '../middlewares/Validation.js';

const linkRoute = express.Router();

linkRoute.get('/ok', requireToken, linkControll.getLinks);

linkRoute.get('/ok/:id', requireToken, paramsLinkValidator, validationResultExpress, linkControll.getLink);

linkRoute.post('/ok', requireToken, bodyLinkValidatos, validationResultExpress, linkControll.createLink);

linkRoute.delete('/ok/:id', requireToken, paramsLinkValidator, validationResultExpress, linkControll.removeLink);

export default linkRoute;