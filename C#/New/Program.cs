using System;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

namespace Sample
{
    class Program 
    {
        public static void Main(string[] args)
        {
            /*
            // Test.RunTest();
            // Tenary.CheckEven();
            // Loops.forLoop();
            // Loops.doWhileLoop();

            // Switch.switchCase();
            // Switch.groupedCases();

            // GoTo.gotoExample();
            */

            // Arrays.forEach();
            // Arrays.multiDimentional();
            // Arrays.jaggedArray();
            
            /*
            Console.WriteLine("Lists");
            DataStructures.lists();
            Console.WriteLine();

            Console.WriteLine("ArrayList");
            DataStructures.ArrayList();
            Console.WriteLine();

            Console.WriteLine("Stacks");
            DataStructures.stacks();
            Console.WriteLine();

            Console.WriteLine("Queues");
            DataStructures.queues();
            Console.WriteLine();

            Console.WriteLine("Sorted List");
            DataStructures.sortedList();
            Console.WriteLine();

            Console.WriteLine("Hash Table");
            DataStructures.hashTable();
            Console.WriteLine();

            Console.WriteLine("Dictionaries");
            DataStructures.dictionaries();
            */

            // OOP
            Console.WriteLine("OOP");

            // create an instance of the OOP class
            OOP oop = new OOP();
            oop.display();

            // call the addNumber method
            int summation  = OOP.addNumbers(5, 10);
            Console.WriteLine($"Summation: {summation}");

            // accessing public field
            Console.WriteLine($"Name: {oop.name}");

            // accessing private field
            // Console.WriteLine($"Writer: {oop.writer}"); // this will throw an error

            // accessing protected field
            // Console.WriteLine($"Music: {oop.music}"); // this will throw an error

            // accessing internal field
            Console.WriteLine($"Artist: {oop.artist}");
        }
    }

    class Test
    {
        public static void RunTest()
        {
            string testString;
            Console.Write("Enter a string -");
            testString = Console.ReadLine() ?? string.Empty;
            Console.WriteLine($"You entered: {testString}");
        }
    }

    class Tenary
    {
        public static void CheckEven()
        {
            int number = 2;
            bool isEven;

            isEven = (number % 2 == 0) ? true : false ;
            Console.WriteLine(isEven);
        }
    }

    class Loops
    {
        public static void forLoop()
        {
            for (int i=1; i<=5; i++)
            {
                Console.WriteLine($"C# for loop (Single initialization): Iteration {i}");
            }

            for (int i=0, j=0; i+j<=5; i++, j++)
            {
                Console.WriteLine($"C# for loop (Multiple initialization):\ni: {i}, j: {j} = Iteration {i+j}");
            }
        }

        public static void whileLoop()
        {
            int i = 1;
            while (i <= 5)
            {
                Console.WriteLine($"C# while loop: Iteration {i}");
                i++;
            }
        }

        public static void doWhileLoop()
        {
            int i = 1, n = 5, product;
            do 
            {
                product = n * i;
                Console.WriteLine($"{n} * {i} = {product}");
                i++;
            } while (i <= 10);
        }
    }

    class Switch
    {
        public static void switchCase()
        {
            int number = 2;
            switch (number)
            {
                case 1:
                    Console.WriteLine("Number is 1");
                    break;
                case 2:
                    Console.WriteLine("Number is 2");
                    break;
                case 3:
                    Console.WriteLine("Number is 3");
                    break;
                default:
                    Console.WriteLine("Number is not 1, 2 or 3");
                    break;
            }
        }

        public static void groupedCases()
        {
            char ch;
            Console.WriteLine("Enter an alphabet: ");
            ch = Convert.ToChar(Console.ReadLine() ?? string.Empty);

            switch(Char.ToLower(ch))
            {
                case 'a':
                case 'e':
                case 'i':
                case 'o':
                case 'u':
                    Console.WriteLine("Vowel");
                    break;
                default:
                    Console.WriteLine("Consonant");
                    break;
            }

        }
    }

