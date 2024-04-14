import { RateRepository } from "../repositories/rates.repository";
import { IRate } from "../types";

export class RateService {
  private _rateRepository: RateRepository;
  constructor() {
    this._rateRepository = new RateRepository();
  }

  async create(form: IRate): Promise<void> {
    await this._rateRepository.create(form);
  }
  async getOneRate(form: any) {
    return await this._rateRepository.getOneRate(form);
  }
}
