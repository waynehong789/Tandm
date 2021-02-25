using System;
using Tandm.Enums;

namespace Tandm.Models
{
    public class CalculationRequest
    {
        public decimal FirstNumber { get; set; }
        public decimal SecondNumber { get; set; }
        public string Operation { get; set; }
    }
}
