/**
 * All 148 CSS named colours organised by palette group.
 *
 * Groupings based on Austin Gil's classification:
 * https://austingil.com/every-css-named-color-organized-by-palette/
 */

export interface NamedColor {
    name: string
    hex: string
    group: string
}

export const GROUPS = [
    'reds', 'oranges', 'yellows', 'greens', 'cyans',
    'blues', 'purples', 'pinks', 'browns', 'whites', 'grays',
] as const

export type ColorGroup = typeof GROUPS[number]

export const NAMED_COLORS: NamedColor[] = [
    // Reds
    { name: 'indianred', hex: '#cd5c5c', group: 'reds' },
    { name: 'lightcoral', hex: '#f08080', group: 'reds' },
    { name: 'salmon', hex: '#fa8072', group: 'reds' },
    { name: 'darksalmon', hex: '#e9967a', group: 'reds' },
    { name: 'lightsalmon', hex: '#ffa07a', group: 'reds' },
    { name: 'crimson', hex: '#dc143c', group: 'reds' },
    { name: 'red', hex: '#ff0000', group: 'reds' },
    { name: 'firebrick', hex: '#b22222', group: 'reds' },
    { name: 'darkred', hex: '#8b0000', group: 'reds' },

    // Oranges
    { name: 'coral', hex: '#ff7f50', group: 'oranges' },
    { name: 'tomato', hex: '#ff6347', group: 'oranges' },
    { name: 'orangered', hex: '#ff4500', group: 'oranges' },
    { name: 'darkorange', hex: '#ff8c00', group: 'oranges' },
    { name: 'orange', hex: '#ffa500', group: 'oranges' },

    // Yellows
    { name: 'gold', hex: '#ffd700', group: 'yellows' },
    { name: 'yellow', hex: '#ffff00', group: 'yellows' },
    { name: 'lightyellow', hex: '#ffffe0', group: 'yellows' },
    { name: 'lemonchiffon', hex: '#fffacd', group: 'yellows' },
    { name: 'lightgoldenrodyellow', hex: '#fafad2', group: 'yellows' },
    { name: 'papayawhip', hex: '#ffefd5', group: 'yellows' },
    { name: 'moccasin', hex: '#ffe4b5', group: 'yellows' },
    { name: 'peachpuff', hex: '#ffdab9', group: 'yellows' },
    { name: 'palegoldenrod', hex: '#eee8aa', group: 'yellows' },
    { name: 'khaki', hex: '#f0e68c', group: 'yellows' },
    { name: 'darkkhaki', hex: '#bdb76b', group: 'yellows' },

    // Greens
    { name: 'greenyellow', hex: '#adff2f', group: 'greens' },
    { name: 'chartreuse', hex: '#7fff00', group: 'greens' },
    { name: 'lawngreen', hex: '#7cfc00', group: 'greens' },
    { name: 'lime', hex: '#00ff00', group: 'greens' },
    { name: 'limegreen', hex: '#32cd32', group: 'greens' },
    { name: 'palegreen', hex: '#98fb98', group: 'greens' },
    { name: 'lightgreen', hex: '#90ee90', group: 'greens' },
    { name: 'mediumspringgreen', hex: '#00fa9a', group: 'greens' },
    { name: 'springgreen', hex: '#00ff7f', group: 'greens' },
    { name: 'mediumseagreen', hex: '#3cb371', group: 'greens' },
    { name: 'seagreen', hex: '#2e8b57', group: 'greens' },
    { name: 'forestgreen', hex: '#228b22', group: 'greens' },
    { name: 'green', hex: '#008000', group: 'greens' },
    { name: 'darkgreen', hex: '#006400', group: 'greens' },
    { name: 'yellowgreen', hex: '#9acd32', group: 'greens' },
    { name: 'olivedrab', hex: '#6b8e23', group: 'greens' },
    { name: 'olive', hex: '#808000', group: 'greens' },
    { name: 'darkolivegreen', hex: '#556b2f', group: 'greens' },
    { name: 'mediumaquamarine', hex: '#66cdaa', group: 'greens' },
    { name: 'darkseagreen', hex: '#8fbc8f', group: 'greens' },

    // Cyans
    { name: 'aqua', hex: '#00ffff', group: 'cyans' },
    { name: 'cyan', hex: '#00ffff', group: 'cyans' },
    { name: 'lightcyan', hex: '#e0ffff', group: 'cyans' },
    { name: 'paleturquoise', hex: '#afeeee', group: 'cyans' },
    { name: 'aquamarine', hex: '#7fffd4', group: 'cyans' },
    { name: 'turquoise', hex: '#40e0d0', group: 'cyans' },
    { name: 'mediumturquoise', hex: '#48d1cc', group: 'cyans' },
    { name: 'darkturquoise', hex: '#00ced1', group: 'cyans' },
    { name: 'lightseagreen', hex: '#20b2aa', group: 'cyans' },
    { name: 'cadetblue', hex: '#5f9ea0', group: 'cyans' },
    { name: 'darkcyan', hex: '#008b8b', group: 'cyans' },
    { name: 'teal', hex: '#008080', group: 'cyans' },

    // Blues
    { name: 'lightskyblue', hex: '#87cefa', group: 'blues' },
    { name: 'skyblue', hex: '#87ceeb', group: 'blues' },
    { name: 'deepskyblue', hex: '#00bfff', group: 'blues' },
    { name: 'lightsteelblue', hex: '#b0c4de', group: 'blues' },
    { name: 'dodgerblue', hex: '#1e90ff', group: 'blues' },
    { name: 'cornflowerblue', hex: '#6495ed', group: 'blues' },
    { name: 'steelblue', hex: '#4682b4', group: 'blues' },
    { name: 'royalblue', hex: '#4169e1', group: 'blues' },
    { name: 'blue', hex: '#0000ff', group: 'blues' },
    { name: 'mediumblue', hex: '#0000cd', group: 'blues' },
    { name: 'darkblue', hex: '#00008b', group: 'blues' },
    { name: 'navy', hex: '#000080', group: 'blues' },
    { name: 'midnightblue', hex: '#191970', group: 'blues' },
    { name: 'lightblue', hex: '#add8e6', group: 'blues' },
    { name: 'powderblue', hex: '#b0e0e6', group: 'blues' },
    { name: 'aliceblue', hex: '#f0f8ff', group: 'blues' },

    // Purples
    { name: 'lavender', hex: '#e6e6fa', group: 'purples' },
    { name: 'thistle', hex: '#d8bfd8', group: 'purples' },
    { name: 'plum', hex: '#dda0dd', group: 'purples' },
    { name: 'violet', hex: '#ee82ee', group: 'purples' },
    { name: 'orchid', hex: '#da70d6', group: 'purples' },
    { name: 'fuchsia', hex: '#ff00ff', group: 'purples' },
    { name: 'magenta', hex: '#ff00ff', group: 'purples' },
    { name: 'mediumorchid', hex: '#ba55d3', group: 'purples' },
    { name: 'mediumpurple', hex: '#9370db', group: 'purples' },
    { name: 'rebeccapurple', hex: '#663399', group: 'purples' },
    { name: 'blueviolet', hex: '#8a2be2', group: 'purples' },
    { name: 'darkviolet', hex: '#9400d3', group: 'purples' },
    { name: 'darkorchid', hex: '#9932cc', group: 'purples' },
    { name: 'darkmagenta', hex: '#8b008b', group: 'purples' },
    { name: 'purple', hex: '#800080', group: 'purples' },
    { name: 'indigo', hex: '#4b0082', group: 'purples' },
    { name: 'slateblue', hex: '#6a5acd', group: 'purples' },
    { name: 'darkslateblue', hex: '#483d8b', group: 'purples' },
    { name: 'mediumslateblue', hex: '#7b68ee', group: 'purples' },

    // Pinks
    { name: 'pink', hex: '#ffc0cb', group: 'pinks' },
    { name: 'lightpink', hex: '#ffb6c1', group: 'pinks' },
    { name: 'hotpink', hex: '#ff69b4', group: 'pinks' },
    { name: 'deeppink', hex: '#ff1493', group: 'pinks' },
    { name: 'mediumvioletred', hex: '#c71585', group: 'pinks' },
    { name: 'palevioletred', hex: '#db7093', group: 'pinks' },

    // Browns
    { name: 'cornsilk', hex: '#fff8dc', group: 'browns' },
    { name: 'blanchedalmond', hex: '#ffebcd', group: 'browns' },
    { name: 'bisque', hex: '#ffe4c4', group: 'browns' },
    { name: 'navajowhite', hex: '#ffdead', group: 'browns' },
    { name: 'wheat', hex: '#f5deb3', group: 'browns' },
    { name: 'burlywood', hex: '#deb887', group: 'browns' },
    { name: 'tan', hex: '#d2b48c', group: 'browns' },
    { name: 'rosybrown', hex: '#bc8f8f', group: 'browns' },
    { name: 'sandybrown', hex: '#f4a460', group: 'browns' },
    { name: 'goldenrod', hex: '#daa520', group: 'browns' },
    { name: 'darkgoldenrod', hex: '#b8860b', group: 'browns' },
    { name: 'peru', hex: '#cd853f', group: 'browns' },
    { name: 'chocolate', hex: '#d2691e', group: 'browns' },
    { name: 'saddlebrown', hex: '#8b4513', group: 'browns' },
    { name: 'sienna', hex: '#a0522d', group: 'browns' },
    { name: 'brown', hex: '#a52a2a', group: 'browns' },
    { name: 'maroon', hex: '#800000', group: 'browns' },

    // Whites
    { name: 'white', hex: '#ffffff', group: 'whites' },
    { name: 'snow', hex: '#fffafa', group: 'whites' },
    { name: 'honeydew', hex: '#f0fff0', group: 'whites' },
    { name: 'mintcream', hex: '#f5fffa', group: 'whites' },
    { name: 'azure', hex: '#f0ffff', group: 'whites' },
    { name: 'ghostwhite', hex: '#f8f8ff', group: 'whites' },
    { name: 'whitesmoke', hex: '#f5f5f5', group: 'whites' },
    { name: 'seashell', hex: '#fff5ee', group: 'whites' },
    { name: 'beige', hex: '#f5f5dc', group: 'whites' },
    { name: 'oldlace', hex: '#fdf5e6', group: 'whites' },
    { name: 'floralwhite', hex: '#fffaf0', group: 'whites' },
    { name: 'ivory', hex: '#fffff0', group: 'whites' },
    { name: 'antiquewhite', hex: '#faebd7', group: 'whites' },
    { name: 'linen', hex: '#faf0e6', group: 'whites' },
    { name: 'lavenderblush', hex: '#fff0f5', group: 'whites' },
    { name: 'mistyrose', hex: '#ffe4e1', group: 'whites' },

    // Grays
    { name: 'gainsboro', hex: '#dcdcdc', group: 'grays' },
    { name: 'lightgray', hex: '#d3d3d3', group: 'grays' },
    { name: 'lightgrey', hex: '#d3d3d3', group: 'grays' },
    { name: 'silver', hex: '#c0c0c0', group: 'grays' },
    { name: 'darkgray', hex: '#a9a9a9', group: 'grays' },
    { name: 'darkgrey', hex: '#a9a9a9', group: 'grays' },
    { name: 'gray', hex: '#808080', group: 'grays' },
    { name: 'grey', hex: '#808080', group: 'grays' },
    { name: 'dimgray', hex: '#696969', group: 'grays' },
    { name: 'dimgrey', hex: '#696969', group: 'grays' },
    { name: 'lightslategray', hex: '#778899', group: 'grays' },
    { name: 'lightslategrey', hex: '#778899', group: 'grays' },
    { name: 'slategray', hex: '#708090', group: 'grays' },
    { name: 'slategrey', hex: '#708090', group: 'grays' },
    { name: 'darkslategray', hex: '#2f4f4f', group: 'grays' },
    { name: 'darkslategrey', hex: '#2f4f4f', group: 'grays' },
    { name: 'black', hex: '#000000', group: 'grays' },
]

export function getGroup(group: string): NamedColor[] {
    return NAMED_COLORS.filter(c => c.group === group)
}
