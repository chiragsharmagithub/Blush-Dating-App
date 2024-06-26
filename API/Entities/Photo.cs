using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace API.Entities
{
    // Entity Framework will create a table called "Photos" in database
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string? Url { get; set; }
        public bool IsMain { get; set; }
        public string? PublicId { get; set; }

        // Fully defining the relationship between our app user and photo
        public AppUser AppUser { get; set;}
        public int AppUserId { get; set;}
    }
}