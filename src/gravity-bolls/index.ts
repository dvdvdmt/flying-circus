import * as PIXI from 'pixi.js'
import {setupScene} from './setup-scene'

document.addEventListener('DOMContentLoaded', main)

function main(): void {
  const app = createApp()
  setupScene(app)
}

function createApp(): PIXI.Application {
  const width = window.innerWidth
  const height = window.innerHeight
  const app = new PIXI.Application({
    width,
    height,
    autoDensity: true,
    antialias: true,
    resolution: window.devicePixelRatio,
  })
  document.querySelector('.app')!.appendChild(app.view)
  return app
}
