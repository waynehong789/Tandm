
using Tandm.Constants;
using Tandm.Enums;
using Tandm.Models;

namespace Tandm.Functions
{
    public static class Calculator
    {
        public static decimal Execute(CalculationRequest request)
        {   
            decimal result = 0;

            switch(request.Operation)
            {
                case "addition":
                    result = request.FirstNumber + request.SecondNumber;
                    break;
                case "subtraction":
                    result = request.FirstNumber - request.SecondNumber;
                    break;
                case "multiplication":
                    result = request.FirstNumber * request.SecondNumber;
                    break;
                case "division":
                    result = request.FirstNumber / request.SecondNumber;
                    break;
            }
            return result;
        }
    }
    
}