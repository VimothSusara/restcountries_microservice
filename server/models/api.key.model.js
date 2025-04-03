const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

class ApiKey {
  static createTable() {
    const sql = `
            CREATE TABLE IF NOT EXISTS api_keys (
                id TEXT PRIMARY KEY,
                key TEXT NOT NULL UNIQUE,
                user_id TEXT NOT NULL,
                active INTEGER NOT NULL DEFAULT 1,
                last_used TIMESTAMP,
                used_count INTEGER DEFAULT 0,
                created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `;
    return db.run(sql);
  }

  static createRequestLogTable() {
    const sql = `
            CREATE TABLE IF NOT EXISTS request_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                api_key_id TEXT NOT NULL,
                request_method TEXT NOT NULL,
                request_url TEXT NOT NULL,
                response_status INTEGER,
                request_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `;
    return db.run(sql);
  }

  static alterColumn() {
    const sql = `ALTER TABLE api_keys ADD COLUMN label TEXT`;
    return db.run(sql);
  }

  // static async createApiKey(user_id) {
  //   const id = uuidv4();
  //   const key = uuidv4();

  //   // Hash the key for security
  //   const saltRounds = 10;
  //   const hashedKey = await bcrypt.hash(key, saltRounds);

  //   return new Promise((resolve, reject) => {
  //     const check_existing_key_sql = `SELECT * FROM api_keys WHERE user_id = ?`;
  //     db.get(check_existing_key_sql, [user_id], async (err, existing_key) => {
  //       if (err) {
  //         return reject(err);
  //       } else {
  //         if (existing_key) {
  //           const update_api_key_sql = `UPDATE api_keys SET key = ? WHERE user_id = ?`;
  //           db.run(update_api_key_sql, [hashedKey, user_id], (err) => {
  //             if (err) {
  //               return reject(err);
  //             }
  //             resolve(key);
  //           });
  //         }
  //         const insert_api_key_sql = `INSERT INTO api_keys (id, key, user_id) VALUES (?,?,?)`;
  //         db.run(insert_api_key_sql, [id, hashedKey, user_id], (err) => {
  //           if (err) {
  //             return reject(err);
  //           }
  //           resolve(key);
  //         });
  //       }
  //     });
  //   });
  // }

  //generate a unique api key
  static async generateApiKey() {
    const key = crypto.randomBytes(32).toString("hex");
    return key;
  }

  //save the api key
  static async saveApiKey(user_id, key, label) {
    const api_key_id = uuidv4();
    const saltRounds = 10;
    const hashedKey = await bcrypt.hash(key, saltRounds);
    return new Promise((resolve, reject) => {
      const check_existing_key_sql = `SELECT * FROM api_keys WHERE user_id =?`;
      db.all(check_existing_key_sql, [user_id], async (err, existing_keys) => {
        if (err) {
          return reject(err);
        }
        if (existing_keys) {
          console.log("Rows: ", existing_keys);
          for (let existing_key of existing_keys) {
            const isMatch = await bcrypt.compare(key, existing_key.key);
            if (isMatch) {
              return reject(new Error("API key already exists."));
            }
          }
        } else {
          const insert_api_key_sql = `INSERT INTO api_keys (id, key, label, user_id) VALUES (?,?,?,?)`;
          db.run(
            insert_api_key_sql,
            [api_key_id, hashedKey, label, user_id],
            (err) => {
              if (err) {
                return reject(err);
              }
              resolve(key);
            }
          );
        }
      });
    });
  }

  static async validate(key, user_id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM api_keys WHERE user_id = ? AND active = 1`;
      db.get(sql, [user_id], (err, row) => {
        if (err) {
          return reject(err);
        } else if (row) {
          bcrypt
            .compare(key, row.key)
            .then((isMatch) => {
              if (isMatch) {
                const usage_sql = `UPDATE api_keys SET last_used = CURRENT_TIMESTAMP, used_count = used_count + 1 WHERE key = ?`;
                db.run(usage_sql, [row.key]);
                return resolve(row);
              }
              resolve(null);
            })
            .catch((err) => reject(err));
        } else {
          resolve(null);
        }
      });
    });
  }
}

module.exports = ApiKey;
