const title = document.getElementById("title");
const newTodo = document.getElementById("new-todo");
const addbtn = document.getElementById("add");

title.addEventListener("focusout", function() {
    let titleName = localStorage.getItem("titleName") || "";
    titleName = title.value;
    localStorage.setItem("titleName", titleName);
});

addbtn.addEventListener("click", function() {
    if (newTodo.value) {
        let newItem = document.createElement("div");
        newItem.classList.add("todo-items");
        newItem.innerHTML = `<input type="checkbox" class="checkboxes"> <p>${newTodo.value}</p> <button class="del"><i class="fa-solid fa-trash"></i></button>`;
        document.getElementById("todos").appendChild(newItem);

        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.push(newTodo.value);
        localStorage.setItem("todos", JSON.stringify(todos));

        newTodo.value = "";
        newTodo.focus();
    }
});

window.onload = function() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    for (let i = 0; i < todos.length; i++) {
        let newItem = document.createElement("div");
        newItem.classList.add("todo-items");
        newItem.innerHTML = `<input type="checkbox" class="checkboxes"> <p>${todos[i]}</p> <button class="del"><i class="fa-solid fa-trash"></i></button>`;
        document.getElementById("todos").appendChild(newItem);
    }

    let titleName = localStorage.getItem("titleName") || "";
    title.value = titleName;
    console.log(titleName);
};

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("checkboxes")) {
        if (event.target.parentElement.classList.contains("checked")){
            event.target.parentElement.classList.remove("checked");
        }
        else {
            event.target.parentElement.classList.add("checked");
        }
    }
    else if (event.target.classList.contains("del")) {
        let todo = event.target.parentElement.textContent.slice(0, -1).trim();
        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        let index = todos.indexOf(todo);
        if (index > -1) {
            todos.splice(index, 1);
        }
        event.target.parentElement.remove();
        localStorage.setItem("todos", JSON.stringify(todos));
    }
});
