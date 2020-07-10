const RegexUserId = /^[(A-z)]+$/;
const RegexUserPassword = /^([A-z]+[0-9]|[0-9]+[A-z])[A-z0-9]*$/;
const RegexPhoneNumber = /^\d{10,11}$/;
const RegexZipCode = /^\d{5}$/;
const RegexAddress = /^[(가-힣)(A-z)(0-9)\- ]+$/;

module.exports = {
  RegexUserId,
  RegexUserPassword,
  RegexPhoneNumber,
  RegexZipCode,
  RegexAddress,
};
