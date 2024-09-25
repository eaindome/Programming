using System;
using GameStore.Dtos;

namespace GameStore.Endpoints;

public static class GamesEndpoints
{
    const string GetGameEndpointNames = "GetGame";

    private static readonly List<GameDto> games = [
        new (
            1,
            "Street Fighter II",
            "Fighting",
            19.99M,
            new DateOnly(1992, 7, 15)
        ),
        new (
            2,
            "Street Fighter II",
            "Role Playing",
            59.99M,
            new DateOnly(2022, 9, 27)
        ),
        new (
            3,
            "FIFA 23",
            "Sports",
            69.99M,
            new DateOnly(2023, 7, 15)
        )
    ];

    public static RouteGroupBuilder MapGamesEndpoints(this WebApplication app) {
        var group = app.MapGroup("games")
                        .WithParameterValidation();
        
        // group.MapGet("/", () => "Hello World!");

        // GET /games
        group.MapGet("/", () => games);      // retrieve all the games

        // GET /games/1
        group.MapGet("/{id}", (int id) => {
            GameDto? game = games.Find(game => game.Id == id);

            return game is null ? Results.NotFound() : Results.Ok(game);
        })
            .WithName(GetGameEndpointNames);

        // POST /games
        group.MapPost("/", (CreateGameDto newGame) => {
            GameDto game = new(
                games.Count + 1,
                newGame.Name,
                newGame.Genre,
                newGame.Price,
                newGame.ReleaseDate
            );

            games.Add(game);

            return Results.CreatedAtRoute(GetGameEndpointNames, new { id = game.Id }, game);
        });      // create a new game

        // PUT /games
        group.MapPut("/{id}", (int id, UpdateGameDto updatedGame) => {
            var index = games.FindIndex(
                game => game.Id == id
            );

            if (index == -1) {
                return Results.NotFound();
            }

            games[index] = new GameDto(
                id,
                updatedGame.Name,
                updatedGame.Genre,
                updatedGame.Price,
                updatedGame.ReleaseDate
            );

            return Results.NoContent();
        });         // update a game info

        // DELET /games/1
        group.MapDelete("/{id}", (int id) => {
            games.RemoveAll(
                game => game.Id == id
            );

            return Results.NoContent();
        });

        return group;
    }
}
