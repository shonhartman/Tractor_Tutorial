import angular from 'angular';

import config from './config';
import registerController from './controllers/register';
import profileController from './controllers/profile';
import service from './service';

let user = angular.module('app.user', []);

user.config(config);
user.controller('ProfileController', profileController);
user.controller('RegisterController', registerController);
user.service('UserService', service);

console.log("index JS");

export default user;