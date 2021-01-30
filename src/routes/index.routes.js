import express from 'express';
import IndexController from '../controllers/index.controllers';
import { schemaValidation } from '../helpers/middleware';
import { postSchema } from '../schemas/index.schema';

const router = express.Router();

router.get('/', IndexController.get);

router.post(
  '/validate-rule',
  schemaValidation(postSchema),
  IndexController.post
);

module.exports = router;
