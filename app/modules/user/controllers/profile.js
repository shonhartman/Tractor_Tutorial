class ProfileController {
    constructor($state, UserService, $http) {
        this._$http = $http;
        this._$state = $state;
        this._UserService = UserService;

        this._UserService
        .isLoggedIn()
        .then((response) => {
            this.user = response;
            console.log("response");
        })

        .catch((error) => {
            this._$state.go("register");
        });
    }
}

export default ProfileController;