import { RateRepository } from "../repositories/rates.repository";

export class RateService {
  private _rateRepository: RateRepository;
  constructor() {
    this._rateRepository = new RateRepository();
  }

  async createRate(
    userId: number,
    courseId: number,
    rateStar: number
  ): Promise<void> {
    const form = {
      userId,
      courseId,
      rateStar,
    };
    await this._rateRepository.createRate(form);
  }

  async getOneRate(userId: number, courseId: number) {
    try {
      const form = {
        userId,
        courseId,
      };
      const result = await this._rateRepository.getOneRate(form);
      return result.data.data;
    } catch (error) {
    }
  }
}
