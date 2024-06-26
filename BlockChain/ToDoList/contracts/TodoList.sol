// specify the version of solidity
pragma solidity ^0.5.0;

// define a new contract named TodoList
contract TodoList {
    // declare a state variable `taskCount` of type uint (unsigned integer) and make it publicly accessible
    uint public taskCount = 0;      

    // define a struct name task to represent with an id, content, and completion status
    struct Task {
        uint id;            // unique identifier for tasks
        string content;     // description of task
        bool completed;     // status of the task, true if completed, false otherwise
    }

    // declare a mapping that assocates a uint (task id) with a Task struct
    mapping(uint => Task) public tasks;

    // constructor function that is executed once when the contract is deployed
    constructor() public {
        // automatically create an initial task when the contract is deployed
        createTask("Learn about smart contract.");
    }

    // define a function to create a new task
    function createTask(string memory _content) public {
        taskCount ++;                                           // increment the taskCount by 1
        tasks[taskCount] = Task(taskCount, _content, false);    // add the new task to the mapping with the new taskCount as the key
    }
}