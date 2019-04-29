import { Request, Response } from 'express';
import { User, users } from "./users";

// import * as jwt from 'jsonwebtoken';
// import { apiConfig } from './api-config';

export const handleAuthentication = (req: Request, resp: Response)=>{
  const user: User = req.body;
  console.log(`handleAuthentication com ${User.name}`);

  if(isValid(user)) {
      const dbUser: User = users[user.email];
      // const token = jwt.sign({sub: dbUser.email, iss: 'anr-pacientes'}, apiConfig.secret);
      // resp.json({name: dbUser.name, email: dbUser.email, accessToken: token});
      console.log(`isValid para ${dbUser.name}`);
      resp.json({name: dbUser.name, email: dbUser.email});
  } else {
      resp.status(403).json({message: 'Dados invalidos !!'});
  }
};

function isValid(user: User): boolean {
  if(!user) {
    console.log(`return false para ${User.name}`);
    return false
  }

  const dbUser = users[user.email];
  console.log({name: dbUser.name, email: dbUser.email});
  return dbUser !== undefined && dbUser.matches(user);
}
