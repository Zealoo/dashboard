export default {
  name: 'rules',
  data() {
    return {
      usernameVal: (value) => !!/^[a-zA-Z0-9_.-]+$/.exec(value) ||
        'Username can only consist of A-Z, underscore or hyphen',
      fieldRequired: (value) => !!value || 'Required.',
      isNumber: (value) => !Number.isNaN(Number(value)) || 'Field must be a number',
      isPhoneNumber: (value) => /\d{10,11}$/.test(value) || 'Field must be a valid phone number',
      categoryField: (value) => !!value || 'Required.',
      tosValidator: (v) => !!v || 'Must accept terms and condition',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
      passwordMatch: (value, password) =>
        value === password || 'Password does not match',
      thumbMaxSiz:
        value => !value || value.size < 2000000 || 'Thumbnail size should be less than 2 MB!',
      titleMin: (v) => v.length >= 3 || 'Min 3 characters',
    }
  }
}