    class GoTo
    {
        public static void gotoExample()
        {
            int i = 1;
            loop:
                Console.WriteLine($"Iteration {i}");
                i++;
                if (i <= 5)
                {
                    goto loop;
                }

            Console.WriteLine($"{i} is greater than 5");
        }
    }

    class Arrays
    {
        public static void forEach()
        {
            int[] numbers = {1, 2, 3};

            Console.WriteLine("Array Element: ");
            foreach (int num in numbers)
            {
                Console.WriteLine(num);
            }
        }

        public static void multiDimentional()
        {
            int[,] matrix = new int [2, 2] {{1, 2}, {3, 4}};
            Console.WriteLine("Matrix Element: ");
            foreach (int num in matrix)
            {
                Console.WriteLine(num);
            }

            // iterating over each row and column
            for(int i = 0; i < matrix.GetLength(0); i++)
            {
                string rowOutput = $"Row {i}:\n";
                for(int j = 0; j < matrix.GetLength(1); j++)
                {
                    rowOutput += $"matrix[{i}, {j}]: {matrix[i, j]}\n";
                }
                Console.WriteLine(rowOutput);
            }
        }

        public static void jaggedArray()
        {
            /// summary
            /// A jagged array is an array of arrays. Specifically arrays of different sizes.
            /// summary
            // create a jagged array
            int[][ ] jaggedArray = {
                new int[] {1, 3, 5},
                new int[] {2, 4},
            };

            Console.WriteLine($"jaggedArray[1][0]: {jaggedArray[1][0]}");
            Console.WriteLine($"jaggedArray[1][1]: {jaggedArray[1][1]}");

            Console.WriteLine($"jaggedArray[0][2]: {jaggedArray[0][2]}");
        }
    }
    
    class DataStructures
    {
        public static void lists()
        {
            /// summary
            /// store multiple elements of the same data type
            /// summary

            // create a list
            List<string> subjects = new List<string>() { "English", "Math", "Science" };

            foreach(string subject in subjects)
            {
                Console.WriteLine($"Subject: {subject}");   
            }

            List<string> names = new List<string>() { "Bernd", "Asante", "John", "Doe" };
            foreach(var (name, index) in names.Select((name, index) => (name, index)))
            {
                Console.WriteLine($"Personnel {index+1}: {name}");
            }
        }

        public static void stacks()
        {
            /// summary
            /// LIFO (Last In First Out)
            /// summary
            
            // create a stack
            Stack<string> country = new Stack<string>();
            country.Push("Ghana");
            country.Push("Nigeria");
            country.Push("South Africa");
            country.Push("Cote d'Ivoire");

            foreach(string c in country)
            {
                Console.WriteLine($"Countries in Africa: {c}");
            }

            country.Pop();
            Console.WriteLine("After popping a country");
            foreach(string c in country)
            {
                Console.WriteLine($"Countries in Africa: {c}");
            }

            Console.WriteLine($"Element at the top of the stack: {country.Peek()}");

            // remove a specific element
            string elementToRemove = "Nigeria";
            RemoveElementFromStack(country, elementToRemove);
            foreach(string c in country)
            {
                Console.WriteLine($"Countries in Africa: {c}");
            }
        }

        public static void RemoveElementFromStack(Stack<string> stack, string element)
        {
            Stack<string> tempStack = new Stack<string>();

            while (stack.Count > 0)
            {
                string top = stack.Pop();
                if (top.Equals(element, StringComparison.OrdinalIgnoreCase))
                {
                    break;
                }
                tempStack.Push(top);
            }

            // transfer remaining elements back
            while (tempStack.Count > 0)
            {
                stack.Push(tempStack.Pop());
            }
        }

        public static void queues()
        {
            /// summary
            /// FIFO (First In First Out)
            /// summary
            
            // create a queue
            Queue<string> fruits = new Queue<string>();

            fruits.Enqueue("Wendy Shay");

            // add some fruits
            fruits.Enqueue("Apple");
            fruits.Enqueue("Orange");

            foreach(string fruit in fruits)
            {
                Console.WriteLine($"Fruit: {fruit}");
            }

            // remove an element
            var removed_Fruit = fruits.Dequeue();
            Console.WriteLine($"Removed Fruit: {removed_Fruit}");

            // now peek to see if it's removed
            Console.WriteLine($"First Fruit: {fruits.Peek()}");

            // check if 'Wendy Shay' is a fruit
            Console.WriteLine($"Is Wendy Shay a fruit? {fruits.Contains("Wendy Shay")}");
        }

