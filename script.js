document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task');
    const taskDateInput = document.getElementById('task-date');
    const taskTimeInput = document.getElementById('task-time');
    const taskText = taskInput.value.trim();
    const taskDate = taskDateInput.value;
    const taskTime = taskTimeInput.value;

    if (taskText !== '' && taskDate !== '' && taskTime !== '') {
        const taskList = document.getElementById('task-list');
        const newTask = document.createElement('li');

        const taskDateTime = new Date(`${taskDate}T${taskTime}`);
        const formattedDateTime = taskDateTime.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        newTask.innerHTML = `
            <span>${taskText}</span>
            <span class="reminder">${formattedDateTime}</span>
            <span class="delete">X</span>
        `;

        taskList.appendChild(newTask);

        // Set reminder
        const currentTime = new Date().getTime();
        const reminderTime = taskDateTime.getTime() - currentTime;

        if (reminderTime > 0) {
            setTimeout(() => {
                alert(`Reminder: ${taskText} is due now!`);
                playAlarm();
            }, reminderTime);
        }

        taskInput.value = '';
        taskDateInput.value = '';
        taskTimeInput.value = '';
    }
});

document.getElementById('task-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        const taskItem = e.target.parentElement;
        taskItem.remove();
    }
});

function playAlarm() {
    const audio = new Audio('alarm.mp3'); // Ensure you have an alarm.mp3 file in your project directory
    audio.play();
}
