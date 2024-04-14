import { MessageCodeResponse } from "../common/messageResponse.common";
import { StatusCode } from "../common/variableResponse.common";
import { UserRepository } from "../repositories/users.repository";
import { IRegister } from "../types";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const msg = new MessageCodeResponse();
export class AuthService {
  private _userRepository: UserRepository;
  constructor() {
    this._userRepository = new UserRepository();
  }
  async register(formRegister: IRegister): Promise<void> {
    const salt = bcryptjs.genSaltSync(9);
    const hashedPassword = bcryptjs.hashSync(formRegister.password, salt);
    const newForm = {
      ...formRegister,
      password: hashedPassword,
    };
    await this._userRepository.register(newForm);
  }
  async login(email: string, pass: string): Promise<any> {
    const user = await this._userRepository.getUserEmail(email);
    if (!user) {
      throw { status: StatusCode.NOT_FOUND, msg: msg.NOT_FOUND("EMAIL") };
    }
    const isMatch = bcryptjs.compareSync(pass, user.password);
    if (!isMatch) {
      throw { status: StatusCode.BAD_REQUEST, msg: msg.INCORRECT("PASS") };
    }
    const { password, createdAt, updatedAt, ...rest } = user.dataValues;
    const accessToken = jwt.sign(rest, "ELN");
    return {
      accessToken: accessToken,
      user: rest,
    };
  }
}
