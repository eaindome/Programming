using App.Features.Dashboards;
using Cai;

namespace App.Features.Sample;


[Queries]
public partial class SampleQueries
{
    public int numberOfFoos => Random.Shared.Next(1, 100);
    public int numberOfBarz => Random.Shared.Next(1, 100);
    public int numberOfBars => Random.Shared.Next(1, 1000);

    public DashboardIntEntry[] breakdown1()
    {
        return [
            new("Male", Random.Shared.Next(500, 5000)),
            new("Female", Random.Shared.Next(500, 5000))
        ];
    }
    public DashboardIntEntry[] breakdown2()
    {
        return [
            new("Red", Random.Shared.Next(500, 5000)),
            new("Blue", Random.Shared.Next(500, 5000)),
            new("Green", Random.Shared.Next(500, 5000)),
            new("Black", Random.Shared.Next(500, 5000)),
            new("Yellow", Random.Shared.Next(500, 5000))
        ];
    }
}
