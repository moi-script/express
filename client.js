
import chalk from "chalk";
// const cookie = res.headers.get("set-cookie");


let ACCESS_TOKEN = null;

async function login(url) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'John Moises', password: 'hello secret' }),
        credentials: 'include'
    })

    try {
        const { accessToken } = await res.json();
        ACCESS_TOKEN = accessToken;
        console.log('Access Token :: ', chalk.green(accessToken));
    } catch (err) {
        console.log('Error :', err)
    }

    // window.accessToken = accessToken
}




async function profile(url, ACCESS_TOKEN) {
    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    return res;

}


await login('http://localhost:1000/login');



function setDelayProfile(profile, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {

                resolve(profile)
            } catch(err) {
                reject(err);
            }
        }, delay);
    })
}

const getFrofile = await setDelayProfile(profile, 5000);

getFrofile('http://localhost:1000/profile', ACCESS_TOKEN)
        .then(res => res.json())
        .then(val => console.log(chalk.magenta(val.user.name)))
        .catch(err => console.log(err));



