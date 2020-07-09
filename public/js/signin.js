/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const baseURL = '/api';

const header = {
  credentials: 'include',
};

const getCookie = (name) => {
  const value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return value ? value[2] : null;
};

const signin = (userId, userPw) => {
  const msgSignin = document.getElementById('msgSignin');
  if (!userId) msgSignin.innerText = '아이디를 입력해 주세요.';
  else if (!userPw) msgSignin.innerText = '비밀번호를 입력해 주세요.';
  else {
    const data = { userId, userPw };
    fetch(`${baseURL}/signin`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        ...header,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status === 200) location.replace('/');
      else {
        msgSignin.innerText = '아이디와 비밀번호를 확인 후 다시 로그인해주세요.';
      }
    });
  }
};

window.onload = () => {
  const signinBtn = document.getElementById('btnSignin');
  const idInput = document.getElementById('id');
  const pwInput = document.getElementById('pw');
  const idSave = document.getElementById('save_id');
  const savedId = getCookie('savedId');
  if (savedId) {
    idInput.value = savedId;
    idSave.checked = true;
  }
  signinBtn.addEventListener('click', () => {
    const id = idInput.value;
    const pw = pwInput.value;
    const save = idSave.checked;
    const date = new Date();
    if (save) {
      date.setTime(date.getTime() + 7 * 60 * 60 * 24 * 1000);
    }
    document.cookie = `savedId=${id};expires=${date.toUTCString()};path=/`;
    signin(id, pw);
  });
};
