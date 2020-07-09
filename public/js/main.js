/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const baseURL = '/api';

const header = {
  credentials: 'include',
};

const signout = () => {
  fetch(`${baseURL}/signout`, {
    method: 'get',
    headers: header,
  }).then((res) => {
    if (res.status === 204) location.reload();
    else alert('로그아웃에 실패했습니다');
  });
};

window.onload = () => {
  const signoutBtn = document.getElementById('btnSignout');
  if (signoutBtn) signoutBtn.addEventListener('click', () => signout());
};
