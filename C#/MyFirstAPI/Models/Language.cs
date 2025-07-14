using System.ComponentModel.DataAnnotations;

public class Language
{
    [Key]  // foreign key
    public int Id { get; set; }

    [Required]  // required field
    public string Name { get; set; } = string.Empty;
}