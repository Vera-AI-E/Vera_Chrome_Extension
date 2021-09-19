myFunction = function () {

    let responseArray = [];
    const btn = document.getElementById("button");
    btn.classList.add("button--loading");

    let twitterState = ["healthy", "careful", "read the newspaper"];
    let buttonColours = ["green", "orange", "red"];
    const ws = new WebSocket('ws://localhost:8080');
    const trackWord = "covid";
    const r = document.querySelector(':root');


    ws.onopen = function (eve)  {
        console.log("Connected");
        ws.send(trackWord.toString());
    };

    console.log("data sent");

    ws.onmessage = (evt) => {

        const data = evt.data.toString();
        responseArray.push(data);

        if (responseArray.length === 10){

            btn.classList.remove("button--loading");
            const displayText = document.getElementById("div1");

            displayText.innerText = twitterState[parseInt(responseArray[responseArray.length - 1])];
            r.style.setProperty("--first-color", buttonColours[parseInt(data) - 1]);
        }
    };
}

// document.getElementById("search-btn").addEventListener("click", myFunction);

const wrapper = document.querySelector(".wrapper") ,
    form = document.querySelectorAll(".form"),
    submitInput = form[0].querySelector("input[type='submit']");

function getDataForm(e) {
    e.preventDefault();

    const formData = new FormData(form[0]);
    alert ( formData.get('keyWord') );
}

document.addEventListener("DOMContentLoaded", function (){
    submitInput.addEventListener("click", getDataForm, false);
}, false);

