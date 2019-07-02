import db from '../db/index';
import users from '../model/users';

const { query } = db;
const { findUserByEmail } = users;

export default class Authentication {
  static async isUserExist(req, res, next) {
    const userEmail = req.body.email;
    try {
      const { rows } = await query(findUserByEmail, [userEmail]);
      if (rows.length > 0) {
        return res.status(409).json({ status: 409, error: 'User already exist' });
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
