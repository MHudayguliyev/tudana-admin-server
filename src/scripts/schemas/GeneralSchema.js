const JOI = require('joi')

const Schemas = {
    ElectronRegistration: JOI.object({
        access_key: JOI.string().required().label('Access key').messages({
            'string.pattern.base': '{#label} layyk gelenok!',
            "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
            "any.required": "{#label} hokman gerek",
        }),
        firm_name: JOI.string().required().label('Firm name').messages({
            'string.pattern.base': '{#label} layyk gelenok!',
            "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
            "any.required": "{#label} hokman gerek",
        }),
        firm_fullname: JOI.string().required().label('Firm full name').messages({
            'string.pattern.base': '{#label} layyk gelenok!',
            "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
            "any.required": "{#label} hokman gerek",
        }),
        firm_tel_num1: JOI.string().required().label('Firm number').messages({
            'string.pattern.base': '{#label} layyk gelenok!',
            "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
            "any.required": "{#label} hokman gerek",
        }),
        firm_tel_num2: JOI.string().required().label('Firm number').messages({
            'string.pattern.base': '{#label} layyk gelenok!',
            "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
            "any.required": "{#label} hokman gerek",
        }),
        firm_address: JOI.string().required().label('Firm address').messages({
            'string.pattern.base': '{#label} layyk gelenok!',
            "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
            "any.required": "{#label} hokman gerek",
        })
    }), 
}

module.exports = Schemas