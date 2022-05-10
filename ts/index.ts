export interface OwnedGameSteamBackendInterface {
  appid: number;
  playtime_forever: number;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
}

export interface OwnedGamesBackendInterface {
  game_count: number;
  games: OwnedGameSteamBackendInterface[]
}

export interface OwnedGameInterface {
  appId: number;
  playTime: {
    total: number;
    windows: number; 
    mac: number;
    linux: number;
  }
}