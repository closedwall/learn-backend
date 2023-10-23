import http from 'http';
import url from 'url'
import fs from 'fs'
import formidable from 'formidable';


const PORT = process.env.PORT || 3000;

const server = http.createServer(async(req,res)=>{
    if(req.url === '/fileupload' && req.method.toLowerCase() === 'post'){
        var form = formidable()
        let fields;
        let files;
        try {
            [fields, files] = await form.parse(req);
        } catch (error) {
            console.log("error",error);
            return;
        }
        // form.parse(req,(err,fields, files)=>{
            let oldpath = files.filetoupload.path;
            console.log(files.filetoupload);
            let newpath ='C:/users/yadav/'+files.filetoupload.originalFilename;
            fs.rename(oldpath,newpath,(err)=>{
                if(err)throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        // });
    }else{
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data" >');
        res.write('<input type="file" name="filetoupload"><br> ');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
});

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})