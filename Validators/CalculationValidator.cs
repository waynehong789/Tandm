using FluentValidation;
using Tandm.Constants;
using Tandm.Enums;
using Tandm.Models;

namespace Tandm.Validators
{
    public class CalculationValidator : AbstractValidator<CalculationRequest>
    {
        public CalculationValidator()
        {
            RuleFor(x => x.FirstNumber).NotEmpty().WithMessage("First number is required");
            RuleFor(x => x.SecondNumber).NotEmpty().WithMessage("Second number is required");
            RuleFor(x => x.Operation)
                .Must(x => x == OperationType.Addition || x == OperationType.Division || x == OperationType.Multiplication || x == OperationType.Subtraction)
                .WithMessage("Invalid operation parameter");
        }
    }
}