const { gradient } = require('./components/gradient')

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

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
    </head>
    <body style="color: #${profile.page.textColor}; background-color: #${profile.page.backgroundColor};">
        <div>
            ${(() => {
                let Output = ``
                const gradCount = 5;
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
                        <div style="position: relative;">
                            <div style="height: max-content;" class="v-centered">
                                <h1 class="display-name">${profile.page.profile.displayName}</h1>
                                <h3 class="username">${profile.page.profile.username}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="profile-separator">
                    </div>
                    <div>
                        <h3>bla bla bla</h3>
                        <p>Nobis in vel reprehenderit omnis magni reiciendis dicta iusto. Ullam sint quos quaerat repellat hic excepturi harum. Ipsam dolorum voluptate aspernatur earum alias. Aliquam perspiciatis repellendus eligendi qui natus.</p>
                        <p>Nobis in vel reprehenderit omnis magni reiciendis dicta iusto. Ullam sint quos quaerat repellat hic excepturi harum. Ipsam dolorum voluptate aspernatur earum alias. Aliquam perspiciatis repellendus eligendi qui natus.</p>
                    </div>
                    <div class="profile-separator">
                    </div>
                    ${
                        (() => {
                            let Output = ``
                            for (const link of profile.page.links) {
                                Output += `
                                    <a class="link" href="${link.url}">
                                        <img class="link-icon" src="https://cdn.simpleicons.org/${link.icon}/white" />
                                    </a>
                                `
                            }
                            return Output
                        })()
                    }
                </div>
            </div>
        </div>
        <script type="text/javascript" src="/assets/build/prod.js"></script>
    </body>
</html>

    `
}
module.exports = { generatePage }