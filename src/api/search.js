import Api from "@/api/net";

function search(type, search, page_no, page_size) {
    return Api.get("/search/get", {
        params: {
            type: type,
            search: search,
            page_no: page_no,
            page_size: page_size
        }
    });
}

export {
    search
}