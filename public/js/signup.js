/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const baseURL = '/api';

const header = {
  credentials: 'include',
};

let authenticationed = false;

function idValidation() {
  const idReg = /^[a-z0-9_-]{4,20}$/;
  const userIdCheck = async (userId) => {
    const result = await fetch(`${baseURL}/userIdCheck?userId=${userId}`);
    const { code } = await result.json();
    return code;
  };

  const inputId = document.getElementById('id');
  const msgId = document.getElementById('msgId');
  msgId.style.display = 'none';
  const idCheck = async () => {
    const id = inputId.value;
    msgId.style.display = '';
    if (!id) {
      inputId.classList.remove('error');
      msgId.classList.remove('msg-error');
    } else if (id.length < 4 || id.length > 20) {
      inputId.classList.add('error');
      msgId.classList.add('msg-error');
      msgId.innerText = '아이디는 4~20글자 이내로 작성해주세요.';
    } else if (!idReg.test(inputId.value)) {
      inputId.classList.add('error');
      msgId.classList.add('msg-error');
      msgId.innerText = '아이디에는 영 소문자, 숫자, -, _만 사용 가능합니다.';
    } else {
      const code = await userIdCheck(id);
      if (code === 0) {
        inputId.classList.remove('error');
        msgId.classList.remove('msg-error');
        msgId.innerText = '입력하신 아이디로 사용이 가능합니다.';
      } else {
        inputId.classList.add('error');
        msgId.classList.add('msg-error');
        msgId.innerText = '입력하신 아이디는 이미 사용중입니다.';
      }
    }
  };

  inputId.addEventListener('keyup', () => {
    if (inputId.value) idCheck();
  });

  inputId.addEventListener('focus', () => {
    if (msgId.innerText) msgId.style.display = '';
  });

  inputId.addEventListener('blur', async () => {
    await idCheck();
    if (!inputId.classList.contains('error')) {
      msgId.style.display = 'none';
    }
  });
  return () => {
    idReg.test(inputId.value);
  };
}

const pwValidation = () => {
  const pwReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
  const inputPw = document.getElementById('pw');
  const msgPw = document.getElementById('msgPw');
  msgPw.style.display = 'none';
  const inputPc = document.getElementById('pwChk');
  const msgPc = document.getElementById('msgPwChk');
  msgPc.style.display = 'none';

  const pwChk = () => {
    const pw = inputPw.value;
    if (!pw || pwReg.test(pw)) {
      inputPw.classList.remove('error');
      msgPw.style.display = 'none';
    } else {
      inputPw.classList.add('error');
      msgPw.style.display = '';
    }
  };

  const pcChk = () => {
    const pw = inputPw.value;
    const pc = inputPc.value;
    if (pw === pc) {
      inputPc.classList.remove('error');
      msgPc.style.display = 'none';
    } else {
      inputPc.classList.add('error');
      msgPc.style.display = '';
    }
  };

  inputPw.addEventListener('keyup', () => {
    if (inputPw.value) {
      pwChk();
      if (inputPc.value) pcChk();
    }
  });

  inputPw.addEventListener('blur', () => {
    if (inputPw.value) {
      pwChk();
      if (inputPc.value) pcChk();
    }
  });

  inputPc.addEventListener('keyup', () => {
    pcChk();
  });
  inputPc.addEventListener('blur', () => {
    pcChk();
  });
};

const emailValidation = () => {
  const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const inputEmail = document.getElementById('email');
  const msgEmail = document.getElementById('msgEmail');
  msgEmail.style.display = 'none';
  const emailChk = () => {
    const email = inputEmail.value;
    if (emailReg.test(email)) {
      inputEmail.classList.remove('error');
      msgEmail.style.display = 'none';
    } else {
      inputEmail.classList.add('error');
      msgEmail.style.display = '';
    }
  };
  inputEmail.addEventListener('keyup', () => emailChk());
  inputEmail.addEventListener('blur', () => {
    if (inputEmail.value) emailChk();
  });
};

const nameValidation = () => {
  const nameReg = /^[a-zㄱ-ㅎ가-힣]*$/i;
  const inputName = document.getElementById('name');
  const msgName = document.getElementById('msgName');
  msgName.style.display = 'none';
  const nameChk = () => {
    const name = inputName.value;
    if (nameReg.test(name)) {
      inputName.classList.remove('error');
      msgName.style.display = 'none';
    } else {
      inputName.classList.add('error');
      msgName.style.display = '';
    }
  };
  inputName.addEventListener('keyup', () => nameChk());
  inputName.addEventListener('blur', () => nameChk());
};

