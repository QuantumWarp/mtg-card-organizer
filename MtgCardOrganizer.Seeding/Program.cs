using System;
using MtgCardOrganizer.Seeding.Main;

namespace MtgCardOrganizer.Seeding
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("Starting");

            var mainSeeder = new MainSeeder();
            mainSeeder.Run();
            
            Console.WriteLine("Complete");
            Console.ReadLine();
        }
    }
}
