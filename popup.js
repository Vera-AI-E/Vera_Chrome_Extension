myFunction = function () {

    let twitterState = ["healthy", "careful", "read the newspaper"]
    let buttonColours = ["#ea440d", "#39ea0d", "#cb1032"]
    const ws = new WebSocket('ws://localhost:8080');
    const trackWord = "covid"
    const r = document.querySelector(':root');


    ws.onopen = function (eve)  {
        console.log("Connected");
        ws.send(trackWord.toString())
    };

    console.log("data sent")

    ws.onmessage = (evt) => {

        const data = evt.data.toString();

        const image = document.getElementById("div1");
        image.innerText = twitterState[parseInt(data) - 1]
        r.style.setProperty("--second-color", buttonColours[parseInt(data) - 1])

        console.log(data)



    };

}
document.getElementById("button").addEventListener("click", myFunction)