const phoneValidation = () => {
  const phoneReg = /^\d{10,11}$/;
  const inputPhone = document.getElementById('phone');
  const btnGetAutNo = document.getElementById('getAutNo');
  const authDialog = document.getElementById('authModal');
  const authClose = document.getElementById('authClose');
  const checkPhone = () => {
    const phone = inputPhone.value;
    return phoneReg.test(phone);
  };

  inputPhone.addEventListener('keyup', () => {
    if (checkPhone()) btnGetAutNo.disabled = false;
    else btnGetAutNo.disabled = true;
  });
  inputPhone.addEventListener('blur', () => {
    if (checkPhone()) btnGetAutNo.disabled = false;
    else btnGetAutNo.disabled = true;
  });
  btnGetAutNo.addEventListener('click', () => {
    authDialog.style.display = 'block';
  });
  authClose.addEventListener('click', () => {
    authDialog.style.display = 'none';
  });
};
const authValidation = () => {
  const authReg = /^\d{6}$/;
  const inputAutNo = document.getElementById('autNo');
  const btnConfirmAutNo = document.getElementById('confirmAutNo');
  const msgAutNo = document.getElementById('msgAutNo');
  msgAutNo.style.display = 'none';
  const autNoChk = () => {
    const autNo = inputAutNo.value;
    return authReg.test(autNo);
  };

  inputAutNo.addEventListener('keyup', () => {
    if (autNoChk()) btnConfirmAutNo.disabled = false;
    else btnConfirmAutNo.disabled = true;
  });
  inputAutNo.addEventListener('blur', () => {
    if (autNoChk()) btnConfirmAutNo.disabled = false;
    else btnConfirmAutNo.disabled = true;
  });
  btnConfirmAutNo.addEventListener('click', () => {
    if (inputAutNo.value === '123456') authenticationed = true;
  });
};

const signup = (data) => {
  fetch(`${baseURL}/signup`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      ...header,
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.status === 201) {
      document.getElementById('signupForm').style.display = 'none';
      document.getElementById('signupResult').style.display = '';
    } else {
      console.log('가입 실패');
    }
  });
};

const handleAddress = () => {
  const agreeOptional = document.getElementById('agreeOptional');
  const zipCode = document.getElementById('zipCode');
  const address = document.getElementById('address');
  const addressDetail = document.getElementById('addressDetail');
  const btnAddress = document.getElementById('btnAddress');

  const addressDialog = document.getElementById('address_modal');
  const addressContent = document.getElementById('address_modal_frame');
  const addressClose = document.getElementById('addressClose');
  addressDialog.style.display = 'none';
  agreeOptional.addEventListener('click', () => {
    if (agreeOptional.checked) {
      addressDetail.readOnly = false;
      btnAddress.disabled = false;
    } else {
      zipCode.value = '';
      address.value = '';
      addressDetail.value = '';
      addressDetail.readOnly = true;
      btnAddress.disabled = true;
    }
  });
  btnAddress.addEventListener('click', () => {
    new daum.Postcode({
      oncomplete(data) {
        let addr = '';
        let extraAddr = '';
        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }
        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          if (extraAddr !== '') {
            extraAddr = ` (${extraAddr})`;
          }
          addr += extraAddr;
        }
        zipCode.value = data.zonecode;
        address.value = addr;
        addressDetail.value = '';
        addressDetail.focus();
        addressDialog.style.display = 'none';
      },
      width: '100%',
      height: '100%',
      maxSuggestItems: 5,
    }).embed(addressContent);
    addressDialog.style.display = 'block';
  });
  addressClose.addEventListener('click', () => {
    addressDialog.style.display = 'none';
  });
};

const handleAgree = () => {
  const agreeAll = document.getElementById('agreeAll');
  const agreeMarketing = document.getElementById('agreeMarketing');
  const agreeService = document.getElementById('agreeService');
  agreeAll.addEventListener('click', () => {
    agreeMarketing.checked = agreeAll.checked;
    agreeService.checked = agreeAll.checked;
  });
  agreeMarketing.addEventListener('click', () => {
    if (!agreeMarketing.checked) agreeAll.checked = false;
  });
  agreeService.addEventListener('click', () => {
    if (!agreeService.checked) agreeAll.checked = false;
  });
};

window.onload = () => {
  idValidation();
  pwValidation();
  emailValidation();
  nameValidation();
  phoneValidation();
  authValidation();
  handleAddress();
  handleAgree();
  const inputs = document.getElementsByTagName('input');
  const requires = Array.from(inputs).filter((ele) => ele.hasAttribute('required'));

  const btnSubmit = document.getElementById('btnSubmit');

  btnSubmit.addEventListener('click', () => {
    if (
      authenticationed &&
      requires.every((ele) => {
        if (ele.type === 'checkbox') return ele.checked;
        return !ele.classList.contains('error') && ele.value;
      })
    ) {
      signup({
        userId: inputs.id.value,
        userPw: inputs.pw.value,
        email: inputs.email.value,
        userName: inputs.name.value,
        phoneNo: inputs.phone.value,
        authNo: inputs.autNo.value,
        zipCode: inputs.zipCode.value,
        address: inputs.address.value,
        addressDetail: inputs.addressDetail.value,
        agreeMarketing: inputs.agreeMarketing.checked ? 'Y' : 'N',
        agreeService: inputs.agreeService.checked ? 'Y' : 'N',
      });
    } else {
      requires
        .find((ele) => {
          if (ele.type === 'checkbox') return !ele.checked;
          return ele.classList.contains('error') || !ele.value;
        })
        .focus();
    }
  });
};
