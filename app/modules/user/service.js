class UserService {
    constructor($q, $firebaseAuth, $http) {
        this._$q = $q;
        this._$http = $http;
    }
}

console.log("this is service JS.. got it?!");

export default UserService; 