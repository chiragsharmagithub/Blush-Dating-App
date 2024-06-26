using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {

        public int Id { get; set; }
        public string UserName { get; set; }  
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        // One-to-Many relationship
        // One user can have many photos
        public ICollection<Photo> Photos { get; set; }
        // public long PhoneNumber { get; set; }
        
        // // Extension function to calculate age of user
        // public int GetAge() 
        // {
        //     return DateOfBirth.CalculateAge();
        // }

    }
}

        // Another method of initialization
        // public int Id { get; set; }
        // public required string UserName { get; set; }
        // private int myVar;
        // public int MyProperty {
        //     get { return myVar; }
        //     set { myVar = value; }
        // } 