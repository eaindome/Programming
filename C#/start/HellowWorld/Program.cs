// See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");
using System;
using System.Linq;

namespace Sample
{
    class Test
    {
        public static void Main(string[] args)
        {
            int[] numbers = { 1, 2, 3};

            Console.WriteLine($"Smallest Elements: {numbers.Min()}");

            Console.WriteLine($"Largest Element: {numbers.Max()}");

            Console.ReadLine();
        }
    }
}


