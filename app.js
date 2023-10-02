// Tüm elementleri seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = "";

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click", allTodosEveryWhere);
    filterInput.addEventListener("keyup", filter);
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style", "display : block");
            }else{
                todo.setAttribute("style","display : none !important");
            }
        });
    }else{
        showAlert("warning", "Arama yapmak için bir değer bulunamadı.")
    }
}

function allTodosEveryWhere(e){
    const todoListesi = document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
        // Ekrandan silme
        todoListesi.forEach(function(todo){
            todo.remove();
        });
        // Storage' dan silme
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success", "Başarılı bir şekilde tüm todolar silinmiştir.");
    }else{
        showAlert("warning","Silmek için en az bir todo olması gerekmektedir.");
    }
}

function removeTodoToUI(e){
    if(e.target.className ==="fa fa-remove"){
        // Ekrandan silme
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        // Storage' dan silme
        removeTodoToStorage(todo.textContent);
        showAlert("success", "Todo başarı ile silindi.");
    }
}

function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning","Lütfen bir değer giriniz.");
    } else {
        // Arayüze ekleme
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success","Todo başarılı bir şekilde eklenmiştir.");
        // Storage ekleme
    }
    e.preventDefault();
}

function addTodoToUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message){
    const div = document.createElement("div");
    div.className = "alert alert-" + type;
    div.textContent = message;
    firstCardBody.appendChild(div);
    setTimeout(function(){
        div.remove();
    }, 2500);
}