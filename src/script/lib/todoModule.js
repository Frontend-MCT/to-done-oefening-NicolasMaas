const todoModule = (() => {
  const todoHead = {
    listTitle: null,
    listCategory: null,
    listContainer: null,
    listTodoCounter: null,
    listAddBtn: null,
    userName: null
  };

  const currentTodo = new Todo(null, null, null);

  const setCounter = () => {
    todoHead.listTodoCounter.innerHTML = dataAccess.getTodoAmount();
  };

  const makeElement = () => {
    todoHead.listContainer.appendChild(
      currentTodo.getDOMObject(currentTodo.index)
    );
    setCounter();
  };

  const addTodoToList = () => {
    // "Aanmaken" Todo
    currentTodo.title = todoHead.listTitle.value;
    currentTodo.category = todoHead.listCategory.value;
    currentTodo.index = dataAccess.getCurrentId();
    currentTodo.status = console.log(currentTodo);
    dataAccess.pushNewTodo(currentTodo);
    makeElement();
    // ----------------
  };

  const handleNameChangeEvent = () => {
    document.querySelector('.js-username').addEventListener(
      'focusout',
      function() {
        dataAccess.setName(document.querySelector('.js-username').innerHTML);
      },
      false
    );
  };

  const handleAddEvent = () => {
    todoHead.listAddBtn.addEventListener('click', function(e) {
      console.log('Add 🔘 Clicked');
      addTodoToList();
    });
  };

  const handleCheckedEvent = () => {
    todoHead.listContainer.addEventListener('click', function(e) {
      if (e.target.id !== '') {
        const clickedTodoObject = dataAccess.getItemById(e.target.id);
        clickedTodoObject.status = !clickedTodoObject.status;
        dataAccess.updateTodo(clickedTodoObject);
      }
    });
  };

  const setupTodoApp = todoHeadObj => {
    todoHead.listTitle = document.querySelector(todoHeadObj.titleRef);
    todoHead.listCategory = document.querySelector(todoHeadObj.categoryRef);
    todoHead.listContainer = document.querySelector(todoHeadObj.containerRef);
    todoHead.listTodoCounter = document.querySelector(todoHeadObj.countRef);
    todoHead.listAddBtn = document.querySelector(todoHeadObj.addRef);
    todoHead.userName = document.querySelector(todoHeadObj.userNameRef);
    todoHead.userName.innerHTML = dataAccess.getName();
    const dataFromDatabase = dataAccess.getData();

    dataFromDatabase.todos.forEach(element => {
      // "Aanmaken" Todo
      currentTodo.title = element.title;
      currentTodo.category = element.category;
      currentTodo.index = element.index;
      currentTodo.status = element.status;
      makeElement();
      // ----------------
    });

    handleAddEvent();
    handleCheckedEvent();
    handleNameChangeEvent();
  };

  return {
    setupTodoApp,
    handleAddEvent
  };
})();
