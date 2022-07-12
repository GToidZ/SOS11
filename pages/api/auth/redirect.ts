import axios from 'axios';
import url from 'url';
import { setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.query;
    if (code) {
        const formData = new url.URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID?.toString(),
            client_secret: process.env.DISCORD_CLIENT_SECRET?.toString(),
            grant_type: 'authorization_code',
            code: code.toString(),
            redirect_uri: process.env.BASE_URI?.toString() + "api/auth/redirect",
        });
        const resp = await axios.post("https://discord.com/api/v10/oauth2/token", 
        formData.toString(),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        )
        const { access_token } = resp.data;
        const check = await axios.get("https://discord.com/api/v10/users/@me/guilds",
        {
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        }
        )
        const pass = check.data.filter(elem => elem.id === process.env.DISCORD_REQUIRED_GUILD)
        if (pass.length > 0) {
            setCookie('discordKey', access_token, { req, res, maxAge: 60*60*24 })
            res.redirect(301, "/")
        } else {
            res.redirect(307, "/landing?error=1");
        }
    }
}