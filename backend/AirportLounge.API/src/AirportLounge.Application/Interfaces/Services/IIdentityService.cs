using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirportLounge.Application.Interfaces.Services
{
    public interface IIdentityService
    {
        Task<(string FullName, string Email, string Phone, string? AvatarUrl)?> GetUserBasicInfoAsync(long userId);
        Task UpdateUserBasicInfoAsync(long userId, string? fullName, string? phone);
        Task UpdateUserAvatarAsync(long userId, string avatarUrl);
        Task<bool> IsInRoleAsync(long userId, string roleName);
        Task<List<string>> GetUserRolesAsync(long userId);
        Task AddToRoleAsync(long userId, string roleName);
        Task<List<long>> GetUserIdsInRoleAsync(string roleName);
        Task<List<(long Id, string Name, string Email, string Role, string Joined, System.DateTime CreatedOn, string Status)>> GetAllUsersInfoAsync(string? search, string? role, string? status);
        Task<List<(long Id, string Name, string Email, string Role, System.DateTime CreatedOn)>> GetRecentUsersAsync(int count);
    }
}
