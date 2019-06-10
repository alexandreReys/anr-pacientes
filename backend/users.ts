export class User {
  constructor(public emailUsuario: string,
              public nomeUsuario: string,
              public passwordUsuario: string) {};

  matches(another: User): boolean {
    return another !== undefined &&
           another.emailUsuario === this.emailUsuario &&
           another.passwordUsuario === this.passwordUsuario;
  }
}

// export const users: {[key: string]: User} = {
//   "juliana@gmail.com": new User('juliana@gmail.com', 'Juliana', 'juliana23'),
//   "amanda@gmail.com": new User('amanda@gmail.com', 'Amanda', 'amanda21'),
//   "ale@gmail.com": new User('ale@gmail.com', 'Ale', 'ale10')
// };
