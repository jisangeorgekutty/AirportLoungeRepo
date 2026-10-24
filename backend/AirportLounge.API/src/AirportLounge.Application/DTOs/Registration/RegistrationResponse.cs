using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirportLounge.Application.DTOs.Registration
{
    public class RegistrationResponse
    {
        public long UserId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
