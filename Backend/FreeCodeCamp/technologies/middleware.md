Middleware
Middleware functions in Express.js (and in other web frameworks) are functions that have access to the req (request) and res (response) objects, as well as the next function in the application's request-response cycle. These middleware functions can execute any code, make changes to the request and response objects, end the request-response cycle, or call the next() function to pass control to the next middleware function.

Key Concepts of Middleware:
Request-Response Cycle:

When a request is made to an Express application, it goes through a sequence of middleware functions before a response is sent back to the client.
Middleware functions form a "stack" that processes requests one by one.
next() Function:

The next() function is crucial in middleware. It tells Express to move on to the next middleware function in the stack.
If next() is not called, the request will be left hanging, and the server will not respond to the client.

Types of Middleware:
1. Application-Level Middleware: This middleware is bound to an instance of express() using app.use() or app.METHOD() (e.g., app.get()).
2. Router-Level Middleware: Similar to application-level middleware but bound to an instance of express.Router().
3. Built-in Middleware: Express comes with built-in middleware like express.static() for serving static files.
4. Third-Party Middleware: Middleware functions provided by external libraries, like body-parser, morgan, cors, etc.

Common Use Cases:
1. Logging: Log details about each request (method, path, IP, etc.).
2. Authentication: Check if a user is authenticated before accessing certain routes.
3. Body Parsing: Parse incoming request bodies (e.g., application/json).
4. Error Handling: Catch and handle errors that occur during the request processing.

Middleware Execution Flow:
1. Initial Request: The client sends a request to the server.
2. First Middleware: The request hits the first middleware in the stack, which might modify the request or response objects or log information.
3. Calling next(): The first middleware calls next() to pass control to the next middleware.
4. Subsequent Middleware: Each subsequent middleware function processes the request further.
5. Route Handling: Eventually, the request reaches a route handler that sends back a response.
6. Response Sent: The response is sent back to the client.

Middleware Order Matters:
The order in which middleware is defined is important. If a middleware does not call next(), the request-response cycle will be halted, and subsequent middleware or route handlers will not run.
For example, if you have an authentication middleware, you want to ensure it runs before any route handlers that require the user to be authenticated.
Error-Handling Middleware:
Express also allows for error-handling middleware. This middleware has a slightly different signature and is defined with four arguments: err, req, res, next.















Types of middleware

// Logger middleware
app.use((req, res, next) => {
    console.log("This runs for every request");
    next();
});

// Route handler
app.get('/some-path', (req, res) => {
    res.send("This is the response for /some-path");
});

// This middleware will not run for requests to '/some-path'
app.use((req, res, next) => {
    console.log("This runs only if no routes match");
    next();
});
