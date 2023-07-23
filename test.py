file = open("currGame.txt", "r")

contents = file.read()
part1 = contents.split("#")[1]
game_number = part1.split(" -")[0]
print(game_number)

file.close()