class UserService {
    constructor($q, $firebaseAuth, $http) {
        this._$q = $q;
        this._$http = $http;

        var config = {
            apiKey: "AIzaSyBJ3t3l14IEKTmD4r_WDbEAIzpZU3guB90",
            authDomain: "ls-tractor.firebaseapp.com",
            databaseURL: "https://ls-tractor.firebaseio.com",
            storageBucket: "ls-tractor.appspot.com",
            messagingSenderId: "694230324980"
        };
        firebase.initializeApp(config);

        this.auth = $firebaseAuth(this.ref);
    }

    create(email, password) {
        return new this._$q((resolve, reject) => {
            this.auth.$createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    this.user = response;
                    return this.auth.$signInWithEmailAndPassword(email, password);
                })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
                console.log("created user");
        });
    }

    isLoggedIn() {
        console.log("Is Logged In");
        return this.auth.$requireAuth();
    }
}

console.log("this is service JS");

export default UserService; 