using System.Collections.Immutable;
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

        public class LanguageRequest
        {
            public string? Language { get; set; }
        }

        public class UpdatedLanguageRequest
        {
            public string? NewLanguage { get; set; }
        }

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

        [HttpPost]
        public ActionResult AddLanguage([FromBody] LanguageRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Language))
            {
                return BadRequest("Language cannot be empty");
            }

            // simulate adding by creating a new list.
            var newLanguages = Languages.ToList();
            newLanguages.Add(request.Language);

            return Ok(newLanguages);
        }

        [HttpDelete("{language}")]
        public ActionResult DeleteLanguage(string language)
        {
            if (string.IsNullOrWhiteSpace(language))
            {
                return BadRequest("Language name is required");
            }

            var newLanguages = Languages.ToList();
            if (!newLanguages.Remove(language))
            {
                return NotFound($"Language '{language}' not found.");
            }

            return Ok(newLanguages);
        }

        [HttpPut("{oldLanguage}")]
        public ActionResult UpdateLanguage(string oldLanguage, [FromBody] UpdatedLanguageRequest request)
        {
            if (string.IsNullOrWhiteSpace(oldLanguage) || string.IsNullOrWhiteSpace(request.NewLanguage))
            {
                return BadRequest("Both old and new language names are required");
            }

            var newLanguages = Languages.ToList();
            int index = newLanguages.FindIndex(l => l.Equals(oldLanguage, StringComparison.OrdinalIgnoreCase));

            if (index == -1)
            {
                return NotFound($"Language '{oldLanguage}' not found.");
            }

            newLanguages[index] = request.NewLanguage;
            return Ok(newLanguages);
        }
        
    }
}