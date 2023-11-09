import Api from "@/api/net";

function permissions() {
    return Api.get("/manage/permission/list")
}

function create_permission(name, value) {
    return Api.post('/manage/permission/create', {}, {
        params: {
            name: name,
            value: value
        }
    })
}

function delete_permission(permission_id) {
    return Api.delete('/manage/permission/delete', {
        params: {
            permission_id: permission_id
        }
    })
}

function roles() {
    return Api.get('/manage/role/list')
}

function save_role(id = null, name, permission_id_list) {
    return Api.put("/manage/role/save", {
        id: id,
        name: name,
        permissionIds: permission_id_list
    })
}

function delete_role(role_id) {
    return Api.delete('/manage/role/delete', {
        params: {
            role_id: role_id
        }
    })
}

function paths() {
    return Api.get('/manage/path/get')
}

function save_path(path, permission_id = null) {
    return Api.put('/manage/path/save', {}, {
        params: {
            path: path,
            permission_id: permission_id
        }
    })
}

function delete_path(path_id) {
    return Api.delete("/manage/path/delete", {
        params: {
            path_id: path_id
        }
    })
}

function accessible_paths() {
    return Api.get('/manage/path/accessible')
}

function apply() {
    return Api.post('/manage/permission/apply')
}

function apply_page(page_no, page_size, status) {
    return Api.get('/manage/permission/apply/page', {
        params: {
            page_no: page_no,
            page_size: page_size,
            status: status
        }
    })
}

function role_grant(apply_id, uid, role_id) {
    return Api.put("/manage/role/grant", {}, {
        params: {
            apply_id: apply_id,
            uid: uid,
            role_id: role_id
        }
    })
}

export {
    permissions,
    create_permission,
    delete_permission,
    roles,
    save_role,
    delete_role,
    paths,
    save_path,
    delete_path,
    accessible_paths,
    apply,
    apply_page,
    role_grant
}