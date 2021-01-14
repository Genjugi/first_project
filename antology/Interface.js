const DB = require('./classes/Db');
const Query = require('./classes/Query');
const query = new Query;
const config = require('./classes/config');
const db = new DB(config.db);
const fs = require("fs");

const getHome = async (request, response) => {

    fs.readFile("./views/home.html", "utf-8", (error, data) => {

         response
            .status(200)
            .end(data);
    })
}

const getST = async (request, response) => {

    const item = await db.select(query.getStudentsTable());

    fs.readFile("./views/stud_tab.html", "utf-8", (error, data) => {

        let htmlData = '';
        Object.values(item).forEach(item => {
            htmlData += `<tr> <td>${item.name}</td> <td>${item.lastname}</td> <td>${item.birthday}</td> <td>${item.biletnum}</td></tr>`
        } )
        let message = "Введите данные студента";
        let header = "Попытка микросервиса х1";
        data = data.replace("{header}", header)
                   .replace("{message}", message)
                   .replace("{selectResult}", htmlData);
        response
            .status(200)
            .end(data);
    })
}

const saveST = async (request, response) => {
   const res = await db.insert(`insert into mytable (name, lastname, birthday, biletnum) values (\'${request.body.name}\',\'${request.body.lastname}\',\'${request.body.birthday}\',\'${request.body.biletnum}\');`);
}

const getSD = async (request, response) => {

   const item = await db.select(query.getStudentsData());

    fs.readFile("./views/stud_dat.html", "utf-8", (error, data) => {

       let htmlData = '';
        Object.values(item).forEach(item => {
            htmlData += `<tr> <td>${item.biletnum}</td> <td>${item.groupe}</td> <td>${item.curse}</td> <td>${item.faculty}</td></tr>`
        } )
        let message = "Введите данные зачетного билета";
        let header = "Попытка микросервиса х2";
        data = data.replace("{header}", header)
                   .replace("{message}", message)
                   .replace("{selectResult}", htmlData);
        response
            .status(200)
            .end(data);
    })
}

const saveSD = async (request, response) => {
    const res = await db.insert(`insert into studentsdata  values (\'${request.body.biletnum}\',\'${request.body.groupe}\',\'${request.body.curse}\',\'${request.body.faculty}\');`);
}


module.exports = {
    getST,
    saveST,
    getSD,
    saveSD,
    getHome
}