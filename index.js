const { log } = require('./private/log')
const { wrapAsync } = require('./private/wrapAsync')
const { generatePage } = require('./private/generatePage')
const { landingPage } = require('./private/landingPage')
const fs = require('fs').promises
const path = require('path')
const express = require('express')
const app = express();

// Run tests
const port = parseInt(process.env.PORT ? process.env.PORT : 6980);
require('./private/runTests').runTests(port)

// Perform build
require('./private/build')

// Allow access to static assets
app.use('/assets', express.static('assets'))

require('./private/security').setup(app)

// Route handler
app.get("/:id", wrapAsync(async (request, response) => {
    const allIds = await fs.readdir(path.join(__dirname, "people"));
    let foundTarget = false;
    for (const id of allIds) {
        if (id.replace(".json", "") == request.params.id) {
            foundTarget = true;
            break;
        }
    }
    if (foundTarget) {
        const idData = await fs.readFile(path.join(__dirname, "people", request.params.id + ".json"), { encoding: "utf-8" })
        try {
            response.status(200).send(await generatePage(JSON.parse(idData)))
        }
        catch (error) {
            response.sendStatus(500)
        }
    }
    else {
        //response.redirect("/strayfade")
        response.sendStatus(404)
    }
}))
app.get("*", wrapAsync(async (request, response) => {
    response.status(200).send(await landingPage())
}));

// Start the server
app.listen(port, wrapAsync(async () => {
    log(`Server is running on http://localhost:${port}`);
}));
