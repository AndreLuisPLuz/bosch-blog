import UserEntity from "../../../entities/user.entity";
import { CreateUserArgs } from "../../../types/user.types";

const registerUserService = async (payload: CreateUserArgs): Promise<UserEntity> => {
    var newUser = await UserEntity.createAsync(payload);
    return newUser;
};

export { registerUserService };