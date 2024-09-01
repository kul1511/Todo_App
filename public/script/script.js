const newTask = document.querySelector('#task')
const addTask = document.querySelector('#addtask')
const taskList = document.querySelector('.taskList')

function updateButtonVisibility() {
    const taskItems = document.querySelectorAll('.taskList p');
    if (taskItems.length > 0) {
        // Hide the upBtn of the first task
        taskItems[0].querySelector('.upBtn').style.visibility = 'hidden';
        // Hide the downBtn of the last task
        taskItems[taskItems.length - 1].querySelector('.downBtn').style.visibility = 'hidden';
    }
}



function addtoDom(todos){
    taskList.innerText = ""
    todos.forEach(element => {
        //1.Creating the element 'p'
        let p = document.createElement('p')
        p.style.borderRadius='25px'
        // p.innerText = element.name; // updating the data of p
        p.innerHTML=`
        <span class="taskName">${element.name}</span>
        <span class="buttons">
            <img atrid=${element.id} class="upBtn" src="/styles/upButton.png">
            <img atrid=${element.id} class="downBtn" src="/styles/downButton.png">
            <img atrid=${element.id} class="deleteBtn" src="/styles/delete.png">
        </span>
        `
        taskList.appendChild(p);
    });
    updateButtonVisibility();
}

axios.get('/gettodos')
    .then((res)=>{
        let todos = res.data;
        addtoDom(todos);
    })
    .catch((err)=>{
        console.log(err)
    })
    
addTask.addEventListener('click',(ev)=>{
    ev.preventDefault();
    axios.post('/addtodos',{
        name:newTask.value
    })
    .then((res)=>{
        let todos = res.data
        newTask.value = ''
        console.log(todos)
        if(res.data!=null){
            addtoDom(todos)
        }
    })
    .catch((err)=>{
        console.log(err)
    })
})

function deleteTask(atrid){
    axios.post('/deletetodos',{id:atrid})
        .then((res)=>{
            let todos = res.data;
            addtoDom(todos)
        })
        .catch(err=>{
            alert(err)
        })
}

function moveUpTask(atrid){
    axios.get(`/increasePriority?id=${atrid}`)
        .then((res)=>{
            let todos = res.data;
            addtoDom(todos);
        })
        .catch(err=>{
            alert(err)
        })
}   

function moveDownTask(atrid){
    axios.get(`/decreasePriority?id=${atrid}`)
        .then((res)=>{
            let todos = res.data;
            addtoDom(todos);
        })
        .catch(err=>{
            alert(err)
        })
}   

taskList.addEventListener('click',(ev)=>{
    console.log(ev)
    console.log(ev.target)
    let atrid = ev.target.getAttribute('atrid')
    let buttonClass = ev.target.className
    console.log(atrid)
    console.log(buttonClass)

    if(buttonClass==='deleteBtn'){
        deleteTask(atrid);
    }
    
    else if(buttonClass === 'upBtn'){
        moveUpTask(atrid);
    }

    else if(buttonClass === 'downBtn'){
        moveDownTask(atrid);
    }
})

axios.get('/gettodos')
    .then((todos)=>{
        console.log(todos)
    })
    .catch((err)=>{
        console.log(err)
    })
