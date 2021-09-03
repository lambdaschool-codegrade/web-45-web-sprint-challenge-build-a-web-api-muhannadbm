// add middlewares here related to actions
// add middlewares here related to projects
const Action = require('./actions-model')
const Project = require('../projects/projects-model')


async function checkId (req,res,next) {
    try{
    const {id} = req.params
    const action = await Action.get(id)
    if(action){
        console.log('found action')
        req.action = action
        next()
    }
    else{
        console.log('inside else check id')
        next({message: "Action not found",status: 404})
    }
}
catch(e){
    next(e)
}

}


async function checkRequired (req,res,next) {
    try{
        let project = await Project.get(req.params.project_id)
        if(!req.body.notes || !req.body.description || !project){
            next({message: "missing required fields", status: 400})
        }
        else{
            next()
        }
    }
    catch(e){
        next(e)
    }
}

module.exports = {checkId, checkRequired}
