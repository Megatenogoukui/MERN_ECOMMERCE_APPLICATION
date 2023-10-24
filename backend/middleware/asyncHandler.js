// Define a function called asyncHandler
const asyncHandler = fn => (req, res, next) => {
    // Inside the asyncHandler function, we return a new function that takes three arguments: req, res, and next.
  
    // Convert the result of calling the fn function into a Promise using Promise.resolve
    Promise.resolve(fn(req, res, next))
      // If there's an error (exception) in the code inside fn, catch it and call the next function with the error
      .catch(next);
  };
  
  // Export the asyncHandler function to make it available to other parts of your code
  export default asyncHandler;
  
  