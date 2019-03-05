// Self-invoking function = start van onze app
(() => {

    document.addEventListener('DOMContentLoaded', () => {
        const todoHead = new TodoHead('.js-new-title',
            '.js-new-category',
            '.js-todo-container',
            '.js-todo-count',
            '.js-todo-add',
            '.js-username');

        todoModule.setupTodoApp(todoHead);

    });

})();