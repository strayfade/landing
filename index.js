const { log } = require('./private/log')
const { wrapAsync } = require('./private/wrapAsync')
const { generatePage } = require('./private/generatePage')
const fs = require('fs').promises
const path = require('path')
const express = require('express')
const app = express();

// Perform build
require('./private/build')

// Allow access to static assets
app.use('/assets', express.static('assets'))

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
        response.status(200).send(await generatePage(JSON.parse(idData)))
    }
    else {
        //response.redirect("/strayfade")
        response.sendStatus(404)
    }
}))
app.get("*", wrapAsync(async (request, response) => {
    response.redirect("/strayfade")
}));

// Start the server
const port = parseInt(process.env.PORT ? process.env.PORT : 6980);
app.listen(port, wrapAsync(async () => {
    log(`Server is running on http://localhost:${port}`);
}));
