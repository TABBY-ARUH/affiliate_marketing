"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Create Express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Parse JSON bodies
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded bodies
// Example middleware function for logging requests
const loggerMiddleware = (req, res, next) => {
    console.log(`Received ${req.method} request to ${req.path}`);
    next();
};
app.use(loggerMiddleware);
// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
