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
        group.MapGet("/", async (GameStoreContext dbContext) => 
            await dbContext.Games
                .Include(game => game.Genre)
                .Select(
                    game => game.ToGameSummaryDto()
                )
                .AsNoTracking()
                .ToListAsync());      // retrieve all the games

        // GET /games/1
        group.MapGet("/{id}", async (int id, GameStoreContext dbContext) => 
        {
            Game? game = await dbContext.Games.FindAsync(id);

            return game is null ? Results.NotFound() : Results.Ok(game.ToGameDetailDto());
        })
            .WithName(GetGameEndpointNames);

        // POST /games
        group.MapPost("/", async (CreateGameDto newGame, GameStoreContext dbContext) => {
            Game game = newGame.ToEntity();

            dbContext.Games.Add(game);
            await dbContext.SaveChangesAsync();

            return Results.CreatedAtRoute(GetGameEndpointNames, new { id = game.Id }, game.ToGameDetailDto() );
        });      // create a new game

        // PUT /games
        group.MapPut("/{id}", async (int id, UpdateGameDto updatedGame, GameStoreContext dbContext) => {
            var existingGame = dbContext.Games.Find(id);

            if (existingGame is null) {
                return Results.NotFound();
            }

            dbContext.Entry(existingGame)
                .CurrentValues
                .SetValues(updatedGame.ToEntity(id));

            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });         // update a game info

        // DELET /games/1
        group.MapDelete("/{id}", async (int id, GameStoreContext dbContext) => {
            await dbContext.Games
                        .Where(game => game.Id ==id)
                        .ExecuteDeleteAsync();

            return Results.NoContent();
        });

        return group;
    }
}
