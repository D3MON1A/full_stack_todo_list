import "../style/index.scss";

window.onload = function addTodo() {
  document.querySelector("title");
  fetch(
    "https://3000-bf176f1a-e3cf-4325-9fcd-80b1decd8738.ws-us02.gitpod.io/api/todos"
  )
    .then(response => {
      if (response.status == 200) return response.json();
    })
    .then(response => {
      // successfully completed, you should call the addTodo function here.
      this.console.log(response);
    })
    .catch(error => console.log("Error fetching todos:", error));
};
