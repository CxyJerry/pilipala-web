import Api from './net'

function unread_count() {
    return Api.get('/msg/unread/count')
}

function page(type, no, size) {
    return Api.get('/msg/page', {
        params: {
            type: type,
            page_no: no,
            page_size: size
        }
    })
}

function templates() {
    return Api.get('/msg/template/get')
}

function save_template(name, content) {
    return Api.post('/msg/template/save', {
        name: name,
        content: content
    })
}

function delete_template(name) {
    return Api.delete('/msg/template/delete', {
        params: {
            name: name
        }
    })
}

export {
    unread_count,
    page,
    templates,
    save_template,
    delete_template
}

