import type { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";

const router = nc<NextApiRequest,NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("¡Algo se rompió!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("¡No lo encontré che!");
  },
})

type Data = {
  name: string
}

router.get(async (req, res) => {
  const userId = req.query.id as string
  const key = process.env.STEAM_TOKEN
  const queries = `?key=${key}&steamid=${userId}&format=json`
  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/${queries}`
  const response = await fetch(url)
  const data = await response.json()
  console.log(url)
  
  res.status(200).json(data)
})

export default router