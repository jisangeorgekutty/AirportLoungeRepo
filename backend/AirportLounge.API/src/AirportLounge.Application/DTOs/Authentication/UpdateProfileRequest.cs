using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirportLounge.Application.DTOs.Authentication
{
    public class UpdateProfileRequest
    {
        public string? FullName { get; set; }
        public string? Name { get; set; }
        public string? Avatar { get; set; }
    }
}
