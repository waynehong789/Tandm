using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Tandm.Functions;
using Tandm.Models;
using Tandm.Services;
using Tandm.Validators;

namespace Tandm.Controllers
{
    [ApiController]
    [Route("api")]
    public class CalculatorController : ControllerBase
    {
        private IUserService _userService;
        private readonly ILogger<CalculatorController> _logger;

        public CalculatorController(IUserService userService, ILogger<CalculatorController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("authenticate")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest request)
        {
            var validator = new AuthenticateValidator();
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest();
            }

            var response = _userService.Authenticate(request);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [Authorize]
        [HttpPost("calculation")]
        public async Task<IActionResult> Calculate([FromBody] CalculationRequest request)
        {
            var validator = new CalculationValidator();
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest();
            }

            decimal result = Calculator.Execute(request);
            return Ok(result);
        }
    }
}
