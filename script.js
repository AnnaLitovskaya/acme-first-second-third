const slots = ['first', 'second', 'third'];

const users = [
  { id: 1, name: 'moe', slot: 'first' },
  { id: 2, name: 'larry', slot: 'second' },
  { id: 3, name: 'curly', slot: 'third' },
  { id: 4, name: 'lucy', slot: 'third', selected: true },
];

const names = (users, slot) => {
  return users.reduce((html, user) => {
    if (user.slot === slot) {
      return (
        html + `<span` + id(user) + selected(user) + `>${user.name}</span>`
      );
    }
    return html;
  }, '');
};

const selected = (user) => {
  if (user.selected === true) {
    return ` class='selected'`;
  } else {
    return '';
  }
};

const id = (user) => {
  return ` id='${user.id}'`;
};

const lists = document.querySelector('#lists');
const listArr = [...lists.querySelectorAll('div')];

listArr.forEach((div) => {
  div.innerHTML = `
  <span><</span>
  <span>></span>
  <h2>${div.id.toUpperCase()}</h2>
  <br>
  ${names(users, div.id)}
  `;
});

const nameButtons = [
  ...document.querySelectorAll(`
#first span:nth-child(n + 3),
#second span:nth-child(n + 3),
#third span:nth-child(n + 3)`),
];

nameButtons.forEach((button) =>
  button.addEventListener('click', (ev) => {
    const target = ev.target;
    if (target.className === 'selected') {
      target.classList.remove('selected');
      users.forEach((user) => {
        if (user.id === +target.id) {
          user.selected = false;
        }
      });
    } else {
      target.classList.add('selected');
      users.forEach((user) => {
        if (user.id === +target.id) {
          user.selected = true;
        }
      });
    }
  })
);

const rightButtons = [
  ...document.querySelectorAll(`
#first span:nth-child(2),
#second span:nth-child(2)`),
];

rightButtons.forEach((button) =>
  button.addEventListener('click', (ev) => {
    const currentSlot = ev.target.parentElement.id;
    users.forEach((user) => {
      if (user.slot === currentSlot && user.selected === true) {
        currentSlot === 'first'
          ? (user.slot = 'second')
          : (user.slot = 'third');
      }
    });
  })
);
