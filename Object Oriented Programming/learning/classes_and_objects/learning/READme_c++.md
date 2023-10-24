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


