using System;
using System.Linq;
using System.Collections.Generic;

public class LanguageService
{
    private readonly List<string> _languages = new()
    {
        "C#", "JavaScript", "Python", "Java", "Go", "Rust", "Swift"
    };

    // service to get all the languages
    public IEnumerable<string> GetAllLanguages()
    {
        return _languages;
    }

    // service to get a language by id
    public string? GetLanguageById(int id)
    {
        if (id < 0 || id >= _languages.Count) return null;

        return _languages[id];
    }

    // service to add a language
    public bool AddLanguage(string language)
    {
       _languages.Add(language);
        return true;
    }

    // service to delete a language
    public bool DeleteLanguage(string language)
    {
        _languages.Remove(language);
        return true;
    }

    // service to update a language
    public bool UpdateLanguage(string oldLanguage, string newLanguage)
    {
        _languages[_languages.IndexOf(oldLanguage)] = newLanguage;
        return true;
    }
}