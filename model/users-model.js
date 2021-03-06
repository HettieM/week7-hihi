const db = require("../database/connection");

function getAllUsers() {
  return db
    .query(`SELECT id, username, cohort FROM users;`)
    .then((res) => res.rows);
}

function getUser(username) {
  return db
    .query(`SELECT * FROM users WHERE username ILIKE $1;`, [username])
    .then((res) => res.rows[0]);
}

// function getUserById(id) {
//   return db
//     .query(`SELECT * FROM users WHERE id=$1;`, [id])
//     .then((res) => res.rows);
// }

function getUserById(id) {
  return db.query("SELECT * FROM users WHERE id=($1);", [id]);
}

function addUser(username, password, cohort) {
  return db
    .query(
      `INSERT INTO users (username, password, cohort)VALUES($1, $2, $3) RETURNING id, username, cohort;`,
      [username, password, cohort]
    )
    .then((res) => res.rows);
}

function getIdFromUsername(username) {
  // console.log(username);
  //SOMETHING IS GOING WRONG HERE - NOT BRINGING BACK USER ROWS
  return db
    .query(`SELECT id FROM users WHERE username ILIKE $1`, [username])
    .then((res) => res.rows);
}

function getMultipleUsersById(ids) {
  const sqlVariableList = ids.map((id, index) => {
    return `$${index + 1}`;
  });
  return db.query(
    `SELECT username FROM users WHERE id IN (${sqlVariableList});`,
    ids
  );
}

module.exports = {
  getAllUsers,
  addUser,
  getUser,
  getUserById,
  getIdFromUsername,
  getMultipleUsersById,
};
