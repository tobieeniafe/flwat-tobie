import { validateData } from '../services/index.service';

const IndexController = {
  get(req, res, next) {
    res.status(200).send({
      message: 'My Rule-Validation API',
      status: 'success',
      data: {
        name: 'Sola-Eniafe Samuel',
        github: '@tobieeniafe',
        email: 'tobisamuel88@gmail.com',
        mobile: '07032747659',
        twitter: '@tobie_eniafe',
      },
    });
  },
  post(req, res, next) {
    const body = req.locals;
    validateData(res, body);
  },
};

export default IndexController;
