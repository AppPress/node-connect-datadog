import { RequestHandler } from 'express'

// name 'connectDatadog' doesn't really matter
// Just make sure that the function and namespace below have the same names
declare function connectDatadog(options: any): RequestHandler
declare namespace connectDatadog {

}
export = connectDatadog
