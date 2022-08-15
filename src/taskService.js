class storeTask {
  static getTasks() {
    let tasks;
    if (localStorage.getItem('task') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('task'));
    }
    return tasks;
  }

  static reArrange(tasks) {
    tasks.forEach((task, i) => {
      task.index = i + 1;
    });
    return tasks;
  }

  static saveTask(task) {
    const tasks = storeTask.getTasks();
    if (tasks.length === 0) {
      task.index = 1;
    } else {
      const lastTask = tasks[tasks.length - 1];
      task.index = lastTask.index + 1;
    }
    tasks.push(task);
    localStorage.setItem('task', JSON.stringify(tasks));
  }

  static removeTask(index) {
    let tasks = storeTask.getTasks();
    tasks.forEach((task, i) => {
      if (task.index === parseInt(index, 10)) {
        tasks.splice(i, 1);
      }
    });
    tasks = storeTask.reArrange(tasks);
    localStorage.setItem('task', JSON.stringify(tasks));
  }

  static removeCompeletedTask() {
    let tasks = storeTask.getTasks();
    tasks = tasks.filter((x) => x.isCompeleted === false);
    tasks = storeTask.reArrange(tasks);
    localStorage.setItem('task', JSON.stringify(tasks));
  }

  static updateStatus(index, status) {
    const tasks = storeTask.getTasks();
    tasks[index - 1].isCompeleted = status;
    localStorage.setItem('task', JSON.stringify(tasks));
  }

  static updateDescription(index, desc) {
    const tasks = storeTask.getTasks();
    tasks[index - 1].description = desc;
    localStorage.setItem('task', JSON.stringify(tasks));
  }
}

export default storeTask;
