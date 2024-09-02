import { Types } from "mongoose";
import UserEntity from "../../../../entities/user.entity";

type LoginToken = {
    jwtToken: string,
};

class RegisteredUserDTO {
    id: Types.ObjectId;
    name: string;
    email: string;

    private constructor(id: Types.ObjectId, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public static build = (user: UserEntity): RegisteredUserDTO => {
        return new RegisteredUserDTO(user.id, user.name, user.email);
    }
}

export {
    LoginToken,
    RegisteredUserDTO
};