        public static void sortedList()
        {
            /// summary
            /// A collection of key/value pairs that are sorted by the key
            /// summary
            
            // create a sorted list
            SortedList languages = new SortedList();
            languages.Add(1, "C#");
            languages.Add(2, "Python");
            languages.Add(3, "Java");
            languages.Add(5, "C++");
            languages.Add(4, "Twi");

            foreach(DictionaryEntry lang in languages)
            {
                Console.WriteLine($"Programming Languages: {lang.Value}");

                // getting the key-value pairs
                Console.WriteLine($"Key: {lang.Key}, Value: {lang.Value}");

                // getting key and index
                Console.WriteLine($"Key: {lang.Key}, Index: {languages.IndexOfKey(lang.Key)}");
            }

            // remove 'Twi'
            languages.Remove(4);

            languages.Add(6, "English");
            languages.Add(7, "C");

            // remove 'English'
            languages.RemoveAt(4);
            foreach(DictionaryEntry lang in languages)
            {
                Console.WriteLine($"New Programming Languages sorted list: {lang.Value}");
            }
        }                 

        public static void ArrayList()
        {
            /// summary
            /// A collection of objects that can be dynamically resized
            /// summary
            /// 

            // create an ArrayList
            ArrayList student = new ArrayList();

            student.Add("Jackson");
            student.Add(5);

            foreach(var item in student)
            {
                Console.WriteLine($"Item: {item}");
            }

            ArrayList metrics = new ArrayList() { "cm", 24, "m" };
            foreach(var met in metrics)
            {
                Console.WriteLine($"Metric: {met}");
            }
        }

        public static void hashTable()
        {
            /// summary
            /// A collection of key/value pairs that are organized based on the hash code of the key
            /// summary
            
            // create a hashtable
            Hashtable data = new Hashtable();
            data.Add("Name", "Bernd");
            data.Add("Age", 25);
            data.Add("Country", "Ghana");
            data.Add("Profession", "Software Developer");
            data.Add("City", "Accra");
            data.Add("Hello", "World");

            // first way to iterate
            foreach(DictionaryEntry item in data)
            {
                Console.WriteLine($"Key: {item.Key}, Value: {item.Value}");
            }

            // getting the keys
            foreach(var key in data.Keys)
            {
                Console.WriteLine($"Key: {key}, Value: {data[key]}");
            }

            // getting the values
            foreach(var val in data.Values)
            {
                Console.WriteLine($"Value: {val}, Key: {data[val]}");
            }

            data.Remove("Hello");
            foreach(DictionaryEntry item in data)
            {
                Console.WriteLine($"Key: {item.Key}, Value: {item.Value}");
            }
        } 

        public static void dictionaries()
        {
            /// summary
            /// A collection of key/value pairs
            /// summary
            
            // create a dictionary
            Dictionary<int, string> dishes = new Dictionary<int, string>();
            dishes.Add(1, "Jollof Rice");
            dishes.Add(2, "Waakye");
            dishes.Add(5, "Beans");
            dishes.Add(4, "Fufu");
            dishes.Add(6, "Love");

            foreach(KeyValuePair<int, string> dish in dishes)
            {
                Console.WriteLine($"Key: {dish.Key}, Value: {dish.Value}");
            }
            
        }
    }

    class OOP
    {
        public void display() 
        {
            Console.WriteLine("Hello from the OOP class!");
        }

        public static int addNumbers (int a, int b)
        {
            int sum = a+b;
            return sum;
        }

        // studying access modifiers
        // public access modifier
        public string name = "Sheeran";

        // private access modifier
        private string writer = "Shakespare";

        // protected access modifier
        protected string music = "Sh-Boom";

        // internal access modifier
        internal string artist = "Beyonce";

    }
}
