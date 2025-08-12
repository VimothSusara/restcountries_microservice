const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { salt_rounds, maximum_api_keys } = require("../utils/constant.values");
const { use } = require("../routes/auth.routes");
const { resolve } = require("path");

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

  static createDeletedApiKeyTable() {
    const sql = `
            CREATE TABLE IF NOT EXISTS deleted_api_keys (
                id TEXT PRIMARY KEY,
                key TEXT NOT NULL UNIQUE,
                user_id TEXT NOT NULL,
                active INTEGER NOT NULL DEFAULT 1,
                last_used TIMESTAMP,
                used_count INTEGER DEFAULT 0,
                label TEXT,
                key_prefix TEXT,
                deleted TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `;
    return db.run(sql);
  }

  static alterColumn() {
    const sql = `ALTER TABLE deleted_api_keys ADD COLUMN deleted_by TEXT`;
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
    const saltRounds = salt_rounds;
    const hashedKey = await bcrypt.hash(key, saltRounds);

    //key prefix
    const key_prefix = `${key.substring(0, 4)}...${key.substring(key.length - 4)}`;

    return new Promise((resolve, reject) => {
      const check_existing_key_sql = `SELECT * FROM api_keys WHERE user_id =?`;
      db.all(check_existing_key_sql, [user_id], async (err, existing_keys) => {

        if (err) {
          return reject(err);
        }

        //check for maximum number of keys for a user
        if (existing_keys && existing_keys.length >= maximum_api_keys) {
          return reject(new Error("Maximum number of API keys reached."));
        }

        //check if the key already exists
        if (existing_keys && existing_keys.length > 0) {
          console.log("Rows: ", existing_keys);
          for (let existing_key of existing_keys) {
            try {
              const isMatch = await bcrypt.compare(key, existing_key.key);
              if (isMatch) {
                return reject(new Error("API key already exists."));
              }
            }
            catch (err) {
              return reject(err)
            }
          }
        }


        const insert_api_key_sql = `INSERT INTO api_keys (id, key, label, user_id, key_prefix) VALUES (?,?,?,?,?)`;
        db.run(
          insert_api_key_sql,
          [api_key_id, hashedKey, label, user_id, key_prefix],
          (err) => {
            if (err) {
              return reject(err);
            }

            const sql = `SELECT * FROM api_keys WHERE id = ?`;
            db.get(
              sql,
              [api_key_id],
              (err, row) => {
                if (err) {
                  return reject(err);
                }

                if (!row) {
                  return reject(new Error("API key not found."));
                }

                const updatedKey = {
                  id: row.id,
                  key: row.key_prefix,
                  label: row.label,
                  user_id: row.user_id,
                  active: row.active,
                  last_used: row.last_used,
                  used_count: row.used_count,
                  created: row.created,
                  updated: row.updated,
                }

                resolve({ api_key: updatedKey });
              }
            );
          });
      });
    })
  }

  //get all api keys for a user
  static async getApiKeys(user_id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM api_keys WHERE user_id = ?`;
      db.all(sql, [user_id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve({
          api_keys: rows.map((row) => ({
            id: row.id,
            key: row.key_prefix,
            label: row.label,
            user_id: row.user_id,
            active: row.active,
            last_used: row.last_used,
            used_count: row.used_count,
            created: row.created,
            updated: row.updated,
          })),
        });
      });
    });
  }

  //update the api key details
  static async updateApiKey(id, status, label) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE api_keys SET active = ?, label = ? WHERE id = ?`;
      db.run(sql, [status, label, id], (err) => {
        if (err) {
          return reject(err);
        }
        resolve({ id, status, label });
      });
    });
  }

  //delete the api key
  static async deleteApiKey(id, user_id) {
    const selectSql = `SELECT * FROM api_keys WHERE id = ?`;
    db.get(selectSql, [id], (err, row) => {
      if (err) {
        return reject(err);
      }

      if (!row) {
        return reject(new Error("API key not found"))
      }

      const insertSql = `INSERT INTO deleted_api_keys (id, key, user_id, active, last_used, used_count, label, key_prefix, deleted_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.run(insertSql, [
        row.id,
        row.key,
        row.user_id,
        row.active,
        row.last_used,
        row.used_count,
        row.label,
        row.key_prefix,
        user_id
      ], (err) => {
        if (err) {
          return reject(err)
        }

        const deleteSql = `DELETE FROM api_keys WHERE id = ?`;

        db.run(deleteSql, [id], (err) => {
          if (err) {
            return reject(err);
          }

          return resolve({ id });
        });
      })

    })
  }

  static async getApiStats(id) {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN response_status BETWEEN 200 and 299 THEN 1 ELSE 0 END) as success,
        SUM(CASE WHEN response_status >= 400 THEN 1 ELSE 0 END) as failed
      FROM request_logs 
      WHERE user_id = ?`;
      db.get(sql, [id], (err, row) => {
        if (err) {
          return reject(err);
        }

        const { total = 0, success = 0, failed = 0 } = row;

        const success_rate = total === 0 ? 0 : ((success / total) * 100).toFixed(2);

        resolve({
          total,
          success,
          failed,
          success_rate: Number(success_rate)
        })

      })
    })
  }

  static async getDailyUsage(id, limit = 30) {
    const sql = `
    SELECT 
      DATE(created) as date,
      COUNT(*) as total,
      SUM(CASE WHEN response_status BETWEEN 200 AND 299 THEN 1 ELSE 0 END) as success,
      SUM(CASE WHEN response_status >= 400 THEN 1 ELSE 0 END) as failed
    FROM request_logs
    WHERE user_id = ?
    GROUP BY DATE(created)
    ORDER BY date DESC
    LIMIT ?
    `;

    return new Promise((resolve, reject) => {
      db.all(sql, [id, limit], (err, row) => {
        if (err) return reject(err);

        resolve(row.reverse());
      })
    })
  }

  static async getUsageForEachKey(id) {
    const sql = `SELECT active, last_used, used_count, key_prefix FROM api_keys WHERE user_id = ?`;
    return new Promise((resolve, reject) => {
      db.all(sql, [id], (err, row) => {
        if (err) return reject(err);

        resolve(row);
      })
    })
  }

  static async validate(apiKey) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM api_keys WHERE active = 1`;
      db.all(sql, [], async (err, rows) => {
        if (err) {
          return reject(err);
        }

        for (const row of rows) {
          const isMatch = await bcrypt.compare(apiKey, row.key);
          if (isMatch) {
            const usageSql = `
              UPDATE api_keys 
              SET last_used = CURRENT_TIMESTAMP, used_count = used_count + 1
              WHERE id = ?
            `;
            db.run(usageSql, [row.id]);

            return resolve(row);
          }
        }

        resolve(null); // no match found
      });
    });
  }
}

module.exports = ApiKey;
