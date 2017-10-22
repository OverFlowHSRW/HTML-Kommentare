var admin = false;
var vater;
var lvlAnchor = 0;
var lvlFocus = 0;
var nachbarAnchor = 0;
var nachbarFocus = 0;



        //-------------------------------------------------------


        function getSelectedText() {

            
            var text = "";
            if (typeof window.getSelection != "undefined") {
                var textdiv = document.getElementById("textdiv");
                //if(window.getSelection().baseNode.parentNode.id == "textdiv"){
                    text = window.getSelection()//.toString();
                    var selection = window.getSelection();
                    

                    if(selection.anchorOffset == selection.focusOffset){
                        return 'Null';
                    }else if(selection.anchorOffset > selection.focusOffset){
                        return 'Null'
                    }

                    //console.log(selection);
                    //console.log(selection.anchorNode);
                    var abstand = 0;
                    var anfang = true;
                    var anchorText = selection.anchorNode.data;

            
                    //------------------------Find a place of Begining------------------------
                    //console.log(vaterNode);
                    findVaterAnchorNode(selection.anchorNode);
                   
                    //console.log('Anchor lvl: '+(lvlAnchor-1));
                   // console.log(nachbar)
                    lvlAnchor = 0;
                    
                    for(var j = 0; j < selection.anchorNode.parentNode.childNodes.length; j++){
                        if (selection.anchorNode == selection.anchorNode.parentNode.childNodes[j]){
                            nachbarAnchor = j;
                            //console.log("das ist anchor nachbar " +(j)+" child");
                        }
                    }
                    //-----------------------------------------------------------------
                    //---------------------------Find End Place-----------------------
                    findVaterFocusNode(selection.focusNode);
                    console.log('Focus lvl: ' + (lvlFocus-1));
                    lvlFocus = 0;

                    for(var j = 0; j < selection.focusNode.parentNode.childNodes.length; j++){
                        if (selection.focusNode == selection.focusNode.parentNode.childNodes[j]){
                            nachbarFocus = j;
                            //console.log("das ist focus nachbar " +(j)+" child");
                        }
                    }

                    //----------------------------------------------------------------------------

                   
                   if(lvlAnchor == lvlFocus && nachbarAnchor == nachbarFocus){

                    if(selection.anchorNode == selection.focusNode){
                      
                            var tmptext = '';//texthtmlopentag;
                            
                            for (var i = 0; i<selection.anchorOffset; i++){
                                tmptext = tmptext + selection.anchorNode.data[i];
                               
                            }
                            tmptext = tmptext +"<span onclick='commentar()' class='highlite'>";
                            for (var j = selection.anchorOffset; j<selection.focusOffset; j++){
                                tmptext = tmptext + selection.anchorNode.data[j];
                                
                            }
                            tmptext = tmptext +"</span>";
                            for (var k = selection.focusOffset; k<selection.anchorNode.data.length; k++){
                                tmptext = tmptext + selection.anchorNode.data[k];
                            }
        
                            console.log(tmptext);
        
        
                            selection.anchorNode.data    = tmptext;
        
                            //----------------------------------------------- <TAG>----------------------
                            var ausgabe ='';
                            
                            var tmp = selection.anchorNode.parentNode.innerHTML;
        
                            for(var i = 0; i < tmp.length;i++ ){
                                
                                var tmp2 = tmp[i];
                               
                                if(tmp2 == '&' ){
                                    console.log("treffer"); 
                                    if(tmp[i+1] =='l' && tmp[i+2] =='t' && tmp[i+3] ==';'){
                                        tmp2 = '<';
                                        i = i+3;
                                        console.log(tmp2)
                                    }
                                    if(tmp[i+1] =='g' && tmp[i+2] =='t' && tmp[i+3] ==';'){
                                        tmp2 = '>';
                                        i = i+3;
                                        console.log(tmp2)
                                    }
                                    
                                }
                                    ausgabe = ausgabe + tmp2;
                                
                            }
                            //var  ausgabe = ausgabe.toString();
                          
                            console.log(ausgabe);
        
                            selection.anchorNode.parentNode.innerHTML = ausgabe;



                            var newel = document.createElement('input');
                            newel.type = 'text';
                            newel.pattern="[a-zA-Z]{30}";
                            document.getElementById('cfeld').appendChild(newel);


                        }
                    }else{
                        //schrein in Anchor
                        alert('Not Allowed');
                    }

         


                    for(i = 0; i < anchorText.length; i++){
                        if (anchorText[i] != ' '){
                            anfang = false;
                        }
                        if (anfang == true){
                            abstand++;
                        }
                        //console.log(anchorText[i]);
                    }
                    console.log('abstand: '+ abstand )
                    console.log("anchorOffset: "+selection.anchorOffset+", focusOffset: " + selection.focusOffset)
                    //var inhalt = document.getElementById("textdiv").innerHTML;
                    //console.log(inhalt)
                //}
                
            }
            return text;
        }


        
        function doSomethingWithSelectedText() {
            if (admin == true){

                

                var selectedText = getSelectedText();
                if (selectedText) {
                 console.log("Got selected text: " + selectedText);
                }
            }
        }
        
        document.onmouseup = doSomethingWithSelectedText;


        function findVaterAnchorNode(inputNode){
            if (inputNode.id == 'textdiv'){
                
               vater = inputNode;
                console.log(inputNode);
                //return inputNode;
                
            }else{
                lvlAnchor++;
                
               
               
                findVaterAnchorNode(inputNode.parentNode);
                
            }
             
        }

        function findVaterFocusNode(inputNode){
            if (inputNode.id == 'textdiv'){
                
               vater = inputNode;
                console.log(inputNode);
                //return inputNode;
                
            }else{
                lvlFocus++;
                
               
               
                findVaterFocusNode(inputNode.parentNode);
                
            }
             
        }


        function on() {
            document.getElementById("overlay").style.display = "block";    
        }
        function off(){
            document.getElementById("overlay").style.display = "none";    
        }
        function check(e) {


                e.preventDefault();
                var username = document.getElementById('username').value;
                var password= document.getElementById('password').value;
                console.log(username + ", " +  password);
                console.log(admin);
                if(username == 'Admin' && password == 'admin'){
                   
                    off();
                    admin = true;
                    console.log(admin);
                }
          

           
        }

    function commentar(){
        var s = document.createElement('div');
        s.innerHTML = 'Hier kommt ein kommentar';
        document.getElementById('cfeld').appendChild(s);


    }

  