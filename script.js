"use strict";
console.log("JavaScript Connect!");


fetch("https://restcountries.com/")
    .then (data => console.log(data))
    .catch(error => console.error("No Work!"))


