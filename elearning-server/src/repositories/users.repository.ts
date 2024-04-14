import { User } from "../entities/users.entity";

export class UserRepository {
  async register(formRegister: any): Promise<void> {
    await User.create(formRegister);
  }
  async getUserEmail(email: string): Promise<any> {
    return await User.findOne({ where: { email } });
  }
  async changePassword(email: string, password: string): Promise<void> {
    await User.update({ password }, { where: { email } });
  }
  async updateProfile(id: number, formUpdate: any): Promise<number[]> {
    return await User.update(formUpdate, { where: { id } });
  }

  async getById(id: number) {
    return await User.findOne({ where: { id } });
  }
}
