// import in caolan forms
const forms = require("forms");
// create some shortcuts
const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets;

var bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }

    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }

    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }

    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group">' + label + widget + error + '</div>';
};

const createPosterForm = (allMediaProperties=[], allTags=[]) => {
    return forms.create({
        'title': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'cost': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            'validators':[validators.integer()]
        }),
        'description': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'date': fields.date({
            required: true,
            errorAfterField: true,
            value: new Date().toISOString().split('T')[0],
            cssClasses: {
                label: ['form-label'],
            },
        }),
        'stock': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label'],
            },
            'validators':[validators.integer()]
        }),
        'height': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            'validators':[validators.integer()]
        }),
        'width': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            'validators':[validators.integer()]
        }),
        'mediaproperty_id': fields.string({
            label: 'Media',
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.select(),
            choices: allMediaProperties
        }),
        'tags': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.multipleSelect(),
            choices: allTags
        }),
        'image_url':fields.string({
            widget: widgets.hidden()
        })
    })
};

const createRegistrationForm = () => {
    return forms.create({
        'username': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'email': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'password': fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'confirm_password': fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            validators: [validators.matchField('password')]
        })
    })
};

const createLoginForm = () => {
    return forms.create({
        'email': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'password': fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
    })
};

const createSearchForm = (allMediaProperties=[], allTags=[]) => {
    return forms.create({
        'title': fields.string({
            required: false,
        }),
        'min_cost': fields.number({
            required: false,
            'validators':[validators.integer()]
        }),
        'max_cost': fields.number({
            required: false,
            // widget: widgets.select(),
            // choices: ['100', '200'],
            'validators':[validators.integer()]
        }),
        'min_height': fields.number({
            required: false,
            'validators':[validators.integer()]
        }),
        'max_height': fields.number({
            required: false,
            // widget: widgets.select(),
            // choices: ['100', '200'],
            'validators':[validators.integer()]
        }),
        'mediaproperty_id': fields.string({
            label: 'Media',
            required: false,
            widget: widgets.select(),
            choices: allMediaProperties
        }),
        'tags': fields.string({
            required: false,
            errorAfterField: true,
            widget: widgets.multipleSelect(),
            choices: allTags
        }),
    
    })
}; 



module.exports = { createPosterForm, createRegistrationForm, createLoginForm, createSearchForm, bootstrapField};