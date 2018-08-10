using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

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
            context.Result = ToResult(context.Exception);
            _logger.LogError(_globalExceptionEventId, exception, "Global Exception");
        }

        private ObjectResult ToResult(Exception ex)
        {
            var result = new ObjectResult(ex);
            result.StatusCode = (int)HttpStatusCode.InternalServerError;
            return result;
        }
    }
}