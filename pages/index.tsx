import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import OwnedGamesList from '../components/steam/OwnedGamesList'
import styles from '../styles/Home.module.css'
import { OwnedGameSteamBackendInterface, OwnedGameInterface } from '../ts'

interface GamePlayedInterface {
  appId: number;
  playTime: {
    total: number;
    windows: number; 
    mac: number;
    linux: number;
  }
}
interface ProfileInterface {
  steamId: string | null;
  communityVisibilityState: 1 | 3;
  profileState: 0 | 1;
  userName: string | null;
  realName: string | null;
  profileUrl: string | null;
  locCountryCode: string | null;
  gameCount: 0;
  games: OwnedGameInterface[];
}

interface ProfileBackendInterface {
  steamid: string;
  communityvisibilitystate: 1 | 3;
  profilestate: 0 | 1;
  personaname: string;
  realname: string;
  profileurl: string;
  loccountrycode: string;

  // Useless Properties
  commentpermission: 0 | 1;
  avatar: string;
  avatarmedium: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: 0|1|2|3|4|5|6;
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
  locstatecode: string;
}



const Home: NextPage = () => {
  const profile: ProfileInterface = {
    steamId: null,
    communityVisibilityState: 1,
    profileState: 0,
    userName: null,
    realName: null,
    profileUrl: null,
    locCountryCode: null,
    gameCount: 0,
    games: [],
  }
  const [ userProfile, setUserProfile ] = useState<ProfileInterface>(profile)

  async function onSubmit(e: any) {
    e.preventDefault()
    const userId = e.target.user.value
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    /**
     * Obtenemos los datos del perfil
     */
    const userProfileResponse = await fetch(`${baseUrl}/api/contexts/steam/profile/${userId}`)
    const { response: { players: profileData } } = await userProfileResponse.json()
    const userProfile: ProfileBackendInterface = profileData[0]

    /**
     * Obtenemos los datos de los juegos
     */
    const userOwnedGamesResponse = await fetch(`${baseUrl}/api/contexts/steam/owned-games/${userId}`)
    const { response: { game_count: gameCount, games} } = await userOwnedGamesResponse.json()
    const allGames = games.map((game: OwnedGameSteamBackendInterface)=> ({
      appId: game.appid,
      playTime: {
        total: game.playtime_forever,
        windows: game.playtime_windows_forever,
        mac: game.playtime_mac_forever,
        linux: game.playtime_linux_forever,
      }
    }))

    setUserProfile({
      steamId: userProfile.steamid,
      communityVisibilityState: userProfile.communityvisibilitystate,
      profileState: userProfile.profilestate,
      userName: userProfile.personaname,
      realName: userProfile.realname,
      profileUrl: userProfile.profileurl,
      locCountryCode: userProfile.loccountrycode,
      gameCount,
      games: allGames,
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Steam API</title>
        <meta name="description" content="¡Grande Nextjs!" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Test Steam API
        </h1>

        <p className={styles.description}>
          Buscar un perfil de un usuario de Steam{' '}
        </p>

        <form onSubmit={onSubmit}>
          <label>
            <span>El id (formato decimal) del usuario de Steam</span>
            <div>
              <input name="user" type="text" required placeholder="01234567891011121314151617181920" min={32}/>
              <button type="submit">Buscar</button>
            </div>
          </label>
        </form>

          <section>
            <h2>Perfil del usuario:</h2>
            <p>El perfil es publico: <span>{(userProfile.communityVisibilityState===3) ? 'Sí' : 'No'}</span></p>
            <p>
              Steam ID: <span>{userProfile.steamId || '-'}</span>
            </p>
            <p>
              Nombre de Usuario: <span>{userProfile.userName || '-'}</span>
            </p>
            <p>
              Nombre Real: <span>{userProfile.userName || '-'}</span>
            </p>
            <p>
              URL del perfil: <span>{userProfile.profileUrl || '-'}</span>
            </p>
            <p>
              Código de país: <span>{userProfile.locCountryCode || '-'}</span>
            </p>
            <p>
              Total de juegos: <span>{userProfile.gameCount || '-'}</span>
            </p>
            <div>
              <p>Juegos:</p>
              {userProfile.gameCount &&
               <OwnedGamesList games={userProfile.games}/>
              }
            </div>
          </section>
      </main>

      <footer className={styles.footer}>
        <p>Powered by{' '}<b>Manaos</b></p>
      </footer>
    </div>
  )
}

export default Home
