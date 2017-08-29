import * as $ from 'jquery';
// // Allow webpack to include ./app.css in bundle
// import * as css from './app.sass';
import userService from './userService';

const users = userService.getAll();
for (const user of users) {
  $('#list').append(`<li>${user.name}</li>`);
}
