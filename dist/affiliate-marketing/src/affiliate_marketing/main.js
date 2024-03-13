"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet")); // Helmet for security headers
const morgan_1 = __importDefault(require("morgan")); // Morgan for request logging
// Create Express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Parse JSON bodies
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use((0, helmet_1.default)()); // Add security headers
app.use((0, morgan_1.default)('dev')); // Log HTTP requests
// Example middleware function for logging requests
const loggerMiddleware = (req, res, next) => {
    console.log(`Received ${req.method} request to ${req.path}`);
    next();
};
app.use(loggerMiddleware);
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Affiliate Marketing Platform!');
});
// Route for tracking affiliate links
app.get('/product/:productId', (req, res) => {
    const productId = req.params.productId;
    const affiliateId = req.query.affiliate || 'default'; // Retrieve affiliate ID from query parameters
    // Log the affiliate link access (e.g., save to database)
    console.log(`Affiliate ${affiliateId} accessed product ${productId}`);
    // Redirect to the product page or perform other actions
    res.redirect(`/product/${productId}`);
});
// Route for affiliate dashboard
app.get('/affiliate/dashboard', (req, res) => {
    // Render affiliate dashboard view with analytics data
    res.render('dashboard', { /* Affiliate analytics data */});
});
// Example route for handling POST requests (e.g., conversion tracking)
app.post('/conversion', (req, res) => {
    const { productId, affiliateId, userId } = req.body;
    // Track the conversion (e.g., save to database)
    console.log(`Conversion recorded for product ${productId} by affiliate ${affiliateId} for user ${userId}`);
    // Respond with a success message
    res.send('Conversion recorded successfully');
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
