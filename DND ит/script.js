const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const search = document.getElementById("search");

const counter = document.getElementById("counter");
const message = document.getElementById("message");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function updateCounter() {
    counter.textContent =
        `Всего задач: ${tasks.length}`;
}

function showMessage(text) {
    message.textContent = text;
}

function renderTasks() {

    document
        .querySelectorAll(".task-list")
        .forEach(list => list.innerHTML = "");

    const searchValue =
        search.value.toLowerCase();

    tasks.forEach(task => {

        if (
            !task.text
            .toLowerCase()
            .includes(searchValue)
        ) return;

        const card =
            document.createElement("div");

        card.className = "task";
        card.draggable = true;
        card.dataset.id = task.id;

        card.innerHTML = `
            <p>${task.text}</p>

            <div class="task-buttons">
                <button class="edit">
                    Изменить
                </button>

                <button class="delete">
                    Удалить
                </button>
            </div>
        `;

        card.addEventListener(
            "dragstart",
            dragStart
        );

        card.addEventListener(
            "dragend",
            dragEnd
        );

        card
            .querySelector(".delete")
            .addEventListener("click", () => {

                tasks = tasks.filter(
                    t => t.id !== task.id
                );

                saveTasks();
                renderTasks();
                showMessage("Задача удалена");
            });

        card
            .querySelector(".edit")
            .addEventListener("click", () => {

                const text = prompt(
                    "Изменить задачу",
                    task.text
                );

                if(text){

                    task.text = text;

                    saveTasks();
                    renderTasks();

                    showMessage(
                        "Задача обновлена"
                    );
                }
            });

        document
            .querySelector(
                `[data-status="${task.status}"] .task-list`
            )
            .appendChild(card);
    });

    updateCounter();
}

form.addEventListener(
    "submit",
    e => {

        e.preventDefault();

        tasks.push({
            id: Date.now(),
            text: input.value,
            status: "planned"
        });

        input.value = "";

        saveTasks();
        renderTasks();

        showMessage(
            "Задача добавлена"
        );
    }
);

search.addEventListener(
    "input",
    renderTasks
);

let draggedId = null;

function dragStart() {

    draggedId = this.dataset.id;

    this.classList.add("dragging");

    showMessage(
        "Перемещение задачи..."
    );
}

function dragEnd() {

    this.classList.remove(
        "dragging"
    );
}

document
.querySelectorAll(".column")
.forEach(column => {

    column.addEventListener(
        "dragover",
        e => {

            e.preventDefault();

            column.classList.add(
                "drag-over"
            );
        });

    column.addEventListener(
        "dragleave",
        () => {

            column.classList.remove(
                "drag-over"
            );
        });

    column.addEventListener(
        "drop",
        () => {

            column.classList.remove(
                "drag-over"
            );

            const task =
                tasks.find(
                    t =>
                    t.id ==
                    draggedId
                );

            task.status =
                column.dataset.status;

            saveTasks();
            renderTasks();

            showMessage(
                "Статус изменён"
            );
        });
});

renderTasks();