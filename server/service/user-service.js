import UserModel from "../models/user-model.js";
import bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import mailService from "./mail-service.js";
import tokenSevice from "./token-sevice.js";
import UserDto from "../dtos/user-dto.js";


class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw new Error('Пользователь с таким мылом уже есть')
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await UserModel.create({email, password: hashPassword, isActivated: false, activationLink})
        try {
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        } catch (e) {
            console.log(e)
        }

        console.log('USER', user)
        const userDto =new UserDto(user)
        const tokens = tokenSevice.generateTokens({...userDto})
        await tokenSevice.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
}

export default new UserService()