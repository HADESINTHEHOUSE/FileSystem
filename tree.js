let fs = require("fs");
let path  = require("path");

function treefn(dirPath) {

    if (dirPath == undefined) {
        treeHelp(process.cwd(),"");
        return;

    } else {
       // let jp;
        let exist = fs.existsSync(dirPath);
        if (exist) {


            treeHelp(dirPath,"")

        } else {
            console.log("Kindly enter path");
            return;
        }

    }

}

function treeHelp(dirPath,indent)
{
    let pat = fs.lstatSync(dirPath).isFile();
    if(pat)
    { let filN = path.basename(dirPath);
console.log(indent,"├──",filN);
    }else
    {
        let folN = path.basename(dirPath);
        console.log(indent,"└──",folN);
        let child =fs.readdirSync(dirPath);
        for(let i=0;i<child.length;i++)
        { let pathj = path.join(dirPath,child[i]);
            treeHelp(pathj,indent + "\t");
        }

    }
}
module.exports={
    treek:treefn
}