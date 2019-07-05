const async = require('async');
const request = require('request');

function one(){
  console.log("Before request in code.");

  request("https://api.noopschallenge.com/hexbot", function(err, response, body){
    console.log("Inside callback of request in code.");
    console.log(body);
  })
  console.log("After request in code.");
}

function two(){
  console.log("Before request in code.");

  request("https://api.noopschallenge.com/hexbot", function(err, response, body){
    console.log("Inside callback of request 1 in code.");
    console.log(body);
    request("https://api.noopschallenge.com/hexbot", function(err, response, body){
      console.log("Inside callback of request 2 in code.");
      console.log(body);
    });
  });
  console.log("After request in code.");
}

function three(){

  function asyncFunctionOne(next){
    request("https://api.noopschallenge.com/hexbot", function(err, response, body){
      console.log("Inside callback of request in code.");
      next(null, body);
    })
  }

  function asyncFunctionTwo(err, body){
    if(err){
      return next(err);
    }
    console.log(body);
  }

  console.log("Before procedure in code.");

  asyncFunctionOne(asyncFunctionTwo)

  console.log("After procedure in code.");
}

function four(){

  function asyncFunctionOne(next){
    request("https://api.noopschallenge.com/hexbot", function(err, response, body){
      console.log("Inside callback of request in code.");
      next(null, body);
    })
  }

  function asyncFunctionAlternative(err, body){
    if(err){
      return next(err);
    }
    console.log(body);
  }

  console.log("Before procedure in code.");

  asyncFunctionOne(function asyncFunctionTwo(err, body, response){
    if(err){
      return next(err);
    }
    console.log(body);
    asyncFunctionOne(asyncFunctionAlternative)
  })

  console.log("After procedure in code.");
}


function five(){

  function asyncFunction(cb){
    request("https://api.noopschallenge.com/hexbot", function(err1, _, body1){
      if(err1){
        return cb(err1);
      }
      console.log("Inside callback of request in code.");
      console.log(body1);
      request("https://api.noopschallenge.com/hexbot", function(err2, _, body2){
        if(err2){
          return cb(err2);
        }
        console.log("Inside callback of request in code.");
        console.log(body2);
        cb(null, "Finished")
      })
    })
  }

  console.log("Before procedure in code.");
  asyncFunction((err, value)=> {
    if(err){
      console.log("Oops, there waas an error!");
    }
    console.log("This was an important procedure with value: ", value);
  })
  console.log("After procedure in code.");
}

eval(`${process.argv[2]}()`)
