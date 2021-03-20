import * as PIXI from 'pixi.js'

document.addEventListener('DOMContentLoaded', main)

function main() {
  const app = new PIXI.Application({width: 256, height: 256})
  document.querySelector('.app')!.appendChild(app.view)
}
