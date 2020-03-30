import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  "users.isExistUser": ({ username }) => {
    console.log(`checking if already exists user "${username}"`);
    const user = Accounts.findUserByUsername(username);
    if (user) {
      return true;
    } else {
      return false;
    }
  }
});
