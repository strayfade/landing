const fs = require('fs').promises
const path = require('path')

const profile = {
    meta: {
        title: "profiles",
        description: "me and the boys",
        author: "",
        accentColor: "ffffff",
    },
    page: {
        backgroundColor: "000000",
    }
}

const landingPage = async () => {
    return `
    
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="referrer" content="no-referrer">
        <title>${profile.meta.title}</title>
        <meta property="og:title" content="${profile.meta.title}">
        <meta property="twitter:title" content="${profile.meta.title}">
        <meta name="description" content="${profile.meta.description}">
        <meta property="og:description" content="${profile.meta.description}">
        <meta property="twitter:description" content="${profile.meta.description}">
        <meta name="author" content="${profile.meta.author}">
        <meta name="theme-color" content="#${profile.meta.accentColor}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/assets/build/prod.css" type="text/css">
    </head>
    <body style="color: #fff; background-color: #${profile.page.backgroundColor}; --accent-color: #${profile.meta.accentColor};--accent-color-transparent: #${profile.meta.accentColor}40;">
        <canvas>
        </canvas>
        <div class="cover">
        </div>
        <div class="container">
            <div class="container-inner">
                <div class="profile">

                    ${await (async () => {
                        let Output = ``

                        const allIds = await fs.readdir(path.join(__dirname, "../people"));
                        for (const id of allIds) {
                            const idData = JSON.parse(await fs.readFile(path.join(__dirname, "../people", id), { encoding: "utf-8" }))
                            
                            Output += `
                            
                                <a class="pfp-container" style="margin: 30px;" href="/${id.replace(".json", "")}">
                                    <img class="pfp" alt="${idData.page.profile.displayName} profile picture" src="${idData.page.profile.pfp}" style="border-radius: ${idData.page.profile.roundPfp ? 500 : 0}px"/>
                                    <div style="max-content">
                                        <div style="height: max-content; width: max-content;" class="v-centered">
                                            <h1>
                                                <p class="display-name">${idData.page.profile.displayName}</p>
                                            </h1>
                                            <span class="username">
                                                ${idData.page.profile.username}
                                            </span>
                                        </div>
                                    </div>
                                </a>

                            `
                        }

                        return Output
                    })()}

                </div>
            </div>
        </div>
        <script type="text/javascript" src="/assets/build/prod.js"></script>
    </body>
</html>
    `
}
module.exports = { landingPage }