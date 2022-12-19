const addBtn = document.querySelector("#addBtn") 
const main = document.querySelector("#main")
addBtn.addEventListener(
    "click",
    function() {
        addNote()
    }
)

const saveNote = () => {
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    // console.log(data)
    if(data.length === 0){
        localStorage.removeItem("notes")
    } else {
        localStorage.setItem("notes", JSON.stringify(data))
    }
}



//<div class="note">
// <div class="tool">
// <i class="fas fa-trash"></i>
// <i class="fas fa-save"></i>
// </div>
// <textarea></textarea>
// </div>

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
    <i class="trash fas fa-trash"></i>
    <i class="save fas fa-save"></i>
    </div>
    <textarea>${text}</textarea> 
    `;

    note.querySelector(".trash").addEventListener(
        "click",
        function() {
            note.remove()
            saveNotes()
        }
    )

        note.querySelector(".save").addEventListener(
            "click",
            function() {
                saveNotes()
            }
        )

        note.querySelector("textarea").addEventListener(
            "focusout",
            function() {
                saveNote()
            }
        )
    main.appendChild(note);
    saveNotes()
}

(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNote()
        } else {
            lsNotes.forEach(
                (lsNotes) => {
                    addNote(lsNotes)
                }
            )
        }
    }
)()