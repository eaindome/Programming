using App.Data;
using App.Features.Observability;
using Cai;

namespace App.Features.Templates;


[Queries]
public partial class TemplatesQueries
{
    [UseOffsetPaging(IncludeTotalCount = true, DefaultPageSize = 20)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<SmsTemplate> smsTemplates(DataContext db, AuthContext auth)
    {
        // todo: permissions
        return db.smsTemplates;
    }

    [UseOffsetPaging(IncludeTotalCount = true, DefaultPageSize = 20)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<EmailTemplate> emailTemplates(DataContext db, AuthContext auth)
    {
        // todo: permissions
        return db.emailTemplates;
    }

    public async Task<List<string>> smsCategories(DataContext db, AuthContext authContext)
    {
        // todo: permissions
        return db.smsTemplates
            .Select(x => x.category)
            .AsEnumerable()
            .Distinct()
            .ToList();
    }

    [UseOffsetPaging(IncludeTotalCount = true, DefaultPageSize = 20)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<SmsTemplate> smsTemplatesByCategory(string category, DataContext db, AuthContext authContext)
    {
        return db.smsTemplates.Where(x => x.category == category)
            .AsQueryable();
    }
    public async Task<List<string>> emailCategories(DataContext db, AuthContext authContext)
    {
        // todo: permissions
        return db.emailTemplates
            .Select(x => x.category)
            .AsEnumerable()
            .Distinct()
            .ToList();
    }

    [UseOffsetPaging(IncludeTotalCount = true, DefaultPageSize = 20)]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<EmailTemplate> emailTemplatesByCategory(string category, DataContext db, AuthContext authContext)
    {
        return db.emailTemplates.Where(x => x.category == category)
            .AsQueryable();
    }
}