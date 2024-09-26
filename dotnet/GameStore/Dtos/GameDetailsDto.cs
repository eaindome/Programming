using System;

namespace GameStore.Dtos;

public record class GameDetailsDto
(
    int Id, 
    string Name, 
    int Genre, 
    decimal Price, 
    DateOnly ReleaseDate
);
