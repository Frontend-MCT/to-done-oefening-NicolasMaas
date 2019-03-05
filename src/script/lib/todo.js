class Todo {
  constructor(title, category, index, status = false)


  //! VOOR JSON PARSING ?
  // {
  //   Object.assign(this, {
  //     title,
  //     category,
  //     status
  //   });
  // }

  {
    this.title = title;
    this.category = category;
    this.index = index;
    this.status = status;
  }

  getDOMObject(id) {
    const todoRow = document.createElement('section');
    todoRow.classList.add('c-row');

    const todoCheckbox = document.createElement('input');
    todoCheckbox.classList.add('c-input-option', 'c-custom-input-option-hidden', 'o-hide-accessible');
    todoCheckbox.checked = this.status;
    todoCheckbox.id = id;
    todoCheckbox.type = "checkbox";

    const todoLabel = document.createElement('label');
    todoLabel.setAttribute('for', id);
    todoLabel.classList.add('c-label', 'c-label--option', 'c-custom-input-option-label');
    todoLabel.innerHTML += `<span class="c-custom-input-option c-custom-input-option--checkbox"><svg class="c-custom-input-option__symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6.75"><path d="M4.75,9.5a1,1,0,0,1-.707-.293l-2.25-2.25A1,1,0,1,1,3.207,5.543L4.75,7.086,8.793,3.043a1,1,0,0,1,1.414,1.414l-4.75,4.75A1,1,0,0,1,4.75,9.5" transform="translate(-1.5 -2.75)" /></svg></span>`;

    const labelBottom = document.createElement('label');
    labelBottom.classList.add('c-row__text');
    labelBottom.setAttribute('for', id);
    labelBottom.innerHTML += `<p class="c-row__head">${this.title}</p><p class="c-row__sub">${this.category}</p>`;


    todoRow.appendChild(todoCheckbox);
    todoRow.appendChild(todoLabel);
    todoRow.appendChild(labelBottom);
    return todoRow;
  }
}

class TodoHead {
  constructor(titleRef, categoryRef, containerRef, countRef, addRef, userNameRef) {
    this.titleRef = titleRef;
    this.categoryRef = categoryRef;
    this.containerRef = containerRef;
    this.countRef = countRef;
    this.addRef = addRef;
    this.userNameRef = userNameRef;
  }
}