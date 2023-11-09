const root = document.documentElement;

// 蓝色主题
const blue = {
    theme_color: '#00a1d6',
    theme_pink: '#fb7299'
}

// 黑色主题
const black = {
    theme_color: '#313131',
    theme_pink: '#ff67b6'
}

// 最终确定使用的主题
const used_theme = blue

const theme_color = used_theme.theme_color
const theme_pink = used_theme.theme_pink
root.style.setProperty('--theme-color', theme_color)
root.style.setProperty('--theme-pink', theme_pink)

export {
    theme_color,
    theme_pink
}
