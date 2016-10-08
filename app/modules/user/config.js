function config($stateProvider) {
    $stateProvider
    .state("register", {
        url:"/",
        controller: "RegisterController as registerCtrl",
        template: require("./views/register.html")
    })
    .state("profile", {
        url:"/",
        controller: "ProfileController as profileCtrl",
        template: require("./views/profile.html")
    })
}

export default config;