let btnInput = document.querySelector('.btn.input');
let buttons = document.querySelector('.buttons');
let btnShare = document.querySelector('.btn.share');

let qr_code_element = document.querySelector('.qr-code');
let searchBar = document.querySelector('.search-bar');
let userInput = document.querySelector('.user-input');
let logo = document.querySelector('.logo');
let qrCodeContainer = document.querySelector('.qr-code-container');
btnInput.addEventListener('click', () => {
  let user_input = document.querySelector('.text');
  if (user_input.value != '') {
    if (qr_code_element.childElementCount == 0) {
      generate(user_input);
    } else {
      qr_code_element.innerHTML = '';
      generate(user_input);
    }
  } else {
    console.log('not valid input');
    qr_code_element.style = 'display: none';
  }
});

btnShare.addEventListener('click', () => {
  let shareButton = document.querySelector('.share-buttons');
  shareButton.classList.toggle('active');
});

function generate(user_input) {
  qr_code_element.style = '';

  let qrcode = new QRCode(qr_code_element, {
    text: `${user_input.value}`,
    width: 180, //128
    height: 180,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
  });

  let download = document.querySelector('.btn.download');

  let iconArrow = document.createElement('img');
  let iconLink = document.createElement('img');
  iconArrow.src = './assets/arrow-down.svg';
  iconLink.src = './assets/link.svg';
  buttons.appendChild(download);
  let download_link = document.createElement('a');
  let share_link = document.createElement('a');

  download_link.setAttribute('download', 'qr_code.png');
  download_link.innerHTML = `Download`;
  share_link.innerHTML = `Share`;
  download.appendChild(download_link);
  download.appendChild(iconArrow);

  let qr_code_img = document.querySelector('.qr-code img');
  if (qr_code_img) {
    qrCodeContainer.style.display = 'flex';
    searchBar.style.display = 'none';
    userInput.style.display = 'block';
    logo.style.padding = '2rem';
    logo.style.width = '8rem';
  }
  let qr_code_canvas = document.querySelector('canvas');

  if (qr_code_img.getAttribute('src') == null) {
    setTimeout(() => {
      download_link.setAttribute('href', `${qr_code_canvas.toDataURL()}`);
    }, 300);
  } else {
    setTimeout(() => {
      download_link.setAttribute('href', `${qr_code_img.getAttribute('src')}`);
    }, 300);
  }

  btnShare.appendChild(share_link);
  btnShare.appendChild(iconLink);
}
