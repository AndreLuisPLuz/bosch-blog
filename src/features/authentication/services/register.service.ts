import UserEntity from "../../../entities/user.entity";
import { CreateUserArgs } from "../../../types/user.types";
import { RegisteredUserDTO } from "../api/responses/login.responses";

const registerUserService = async (payload: CreateUserArgs): Promise<RegisteredUserDTO> => {
    var newUser = await UserEntity.createAsync(payload);
    return RegisteredUserDTO.build(newUser);
};

export { registerUserService };