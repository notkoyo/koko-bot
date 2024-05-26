function shufflePlayers(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const x = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[x]] = [arr[x], arr[i]];
  }
}

function createTeams(arr) {
  const players = [...arr];
  shufflePlayers(players);

  const attackers = players.slice(0, 5);
  const defenders = players.slice(5, 10);

  return {
    attackers,
    defenders,
  };
}

module.exports = createTeams;