window.onload = () => {
  let btnSearch = document.getElementById('search_address');
  let modal = document.getElementById('address_modal');
  let modal_frame = document.getElementById('address_modal_frame');

  btnSearch.addEventListener('click', () => {
    new daum.Postcode({
      oncomplet(data) {},
      width: '100%',
      height: '100%',
      maxSuggestItems: 5,
    }).embed(modal_frame);
    console.log(modal_frame);
    modal.style.display = 'block';
  });
};
