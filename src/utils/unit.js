import moment from 'moment'

const size_unit = ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb']
const count_unit = [
    {count: 1000, unit: '千'},
    {count: 10000, unit: '万'},
    {count: 100000000, unit: '亿'}
]

function convert_to_file_unit(file) {
    let size = file.size
    let unit_idx = 0
    while (size >= 1024) {
        unit_idx += 1
        size /= 1024
    }
    size = Math.round(size * 100) / 100
    return `${size} ${size_unit[unit_idx]}`
}

function convert_to_count_unit(count) {
    count = parseInt(count)
    let unit_idx = 0
    for (let i = count_unit.length - 1; i >= 0; i--) {
        if (count_unit[i].count < count) {
            return `${count / count_unit[i].count} ${count_unit[i].unit}`
        }
    }
    return count
}

function format_date(date, format_str = 'YYYY-MM-DD HH:mm:ss') {
    date = parseInt(date)
    return moment(date).format(format_str)
}

function double_time_format(time) {
    if (!time) {
        return '00:00'
    }
    time = parseInt(time)
    let result = ''
    if (time > 60) {
        while (time > 60) {
            let last = time % 60
            last = (last >= 10 ? last : '0' + last)
            if (result) {
                result = last + ":" + result
            } else {
                result = last + result
            }
            time = parseInt((time / 60).toString())
        }
        if (time) {
            time = (time >= 10 ? time : '0' + time)
            result = time + ":" + result
        }
    } else {
        result = (time >= 10 ? '00:' + time : '00:0' + time)
    }
    return result
}


export {
    convert_to_file_unit,
    convert_to_count_unit,
    format_date,
    double_time_format
}