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

    public static RouteGroupBuilder MapGamesEndpoints(this WebApplication app) {
        var group = app.MapGroup("games")
                        .WithParameterValidation();
        
        // group.MapGet("/", () => "Hello World!");

        // GET /games
        group.MapGet("/", (GameStoreContext dbContext) => dbContext.Games
            .Include(game => game.Genre)
            .Select(
                game => game.ToGameSummaryDto()
            )
            .AsNoTracking());      // retrieve all the games

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
        group.MapDelete("/{id}", (int id, GameStoreContext dbContext) => {
            dbContext.Games
                        .Where(game => game.Id ==id)
                        .ExecuteDelete();

            return Results.NoContent();
        });

        return group;
    }
}
