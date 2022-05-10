import { OwnedGameInterface } from "../../../ts";

interface OwnedGamesProps {
  games: OwnedGameInterface[]
}

export default function OwnedGamesList({ games } : OwnedGamesProps) {
  function gameList() {
    return games.map((game: any, index: number) => (
      <div key={index} style={{border: "2px solid black"}}>
        <p>
          AppId: <span>{game.appId}</span>
        </p>
        <p>
          Tiempo jugado: <span>{game.playTime.total}</span>
        </p>
        <p>
          Tiempo jugado en Windows: <span>{game.playTime.windows}</span>
        </p>
        <p>
          Tiempo jugado en Mac: <span>{game.playTime.mac}</span>
        </p>
        <p>
          Tiempo jugado en Linux: <span>{game.playTime.linux}</span>
        </p>
      </div>
    ))
  }

  return (
    <>
      {gameList()}
    </>
  )
}