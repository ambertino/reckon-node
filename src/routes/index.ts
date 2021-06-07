import express from 'express';
import { getOutputs } from '../services/test1.svc';
import { searchTextAndSubmit } from '../services/test2.svc';

const router = express.Router();

router.get('/', (req, res, next) => {
  getOutputs()
    .then((outputs) => res.render('index', { outputs }))
    .catch(next);
});

router.get('/test2', (req, res, next) => {
  searchTextAndSubmit()
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
