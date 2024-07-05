const header = document.querySelector('header')
const footer = document.querySelector('footer')
const slogan = document.querySelector('.slogan-wraper')
const new_diry_btn = document.getElementById('new-diary');
const create_form = document.querySelector('.create-section')
const overlay = document.querySelector('.overlay')
const discard_btn = document.querySelector('#discard')
const save_btn = document.querySelector('#save')
const add_btn = document.querySelector('#add')
const done_btn = document.querySelector('#done')
const textarea = document.querySelector('#text-area')
const title_info = document.querySelector('#title-info')
const select_mood = document.querySelector('#select-mood')
const theme = document.querySelector('.drop-down')
const DATE = new Date();

// set the date when the user forget to choose the date
let day = DATE.getDay().toString().padStart(2,'0')
let month = (DATE.getMonth()+1).toString().padStart(2,'0')
let year = DATE.getFullYear().toString()
let theme_color_changed = ''

// Function to change theme color when the user choose the theme
function themeColor(color) {
    header.classList.remove(header.classList[0])
   footer.classList.remove(footer.classList[0])
    slogan.classList.remove(slogan.classList[1])
   footer.classList.add(color.toLowerCase())
   slogan.classList.add(color.toLowerCase()+'-secondary')
   header.classList.add(color.toLowerCase())
};

theme.addEventListener('click', function (e) {
    theme_color_changed = e.target.textContent.trim().toLowerCase()
    themeColor(theme_color_changed)
    console.log(e.target.textContent.trim())
    
})

// Object with the mood and the color when the user select the mood
const color_list = {
    sea: 'sea',
    default: 'default',
    nature: 'nature',
    default:'✍️',
    reflective: '💡',
    happy: '😊',
    anxious: '😬',
    sad: '😔',
    angry: '😠',
    grateful: '🤗'
}

const diary_list_wraper = document.querySelector('.diary-list-wraper')
const title = document.querySelector('#title')
const date = document.querySelector('#date')
const mood = document.querySelector('#select-mood')
const diary_list = document.querySelectorAll('.diary-list')
let textarea_input = '';
let date_area = '';
let title_area = '';


// function to show popUp
function popUp(form) {
    form.classList.remove('hidden');
    overlay.classList.remove('hidden');

}
// function to remove popUp
function removePopUp(form) {
    form.classList.add('hidden');
    overlay.classList.add('hidden');

}

// Functio to add new diary list 
new_diry_btn.addEventListener('click', function (e) {
    removePopUp(save_btn)
    popUp(add_btn)
    popUp(create_form)
    date_area = date.value
    title_area = title.value
    textarea.addEventListener("input", function (e) {
        textarea_input = e.target.value
        textarea.value = textarea_input
    })

})

// Function to discard the diary
discard_btn.addEventListener('click', function () {
    removePopUp(create_form)
})

// Function to read edit and delete on each diary list 
diary_list_wraper.addEventListener('click', function (e) {
    const clicked_diary = e.target.closest('.diary-list').lastElementChild;
    if (e.target.tagName !== 'IMG') {
        popUp(clicked_diary);
        console.log(title_info.textContent)
    }
    else if (e.target.dataset.icon == 'edit') {
        let title_info = clicked_diary.querySelector('#title-info').textContent
        let date_info = clicked_diary.querySelector('#date-info').textContent
        let diary_info = clicked_diary.querySelector('#diary-info').textContent
        let mood_info = clicked_diary.querySelector('#mood-info').textContent
        let emoji_info = clicked_diary.querySelector('.emoji-info')
        let emoji = ''
        emoji = select_mood.value
        title.value = title_info
        date.value = date_info
        textarea.value = diary_info
        popUp(create_form)
        removePopUp(add_btn)
        popUp(save_btn)

        save_btn.addEventListener('click', function () {
            const diary_box = e.target.closest('.diary-box')
            const diary_list =  e.target.closest('.diary-list')
            diary_box.querySelector('.date').textContent = date.value == '' ? year + '-' + month + '-' + day +' edited': date.value + ' edited'
            diary_list.querySelector('.mood').classList.replace(diary_list.querySelector('.mood').classList[1], select_mood.value)
            diary_list.querySelector('.emoji').textContent = color_list[select_mood.value]
            diary_box.classList.replace(diary_box.classList[1], select_mood.value)
            diary_box.querySelector('.title').textContent = title.value

            // Save to readform of diary list
            clicked_diary.querySelector('#title-info').textContent = title.value
            clicked_diary.querySelector('#date-info').textContent = date.value == '' ? year + '-' + month + '-' + day +' edited': date.value + ' edited'
            clicked_diary.querySelector('#diary-info').textContent = textarea.value
            clicked_diary.querySelector('#mood-info').textContent = select_mood.value
            emoji = select_mood.value
            removePopUp(create_form)
        //   save the edited connent to localStorage
            localStorage.setItem('diary-list',diary_list_wraper.innerHTML)
         
        })
    } else if (e.target.dataset.icon == 'delete') {
        const removed_child = e.target.closest('.diary-list')
        diary_list_wraper.removeChild(removed_child)
        localStorage.setItem('diary-list',diary_list_wraper.innerHTML)
    }
    if (e.target.value == 'Done') {
        removePopUp(clicked_diary)
    }
})

// Function to display the saved data from localStorage
function displayFromStorage() {
    diary_list_wraper.innerHTML = localStorage.getItem('diary-list')
}

displayFromStorage()

// Function to add diary_list into local storage
add_btn.addEventListener('click', function () {
    removePopUp(create_form)
    diary_list_wraper.innerHTML =   diary_list_wraper.innerHTML + `
      <div class="diary-list">
                        <div class="diary-box ${select_mood.value}">
                            <div class="date">${date.value == ''?year + '-' + month + '-' + day: date.value}</div>
                            <div class="title-section">
                                <div class="title">
                                    ${title.value}
                                </div>
                                <div class="list-icon">
                                    <ul>
                                        <li class="edit-icon">
                                            <img src="./static/icon/edit-icon.svg" alt="" data-icon="edit">
                                        </li>
                                        <li class="delete-icon">
                                            <img src="./static/icon/delete-icon.svg" alt="" data-icon="delete">
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="mood ${select_mood.value}">
                            <span class="emoji">${color_list[select_mood.value]}</span>
                        </div>
                         <section class="read-form hidden" >
                            <div id='read-form' class="diary-info">
                                <p id="date-info" class="date">${date.value == ''?year + '/' + month + '/' + day: date.value}</p>
                                <p>Title: <span id="title-info"> ${title.value}</span></p>
                                <p>Your Mood: <span id="mood-info">${select_mood.value.charAt(0).toUpperCase() + select_mood.value.slice(1)}</span></p>
                                <p>Your Diary:</p>
                                <textarea name="" id="diary-info" readonly>${textarea_input}
                                </textarea><br>
                                <div class="btn">
                                <input id="done" type="button" value="Done">
                                </div>
                            </div>
                        </section> 
                    </div>
    `
    localStorage.setItem('diary-list', diary_list_wraper.innerHTML)

})
