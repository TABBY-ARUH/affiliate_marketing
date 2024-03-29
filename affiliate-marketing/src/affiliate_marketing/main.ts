import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet'; // Helmet for security headers
import morgan from 'morgan'; // Morgan for request logging

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(helmet()); // Add security headers
app.use(morgan('dev')); // Log HTTP requests

// Example middleware function for logging requests
const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Received ${req.method} request to ${req.path}`);
    next();
};
app.use(loggerMiddleware);

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Affiliate Marketing Platform!');
});

// Route for tracking affiliate links
app.get('/product/:productId', (req: Request, res: Response) => {
    const productId = req.params.productId;
    const affiliateId = req.query.affiliate || 'default'; // Retrieve affiliate ID from query parameters
    // Log the affiliate link access (e.g., save to database)
    console.log(`Affiliate ${affiliateId} accessed product ${productId}`);
    // Redirect to the product page or perform other actions
    res.redirect(`/product/${productId}`);
});

// Route for affiliate dashboard
app.get('/affiliate/dashboard', (req: Request, res: Response) => {
    // Render affiliate dashboard view with analytics data
    res.render('dashboard', { /* Affiliate analytics data */ });
});

// Example route for handling POST requests (e.g., conversion tracking)
app.post('/conversion', (req: Request, res: Response) => {
    const { productId, affiliateId, userId } = req.body;
    // Track the conversion (e.g., save to database)
    console.log(`Conversion recorded for product ${productId} by affiliate ${affiliateId} for user ${userId}`);
    // Respond with a success message
    res.send('Conversion recorded successfully');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
