module.exports.getSplitCoords = (coords) => {
    var input_coords_split = coords.split(' ')
    var split_coords = {
        x: parseInt(input_coords_split[0]),
        y: parseInt(input_coords_split[1])
    }

    if(input_coords_split[2]) {
        split_coords.direction = input_coords_split[2]
    }

    return split_coords;
}