// add middlewares here related to projects
const Project = require('./projects-model')


async function checkId (req,res,next) {
    try{
    const {id} = req.params
    const project = await Project.get(id)
    if(project){

        req.project = project
        next()
    }
    else{

        next({message: "Project not found",status: 404})
    }
}
catch(e){
    next(e)
}

}


async function checkRequired (req,res,next) {
    try{
        if(!req.body.name || !req.body.description){
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
