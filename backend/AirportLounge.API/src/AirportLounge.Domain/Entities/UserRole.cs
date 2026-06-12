using AirportLounge.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirportLounge.Domain.Entities
{
    public class UserRole:OrderableBaseEntity
    {
        public string? Name { get; set; }
    }
}
