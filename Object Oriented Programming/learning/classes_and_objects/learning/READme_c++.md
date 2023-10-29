A Class:
A class is a blueprint for the object. Using a house as an example, a class is like the sketch (prototype) of a house. It contains all the details about the floors, doors, windows, etc. Based on these descriptions we build the house. House is the object.

An Object:
An object is called an instance of a class.
When a class is defined, only the specification for the object is defined; no memory or storage is allocated.
To use the data and access functions defined in the class, we need to create objects.



C++ and Python Access Data Members and Member Functions
We can access the data members and member functions of a class by using a . (dot) operator. For example,

room2.calculateArea();
This will call the calculateArea() function inside the Room class for object room2.

Similarly, the data members can be accessed as:

room1.length = 5.5;
In this case, it initializes the length variable of room1 to 5.5.


C++ Access Modifiers
One of the main features of object-oriented programming languages such as C++ is data hiding.

Data hiding refers to restricting access to data members of a class. This is to prevent other functions and classes from tampering with the class data.

It is also important to make some member functions and member data accessible so that the hidden data can be manipulated indirectly.
The access modifiers of C++ allows us to determine which class members are accessible to other classes 
and functions, and which are not.

For example,

class Patient {

    private:
        int patientNumber;
        string diagnosis;

    public:

      void billing() {
          // code
      }

      void makeAppointment() {
          // code
      }
}; 
 
Here, the variables patientNumber and diagnosis of the Patient class are hidden using the private keyword, while the member functions are made accessible using the public keyword.

Summary: public, private, and protected
public elements can be accessed by all other classes and functions.
private elements cannot be accessed outside the class in which they are declared, except by friend classes and functions.
protected elements are just like the private, except they can be accessed by derived classes.
Specifiers	Same Class	Derived Class	Outside Class
public	Yes	Yes	Yes
private	Yes	No	No
protected	Yes	Yes	No
Note: By default, class members in C++ are private, unless specified otherwise.



C++ Constructors
A constructor is a special type of member function that is called automatically when an object is created.

In C++, a constructor has the same name as that of the class and it does not have a return type. For example,

class  Wall {
  public:
    // create a constructor
    Wall() {
      // code
    }
};
Here, the function Wall() is a constructor of the class Wall. Notice that the constructor

has the same name as the class,
does not have a return type, and
is public.




C++ Encapsulation
It involves the bundling of data members and functions inside a single class

In general, encapsulation is a process of wrapping similar code in one place.

In C++, we can bundle data members and functions that operate together inside a single class. For example,

class Rectangle {
  public:
    int length;
    int breadth;

    int getArea() {
      return length * breadth;
    }
};
In the above program, the function getArea() calculates the area of a rectangle. To calculate the area, it needs length and breadth.

Hence, the data members (length and breadth) and the function getArea() are kept together in the Rectangle class.

Note: People often consider encapsulation as data hiding, but that's not entirely true.
Encapsulation refers to the bundling of related fields and methods together. This can be used to achieve data hiding. Encapsulation in itself is not data hiding.

Why Encapsulation?
In C++, encapsulation helps us keep related data and functions together, which makes our code cleaner and easy to read.
It helps to control the modification of our data members.

Consider a situation where we want the length field in a class to be non-negative. Here we can make the length variable private and apply the logic inside the method setAge(). For example,

class Rectangle {
  private:
    int age;

  public:
    void setLength(int len) {
      if (len >= 0)
        length = len;
    }
};
The getter and setter functions provide read-only or write-only access to our class members. For example,

getLength()  // provides read-only access
setLength()  // provides write-only access
It helps to decouple components of a system. For example, we can encapsulate code into multiple bundles.

These decoupled components (bundles) can be developed, tested, and debugged independently and concurrently. And any changes in a particular component do not have any effect on other components.
We can also achieve data hiding using encapsulation. In Example 1, if we change the length and breadth variables into private or protected, then the access to these fields is restricted.

And, they are kept hidden from outer classes. This is called data hiding.
Data Hiding
Data hiding is a way of restricting the access of our data members by hiding the implementation details. Encapsulation also provides a way for data hiding.

We can use access modifiers to achieve data hiding in C++. 





C++ Operator Overloading
In C++, we can change the way operators work for user-defined types like objects and structures. This is known as operator overloading. For example,

Suppose we have created three objects c1, c2 and result from a class named Complex that represents complex numbers.

Since operator overloading allows us to change how operators work, we can redefine how the + operator works and use it to add the complex numbers of c1 and c2 by writing the following code:

result = c1 + c2;
instead of something like

result = c1.addNumbers(c2);
This makes our code intuitive and easy to understand.

Note: We cannot use operator overloading for fundamental data types like int, float, char and so on.

Syntax for C++ Operator Overloading
To overload an operator, we use a special operator function. We define the function inside the class or structure whose objects/variables we want the overloaded operator to work with.

class className {
    ... .. ...
    public
       returnType operator symbol (arguments) {
           ... .. ...
       } 
    ... .. ...
};
Here,

returnType is the return type of the function.
operator is a keyword.
symbol is the operator we want to overload. Like: +, <, -, ++, etc.
arguments is the arguments passed to the function.
Operator Overloading in Unary Operators
Unary operators operate on only one operand. The increment operator ++ and decrement operator -- are examples of unary operators.

Note: When we overload operators, we can use it to work in any way we like. For example, we could have used ++ to increase value by 100.

However, this makes our code confusing and difficult to understand. It's our job as a programmer to use operator overloading properly and in a consistent and intuitive way. The above example works only when ++ is used as a prefix. To make ++ work as a postfix we use this syntax.

void operator ++ (int) {
    // code
}
Notice the int inside the parentheses. It's the syntax used for using unary operators as postfix; it's not a function parameter.

Operator Overloading in Binary Operators
Binary operators work on two operands. For example,

result = num + 9;
Here, + is a binary operator that works on the operands num and 9.

When we overload the binary operator for user-defined types by using the code:

obj3 = obj1 + obj2;
The operator function is called using the obj1 object and obj2 is passed as an argument to the function.

Output

Enter first complex number:
Enter real and imaginary parts respectively: 9 5
Enter second complex number:
Enter real and imaginary parts respectively: 7 6
Output Complex number: 16+11i
In this program, the operator function is:

Complex operator + (const Complex& obj) {
    // code
}
Instead of this, we also could have written this function like:

Complex operator + (Complex obj) {
    // code
}
However,

using & makes our code efficient by referencing the complex2 object instead of making a duplicate object inside the operator function.
using const is considered a good practice because it prevents the operator function from modifying complex2.
C++ Binary Operator Overloading
Overloading binary operators in C++
Things to Remember in C++ Operator Overloading
Two operators = and & are already overloaded by default in C++. For example, to copy objects of the same class, we can directly use the = operator. We do not need to create an operator function.
Operator overloading cannot change the precedence and associativity of operators. However, if we want to change the order of evaluation, parentheses should be used.
There are 4 operators that cannot be overloaded in C++. They are:
:: (scope resolution)
. (member selection)
.* (member selection through pointer to function)
?: (ternary operator)
