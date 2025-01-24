const wrapAsync = (Function) => {
    return (Request, Response, Next) => {
        const FunctionOut = Function(Request, Response, Next)
        return Promise.resolve(FunctionOut).catch(Next)
    }
}
module.exports = { wrapAsync }