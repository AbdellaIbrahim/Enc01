var pNumbers = [];
var alpha;
const fs = require('fs');
const prompt = require('prompt-sync')();



// Generate Prime Numbers within Range.
function genRanNum() {

    var ranNum = [];
    for (var i = 0; i <= 52; i++) {
        ranNum[i] = Math.floor(Math.random() * 1000) + 1;
    }

    return ranNum;
}

// Return an Array that contains Encryption

function solutionGen(ranNum) {
    var solutionArray = []; 
    // Generate the alphabets Array.

    var tempC = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z";
    var alpha = tempC.split(" ");

    for (var i = 0; i < 52; i++) {
        //solutionArray[i] = alpha[i] + " = " + ranNum[i];
        solutionArray[i] = ranNum[i];
    }

    return solutionArray;
}

// Create a text file, with the solution to revert Encryption.!
function solutionWriter(solution) {
    fs.writeFile('Solution.txt', solution , function (err) {
        if (err) throw err;
        console.log('Solution Successfully Created!,');
        console.log('Check for /Solution.txt in current directory!');
    });
}

function startEncryption(fileInput,ranNum) {
    var encryptedArray = [];

    var tempC = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z";
    var alpha = tempC.split(" ");

    for (var j = 0; j < 52; j++) {
        for (var i = 0; i < fileInput.length; i++) {
            if (fileInput[i] == alpha[j]) {
                encryptedArray[i] = ranNum[j];
            }
        }
    }

    for (var i = 0; i < fileInput.length; i++) {
        if (encryptedArray[i] == undefined) {
            encryptedArray[i] = fileInput[i];
        }
    }

    return encryptedArray;
    
}


function startDecryption(solutionFile,fileToDecrypt) {
    var tempC = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z";
    var alpha = tempC.split(" ");
    var decryptedFile = [];
    console.log(solutionFile);
    console.log(fileToDecrypt);
    for (var j = 0; j < 52; j++) {
        for (var i = 0; i < fileToDecrypt.length; i++) {
            if (fileToDecrypt[i] == solutionFile[j]) {
                decryptedFile[i] = alpha[j];
            }
        }
    }
    
    for (var i = 0; i < fileToDecrypt.length; i++) {
        if (decryptedFile[i] == undefined) {
            decryptedFile[i] = fileToDecrypt[i];
        }
    }

    return decryptedFile;
}






function mainFunction() {

    var ranNum = genRanNum(); // Generate random Numbers 
    var solution = solutionGen(ranNum); // Generate Array containing Solution 
    var flag = false;
    console.log("Please Choose Task : \n 1. Encrypt Files.\n 2. Decrypt Files.")
    var task = prompt(">> ");

    if (task == "1") {
        // Get path for file to be input.

        var encPath = prompt("Input file here : ");
        while (!flag) {
            console.log("File is located in  /" + encPath);

            var response = prompt("Y/N : ");
            if (response == "Y" || response == "Yes") {
                console.log("File successfully added.");
                flag = true;
            } else if (response == "N" || response == "No") {
                var encPath = prompt("Please input desired path: ");
            } else {
                console.log("Something went Wrong.. :/");
            }
        }


        const fileInput = fs.readFileSync(encPath, 'utf8'); // This variable will read file. 
        var fileEncryption = fileInput.split(""); // Convert the content of file into an array to be encrypted
        solutionWriter(solution);

        var encryptedFile = startEncryption(fileEncryption, ranNum);
        fs.writeFile('EncryptedFile.txt', encryptedFile, function (err) {
            if (err) throw err;
            console.log('Encryption Successfully Completed');
            console.log('Check for /EncryptedFile.txt in current directory');
        });
    } else if (task == "2") {
        // Getting Paths to start decryption.
        var decPath = prompt("Input Solution here : ");
        

        while (!flag) {
            console.log("Solution is located in /" + decPath);

            var response = prompt("Y/N : ");
            if (response == "Y" || response == "Yes") {
                console.log("Solution successfully added.");
                flag = true;
            } else if (response == "N" || response == "No") {
                var decPath = prompt("Please input desired path: ");
            } else {
                console.log("Something went Wrong.. :/");
            }
        }
        var decPath2 = prompt("Input file to be decrypted : ");
        var response2 = prompt("Y/N : ");

        while (!flag) {
            console.log("Solution is located in /" + decPath);

            var response2 = prompt("Y/N : ");
            if (response2 == "Y" || response2 == "Yes") {
                console.log("Solution successfully added.");
                flag = true;
            } else if (response2 == "N" || response2 == "No") {
                var decPath = prompt("Please input desired path: ");
            } else {
                console.log("Something went Wrong.. :/");
            }
        }

        const solutionFile = fs.readFileSync(decPath, 'utf8'); // Getting Solution to Decrypt File
        const fileToDecrypt = fs.readFileSync(decPath2, 'utf8'); // Getting Main file to decrypt.
        var fileDecrypter = solutionFile.split(","); // Will pass this variable to function to start process
        var pFileToDecrypt = fileToDecrypt.split(","); // Will pass this variable to function to start process.

        var decryptedFile = startDecryption(fileDecrypter, pFileToDecrypt); // Use this file to print final solution.
        var decryptedFileString = "";

        for (var i = 0; i < decryptedFile.length; i++) {
            decryptedFileString += decryptedFile[i];
        }


        // Final step, Write Decrypted File.
        fs.writeFile('DecryptedFile.txt', decryptedFileString, function (err) {
            if (err) throw err;
            console.log('Decryption Successfully Completed.');
            console.log('Check for /DecryptedFile.txt in current directory.');
        });
    } else {
        // Exiting if invalid input was used.
        process.on('exit', (code) => {
            console.log("Invalid Input, Exiting soon...");
        });
    }
}

mainFunction();