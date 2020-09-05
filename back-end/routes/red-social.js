'use strict'

var express = require('express');
var UserControlller = require('../controllers/usuario');
var PostControlller = require('../controllers/post');


var router = express.Router();

var multipart = require('connect-multiparty');

//asigno en donde voy a guardar las las imagenes 
var multipartMiddeware = multipart({ uploadDir: './uploads'});


router.get('/home', UserControlller.home);
router.get('/getUsers', UserControlller.getUsers);
router.post('/getUser', UserControlller.getUser);
router.post('/save-User', UserControlller.saveUser);
router.put('/user-update/:id', UserControlller.updateUser);
router.delete('/user-delete/:id', UserControlller.deleteUser);
router.post('/uploadImagen/:id', multipartMiddeware, UserControlller.uploadImg);
router.get('/getImage/:image', UserControlller.getImageFile);

// RUTAS DE POST 
router.get('/get-Posts', PostControlller.getPosts);
router.post('/save-Post', PostControlller.savePost);
router.post('/uploadImgPost/:id',multipartMiddeware, PostControlller.uploadImgPost);
router.post('/Tes-insert-Like', PostControlller.Testinsert3);

//
router.post('/inserComentario', PostControlller.insertComentarioPost);
router.get('/getComentario/:post', PostControlller.getComentarios);

/*router.post('/test', ProyectControlller.test);
router.post('/save-proyec', ProyectControlller.saveProyect);
router.get('/project/:id?', ProyectControlller.getProject);
router.get('/projects/', ProyectControlller.getProjects);
router.put('/projectUpdate/:id', ProyectControlller.updateprojet);
router.delete('/projectDelete/:id', ProyectControlller.deleteProject);
router.post('/uploadImagen/:id', multipartMiddeware, ProyectControlller.uploadImg);
router.get('/getImage/:image', ProyectControlller.getImageFile);
*/

module.exports = router;

