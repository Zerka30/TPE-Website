function show() {
    if (document.getElementById("methods").value == "Morse"){
        document.getElementById("anot").style.visibility = "visible";
    }
}

function hide() {
    if (document.getElementById("methods").value != "Morse"){
        document.getElementById("anot").style.visibility = "hidden";
    }
    else {
        document.getElementById("anot").style.visibility = "visible";
    }
}
function encryption() {    
    if (document.getElementById("text_encode").length != 0) {
        switch(document.getElementById("methods").value) {
            
            case "Caesar":
                var str = document.getElementById("text_encode").value;
                var amount = 26 - Number(prompt("Number of shift"));
                while (amount < 0) {amount +=26;}
                if (amount > 26) {amount = amount % 26 }
                var output = "";
                whileLoop :
                for (var i = 0; i < str.length; i ++) {
                    var c = str[i];
                    var code = str.charCodeAt(i);

                    if ((code >= 65) && (code <= 90)) {
                        c = String.fromCharCode(((code - 65 + amount) % 26) + 65);

                    }
                    else if ((code >= 97) && (code <= 122)) {
                        c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
                    }
                    if (isNaN(amount)) {
                        output="Only numbers may be used as a shift";
                        break whileLoop;
                    }

                    output += c;
                }
                document.getElementById("text_decoded").value=output;
                break;
            
            
            case "Vigenere":
                var str = document.getElementById("text_encode").value;
                var key = prompt("Encryption key");
                var output = "";
                var i = 0;
                whileLoop :
                while (i < str.length) {    
                    for (var j = 0; j < key.length; j ++) {
                        var c = str[i];
                        var str_code = str.charCodeAt(i);
                        var key_code = key.charCodeAt(j);
                        
                        if ((str_code >= 65) && (str_code <= 90)) {
                            if ((key_code >= 65) && (key_code <= 90)) {
                                c = ((str_code - 65 - (key_code - 65)) % 26) + 65;
                                while (c < 65) {c += 26;}
                                c = String.fromCharCode(c)
                            }
                            else if ((key_code >= 97) && (key_code <= 122)) {
                                c = ((str_code - 65 - (key_code - 97)) % 26) + 65;
                                while (c < 65) {c += 26;}
                                c = String.fromCharCode(c)
                            }
                            else {
                                output="Only letters may be used as an encryption key";
                                break whileLoop;
                            }
                        }

                        else if ((str_code >= 97) && (str_code <= 122)) { 
                            if ((key_code >= 65) && (key_code <= 90)) {
                                c = ((str_code - 97 - (key_code - 65)) % 26) + 97;
                                while (c < 97) {c += 26;}
                                c = String.fromCharCode(c)
                            }
                            else if ((key_code >= 97) && (key_code <= 122)) {
                                c = ((str_code - 97 - (key_code - 97)) % 26) + 97;
                                while (c < 97) {c += 26;}
                                c = String.fromCharCode(c)
                            }
                            else {
                                output="Only letters may be used as an encryption key";
                                break whileLoop;
                            }
                        }
                        else { j--;} 

                        output += c;
                        i ++;
                        if (i == str.length) {break;}
                    }
                }
                document.getElementById("text_decoded").value=output;
                break;

            case "Morse":
                var str = document.getElementById("text_encode").value;
                var output = "";
                var morse = "";
                var morseIndex = 0;
                var morseLetters = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."];
                var morseNumbers = ["-----", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----."];

                whileLoop :
                for (var i = 0; i < str.length; i ++){
                    var c = str[i];

                    if (c == "-" || c == "."){
                        morse += c;
                    }

                    if ((c == " " && morse != "") || i == str.length - 1){
                        morseIndex = morseLetters.indexOf(morse);
                        if (morseIndex >= 0) {
                            output += String.fromCharCode(morseIndex + 65);
                        }
                        if (morseIndex == -1) {
                            morseIndex = morseNumbers.indexOf(morse);
                            output += String.fromCharCode(morseIndex + 48);
                        if (morseIndex == -1) {
                            output = "An error has occured. Please verify your message and be sure that you didn't forget a character and used ' / ' to separate your words." ;
                            break whileLoop;
                            }
                        }
                        morse = "";
                    }

                    if (c == "/"){
                        output += " ";
                    }  

                }
                document.getElementById("text_decoded").value=output;
                break;
        }   
    }
}