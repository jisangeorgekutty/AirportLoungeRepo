using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirportLounge.Application.DTOs.Authentication
{
    public class UserProfileResponse
    {
        public long Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Avatar { get; set; }
        public string Role { get; set; } = string.Empty;
        public string? UserType { get; set; }
        public bool IsOnboardingCompleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
