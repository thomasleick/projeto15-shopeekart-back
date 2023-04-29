const { createCanvas } = require('canvas')
function getRandomColor() {
    const colors = ['#0080ff', '#d928d9', '#ff0080', '#38af74', '#31afaf', '#77ca23', '#8000ff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

function generateAvatar(fullName, size = 128) {
    // Extract the first letter of the first and last words in the full name
    const words = fullName.split(' ')
    let initials = ''
    if (words.length === 1) {
        initials = words[0].charAt(0)
    } else {
        initials = words[0].charAt(0) + words[words.length - 1].charAt(0)
    }
    
    // Create a new canvas and draw the initials inside a circle
    try {
        const canvas = createCanvas(size, size)
        const context = canvas.getContext('2d')
        const color = getRandomColor()
        context.beginPath()
        context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI)
        context.fillStyle = color
        context.fill()
        context.fillStyle = 'white'
        context.font = `${size / 2}px Arial`
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(initials.toUpperCase(), size / 2, size / 2)
        // Convert the canvas to a data URL and return it
        return canvas.toDataURL()
    } catch (err) {
        console.log(err)
    }
}
module.exports = { generateAvatar }
