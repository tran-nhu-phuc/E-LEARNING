import { MessageCode } from "./variableResponse.common"

export class MessageCodeResponse {
    CREATED(value:string): string{
        return MessageCode.CREATED + " " + value
    }
    UPDATE(value:string):string{
        return MessageCode.UPDATED + " " + value
    }
    DELETE(value:string):string{
        return MessageCode.DELETED + " " + value
    }
    GET(value:string):string{
        return MessageCode.GET + " " + value + " SUCCESS"
    }
    NOT_FOUND(value:string):string{
        return value + " " + MessageCode.NOT_FOUND
    }
    INCORRECT(value:string):string{
        return value + " " + MessageCode.INCORRECT
    }

    INTERNAL_SERVER_ERROR(value:string):string{
        return value +":" + " " + MessageCode.INTERNAL_SERVER_ERROR
    }
    UNAUTHORIZED():string{
        return MessageCode.UNAUTHORIZED
    }
    FORBIDDEN():string{
        return MessageCode.FORBIDDEN
    }
    IS_EXISTING(value:string):string{
        return value + " " + MessageCode.IS_EXIST
    }
}