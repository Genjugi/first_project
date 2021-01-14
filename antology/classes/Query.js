class Query {
    getStudentsTable() {
        return `select M.id, M.name, M.lastname, to_char(M.birthday,'dd.mm.yyyy') as birthday, M.biletnum 
from mytable as M`;
    }
    getStudentsData() {
        return `select * from studentsdata`
    }
}
module.exports = Query;