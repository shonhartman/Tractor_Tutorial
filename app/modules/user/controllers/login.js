class LoginController {
    constructor($state, UserService) {
        console.log("login controller");

        this._$state = $state;
        this_.UserService = UserService;
        this.user = this._UserService.new();
    }
}

console.log("this is the login controller");

export default LoginController;