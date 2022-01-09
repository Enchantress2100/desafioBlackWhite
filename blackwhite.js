const yargs = require('yargs');
let argv = yargs;
const key = 123;
const Jimp = require('jimp'); 
const fs = require('fs');
const http = require('http');
const url = require('url');
//yargs para la creacion  del servidor, si la pass es correcta, se desplegara el server, de lo contrario nos devolvera un mensaje de error
//node blackwhite.js acceso -k=123
    yargs.command(
        'acceso',
        'comprobando la clave para levantar el servidor', {
            key: {
                describe: 'clave',
                demand: true,
                alias:'k'
            },     
    },
        (args) => {
            if (args.key == key) {
                http.createServer((req, res) => {
                    //parametros url
                    const params = url.parse(req.url, true).query
                    const direccion = params.direccion
                    const imagen=params.imagen

                    //leer el HTML
                    if (req.url == '/') {
                        res.writeHead(200, { 'Content-Type': 'text/html' })
                        fs.readFile('index.html', 'utf-8', (err, html) => {
                            res.end(html)
                        })
                    }
    
                    //leer css
                    if (req.url == '/style') {
                        res.writeHead(200, { 'Content-Type': 'text/css' })
                        fs.readFile('style.css', (err, css) => {
                            res.end(css)
                        })
                    }
                        //que jimp rescate la informacion del formulario y la muestre
                    
                    if (req.url == '/resultado') {
                    Jimp.read(direccion, (err, imagen) => {
                        if (err) throw err;
                            imagen
                            .resize(350, Jimp.AUTO)
                            .quality(60)
                            .grayscale()
                            .writeAsync('newImg.jpg')
                            .then(() => {
                                fs.readFile('newImg.jpg', (err, Imagen) => {
                                res.writeHead(200, { 'Content-Type': 'image/jpg' })
                                res.end(Imagen) 
                                }) 
                            }) 
                    })
                }   
                }).listen(3000, () => console.log('Servidor ON y funcionando OK'))
            } else {
                console.log('clave incorrecta')
            }
        }).help().argv
   
     
           


   







         
        

