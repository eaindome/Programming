using System;

namespace Sample
{
    class OOP
    {
        public void Display()
        {
            Console.WriteLine("Hello from the OOP class!");
        }

        public static int AddNumbers(int a, int b)
        {
            int sum = a+b;
            return sum;
        }

        // studying access modifiers
        // public access modifier
        public string name = "Sheeran";

        // private access modifier
        private string writer = "Shakespeare";

        // protected access modifier
        protected string music = "Sh-Boom";

        // internal access modifier
        internal string artist = "Beyonce";
    }

    class Employee
    {
        public string name = string.Empty;

        public void work(string work)
        {
            Console.WriteLine($"Work: {work}");
        }
    }
}