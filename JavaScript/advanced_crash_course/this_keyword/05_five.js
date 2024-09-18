/**
 * Scenario 5: Create an object with a method that returns 
 * a new function. The new function should use this to 
 * refer to a property of the original object. Observe 
 * how this behaves when the function is returned and 
 * called.
 */

const Object = {
    property: 'This is a property of the object',
    method: function() {
        return function newFunction() {
            console.log(`Accessing property value: ${this.property}`);
        }.bind(this);   // explicityly binding
    }
}

const newFunc = Object.method();
newFunc();

// Here, .bind(this) ensures that the this inside newFunction refers to the Object.

