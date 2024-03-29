export default {
    name: 'experiences',
    type: 'document',
    title: 'Experiences',
    fields: [
        {
            name: 'year',
            title: 'Year',
            type: 'string'
        },
        {
            name: 'works',
            title: 'Works',
            type: 'array',
            of: [{type: 'workExperience'}]
        },
    ]
}