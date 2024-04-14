import Api from "../apis/api";

export class CommentRepository {
    private _api: Api;
    constructor() {
        this._api = new Api();
    }

    async getComments(form: any){
        return this._api.Get("/comments/get-all",form)
    }

    async getCountComment(form :any) {
        return this._api.Get("/comments/count",form)
    }

    async createComment(form: any) {
        return this._api.Post("/comments/create",form)
    }
}