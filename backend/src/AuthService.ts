
import { TokenEntity } from './TokenEntity';
import { UserEntity } from './UserEntity';
import { AppDataSource } from './DataSource';
import { v4 } from 'uuid';

export class AuthService {

  async login(entity: { login: string; password: string }): Promise<{ token: string }> {
    const checkUser = await AppDataSource.manager.findOneBy(UserEntity, { login: entity.login });

    if (!checkUser) {
      throw new Error('invalid login');
    }

    const findUser = await AppDataSource.manager.findOne(UserEntity, {
      where: [{ login: entity?.login, password: entity?.password }],
    });

    if (!findUser) {
      throw new Error('invalid login or password');
    }

    const token = v4();
    await AppDataSource.manager.delete(TokenEntity, { user: findUser });
    await AppDataSource.manager.insert(TokenEntity, {
      user: findUser,
      token: token,
      expire: new Date(new Date().getTime() + 15 * 60 * 60 * 1000).toJSON(),
    });

    return { token };
  }

  async logout(token: string): Promise<void> {
    await AppDataSource.manager.delete(TokenEntity, { token });
  }
}
