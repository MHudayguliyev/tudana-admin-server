const JOI = require('joi')

const Schemas = {
    ServicesTable: {
        UpdateServicesSchema: JOI.object({
            bouquet_ord: JOI.string().min(12).max(12).allow(null, '').messages({
                "string.min": "{#label} in azyndan 12 san bolmaly",
                "string.max": "{#label} in kop 12 san bolup biler",
            }),
            straw_ord: JOI.string().min(12).max(15).allow(null, '').messages({
                "string.min": "{#label} in azyndan 12 san bolmaly",
                "string.max": "{#label} in kop 12 san bolup biler",
            }),
            contact: JOI.string().min(12).max(12).allow(null, '').messages({
                "string.min": "{#label} in azyndan 12 san bolmaly",
                "string.max": "{#label} in kop 12 san bolup biler",
            }),
        })
    }, 

    StatisticsTable: {
        UpdateStatisticsSchema:JOI.object({
            rating: JOI.number().allow(null, "").label('Rating'),
            client_count: JOI.number().allow(null, "").label("Clients's count"),
            delivery_count: JOI.number().allow(null, "").label("Deliveries's count")
        })
    }, 

    AboutUsTable: {
        UpdateAboutUs: JOI.object({
            tm: JOI.string().label("Turkmen").min(1).max(99999).allow(null, ""),
            ru: JOI.string().label("Russian").min(1).max(99999).allow(null, ""),
            en: JOI.string().label("English").min(1).max(99999).allow(null, ""),
        })
    },

    VideosTable: {
        DeleteVideoSchema: JOI.object({
            id: JOI.string().required().regex(/^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$/).label('Video guid').messages({
                'string.pattern.base': '{#label} layyk gelenok!',
                "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
                "any.required": "{#label} hokman gerek", 
            })
        })
    },

    ProductsTable: {
        CreateProductSchema: JOI.object({
            unit_guid: JOI.string().required().regex(/^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$/).label('Unit guid').messages({
                'string.pattern.base': '{#label} layyk gelenok!',
                "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
                "any.required": "{#label} hokman gerek", 
            }),
            product_code: JOI.string().required().label('Product code').messages({
                'string.pattern.base': '{#label} layyk gelenok!',
                "string.empty": "{#label} boş san ululyk bolup bilmeýär",
                "any.required": "{#label} hokman gerek",
            }),
            product_desc: JOI.string().label('Product desc').allow(null, '')
        }),
        DeleteProductSchema: JOI.object({
            id: JOI.string().required().regex(/^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$/).label('Image guid').messages({
                'string.pattern.base': '{#label} layyk gelenok!',
                "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
                "any.required": "{#label} hokman gerek", 
            }),
        })
    },

    ReceptsTable: {
        CreateReceptSchema: JOI.object({
            recepts: JOI.object({
                tm: JOI.string().label("Recepts tm").min(1).max(99999).allow(null, ""),
                ru: JOI.string().label("Recepts ru").min(1).max(99999).allow(null, ""),
                en: JOI.string().label("Recepts en").min(1).max(99999).allow(null, ""),
            }),
            prepare: JOI.object({
                tm: JOI.string().label("Preparation tm").min(10).max(99999).allow(null, ""),
                ru: JOI.string().label("Preparation ru").min(10).max(99999).allow(null, ""),
                en: JOI.string().label("Preparation en").min(10).max(99999).allow(null, ""),
            })
        }),

        UpdateReceptSchema: JOI.object({
            product_guid: JOI.string().required().label('Product guid').messages({
                'string.pattern.base': '{#label} layyk gelenok!',
                "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
                "any.required": "{#label} hokman gerek",
            }),
            prepare: JOI.string().required().label('Ingredients to prepare').messages({
                'string.pattern.base': '{#label} layyk gelenok!',
                "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
                "any.required": "{#label} hokman gerek",
            })
        }),

        DeleteReceptSchema: JOI.object({
            id: JOI.string().required().regex(/^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$/).label('Recept guid').messages({
                'string.pattern.base': '{#label} layyk gelenok!',
                "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
                "any.required": "{#label} hokman gerek", 
            }),
        })
    },

    PartnersTable: {
        CreatePartner: JOI.object({
            partner: JOI.string().required().label('Partner').messages({
                'string.pattern.base': '{#label} layyk gelenok!',
                "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
                "any.required": "{#label} hokman gerek",
            })
        }),
        UpdatePartner: JOI.object({
            partner_guid: JOI.string().required().regex(/^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$/).label('Partner guid').messages({
                'string.pattern.base': '{#label} layyk gelenok!',
                "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
                "any.required": "{#label} hokman gerek", 
            }),
            partner: JOI.string().required().label('Partner').messages({
                'string.pattern.base': '{#label} layyk gelenok!',
                "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
                "any.required": "{#label} hokman gerek",
            })
        }),
        
        DeletePartner: JOI.object({
            id: JOI.string().required().regex(/^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$/).label('Partner guid').messages({
                'string.pattern.base': '{#label} layyk gelenok!',
                "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
                "any.required": "{#label} hokman gerek", 
            }),
        })
    },

    WhouseTable: {
        CreateWhouseSchema: JOI.object({
            whouse: JOI.string().required().label('Warehouse name').messages({
                'string.pattern.base': '{#label} layyk gelenok!',
                "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
                "any.required": "{#label} hokman gerek", 
            })
        }),

        UpdateWhouseSchema: {},
        DeletWhouseSchema: JOI.object({
            id: JOI.string().required().regex(/^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$/).label('Warehouse guid').messages({
                'string.pattern.base': '{#label} layyk gelenok!',
                "string.empty": "{#label} boş setir ululyk bolup bilmeýär",
                "any.required": "{#label} hokman gerek", 
            })
        })
    }

}

module.exports = Schemas