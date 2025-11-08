import pool from "../config/db.js";

export const getAllUsersService = async () => {
    const result = pool.query("SELECT * FROM users");
    return result.rows;
};
export const getUserByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
    return result.rows[0];
};
export const createUserService = async (first_name, last_name, email, phone, password, account_type) => {
    const result = await pool.query("INSERT INTO users (first_name, last_name, email, phone, password, account_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [first_name, last_name, email, phone, password, account_type]);
    return result.rows[0];
};
export const updateUserService = async (id, first_name, last_name, email, phone, password, account_type) => {
    const result = await pool.query("UPDATE users SET first_name = $1, last_name = $2, email = $3, phone = $4, password = $5, account_type = $6 WHERE id = $7 RETURNING *", [first_name, last_name, email, phone, password, account_type, id]);
    return result.rows[0];
};
export const deleteUserService = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};
export const signInUserService = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};