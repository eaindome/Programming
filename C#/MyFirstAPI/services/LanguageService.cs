using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

public class LanguageService
{
    private readonly AppDbContext _context;

    public LanguageService(AppDbContext context)
    {
        _context = context;
    }

    // service to get all the languages
    public async Task<IEnumerable<Language>> GetAllLanguages()
    {
        return await _context.Languages.ToListAsync();
    }

    // service to get a language by id
    public async Task<Language?> GetLanguageById(int id)
    {
        return await _context.Languages.FindAsync(id);
    }

    // service to add a language
    public async Task<bool> AddLanguage(string language)
    {
        if (string.IsNullOrWhiteSpace(language)) return false;
        
        bool exists = await _context.Languages.AnyAsync(I => I.Name == language);
        if (exists) return false;

        var newLanguage = new Language { Name = language };
        _context.Languages.Add(newLanguage);
        await _context.SaveChangesAsync();
        return true;
    }

    // service to delete a language
    public async Task<bool> DeleteLanguage(string language)
    {
        if (string.IsNullOrWhiteSpace(language)) return false;

        var languageEntity = await _context.Languages.FirstOrDefaultAsync(I => I.Name == language);
        if (languageEntity == null) return false;

        _context.Languages.Remove(languageEntity);
        await _context.SaveChangesAsync();
        return true;
    }

    // service to update a language
    public bool UpdateLanguage(string oldLanguage, string newLanguage)
    {
        
        return true;
    }
}