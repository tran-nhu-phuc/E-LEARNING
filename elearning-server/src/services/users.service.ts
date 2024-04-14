import { UserRepository } from "../repositories/users.repository";
import { Random } from "random-js";
import bcryptjs from "bcryptjs";
import transporter from "../configs/nodemailer.config";
import { StatusCode } from "../common/variableResponse.common";
import { MessageCodeResponse } from "../common/messageResponse.common";
const msg = new MessageCodeResponse();
export class UserService {
  private _userRepository: UserRepository;
  constructor() {
    this._userRepository = new UserRepository();
  }

  async createOTP(email: string): Promise<string> {
    const user = await this._userRepository.getUserEmail(email);
    if (!user) {
      throw { status: StatusCode.NOT_FOUND, msg: msg.NOT_FOUND("EMAIL") };
    } else {
      const random = new Random();
      const otp = random.integer(10000, 99999);
      const salt = bcryptjs.genSaltSync(9);
      const hashedOTP = bcryptjs.hashSync(String(otp), salt);
      await transporter.sendMail({
        bcc: email,
        subject: "OTP Authentication",
        html: `
                    <p><strong>${otp}</strong></p>
                    <p>OTP only lasts for 5 minutes</p>
                    <p>Please do not share this OTP with anyone.</p>
                `,
      });
      return hashedOTP;
    }
  }

  async confirmOTP(otpUi: number, otp: string): Promise<any> {
    const checkOTP = bcryptjs.compareSync(String(otpUi), otp);
    if (!checkOTP) {
      throw { status: StatusCode.BAD_REQUEST, msg: msg.INCORRECT("OTP") };
    } else {
      return { msg: "OTP CONFIRMED" };
    }
  }

  async changePassword(email: string, password: string): Promise<void> {
    const salt = bcryptjs.genSaltSync(9);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    await this._userRepository.changePassword(email, hashedPassword);
  }

  async updateProfile(
    id: number,
    fileAvatar: Express.Multer.File
  ): Promise<void> {
    const newProfile = {
      avatar: fileAvatar.path,
    };
    const result = await this._userRepository.updateProfile(id, newProfile);
    if (result[0] === 0) {
      throw {
        status: StatusCode.NOT_FOUND,
        msg: msg.NOT_FOUND("ID USER"),
      };
    }
  }

  async block(id: number, key: any): Promise<void> {
    const formBlock = { [key]: 1 };
    const result = await this._userRepository.updateProfile(id, formBlock);
    if (result[0] === 0) {
      throw {
        status: StatusCode.NOT_FOUND,
        msg: msg.NOT_FOUND("ID USER"),
      };
    }
  }
  async unblock(id: number, key: any): Promise<void> {
    const formUnblock = { [key]: 0 };
    const result = await this._userRepository.updateProfile(id, formUnblock);
    if (result[0] === 0) {
      throw {
        status: StatusCode.NOT_FOUND,
        msg: msg.NOT_FOUND("ID USER"),
      };
    }
  }
  async getById(id: number): Promise<any> {
    const result = await this._userRepository.getById(id);
    if (result === null) {
      throw {
        status: StatusCode.NOT_FOUND,
        msg: msg.NOT_FOUND("ID USER"),
      };
    } else {
      return result;
    }
  }
}
