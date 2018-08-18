export default function(matchPassword) {
  return [
    {
      field: "name",
      method: "isEmpty",
      validWhen: false,
      message: "Name is required"
    },
    {
      field: "name",
      method: "isByteLength",
      args: [{ min: 3, max: 20 }],
      validWhen: true,
      message: "Name must be between 3 and 20 characters"
    },
    {
      field: "email",
      method: "isEmpty",
      validWhen: false,
      message: "Email is required."
    },
    {
      field: "email",
      method: "isEmail",
      validWhen: true,
      message: "That is not a valid email."
    },
    {
      field: "password",
      method: "isEmpty",
      validWhen: false,
      message: "Password is required."
    },
    {
      field: "password",
      method: "isByteLength",
      args: [{ min: 4, max: 8 }],
      validWhen: true,
      message: "Name must be between 4 and 8 characters"
    },
    {
      field: "passwordConfirmation",
      method: "isEmpty",
      validWhen: false,
      message: "Password confirmation is required."
    },
    {
      field: "passwordConfirmation",
      method: matchPassword,
      validWhen: true,
      message: "Password and password confirmation do not match."
    }
  ];
}
