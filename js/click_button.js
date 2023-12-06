const urlGET = 'https://rest-full-for-edu.onrender.com/api/read/';
const urlSET = 'https://rest-full-for-edu.onrender.com/api/update/';


const myModal = document.querySelector('.modal');
var dataServer;

fetch(urlGET)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    for (var classButton of document.querySelectorAll('.data')) {
      classButton.querySelector('.data_name').textContent = data[classButton.id / 11 - 1].info.name;
      classButton.querySelector('.data_login').textContent = data[classButton.id / 11 - 1].info.login;
      classButton.querySelector('.data_password').textContent = data[classButton.id / 11 - 1].info.password;
      classButton.querySelector('.data_date').textContent = data[classButton.id / 11 - 1].date;
    }
  });

var ID;
for (var classButton of document.querySelectorAll('.data')) {
  const btn = classButton.querySelector('.data_change')

  // classButton.querySelector('.data_name').textContent = 
  btn.addEventListener('click', () => {
    ID = btn.id;
    fetch(urlGET + ID)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log(data);
        document.querySelector('#inputName').value = data.info.name;
        document.querySelector('#inputLog').value = data.info.login;
        document.querySelector('#inputPas').value = data.info.password;
      });
    myModal.classList.remove('hide');
    if (myModal.classList.contains('hide-first')) myModal.classList.remove("hide-first");
  })
}

document.querySelector('#save').addEventListener('click', () => {
  const info = {
    name: document.querySelector('#inputName').value,
    login: document.querySelector('#inputLog').value,
    password: document.querySelector('#inputPas').value
  };
  const data = { info };

  fetch(urlSET + ID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((res) => res.json())
    .then((res) => {
      console.log(data);
    });
  myModal.classList.add('hide');

  fetch(urlGET)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      for (var classButton of document.querySelectorAll('.data')) {
        classButton.querySelector('.data_name').textContent = data[classButton.id / 11 - 1].info.name;
        classButton.querySelector('.data_login').textContent = data[classButton.id / 11 - 1].info.login;
        classButton.querySelector('.data_password').textContent = data[classButton.id / 11 - 1].info.password;
        classButton.querySelector('.data_date').textContent = data[classButton.id / 11 - 1].date;
      }
    });
});

document.querySelector('#exit').addEventListener('click', () => {
  myModal.classList.add('hide');
});



let isResizing = false;
let touchStartTime;

myModal.addEventListener('touchstart', (event) => {
  touchStartTime = new Date().getTime();
  event.preventDefault();
});

myModal.addEventListener('touchend', (event) => {
  const touchEndTime = new Date().getTime();
  if (touchEndTime - touchStartTime > 100 && isResizing) {
    myModal.classList.add('hide');
  }
  isResizing = false;
  event.preventDefault();
});

myModal.addEventListener('touchmove', (event) => {
  if (event.touches[0].clientY > myModal.offsetTop) {
    isResizing = true;
  }
  event.preventDefault();
});