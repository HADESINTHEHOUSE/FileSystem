

let fs = require("fs");
let path  = require("path");
let types = require("./utility");

function orgafn(dirPath) {
    if (dirPath == undefined) {
        
       dirPath=process.cwd();

    } else {
        let jp;
        let exist = fs.existsSync(dirPath);
        if (exist) {
            jp = path.join(dirPath, "organize");
            if (fs.existsSync("organize") == false) {
                fs.mkdirSync(jp);
            }

        } else {
            console.log("Kindly enter path");
            return;
        }

        organizeHelp(path.join(dirPath, '../../'), jp);



    }
}

function organizeHelp(src, dest) {
    let read = fs.readdirSync(src);
    for (i = 0; i < read.length; i++) {
        let pathN = path.join(src, read[i]);
        if (fs.lstatSync(pathN).isFile()) {
            let extname = path.extname(read[i]);
            let type = arrange(extname.slice(1));

            sendFile(type, pathN, dest);
        }
    }
}

function arrange(name) {

    //src,dest,extention,newfolder
let ta  =types.obj;

    for (let type in ta) {
        let t = ta[type];
        for (let i = 0; i < t.length; i++) {
            if (t[i] == name) {
                return type

            }
        }

    }
    return "others";

}

function sendFile(type, src, dest) {
    let dpath = path.join(dest, type);
    if (fs.existsSync(dpath) == false) {
        fs.mkdirSync(dpath);
    }
    let fileN = path.basename(src);
    let desfp = path.join(dpath, fileN);
    fs.copyFileSync(src, desfp);

}

module.exports={
    orga:orgafn
}