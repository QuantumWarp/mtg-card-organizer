using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MtgCardOrganizer.Api.Exceptions
{
    public class GlobalExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            context.Result = ToResult(context.Exception);
        }

        private ObjectResult ToResult(Exception ex)
        {
            var result = new ObjectResult(ex);
            result.StatusCode = (int)HttpStatusCode.InternalServerError;
            return result;
        }
    }
}