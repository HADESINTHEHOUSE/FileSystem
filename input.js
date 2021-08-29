#!/usr/bin/env node
const { dir } = require("console");
let fs = require("fs");
const { type } = require("os");
let path = require("path");

let pro = process.argv.splice(2);
let com = pro[0];
let help = require("./help");
let tree = require("./tree");
let orag=require("./organize");




switch (com) {
    case "tree":
       tree.treek(pro[1]);
        break;

    case "organize":
        orag.orga(pro[1]);
        break;

    case "help":
         help.help(pro[1]);
        break;

    default:
        console.log("Enter correct command");
        break;

}






