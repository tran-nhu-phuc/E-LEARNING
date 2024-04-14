import Api from "../apis/api";

export class RateRepository {
    private _api: Api;
    constructor() {
        this._api = new Api();
    }
    async createRate(form : any){
        await this._api.Post("/rates/create",form)
    }
    async getOneRate(form: any){
        return await this._api.Get("/rates/get-one",form)
    }
}