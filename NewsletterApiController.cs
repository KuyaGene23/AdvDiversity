using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Newsletters;
using Sabio.Models.Requests.Newsletters;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/newsletters")]
    [ApiController]
    public class NewsletterApiController : BaseApiController
    {
        private INewsletterService _service = null;
        private IAuthenticationService<int> _authService = null;

        public NewsletterApiController(INewsletterService service 
            , ILogger<NewsletterApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Newsletters>>> getPage(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Newsletters> page = _service.GetNewslettersPaginated(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource Not Found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Newsletters>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteNewsletter(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(NewsletterUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUser().Id;
                _service.UpdateNewsletter(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);


        }

        public ActionResult<ItemResponse<int>> Create(NewsletterAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUser().Id;
                int id = _service.AddNewsletter(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);

            }
            catch (Exception ex) 
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);

            }

            return result;

        }

    }

}
