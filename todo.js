const tasksList = [];
let isEditable = false;
let activeIndex = -1;

const userInput = document.getElementById("user-input");
// adding an evenet listner funtion 
const keyPressListener = (event) => {
    // adding event key "Enter" to add functionality using Enter key
    if (event.key === "Enter") {
        const { value } = document.getElementById("user-input");
        // console.log("Value of in put is " , value);
        if (!isEditable) {
            addTask(value);
          } else {
            updateText(value);
          }
    }
};

// adding an evenet listner to get value push from input 
document.addEventListener("keypress", keyPressListener)
const addTask = (taskText) => {
    const obj = {
        title:taskText,
        isCompleted:false,
        createdAt:new Date().toLocaleDateString()
    }
    tasksList.push(obj);
    //destructing
    const lastIndex = tasksList.length - 1;  
    console.log(lastIndex);

    // Create a new list item (li)
    const taskItem = document.createElement("li");
    // taskItem.classList.add("task-item")
    taskItem.className = "task-item";
    taskItem.id = `item_${lastIndex}`;

    //HTML inner Text set
    taskItem.innerHTML = `<div class="checkbox" onclick="markAsComplete(${lastIndex})"></div>
<span>${obj.title}</span>
<button id="edit_${lastIndex}" onclick="updateTask(${lastIndex})">Edit</button>
<button onclick="deleteTask(${lastIndex})">Delete</button>`

    // access list of ("ul")

    const list = document.querySelector(".tasks-list");
    list.appendChild(taskItem);
    //reset the input field after adding.

    resetInputField();
};

// prepare the code for editing the task
const updateTask = (index) => {
    userInput.value = tasksList[index].title;
    isEditable = true;
    activeIndex = index;
};


//value modification in term of UI
const updateText = (taskText) =>{
    tasksList[activeIndex] = taskText;

    const activeSpan = document.querySelector(`#item_${activeIndex} span`)

    activeSpan.innerText = taskText;

    isEditable = false;

    resetInputField();

    console.log(tasksList);
}
//reset Function for reset the input field
const resetInputField = () => {
    userInput.value = "";
}

//Mark As Compelete Functionality
const markAsComplete = (index) => {
    const currentTask = tasksList[index];
    currentTask.isCompleted = !currentTask.isCompleted;

    // get desired list item

    const activeCheckbox = document.querySelector(`#item_${index} .checkbox`);
    activeCheckbox.classList.toggle("checkbox-filled");

    const currentTaskItem = document.querySelector(`#item_${index}`)
    currentTaskItem.classList.toggle("completed")
}

const deleteTask = (index) => {
    tasksList.splice(index, 1);
    const currentTaskItem = document.querySelector(`#item_${index}`)
    currentTaskItem.remove();

}