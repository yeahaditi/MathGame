var playing = false;
var score;
var action;
var timeremaining;
var correctanswer;
var count =0 ;
var x;
var y;

//if click on start/ reset
document.getElementById("startreset").onclick= function(){

    //if we are playing
    if(playing==true){
        location.reload(); //reload page
    }

    //if we are not playing
    else{

         //change mode to playing
         playing =true;

         //set initial score to 0
         score =0;
        document.getElementById("scorevalue").innerHTML=score;

        //set initial wrong answer count 0
        count=0;

        //show countdown box 
        show("timeremaining")
        timeremaining=60;
        document.getElementById("timeremainingvalue").innerHTML= timeremaining;

        //show lives
        for(i=1; i<4; i++){
            show("live"+i);
        }

        //hide game over box
        hide("gameover");

        //change button to reset
        document.getElementById("startreset").innerHTML="Reset Game";

        //start condition
        startCountdown();

        //generate a new QA
        generateQA();

        check();

    }
}
 
//clicking on answer box;
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){

        // check if we are playing or not
        if(playing==true){
            //correct anwer
            if(this.innerHTML==correctanswer){
                //increase score by 1
                score++;
                document.getElementById("scorevalue").innerHTML=score;
                
                //hide try again box
                hide("wrong");

                //show correct box
                show("correct");

                //hide correct box after 1 sec
                setTimeout(function(){
                    hide("correct");   
                }, 1000);

                generateQA();
            }
            else{
                //wrong answer
                // increase count
                count++;

                //hide correct box
                hide("correct");

                //show try again box
                show("wrong");

                //hide try again box after 1 sec
                setTimeout(function(){
                    hide("wrong");   
                }, 1000);

                // lives decrease
                if(count==1){
                    hide("live1");
                }

                if(count==2){
                    hide("live1");
                    hide("live2");
                }

                if(count == 3){
                    stopCountdown();
                    show("gameover");
                 document.getElementById("gameover").innerHTML = "<p>GAME OVER!</p><p>YOUR SCORE IS " + score + ".</p>";   
                    hide("timeremaining");
                    hide("correct");
                    hide("wrong");
                    for(i=1; i<4; i++){
                        hide("live"+i);
                    }
                    playing = false;
                    document.getElementById("startreset").innerHTML = "Start Game";
                }
                
                generateQA();  
            }
        }
    }
}
     
    //start countdown
    function startCountdown(){
        action = setInterval(function() {

            timeremaining-=1; 
            document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){
            stopCountdown();
            show("gameover");
         document.getElementById("gameover").innerHTML = "<p>GAME OVER!</p><p>YOUR SCORE IS " + score + ".</p>";   
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
        },1000);
        }
   
    //stop countdown
    function stopCountdown(){
        clearInterval(action);
    }

    //hide an element
    function hide(id){
        document.getElementById(id).style.display="none";
    }

    //show an element
    function show(id){
        document.getElementById(id).style.display="block";
    }


    //generate question and multiple answer
    function generateQA(){
         x = 1+(Math.round(Math.random()*9));
         y= 1+(Math.round(Math.random()*9));

        analyze();

        var correctposition = 1+(Math.round(Math.random()*3));

         //fill one box with the correct answer
         document.getElementById("box"+correctposition).innerHTML = correctanswer;
    
        //fill the other boxes with wrong asnwer
        var answers =[correctanswer];
        for(i=1; i<5; i++){
            if(i != correctposition){
                var wronganswer;
               do{
                 wronganswer = (1+Math.round(Math.random()*9)) + (1+ Math.round(Math.random()*9));
               } while((answers.indexOf(wronganswer)>-1))
               document.getElementById("box"+i).innerHTML =wronganswer;
               answers.push(wronganswer);
            }
        }
    }

        //analyze
        function analyze(){
            var Addition =document.getElementById("Addition");
            var Subtraction =document.getElementById("Subtraction");
            var Mutliplication =document.getElementById("Multiplication");
            var Division =document.getElementById("Division");

            var check;
            if(Addition.checked===true){
                check = "Addition";
            }
           if(Subtraction.checked===true){
                check= "Subtraction";
            }
           if(Mutliplication.checked===true){
                check="Mutliplication";
            }
            if(Division.checked===true){
                check= "Division";
            }

            switch(check){

                case "Addition":
                    correctanswer = x+y;
                    document.getElementById("question").innerHTML=x + "+" + y;
                    break;

                case "Subtraction":
                    if(x>y){
                    correctanswer = x-y;
                    document.getElementById("question").innerHTML=x + "-" + y;
                   }
                   else{
                    correctanswer = y-x;
                    document.getElementById("question").innerHTML=y + "-" + x;
                   }
                    break;

                case "Mutliplication":
                    correctanswer = x*y;
                    document.getElementById("question").innerHTML=x + "x" + y; 
                    break;

                case "Division":
                    if(x%y==0){
                    correctanswer = x/y;
                    document.getElementById("question").innerHTML=x + "/" + y; 
                    }
                    else{
                    correctanswer = (y*x)/y;
                    document.getElementById("question").innerHTML=y*x + "/" + y;
                    } 
                    break;
            
                default:
                correctanswer = x+y;
                    document.getElementById("question").innerHTML=x + "+" + y;
                    document.getElementById('Addition').checked=true;

            }

        } 

        //disable other radio buttons while playing
        function check() {
            if(playing==true){
            if (document.getElementById('Addition').checked) {
               document.getElementById('Subtraction').disabled = true;
               document.getElementById('Multiplication').disabled = true;
               document.getElementById('Division').disabled = true;
            }
            if (document.getElementById('Subtraction').checked) {
                document.getElementById('Addition').disabled = true;
                document.getElementById('Multiplication').disabled = true;
                document.getElementById('Division').disabled = true;
             }
             if (document.getElementById('Multiplication').checked) {
                document.getElementById('Subtraction').disabled = true;
                document.getElementById('Addition').disabled = true;
                document.getElementById('Division').disabled = true;
             }
             if (document.getElementById('Division').checked) {
                document.getElementById('Subtraction').disabled = true;
                document.getElementById('Multiplication').disabled = true;
                document.getElementById('Addition').disabled = true;
             } 
        }
    }
        
        
    
