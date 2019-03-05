const dataAccess = (() => {
    const localkey = "myTodos";
    const localName = "myName";

    const getData = () => {
        return (
            JSON.parse(localStorage.getItem(localkey)) || {
                counter: 0,
                todos: []
            }
        );
    };


    const pushNewTodo = todoItem => {
        const data = getData();
        const todoList = data.todos;
        let todoCounter = data.counter;
        todoCounter += 1;
        todoItem.index = todoCounter;
        todoList.push(todoItem);
        localStorage.setItem(
            localkey,
            JSON.stringify({
                todos: todoList,
                counter: todoCounter
            })
        );
        return todoCounter;
    };


    const updateTodo = todoItem => {
        const data = getData();
        const todoList = data.todos;
        todoList[todoItem.index - 1] = todoItem;
        localStorage.setItem(localkey, JSON.stringify(data));
    };


    const setName = (name) => {
        localStorage.setItem(localName, name);
    };


    const getName = () => {
        let userName = localStorage.getItem(localName);

        if (userName === null) {
            userName = "User";
        }
        return userName;
    };


    const getItemById = id => {
        const data = getData();
        const todoList = data.todos;
        return todoList[id - 1];
    };


    const getCurrentId = () => {
        return getData().counter;
    };


    const getTodoAmount = () => {
        return getData().todos.length;
    };


    return {
        getData,
        pushNewTodo,
        getCurrentId,
        getTodoAmount,
        updateTodo,
        setName,
        getName,
        getItemById
    };

})();