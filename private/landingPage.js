const { gradient } = require('./components/gradient')
const fs = require('fs').promises
const path = require('path')

const markdown = require('markdown')

const profile = {
    meta: {
        title: "profiles",
        description: "",
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="theme-color" content="#${profile.meta.accentColor}">

        <link rel="stylesheet" href="/assets/build/prod.css" type="text/css">
    </head>
    <body style="color: #fff; background-color: #${profile.page.backgroundColor}; --accent-color: #${profile.meta.accentColor};--accent-color-transparent: #${profile.meta.accentColor}40;">
        <div>
            ${(() => {
                let Output = ``
                const gradCount = 2;
                for (let x = 0; x < gradCount; x++) {
                    for (let y = 0; y < gradCount; y++) {
                        let x2 = 1 - (1 / (gradCount - 1)) * x
                        let y2 = 1 - (1 / (gradCount - 1)) * y
                        x2 += (Math.random() - 0.5) / gradCount / 2
                        y2 += (Math.random() - 0.5) / gradCount / 2
                        let dist = Math.sqrt(Math.pow(x2 - 0.5, 2) + Math.pow(y2 - 0.5, 2))
                        dist *= 2;
                        Output += `
                            <div style="opacity: 0.25;">
                                ${gradient(profile.meta.accentColor, Math.random() * 1000 + 200, x2, y2)}
                            </div>
                        `
                    }
                }
                return Output;
            })()}
        </div>
        <div class="fx-cover">
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
                                    <img class="pfp" src="${idData.page.profile.pfp}" style="border-radius: ${idData.page.profile.roundPfp ? 500 : 0}px"/>
                                    <div style="max-content">
                                        <div style="height: max-content; width: max-content;" class="v-centered">
                                            <h1>
                                                <p class="display-name">${idData.page.profile.displayName}</p>
                                            </h1>
                                            <h3 class="username">
                                                <span>${idData.page.profile.username}</span>
                                            </h3>
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