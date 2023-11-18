// To install any packages => npm i package_name & for uninstall => npm uninstall package_name

// For creating the package.json => npm init

// nodemon for auto-running => npm i nodemon, for installing it globally use npm i -g package_name

// Basic server 

const http = require("http");

const server = http.createServer((req,res) => {
    if(req.url === '/about'){
        res.end("<h1>About Page</h1>")
    }

    else if(req.url === '/contact'){
        res.end("<h1>Contact Us</h1>")
    }

   else if(req.url === '/'){
        res.end("<h1>Home Page</h1>")
    }

    else {
        res.end("Page not Found")
    }
})

server.listen(4000, () => {
    console.log("Server is running");
})

// Module => Everythng in node.js is module, module is also known as function
