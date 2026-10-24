using System;

using Microsoft.AspNetCore.Identity;

namespace AirportLounge.Infrastructure.Identity.Models;

public class ApplicationUser : IdentityUser<long>
{
    public string? FullName { get; set; }
    public string? AvatarUrl { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiry { get; set; }
    public string? UserType { get; set; }
    public bool IsOnboardingCompleted { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
