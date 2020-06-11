import "../style/index.scss";

window.onload = () => {
  let button = document.querySelector(".add-new");
  button.addEventListener("click", postTodo);
  fetch(
    "https://3000-bf176f1a-e3cf-4325-9fcd-80b1decd8738.ws-us02.gitpod.io/api/todos"
  )
    .then(response => {
      if (response.status == 200) return response.json();
    })
    .then(response => {
      // successfully completed, you should call the addTodo function here.
      console.log(response);
      var myTodo = response;

      for (let task of myTodo) {
        addTodo(task);
      }
    })
    .catch(error => console.log("Error fetching todos:", error));
};
function addTodo(task) {
  let ul = document.querySelector("#myUl");
  let li = document.createElement("li");
  let newI = document.createElement("i");
  let newAnchor = document.createElement("a");
  li.classList.add("row");
  newI.classList.add("fas", "fa-trash");
  newAnchor.addEventListener("click", e => deleteTodo(e));
  newAnchor.classList.add("remove");
  newAnchor.setAttribute("href", "#");
  newAnchor.appendChild(newI);
  li.appendChild(newAnchor);
  li.append(task.todo);
  li.id = task.id;
  ul.appendChild(li);
}
async function postTodo() {
  let input = document.querySelector("#todo-text");
  let response = await fetch(
    "https://3000-bf176f1a-e3cf-4325-9fcd-80b1decd8738.ws-us02.gitpod.io/api/todos",
    {
      method: "POST",
      body: JSON.stringify({ todo: input.value }),
      headers: { "Content-Type": "application/json" }
    }
  );
  if (response.ok) {
    let newTask = await response.json();
    input.value = "";
    addTodo(newTask);
  } else {
    console.log(response.status);
    console.log(response.statusText);
  }
}
async function deleteTodo(event) {
  let deleteId = event.target.parentElement.parentElement.id;
  let response = await fetch(
    "https://3000-bf176f1a-e3cf-4325-9fcd-80b1decd8738.ws-us02.gitpod.io/api/todos/" +
      deleteId.toString(),
    {
      method: "DELETE"
    }
  );
  if (response.ok) {
    let children = document.querySelector("#myUl").children;
    for (let index = 0; index < children.length; index++) {
      if (children[index].id == deleteId) {
        document.querySelector("#myUl").removeChild(children[index]);
        break;
      }
    }
  } else {
    console.log(`${response.status} Delete not succesful`);
  }
}
