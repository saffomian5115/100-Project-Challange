
var answer;
document.querySelector("#heading1").innerHTML = "You Try<br>To Guess the Correct Number<br>🔰";

function newgame(){
    document.querySelector("#gamewin").style.visibility="hidden";
    document.querySelector(".game").style.visibility="visible";

    answer = Math.round(Math.random()*1000);
    console.log(answer, typeof answer);
}

// event listener.

document.addEventListener("keydown", function(event) {
    let inputbox = document.querySelector("#inputbox");
    if(!isNaN(event.key) || event.key == "Backspace"){
        inputbox.focus();
    }
    if(event.key == "Enter"){
        document.querySelector("#btn1").click();
    }
});


//   function of game
function check() {
    var number = parseInt(document.querySelector("#inputbox").value, 10);
    document.querySelector("#inputbox").value="";
    document.querySelector("#inputbox").placeholder=number;


//   condition for input

    if(number<0){
        document.querySelector("#hint").innerHTML="Enter 0 or greater number."
    }
    else if(number>1000){
        document.querySelector("#hint").innerHTML="Enter 1000 or smaller number."
    }
    
    // checking condition
    
    else {
        if(number == answer){
            document.querySelector("#answer").innerHTML= answer;
            document.querySelector("#heading1").innerHTML ="Congratuations!<br>🎈🎈✨🎉✨🎈🎈<br> You Guess the Correct Answer";
            document.querySelector("#gamewin").style.visibility="visible";
            document.querySelector(".game").style.visibility="hidden";
        }
        else if(Math.abs(answer-number) > 250 ){
            document.querySelector("#hint").innerHTML="No..!<br>🙄<br> So Far";

        }
        else if(Math.abs(answer-number) > 100 ){
            document.querySelector("#hint").innerHTML="Try Again<br>🤨<br> Still Far";

        }
        else if(Math.abs(answer-number) > 50 ){
            document.querySelector("#hint").innerHTML="No Bro<br>😎<br>Not too Close<br>Not to Far";

        }
        else if(Math.abs(answer-number) > 10 ){
            document.querySelector("#hint").innerHTML="--- NOW ---<br>🤗<br>You are Closer";

        }
        else if(Math.abs(answer-number) > 1 ){
            document.querySelector("#hint").innerHTML="Uffff bro<br>🔥🔥🔥<br> So Much Close";
        }
    }
}

