using System;
using GameStore.Data;
using GameStore.Dtos;
using GameStore.Entities;
using GameStore.Mapping;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Endpoints;

public static class GamesEndpoints
{
    const string GetGameEndpointNames = "GetGame";

    private static readonly List<GameSummaryDto> games = [
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
        group.MapGet("/{id}", (int id, GameStoreContext dbContext) => 
        {
            Game? game = dbContext.Games.Find(id);

            return game is null ? Results.NotFound() : Results.Ok(game.ToGameDetailDto());
        })
            .WithName(GetGameEndpointNames);

        // POST /games
        group.MapPost("/", (CreateGameDto newGame, GameStoreContext dbContext) => {
            Game game = newGame.ToEntity();

            dbContext.Games.Add(game);
            dbContext.SaveChanges();

            return Results.CreatedAtRoute(GetGameEndpointNames, new { id = game.Id }, game.ToGameDetailDto() );
        });      // create a new game

        // PUT /games
        group.MapPut("/{id}", (int id, UpdateGameDto updatedGame, GameStoreContext dbContext) => {
            var existingGame = dbContext.Games.Find(id);

            if (existingGame is null) {
                return Results.NotFound();
            }

            dbContext.Entry(existingGame)
                .CurrentValues
                .SetValues(updatedGame.ToEntity(id));

            dbContext.SaveChanges();

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
