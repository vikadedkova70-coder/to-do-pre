let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];
const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const saves = localStorage.getItem("toDoTasks");
  if (saves) {
    return JSON.parse(saves);
  }
  return items;
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  textElement.textContent = item;
  deleteButton.addEventListener("click", function () {
    clone.remove();
    const items = getTasksFromDOM();
    saveTasks(items);
  });
  duplicateButton.addEventListener("click", function () {
    const name = textElement.textContent;
    const newItem = createItem(name);
    listElement.prepend(newItem);
    const items = getTasksFromDOM();
    saveTasks(items);
  });
  editButton.addEventListener("click", function () {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });
  textElement.addEventListener("blur", function () {
    textElement.setAttribute("contenteditable", "false");
    const items = getTasksFromDOM();
    saveTasks(items);
  });
  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach(function (element) {
    tasks.push(element.textContent);
  });
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("toDoTasks", JSON.stringify(tasks));
}

items = loadTasks();
items.forEach(function (item) {
  const newItem = createItem(item);
  listElement.append(newItem);
});

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskText = inputElement.value.trim();
  if (taskText) {
    const newItem = createItem(taskText);
    listElement.prepend(newItem);
    items = getTasksFromDOM();
    saveTasks(items);
    inputElement.value = "";
  }
});
