// Standardized response function
import {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
    signInUserService
} from "../models/userModel.js";
import e from "express";
import bcrypt from "bcryptjs";

const handleResponse = (res, status, message, data) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const createUser = async (req, res, next) => {
    try{
        const {firstName, lastName, email, phone, password, accountType} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await createUserService(firstName, lastName, email, phone, hashedPassword, accountType);
        res.status(201).json({
            status: 201,
            message: "User registered successfully",
            data: newUser,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllUsers = async (req, res, next) => {
    try{
        const users = await getAllUsersService();
        handleResponse(res, 200, "Users retrieved successfully", users);
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if (!user) {
            return handleResponse(res, 404, "User not found", null);
        }
        handleResponse(res, 200, "User retrieved successfully", user);
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    const { name, email } = req.body;
    try{
        const updatedUser = await updateUserService(req.params.id, name, email);
        if (!updatedUser) {
            return handleResponse(res, 404, "User not found", null);
        }
        handleResponse(res, 200, "User updated successfully", updatedUser);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try{
        const deletedUser = await deleteUserService(req.params.id);
        if (!deletedUser) {
            return handleResponse(res, 404, "User not found", null);
        }
        handleResponse(res, 200, "User deleted successfully", deletedUser);
    } catch (err) {
        next(err);
    }
};

export const signInUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: "Email and password are required",
                data: null,
            });
        }

        // Find user by email
        const user = await signInUserService(email);
        
        if (!user) {
            return res.status(401).json({
                status: 401,
                message: "Invalid email or password",
                data: null,
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 401,
                message: "Invalid email or password",
                data: null,
            });
        }

        // Don't send password in response
        const { password: _, ...userWithoutPassword } = user;
        
        res.status(200).json({
            status: 200,
            message: "User signed in successfully",
            data: userWithoutPassword,
        });
    } catch (err) {
        next(err);
    }
};