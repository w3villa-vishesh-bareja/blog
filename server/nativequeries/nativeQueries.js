
const nativeQueries = {

    "getUser": "SELECT * FROM Users WHERE email = :email",

    "insertUser": "INSERT INTO users(name , email , password , unique_id) VALUES (? , ? , ? , UUID())"

}

export default nativeQueries;