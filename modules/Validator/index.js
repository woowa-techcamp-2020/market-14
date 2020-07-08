const RegexUserId = /^[(A-z)]+$/;
const RegexUserPassword = /^([A-z]+[0-9]|[0-9]+[A-z])[A-z0-9]*$/;
const RegexPhoneNumber = /^0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/;
const RegexZipCode = /^\d{5}$/;
const RegexAddress = /^[(가-힣)(A-z)(0-9)\- ]+$/;

module.exports = {
  RegexUserId,
  RegexUserPassword,
  RegexPhoneNumber,
  RegexZipCode,
  RegexAddress,
};
