const slots = ['first', 'second', 'third'];

const users = [
  { id: 1, name: 'moe', slot: 'first' },
  { id: 2, name: 'larry', slot: 'second' },
  { id: 3, name: 'curly', slot: 'third' },
  { id: 4, name: 'lucy', slot: 'third', selected: true },
];

//names creates spans for each name in the corresponding innerHTML
const names = (users, slot) => {
  const selected = (user) => {
    if (user.selected === true) {
      return ` class='selected'`;
    } else {
      return '';
    }
  };

  return users.reduce((html, user) => {
    if (user.slot === slot) {
      return `${html} <span id='${user.id}' ${selected(user)}>${
        user.name
      }</span>`;
    }
    return html;
  }, '');
};

//distributeNames puts the names in the users array into the correct boxes
const distributeNames = () => {
  const lists = document.querySelector('#lists');
  const listArr = [...lists.querySelectorAll('div')];

  listArr.forEach((div) => {
    div.innerHTML = `
      <span class='left'><</span>
      <span class='right'>></span>
      <h2>${div.id.toUpperCase()}</h2>
      ${names(users, div.id)}
    `;
  });

  const nameButtons = [
    ...document.querySelectorAll(`[id='1'], [id='2'], [id='3'], [id='4']`),
  ];

  nameButtons.forEach((button) =>
    button.addEventListener('click', (ev) => {
      const target = ev.target;
      target.className === 'selected'
        ? target.classList.remove('selected')
        : target.classList.add('selected');
      users.forEach((user) => {
        if (user.id === +target.id) {
          target.classList.value === 'selected'
            ? (user.selected = true)
            : (user.selected = false);
        }
      });
    })
  );

  //this is a sloppier first attempt at the nameButtons eventListeners
  //   nameButtons.forEach((button) =>
  //   button.addEventListener('click', (ev) => {
  //     const target = ev.target;
  //     if (target.className === 'selected') {
  //       target.classList.remove('selected');
  //       users.forEach((user) => {
  //         if (user.id === +target.id) {
  //           user.selected = false;
  //         }
  //       });
  //     } else {
  //       target.classList.add('selected');
  //       users.forEach((user) => {
  //         if (user.id === +target.id) {
  //           user.selected = true;
  //         }
  //       });
  //     }
  //   })
  // );
};

//initializeButtons restarts the logic to run the buttons
const initializeButtons = () => {
  const moveButtons = [...document.querySelectorAll(`.right, .left`)];

  moveButtons.forEach((button) =>
    button.addEventListener('click', (ev) => {
      const currentSlot = ev.target.parentElement.id;
      users.forEach((user) => {
        if (user.slot === currentSlot && user.selected === true) {
          if (ev.target.className === 'right') {
            currentSlot === 'first'
              ? (user.slot = 'second')
              : (user.slot = 'third');
          } else {
            currentSlot === 'third'
              ? (user.slot = 'second')
              : (user.slot = 'first');
          }
        }
      });
      distributeNames();
      initializeButtons();
    })
  );
};

//this runs the functions for the first time
distributeNames();
initializeButtons();

// this is my original initializeButtons with seperate buttons for left and right
/*
const initializeButtons = () => {
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
      distributeNames();
      initializeButtons();
    })
  );

  const leftButtons = [
    ...document.querySelectorAll(`
    #second span:nth-child(1),
    #third span:nth-child(1)`),
  ];

  leftButtons.forEach((button) =>
    button.addEventListener('click', (ev) => {
      const currentSlot = ev.target.parentElement.id;
      users.forEach((user) => {
        if (user.slot === currentSlot && user.selected === true) {
          currentSlot === 'third'
            ? (user.slot = 'second')
            : (user.slot = 'first');
        }
      });
      distributeNames();
      initializeButtons();
    })
  );
};
*/
