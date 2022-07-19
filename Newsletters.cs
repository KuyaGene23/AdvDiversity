using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Newsletters
{
    public class Newsletters
    {
        public int Id { get; set; }
        public int TemplateId { get; set; }
        public string Name { get; set; }
        public string CoverPhoto { get; set; }
        public DateTime DateToPublish { get; set; }
        public DateTime DateToExpire { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; } 
        public int CreatedBy { get; set; }


    }
}
