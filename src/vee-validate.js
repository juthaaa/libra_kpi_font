import * as rules from "vee-validate/dist/rules";
import { extend } from "vee-validate";
import en from 'vee-validate/dist/locale/en'

for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: en.messages[rule] // add its message
  });
}


// extend("required", {
//   ...required,
//   message: "This field is required"
// });

// extend("email", {
//   ...email,
//   message: "This field must be a valid email"
// });

// extend("confirmed", {
//   ...confirmed,
//   message: "This field confirmation does not match"
// });

// extend("length", {
//   ...length,
//   message: "This field must have 2 options"
// });
