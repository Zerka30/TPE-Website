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
                var amount = Number(prompt("Number of shift"));
                while (amount < 0) {amount +=26;}
                if (amount > 0) {amount = amount % 26 }
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
                                c = String.fromCharCode(((str_code - 65 + key_code - 65) % 26) + 65);
                            }
                            else if ((key_code >= 97) && (key_code <= 122)) {
                                c = String.fromCharCode(((str_code - 65 + key_code - 97) % 26) + 65);
                            }
                            else {
                                output="Only letters may be used as an encryption key";
                                break whileLoop;
                            }
                        }

                        else if ((str_code >= 97) && (str_code <= 122)) { 
                            if ((key_code >= 65) && (key_code <= 90)) {
                                c = String.fromCharCode(((str_code - 97 + key_code - 65) % 26) + 97);
                            }
                            else if ((key_code >= 97) && (key_code <= 122)) {
                                c = String.fromCharCode(((str_code - 97 + key_code - 97) % 26) + 97);
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
                var i = 0;
                var morseLetters = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."];
                var morseNumbers = ["-----", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----."];
                whileLoop :
                for (var i = 0; i < str.length; i ++){
                    var c = str[i];
                    var code = str.charCodeAt(i);

                    if ((code >= 65) && (code <= 90)) {
                        c = (morseLetters[code - 65]) + " ";
                    }
                    else if ((code >= 97) && (code <= 122)) {
                        c = (morseLetters[code - 97]) + " ";
                    }
                    else if ((code >= 48) && (code <= 57)) {
                        c = (morseNumbers[code - 48]) + " ";
                    }
                    else if (code == 32) {
                        c = "/ "
                    }
                    else {
                        output = "An unavailable character has been used, please be sure to only try to encrypt alphabetical or numerical characters.";
                        break whileLoop;
                    }

                    output += c;
                }
                output = output.slice(0, -1);
                document.getElementById("text_decoded").value=output;
                break;

        }   
    }
}


