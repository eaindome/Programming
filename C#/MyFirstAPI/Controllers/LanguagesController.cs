using Microsoft.AspNetCore.Mvc;

namespace MyFirstApi.Controllers
{
    [ApiController]
    [Route("api/languages")]
    public class LanguagesController : ControllerBase
    {
        private static readonly string[] Languages = new[]
        {
            "C#", "JavaScript", "Python", "Java", "Go", "Rust", "Swift"
        };

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return Languages;
        }

        [HttpGet("{id}")]
        public ActionResult<string> GetLanguageById(int id)
        {
            if (id < 0 || id >= Languages.Length)
            {
                return NotFound("Language not found");
            }
            return Ok(Languages[id]);
        }
    }
}