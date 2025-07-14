using System.Collections.Immutable;
using Microsoft.AspNetCore.Mvc;

namespace MyFirstApi.Controllers
{
    [ApiController]
    [Route("api/languages")]
    public class LanguagesController : ControllerBase
    {
        private readonly LanguageService _languageService;

        public class LanguageRequest
        {
            public string? Language { get; set; }
        }

        public class UpdatedLanguageRequest
        {
            public string? NewLanguage { get; set; }
        }

        public LanguagesController(LanguageService languageService)
        {
            _languageService = languageService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<string>> GetLanguages()
        {
            return Ok(_languageService.GetAllLanguages());
        }

        [HttpGet("{id}")]
        public ActionResult<string> GetLanguageById(int id)
        {
            var language = _languageService.GetLanguageById(id);
            if (language == null) return NotFound($"Language with id {id} not found");

            return Ok(language);
        }

        [HttpPost]
        public async Task<ActionResult> AddLanguage([FromBody] string language)
        {
           if (string.IsNullOrWhiteSpace(language)) return BadRequest("Language name is required");

           bool added = await _languageService.AddLanguage(language);
           
           return added ? Ok("Language added successfully.") : Conflict("Language already exists.");
        }

        [HttpDelete("{language}")]
        public ActionResult DeleteLanguage(string language)
        {
            if (string.IsNullOrWhiteSpace(language)) return BadRequest("Language name is required");

            bool deleted = _languageService.DeleteLanguage(language);

            return deleted ? Ok("Language deleted successfully") : NotFound("Language not found");
        }

        [HttpPut("{oldLanguage}")]
        public ActionResult UpdateLanguage(string oldLanguage, [FromBody] UpdatedLanguageRequest request)
        {
            if (string.IsNullOrWhiteSpace(oldLanguage) || string.IsNullOrWhiteSpace(request.NewLanguage)) return BadRequest("Both old and new language names are required");

            bool updated = _languageService.UpdateLanguage(oldLanguage, request.NewLanguage);
            
            return updated ? Ok("Language updated successfully") : NotFound("Language not found");
        }
        
    }
}