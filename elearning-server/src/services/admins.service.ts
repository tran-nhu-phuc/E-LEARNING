import { MessageCodeResponse } from "../common/messageResponse.common";
import { StatusCode } from "../common/variableResponse.common";
import { AdminRepository } from "../repositories/admins.repository";
import { IAdmin } from "../types";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";
const msg = new MessageCodeResponse();
export class AdminService {
    private _adminRepository: AdminRepository;
    constructor() {
        this._adminRepository = new AdminRepository();
    }

    async login(username: string, pass: string): Promise<any> {
        const admin = await this._adminRepository.getAdminByUsername(username);
        if (!admin) {
          throw { status: StatusCode.NOT_FOUND, msg: msg.NOT_FOUND("USERNAME") };
        }
        const isMatch = bcryptjs.compareSync(pass, admin.password);
        if (!isMatch) {
          throw { status: StatusCode.BAD_REQUEST, msg: msg.INCORRECT("PASS") };
        }
        const { password, createdAt, updatedAt, ...rest } = admin.dataValues;
        const accessToken = jwt.sign(rest, "ELN");
        return {
          accessToken: accessToken,
          admin: rest,
        };
      }
    async create(formAdmin: IAdmin): Promise<void> {
        const salt = bcryptjs.genSaltSync(9)
        const hashedPassword = bcryptjs.hashSync(formAdmin.password, salt)
        const newForm = {
         ...formAdmin,
            password: hashedPassword
        }
        await this._adminRepository.create(newForm);
    }

    async delete(adminId:number): Promise<void> {
        await this._adminRepository.delete(adminId);
    }

    async update(adminId:number, avatar:string): Promise<void> {
        await this._adminRepository.update(adminId, avatar)
    }
}
