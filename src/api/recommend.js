import Api from "@/api/net";

function recommends(swiper_count, feed_count) {
    return Api.get("/recommend/get", {
        params: {
            swiper_count: swiper_count,
            feed_count: feed_count,
        }
    })
}

function partitions() {
    return Api.get("/recommend/partitions")
}

function recommendPartition(partition, order_by, page_no, page_size) {
    return Api.get("/recommend/partition", {
        params: {
            partition: partition,
            order_by: order_by,
            page_no: page_no,
            page_size: page_size
        }
    })

}

export {
    recommends,
    partitions,
    recommendPartition
}