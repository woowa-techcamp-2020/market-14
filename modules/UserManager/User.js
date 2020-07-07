class User {
  constructor({
    id,
    password,
    email,
    name,
    tel,
    zipcode,
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
    this.tel = tel;
    this.zipcode = zipcode;
    this.address = address;
    this.addressDetail = addressDetail;
    this.signupDatetime = signupDatetime;
    this.agreeMarketing = agreeMarketing;
    this.agreeMarketingDatetime = agreeMarketingDatetime;
  }

  updatePassword(password) {
    this.password = password;
  }
}

module.exports = User;