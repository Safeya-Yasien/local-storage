let inputKey = document.querySelector(".inputs .key"),
  inputValue = document.querySelector(".inputs .value"),
  controlsButtons = document.querySelectorAll(".controls span"),
  results = document.querySelector(".result-box .results"),
  noDataMsg = document.querySelector(".result-box .no-data-msg");

controlsButtons.forEach((button) => {
  button.addEventListener("click", (ele) => {
    if (ele.target.classList.contains("check-item")) {
      checkItem();
    }

    if (ele.target.classList.contains("add-item")) {
      addItems();
    }

    if (ele.target.classList.contains("delete-item")) {
      deleteItem();
    }

    if (ele.target.classList.contains("show-items")) {
      showItems();
    }
  });
});

function checkItem() {
  if (inputKey.value === "" || inputValue.value === "") {
    deleteNoDataMsg();
    checkEmptyField();
    return;
  }

  let keyExists = localStorage.getItem(inputKey.value);
  let valueExists =
    keyExists !== null ? localStorage.getItem(inputKey.value) : null;

  if (
    keyExists !== null &&
    keyExists !== undefined &&
    valueExists !== null &&
    valueExists !== undefined
  ) {
    results.innerHTML = `Found Local Storage Item Key [${inputKey.value}] and its value [${valueExists}]`;
  } else {
    deleteNoDataMsg();
    results.innerHTML = `No Local Storage Item with key [${inputKey.value}]`;
  }

  clearInputFields();
}

function addItems() {
  if (inputKey.value === "" || inputValue.value === "") {
    deleteNoDataMsg();
    checkEmptyField();
    return;
  }

  localStorage.setItem(inputKey.value, inputValue.value);

  displayMsg(`Local Storage Item ${inputKey.value}: ${inputValue.value} Added`);

  clearInputFields();
}

function deleteItem() {
  if (inputKey.value === "") {
    deleteNoDataMsg();
    createKeyMsg();
    return;
  }

  if (localStorage.getItem(inputKey.value)) {
    localStorage.removeItem(inputKey.value);

    results.innerHTML = `Local Storage Item with Key ${inputKey.value} Deleted`;
  } else {
    results.innerHTML = `No Local Storage Item with Key ${inputKey.value} found`;
  }

  clearInputFields();
}

function showItems() {
  if (localStorage.length) {
    deleteNoDataMsg();
    results.innerHTML = "";

    for (let [key, value] of Object.entries(localStorage)) {
      displayData(`${key}: ${value}`);
    }
  } else {
    results.innerHTML = `No Data To Show`;
  }

  clearInputFields();
}

function checkEmptyField() {
  if (inputKey.value === "" && inputValue.value === "") {
    deleteNoDataMsg();
    createKeyValueMsg();
  } else if (inputKey.value === "") {
    deleteNoDataMsg();
    createKeyMsg();
  } else if (inputValue.value === "") {
    deleteNoDataMsg();
    createValueMsg();
  }
}

function deleteNoDataMsg() {
  noDataMsg.remove();
}

function createKeyValueMsg() {
  displayMsg("Please Enter Key and Value");
}

function createKeyMsg() {
  displayMsg("Please Enter Key");
}

function createValueMsg() {
  displayMsg("Please Enter Value");
}

function displayMsg(message) {
  results.innerHTML = message;
}

function displayData(message) {
  deleteNoDataMsg();

  results.innerHTML += message + "<br>";
}

function clearInputFields() {
  inputKey.value = "";
  inputValue.value = "";
}
