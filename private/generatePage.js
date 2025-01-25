const { gradient } = require('./components/gradient')

const markdown = require('markdown')

const generatePage = async (profile) => {
    return `
    
<!DOCTYPE html>
<html lang="${profile.meta.lang}">
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color" content="#${profile.meta.accentColor}">

        <link rel="stylesheet" href="/assets/build/prod.css" type="text/css">
    </head>
    <body style="color: #fff; background-color: #${profile.page.backgroundColor};">
        <div>
            ${(() => {
                let Output = ``
                const gradCount = 4;
                for (let x = 0; x < gradCount; x++) {
                    for (let y = 0; y < gradCount; y++) {
                        let x2 = 1 - (1 / (gradCount - 1)) * x
                        let y2 = 1 - (1 / (gradCount - 1)) * y
                        x2 += (Math.random() - 0.5) * 2 * 1 / gradCount / 2
                        y2 += (Math.random() - 0.5) * 2 * 1 / gradCount / 2
                        let dist = Math.sqrt(Math.pow(x2 - 0.5, 2) + Math.pow(y2 - 0.5, 2))
                        dist *= 2;
                        Output += `
                            <div style="filter: brightness(${dist * 100}%); opacity: 0.25;">
                                ${gradient(profile.meta.accentColor, Math.random() * 600 + 400, x2, y2)}
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

                    <div class="pfp-container">
                        <img class="pfp" src="${profile.page.profile.pfp}" style="border-radius: ${profile.page.profile.roundPfp ? 500 : 0}px"/>
                        <div style="max-content">
                            <div style="height: max-content; width: max-content;" class="v-centered">
                                <h1>
                                    <p class="display-name">${profile.page.profile.displayName}</p>
                                </h1>
                                <h3 class="username">
                                    <span>${profile.page.profile.username}</span>
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; width: min-content; margin: 5px auto 0px auto;">
                    ${
                        (() => {
                            let Output = ``
                            for (const tag of profile.page.profile.tags) {
                                Output += `
                                <a class="tag" href="${tag.url}" style="background-color: #${tag.color}30; border-color: #${tag.color}; color: #${tag.color};">${tag.title}</a>
                                `
                            }
                            return Output
                        })()
                    }
                    </div>
                    ${
                        profile.page.profile.markdown.length > 0 ? `<div class="profile-separator"></div>` : ``
                    }
                    ${
                        (() => {
                            if (profile.page.profile.markdown.length <= 0)
                                return ""
                            return `<div class="bio-container">${markdown.parse(profile.page.profile.markdown)}</div>`
                        })()
                    }
                    ${
                        profile.page.projectLinks.length > 0 ? `<div class="profile-separator"></div>` : ``
                    }
                    ${
                        (() => {
                            let Output = ``
                            for (const link of profile.page.projectLinks) {
                                Output += `
                                    <a class="project-link" href="${link.url}">
                                        <h3>${link.title}</h3>
                                        <p>${link.description}</p>
                                    </a>
                                `
                            }
                            return Output
                        })()
                    }
                    ${
                        profile.page.socialLinks.length > 0 ? `<div class="profile-separator"></div>` : ``
                    }
                    <div class="links-container">
                        ${
                            (() => {
                                let Output = ``
                                for (const link of profile.page.socialLinks) {
                                    Output += `
                                        <a class="link" href="${link.url}">
                                            <img class="link-icon" src="/assets/icons/${link.icon}.svg" />
                                        </a>
                                    `
                                }
                                return Output
                            })()
                        }
                    </div>
                </div>
            </div>
        </div>
        <script type="text/javascript" src="/assets/build/prod.js"></script>
    </body>
</html>

    `
}
module.exports = { generatePage }