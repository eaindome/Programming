using Cai.Reporting;
using Npgsql;
using System.Data.Common;
using System.Data;

namespace App.Features.Reports;



public class ReportDataLoader : BaseDataLoader
{
    private readonly string connectionString;

    public ReportDataLoader(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("rodb")!;
        parameterPrefix = ':';
        throwOnMissingParameters = false;
    }

    protected override DbDataAdapter getAdapter(IDbCommand cmd)
    {
        return new NpgsqlDataAdapter((NpgsqlCommand)cmd);
    }

    protected override IDbCommand getCommand(IDbConnection connection, string query)
    {
        var cmd = connection.CreateCommand();
        cmd.CommandText = query;
        return cmd;
    }

    protected override IDbConnection getConnection()
    {
        return new NpgsqlConnection(connectionString);
    }
    protected override void populateFunctions()
    {
        // todo: load actual functions
    }
}