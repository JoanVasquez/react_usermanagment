export default function() {
    return [
        {
            field: 'email',
            method: 'isEmpty',
            validWhen: false,
            message: 'Email is required.'
        },
        {
            field: 'email',
            method: 'isEmail',
            validWhen: true,
            message: 'That is not a valid email.'
        },
        { 
            field: 'password', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Password is required.'
          },
          { 
            field: 'password', 
            method: 'isByteLength', 
            args: [{ min: 4, max: 8 }],
            validWhen: true, 
            message: 'Name must be between 4 and 8 characters'
          }
    ]
}