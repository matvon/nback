//Calculator
//Copyright (C) 2012 Mathieu Vonlanthen
//Licensed under GPL v3
"use strict";
        var shapeTab = [
            "<circle cx='50' cy='50' r='50'",
            "<rect x='0' y='0' width='100' height='100'"
        ];
        var colorTab = ["red", "blue", "green"];
        var timeout = 2500;
        var nbShown = 0;
        var nbBack = 2;
        var correctHit = 0;
        var missedHit  = 0;
        var currentSymbols = [];
        var answered = false;
        $(function init() {
            $("#title").html(nbBack+"back");
            gameLoop();
        });
        function fail(){
            missedHit++;
            $('#result').html("Fail");
            $('#result').css("background-color","red");
            $("#missedHitNumber").text(correctHit);
        }
        function ok(){
            correctHit++;
            $('#result').html("OK");
            $('#result').css("background-color","green");
            $("#correctHitNumber").text(correctHit);
        }
        function addNewSymbol(){
            //Probability to have a nback symbol
            var prob = 0.5;
            var shapeNb, colorNb;
            if(Math.random() < prob && nbShown >= nbBack){
               shapeNb = currentSymbols[0].shapeNb;
               colorNb = currentSymbols[0].colorNb;
            }else{
               shapeNb = Math.floor(Math.random() * shapeTab.length);
               colorNb = Math.floor(Math.random() * colorTab.length);
            }
            currentSymbols.push({shapeNb : shapeNb, colorNb : colorNb});
            $('#divSVG').html("<svg width='100px' height='100px' viewbox = '0 0 100 100'>" +
                              shapeTab[shapeNb] + "style='fill:" + colorTab[colorNb] + ";'/></svg>");
            $('#divSVG').css({'margin-left'  : '0%',
                              'margin-right' : '0%',
                              'width'        : '40%'});
            $("#divSVG").animate({'margin-left' : '50%'},2000);
            nbShown++;
            if(nbShown > nbBack + 1)currentSymbols.shift();
        }
        function showBlank(){
            $("#divSVG").html("<svg id='elementSVG'></svg>");
        }
        function gameLoop() {
            answered=false;
            var blankTime = 100;
            addNewSymbol();
            /*setTimeout(showBlank, timeout-blankTime);*/
            setTimeout(gameLoop, timeout);
        }
        function symbolEquals(s1,s2){
            return (s1.shapeNb === s2.shapeNb && s1.colorNb === s2.colorNb);
        }
        $(document).keypress(function (event) {
            var key = ((event.which) || (event.keyCode));
            if (nbShown > nbBack && !answered) {
                //Up arrow
                if (key === 38) {
                    answered = true;
                    if (symbolEquals(currentSymbols[0],currentSymbols[nbBack])){
                        ok();
                    } else {
                        fail();
                    }
                }
                //Down arrow
                if (key === 40) {
                    answered = true;
                    if (!symbolEquals(currentSymbols[0],currentSymbols[nbBack])) {
                        ok();
                    } else {
                        fail();
                    }
                }
            }

        });

