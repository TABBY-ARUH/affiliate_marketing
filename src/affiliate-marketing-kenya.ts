import express, { Request, Response, NextFunction } from "express";

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Example middleware function for logging requests
const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Received ${req.method} request to ${req.path}`);
    next();
};
app.use(loggerMiddleware);

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
