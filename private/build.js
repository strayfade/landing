const fs = require('fs')
const path = require('path')
const { log, logColors } = require('./log')

const JSProcessorOptions = {
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: false,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    domainLock: [],
    domainLockRedirectUrl: 'about:blank',
    forceTransformStrings: [],
    identifierNamesCache: null,
    identifierNamesGenerator: 'hexadecimal',
    identifiersDictionary: [],
    identifiersPrefix: '',
    ignoreImports: false,
    inputFileName: '',
    log: false,
    numbersToExpressions: false,
    optionsPreset: 'default',
    renameGlobals: false,
    renameProperties: false,
    renamePropertiesMode: 'safe',
    reservedNames: [],
    reservedStrings: [],
    seed: 0,
    selfDefending: false,
    simplify: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: 'separate',
    sourceMapSourcesMode: 'sources-content',
    splitStrings: false,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayCallsTransformThreshold: 0.5,
    stringArrayEncoding: [],
    stringArrayIndexesType: ['hexadecimal-number'],
    stringArrayIndexShift: false,
    stringArrayRotate: false,
    stringArrayShuffle: false,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: false,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: 'variable',
    stringArrayThreshold: 0.75,
    target: 'browser',
    transformObjectKeys: false,
    unicodeEscapeSequence: false,
}

const CSSProcessorOptions = {
    level: 2,
}

const CSSProcessor = require('clean-css')
const JSProcessor = require('javascript-obfuscator')

let CurrentStylesheet = "";
let CurrentScript = "";

const PackStylesheets = async () => {
    log('[BUILD] - Merging CSS files...')
    let Stylesheet = ''
    let filenames = fs.readdirSync(path.join(__dirname, "../css/"))
    for (let x = 0; x < filenames.length; x++) {
        filenames[x] = path.join(__dirname, "../css/", filenames[x])
    }
    for (let x = 0; x < filenames.length; x++) {
        if (filenames[x].endsWith('.css')) {
            Stylesheet += fs.readFileSync(filenames[x], { encoding: 'utf8', flag: 'r' }) + '\n\n'
        }
    }

    for (let x = 0; x < Stylesheet.length; x++) {
        Stylesheet = Stylesheet.replace('\n', '')
        Stylesheet = Stylesheet.replace('    ', '')
    }
    
    Stylesheet = new CSSProcessor(CSSProcessorOptions).minify(Stylesheet).styles;

    fs.mkdir(path.join(__dirname, '../assets/build'), (err) => {})
    let OutputFile = path.join(__dirname, '../assets/build/prod.css')
    fs.writeFileSync(OutputFile, Stylesheet)

    CurrentStylesheet = Stylesheet

    log(`[BUILD] - Finished file: ${OutputFile}`, logColors.Success)
}

const PackScripts = async () => {
    log('[BUILD] - Merging Javascript files...')
    let Script = ''
    let filenames = fs.readdirSync(path.join(__dirname, "../scripts/"))
    for (let x = 0; x < filenames.length; x++) {
        filenames[x] = path.join(__dirname, "../scripts/", filenames[x])
    }
    for (let x = 0; x < filenames.length; x++) {
        if (filenames[x].endsWith('.js')) {
            Script += fs.readFileSync(filenames[x], { encoding: 'utf8', flag: 'r' }) + '\n\n'
        }
    }

    //Script = JSProcessor.obfuscate(Script, JSProcessorOptions).getObfuscatedCode()

    fs.mkdir(path.join(__dirname, '../assets/build'), (err) => {})
    let OutputFile = path.join(__dirname, '../assets/build/prod.js')
    fs.writeFileSync(OutputFile, Script, { recursive: true })
    
    CurrentScript = Script

    log(`[BUILD] - Finished file: ${OutputFile}`, logColors.Success)
}

PackStylesheets()
PackScripts()

module.exports = { CurrentStylesheet, CurrentScript }