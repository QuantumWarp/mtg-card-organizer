using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using MtgCardOrganizer.Bll.Exceptions;
using MtgCardOrganizer.Dal.Exceptions;
using MtgCardOrganizer.Dal.Utilities;

namespace MtgCardOrganizer.Api.Exceptions
{
    public class GlobalExceptionFilter : ExceptionFilterAttribute
    {
        private static EventId _globalExceptionEventId = new EventId(0);

        private ILogger<GlobalExceptionFilter> _logger;

        public GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger)
        {
            _logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {

            var exception = context.Exception;

            var errorModel = new ErrorModel();

            if (PropagatedExceptionTypes.Contains(exception.GetType()))
            {
                errorModel.Message = exception.Message;
                errorModel.Data = exception.Data;
                _logger.LogInformation(_globalExceptionEventId, exception, "Global Exception");
            }
            else
            {
                errorModel.Message = "Unexpected error occurred";
                _logger.LogError(_globalExceptionEventId, exception, "Unexpected Exception");

                var isAdministrator = context.HttpContext.User.Claims
                    .Where(c => c.Type == ClaimTypes.Role)
                    .Any(c => c.Value == Roles.Administrator);

                if (isAdministrator)
                {
                    errorModel.Data = exception;
                }
            }

            context.Result = new ObjectResult(errorModel)
            {
                StatusCode = (int)HttpStatusCode.InternalServerError
            };
        }

        public List<Type> PropagatedExceptionTypes = new List<Type>
        {
            // BLL Exceptions
            typeof(LoginException),
            typeof(RegistrationException),

            // DAL Exceptions
            typeof(PermissionException),
        };
    }
}