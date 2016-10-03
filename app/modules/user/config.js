function config($stateProvider) {
    $stateProvider
    .state("profile", {
        url:"/",
        controller: "LoginController as loginCtrl",
        template: require("./views/login.html")
    })
}

export default config;