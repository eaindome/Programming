using App.Common;
using Cai;

namespace App.Features.Templates;


[Mutation<CallResult>]
public record CreateSmsTemplate
{
    public string name { get; set; }
    public string notes { get; set; }
    public string message { get; set; }
    public string category { get; set; }
    public bool isSystemTemplate { get; set; }
    public bool active { get; set; }
}
[Mutation<CallResult>]
public record UpdateSmsTemplate : CreateSmsTemplate
{
    public long id { get; set; }
}
[Mutation<CallResult>]
public record DeleteSmsTemplate(long id);
[Mutation<CallResult>]
public record ActivateSmsTemplate(long id);
[Mutation<CallResult>]
public record DeactivateSmsTemplate(long id);



[Mutation<CallResult>]
public record CreateEmailTemplate
{
    public string name { get; set; }
    public string notes { get; set; }
    public string subject { get; set; }
    public string message { get; set; }
    public string category { get; set; }
    public bool isSystemTemplate { get; set; }
    public bool active { get; set; }
}
[Mutation<CallResult>]
public record UpdateEmailTemplate : CreateEmailTemplate
{
    public long id { get; set; }
}
[Mutation<CallResult>]
public record DeleteEmailTemplate(long id);
[Mutation<CallResult>]
public record ActivateEmailTemplate(long id);
[Mutation<CallResult>]
public record DeactivateEmailTemplate(long id);