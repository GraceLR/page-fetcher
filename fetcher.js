

const myArgs = process.argv.slice(2);
const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const writeFile = (path, content) => {
    fs.writeFile(path, content, err => {
        if (err) return console.log(err);
        console.log(`Downloaded and saved ${fs.statSync(path).size} bytes to ${path}`);
        process.exit(0);
      });
}

request(myArgs[0], (error, response, body) => {

  if (error) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    process.exit(0);
  }

  fs.lstatSync(myArgs[1]).isDirectory();
    
  fs.access(myArgs[1], fs.F_OK, (err) => {
        
    if (err) {
        writeFile(myArgs[1], body);
    } else {
        rl.question("File already exists.\nPress 'y' (followed by the enter key) to overwrite the file, otherwise skip and exit the app\n",
        (key) => {
          if (key === 'y') {
            writeFile(myArgs[1], body);
          } else {
            console.log("\nBYE BYE !!!");
            process.exit(0);
          }
        });
    }
  });
});
