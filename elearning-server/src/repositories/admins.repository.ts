import { Admin } from "../entities/admins.entity";

export class AdminRepository {
  async getAdminByUsername(username: string): Promise<any> {
    return await Admin.findOne({ where: { username } });
  }
  async create(form: any): Promise<void> {
    await Admin.create(form);
  }

  async delete(id: number): Promise<void> {
    await Admin.destroy({ where: { id } });
  }

  async update(id: number, avatar: string): Promise<void> {
    await Admin.update({ avatar }, { where: { id } });
  }
}
