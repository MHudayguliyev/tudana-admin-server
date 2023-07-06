const JOI = require('joi')

const Schemas = {
    SendEmailSchema: JOI.object({
        phone: JOI.number().required().label('The sender').messages({
            'number.pattern.base': '{#label} layyk gelenok!',
            "number.empty": "{#label} boş setir ululyk bolup bilmeýär",
            "any.required": "{#label} hokman gerek",
        }),
        name: JOI.string().required().label('The subject').messages({
            'string.pattern.base': '{#label} layyk gelenok!',
            "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
            "any.required": "{#label} hokman gerek",
        }),
        feedback: JOI.string().min(2).max(1000).label('Feedback').allow(null, ''),
    }),

    AboutUsSchema: JOI.object({
        locale: JOI.string().required().label('The locale').messages({
            'string.pattern.base': '{#label} layyk gelenok!',
            "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
            "any.required": "{#label} hokman gerek",
        }),
    })
}

module.exports = Schemas