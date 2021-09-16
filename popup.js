myFunction = function () {

    let twitterState = ["healthy", "careful", "read the newspaper"]
    const ws = new WebSocket('ws://localhost:8080');
    const trackWord = "obama"

    // ws.addEventListener("open", (ev) => {
    //     ws.send("obama".toString());
    //     console.log("hi")
    //
    // })

    ws.onopen = function (eve)  {
        console.log("Connected");
        ws.send(trackWord.toString())
    };

    // ws.send(trackWord.toString())
    console.log("data sent")

    ws.onmessage = (evt) => {

        const data = evt.data.toString();
        // const action = data.action;
        // const args = data.args;
        // console.log(data);
        // console.log(typeof (data));
        // console.log(action);
        // console.log(args);

        // // re-create(?) blob data from websocket
        // const blob = new Blob([evt.data],
        //     {type: "text/plain"});
        const image = document.getElementById("div1");
        image.innerText = twitterState[parseInt(data) - 1]
        //
        // let reader = new FileReader();
        // reader.readAsDataURL(blob); // converts the blob to base64 and calls onload
        //
        // reader.onload = function() {
        // image.innerText = reader.result.; // data url
        // link.click();
        // };


        console.log(data)
        //
        // const url = URL.createObjectURL(blob);
        //

        // const img = new Image(0, 0);
        // //
        // img.onload = () => {
        //
        //     // get canvas context
        //     let ctx = image.getContext("2d");
        //
        //     ctx.clearRect(0, 0, image.width, image.height);
        //     ctx.drawImage(img, 0, 0);
        //
        // };

        // image.innerText = url;


    };

}
document.getElementById("button").addEventListener("click", myFunction)