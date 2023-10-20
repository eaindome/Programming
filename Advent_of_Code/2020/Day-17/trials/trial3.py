from trial2 import simulate_cycles

initial_state = [
    ['.', '#', '.'],
    ['.', '.', '#'],
    ['#', '#', '#']
]

cycles = 6

grid = simulate_cycles(initial_state=initial_state, cycles=cycles)
print(f"Grid: {grid}")