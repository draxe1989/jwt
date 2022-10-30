class UserDto {
    id
    email
    isActivated
    activationLink

    constructor(model) {
        this.id = model._id
        this.email = model.email
        this.isActivated = model.isActivated
        this.activationLink = model.activationLink
    }
}

module.exports = UserDto