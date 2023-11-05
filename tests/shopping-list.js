let itemField = document.querySelector("#item");
let addItem = document.querySelector("button");
let list = document.querySelector("ul");

itemField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addItem.click();
  }
});

function onAddItem() {
  let itemName = itemField.value;
  if (itemName === "") {
    return;
  }
  itemField.value = "";
  let newItem = document.createElement("li");
  let newItemName = document.createElement("span");
  let newItemBtn = document.createElement("button");
  newItem.appendChild(newItemName);
  newItem.appendChild(newItemBtn);
  newItemName.textContent = itemName;
  newItemBtn.textContent = "Delete";
  newItemBtn.setAttribute("style", "font-size: 12px;");
  list.appendChild(newItem);
  newItemBtn.onclick = () => newItem.remove();
  focus(itemField);
}
