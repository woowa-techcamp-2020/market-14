class User {
  constructor({
    id,
    password,
    email,
    name,
    phoneNumber,
    zipCode,
    address,
    addressDetail,
    signupDatetime,
    agreeMarketing,
    agreeMarketingDatetime,
  }) {
    this.id = id;
    this.password = password;
    this.email = email;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.zipCode = zipCode;
    this.address = address;
    this.addressDetail = addressDetail;
    this.signupDatetime = signupDatetime;
    this.agreeMarketing = agreeMarketing;
    this.agreeMarketingDatetime = agreeMarketingDatetime;
  }
}

module.exports = User;
