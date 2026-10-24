using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirportLounge.Application.DTOs.Authentication
{
    public class GoogleAuthRequest
    {
        public string? IdToken { get; set; }
        public string? Role { get; set; }
    }
}
