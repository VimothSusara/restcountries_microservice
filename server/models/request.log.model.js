const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

class RequestLog {
    static createRequestLogTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS request_logs (
                id TEXT,
                api_key_id TEXT NOT NULL,
                user_id TEXT NOT NULL,
                request_method TEXT NOT NULL,
                request_url TEXT NOT NULL,
                response_status INTEGER NOT NULL,
                response_time INTEGER,
                ip_address TEXT,
                created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `;
        return db.run(sql);
    }

    static alterColumn() {
        const sql = `ALTER TABLE request_logs ALTER id TEXT`;
        return db.run(sql);
    }

    static async logRequest(api_key_id, user_id, request_method, request_url, response_status, response_time, ip_address) {
        const id = uuidv4();
        const sql = `INSERT INTO request_logs (id, api_key_id, user_id, request_method, request_url, response_status, response_time, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.run(sql, [id, api_key_id, user_id, request_method, request_url, response_status, response_time, ip_address], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(id);
            });
        });
    }

}

module.exports = RequestLog;
