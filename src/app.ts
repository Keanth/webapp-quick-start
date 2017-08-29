import * as $ from 'jquery';
import userService from './userService';

// // Allow webpack to include ./app.css in bundle
import './app.sass';

const users = userService.getAll();
for (const user of users) {
  $('#list').append(`<li>${user.name}</li>`);
}
