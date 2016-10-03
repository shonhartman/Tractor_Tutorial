import angular from 'angular';

import config from './config';
import loginController from './controllers/login';
import service from './service';

let user = angular.module('app.user', []);

user.config(config);
user.controller('LoginController', loginController);
user.service('UserService', service);

console.log("index JS");

export default user;