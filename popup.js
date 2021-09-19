myFunction = function () {
    console.log("here")
    const btn = document.getElementById("button");
    btn.classList.add("button--loading")

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
        if (data.length === 1){
            btn.classList.remove("button--loading");
        }

        const displayText = document.getElementById("div1");
        displayText.innerText = twitterState[parseInt(data) - 1];
        r.style.setProperty("--first-color", buttonColours[parseInt(data) - 1]);

        console.log(data);



    };

}


document.getElementById("button").addEventListener("click", myFunction);