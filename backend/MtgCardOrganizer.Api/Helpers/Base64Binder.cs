using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;

namespace MtgCardOrganizer.Api.Helpers
{
    public class Base64BinderAttribute : ModelBinderAttribute
    {
        public Base64BinderAttribute() : base(typeof(Base64Binder)) { }
    }

    public class Base64Binder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext == null)  
                throw new ArgumentNullException(nameof(bindingContext));  
                
            var queryCollection = bindingContext.ActionContext.HttpContext.Request.Query;
            if (!queryCollection.ContainsKey(bindingContext.FieldName)) {
                bindingContext.Result = ModelBindingResult.Success(null);
                return Task.CompletedTask;
            }

            var base64String = queryCollection[bindingContext.FieldName];
            var decodedData = Convert.FromBase64String(base64String);
            var decodedString = Encoding.UTF8.GetString(decodedData);

            var obj = JsonConvert.DeserializeObject(decodedString, bindingContext.ModelType);
            
            bindingContext.Result = ModelBindingResult.Success(obj);
            return Task.CompletedTask;
        }
    }
}
