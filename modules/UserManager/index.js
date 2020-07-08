const path = require('path');
const Nedb = require('nedb');
const User = require('./User');

class UserManager {
  constructor() {
    this.db = new Nedb({
      filename: path.join(__dirname, './../../databases/user.db'),
      autoload: true,
    });
  }

  /**
   * @param {{id: string, password: string, email: string, name: string, phoneNumber: string, zipCode: string, address: string, addressDetail: string, signupDatetime: string, agreeMarketing: string, agreeMarketingDatetime: string}} attrs
   * @return {Promise}
   */
  createUser(attrs) {
    const user = new User({
      id: attrs.id,
      password: attrs.password,
      email: attrs.email,
      name: attrs.name,
      phoneNumber: attrs.phoneNumber,
      zipCode: attrs.zipCode,
      address: attrs.address,
      addressDetail: attrs.addressDetail,
      signupDatetime: attrs.signupDatetime,
      agreeMarketing: attrs.agreeMarketing,
      agreeMarketingDatetime: attrs.agreeMarketingDatetime,
    });

    return new Promise((resolve, reject) => {
      this.db.insert(user, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  /**
   * @param {string} userId
   * @return {Promise}
   */
  findUserById(userId) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ id: userId }, (err, data) => {
        if (err) reject(err);
        if (data) {
          resolve(new User(data));
        }

        resolve({});
      });
    });
  }
}

module.exports = new UserManager();
