const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { salt_rounds } = require("../utils/constant.values");

class User {
  static createTable() {
    const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                active INTEGER NOT NULL DEFAULT 1,
                role_id INTEGER NOT NULL DEFAULT 2,
                created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `;
    return db.run(sql);
  }

  static createUserDetailsTable() {
    const sql = `
            CREATE TABLE IF NOT EXISTS user_details (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email TEXT UNIQUE,
                phone_number TEXT NOT NULL UNIQUE,
                address TEXT,
                created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `;
    return db.run(sql);
  }

  static alterColumn() {
    const sql = `ALTER TABLE users ADD COLUMN reset_password_expires DATETIME`;
    return db.run(sql);
  }

  static async verifyAccessToken(access_token) {
    return new Promise((resolve, reject) => {
      const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
      if (!decoded) {
        return reject(new Error("Invalid access token"));
      }
      const sql = `
        SELECT u.id, u.username, u.password, u.role_id, ud.first_name, ud.last_name, ud.email, ud.phone_number
        FROM users u
        LEFT JOIN user_details ud ON u.id = ud.user_id
        WHERE u.id = ?`;
      db.get(sql, [decoded.id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  static async register(
    username,
    password,
    first_name,
    last_name,
    email,
    phone_number
  ) {
    //password hashing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return new Promise((resolve, reject) => {
      const id = uuidv4(); //Generating a UUID (Unique)
      const sql = `INSERT INTO users (id, username, password) VALUES (?,?,?)`;
      db.run(sql, [id, username, hashedPassword], function (err) {
        if (err) {
          return reject(err);
        } else {
          const user_id = id;
          const sql = `INSERT INTO user_details (id, user_id, first_name, last_name, email, phone_number) VALUES (?,?,?,?,?,?)`;
          db.run(
            sql,
            [uuidv4(), user_id, first_name, last_name, email, phone_number],
            function (err) {
              if (err) {
                return reject(err);
              }
              resolve({ user_id, username });
            }
          );
        }
      });
    });
  }

  static async updateUser(id, username, first_name, last_name, phone_number, email) {
    return new Promise((resolve, reject) => {
      const updateSql = `UPDATE users SET username = ? WHERE id = ?`;
      db.run(updateSql, [username, id], function (err) {
        if (err) {
          return reject(err);
        }
        const sql = `UPDATE user_details SET first_name = ?, last_name = ?, phone_number = ?, email = ? WHERE user_id = ?`;
        db.run(sql, [first_name, last_name, phone_number, email, id], function (err) {
          if (err) {
            return reject(err);
          }
          const sql = `
            SELECT u.id, u.username, u.password, u.role_id, ud.first_name, ud.last_name, ud.email, ud.phone_number
            FROM users u
            LEFT JOIN user_details ud ON u.id = ud.user_id
            WHERE u.id = ?`;
          db.get(sql, [id], (err, row) => {
            if (err) {
              return reject(err);
            }
            resolve(row);
          });
        })
      })
    })
  }

  static async updatePasswordWithExistingPass(id, password, current_password) {
    const saltRounds = salt_rounds;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return new Promise((resolve, reject) => {
      const sql = `SELECT password FROM users WHERE id = ?`;
      db.get(sql, [id], async (err, row) => {
        if (err) {
          return reject(err);
        }

        if (!row) {
          return reject(new Error('Password for this user does not exist'));
        }

        const isMatch = await bcrypt.compare(current_password, row.password);

        if (!isMatch) {
          return reject(new Error("Current password is incorrect"));
        }

        const sql = `UPDATE users SET password = ?, updated = ? WHERE id = ?`;

        db.run(sql, [hashedPassword, new Date().toISOString(), id], function (err) {
          if (err) {
            return reject(err);
          }
          resolve();
        })

      })
    })
  }

  static findUsername(username) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT u.id, u.username, u.password, u.role_id, ud.first_name, ud.last_name, ud.email, ud.phone_number
        FROM users u
        LEFT JOIN user_details ud ON u.id = ud.user_id
        WHERE u.username = ?`;
      db.get(sql, [username], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  static findUserWithEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT id, user_id FROM user_details WHERE email = ?`;
      db.get(sql, [email], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  static saveToken(token, expiresIn, user_id) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE id = ?`;
      db.run(sql, [token, expiresIn.toISOString(), user_id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  static findUserWithResetToken(token) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE reset_password_token = ? AND reset_password_expires > ?`;
      db.get(sql, [token, new Date().toISOString()], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  static updatePassword(newPassword, user_id) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE users SET password =?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?`;
      db.run(sql, [newPassword, user_id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}

module.exports = User;
