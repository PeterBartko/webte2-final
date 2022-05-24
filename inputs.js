// textarea
const answ = document.querySelector('#answer')
document.querySelector("#input-calculate button").onclick = () => {
    const ta = document.querySelector('textarea').value
    fetch(`api_ta.php?apikey=1234567890&ta=${encodeURIComponent(ta)}`)
        .then(res => res.json())
        .then(data => {
            answ.innerText = data.answer
            answ.style.color = 'black'
            if (data.error.isOK === 'false') {
                answ.style.color = 'crimson'
                answ.innerText = data.error.error_msg
            }
        })
}


// r input
const r_input = document.querySelector('#r-input')



