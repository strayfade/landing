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
        <meta name="theme-color" content="#${profile.meta.accentColor}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/assets/build/prod.css" type="text/css">
    </head>
    <body style="color: #fff; background-color: #${profile.page.backgroundColor}; --accent-color: #${profile.meta.accentColor};--accent-color-transparent: #${profile.meta.accentColor}40;">
        <canvas>
        </canvas>
        <div class="cover">
        </div>
        
        ${true ? `<div class="container">
            <div class="container-inner">
                <div class="profile">

                    <div class="pfp-container">
                        <img class="pfp" alt="${profile.page.profile.displayName} profile picture" src="${profile.page.profile.pfp}" style="border-radius: ${profile.page.profile.roundPfp ? 500 : 0}px"/>
                        <div style="max-content">
                            <div style="height: max-content; width: max-content;" class="v-centered">
                                <h1>
                                    <p class="display-name">${profile.page.profile.displayName}</p>
                                </h1>
                                <span class="username">
                                    ${profile.page.profile.username}
                                </span>
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
                                            <img class="link-icon" alt="${link.icon} icon" src="/assets/icons/${link.icon}.svg" />
                                            <span>${link.text}</span>
                                        </a>
                                    `
                                }
                                return Output
                            })()
                        }
                    </div>
                </div>
            </div>
        </div>` : ""}
        <script type="text/javascript" src="/assets/build/prod.js"></script>
    </body>
</html>
    `
}
module.exports = { generatePage }