import express from 'express';
import { getOutputs } from '../services/test1.svc';

const router = express.Router();

router.get('/', function (req, res, next) {
  getOutputs()
    .then((outputs) => res.render('index', { outputs }))
    .catch((err) => next(err));
});

module.exports = router;
