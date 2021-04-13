const openPopupButton = document.querySelector('.data-user-target')
const closePopupButton = document.querySelector('.data-user-close-button')
const popup = document.querySelector('.popup')
const overlay = document.getElementById('overlay')
const cancelButton = document.querySelector('#declineButton')

openPopupButton.addEventListener('click', () => {
        const popup = document.querySelector('.popup')
        openPopup(popup)
    })

closePopupButton.addEventListener('click', () => {
        const popup = document.querySelector('.popup')
        closePopup(popup)
})

cancelButton.addEventListener('click', () => {
    const popup = document.querySelector('.popup')
    closePopup(popup)
})

function openPopup(popup) {
    if (popup == null) return
    popup.classList.add('active')
    overlay.classList.add('active')
}

function closePopup(popup) {
    if (popup == null) return
    popup.classList.remove('active')
    overlay.classList.remove('active')

    setTimeout(() => {
        const checkboxes = document.getElementsByClassName('single-usr-check');
        for (let i=0; i < checkboxes.length; i++)  {
        if (checkboxes[i].type == 'checkbox')   {
            checkboxes[i].checked = false;
            }
        }
        document.getElementById('usr-search-box').value = ''
    }, 250);
}
