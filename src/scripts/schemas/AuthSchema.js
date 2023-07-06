const JOI = require('joi')

const Schemas = {
    LoginSchema: JOI.object({
        username: JOI.string().required().label('Username').messages({
            'string.pattern.base': '{#label} layyk gelenok!',
            "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
            "any.required": "{#label} hokman gerek",
        }),
        password: JOI.string().required().label('Userin paroly').messages({
            'string.pattern.base': '{#label} layyk gelenok!',
            "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
            "any.required": "{#label} hokman gerek",
        })
    })
}


module.exports = Schemas