import { Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';

import { apiConfig } from './api-config';
import { User } from "./users";

const connection = require('./mysql-connection');

export const handleAuthentication = (req: Request, resp: Response) => {
  const reqUser: User = req.body;
  if(reqUser) {
    getEmailLogin(reqUser, (err,rows) => {
      if (err) throw err;
      if (rows[0]) {
        const dbUser: User = rows[0];
        const token = jwt.sign({sub: dbUser.emailUsuario, iss: 'anr-pacientes'}, apiConfig.secret);
        resp.json({name: dbUser.nomeUsuario, email: dbUser.emailUsuario, accessToken: token});
      } else {
        resp.status(403).json({message: 'Dados invalidos !!'});
      }
    });
  } else {
    resp.status(403).json({message: 'Dados invalidos !!'});
  }
};

function getEmailLogin(reqUser: User, callback): any {
  let emailUsuario: string = reqUser.emailUsuario;
  let passwordUsuario: string = reqUser.passwordUsuario;
  let sql = "SELECT * FROM awUsuarios WHERE (emailUsuario = '"+emailUsuario+"') and (passwordUsuario = '"+passwordUsuario+"')";
  connection.query(sql, (error,rows) => { 
      return callback(error, rows) 
  });
};
