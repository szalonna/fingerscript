"use strict";

baseColor = "#f5f5f5"
canvas = document.getElementById "canvas"
container = document.getElementById "container"
textarea = (document.getElementsByTagName "textarea")[0]

setCanvasSize = (w, h) ->
	canvas.width  = w
	canvas.height = h

setCanvasSize container.clientWidth, container.clientHeight

##################################################

ctx = canvas.getContext "2d"

# canvas törlése a háttérszínnel

ctx.fillStyle = baseColor
ctx.fillRect 0,0,canvas.width,canvas.height

# Dropzone felirat kiírása canvas-ra

droptext = "Dropzone"
ctx.font = "30px sans-serif"
textpos =
	left: (canvas.width - (ctx.measureText droptext).width) / 2
	top:  canvas.height / 2

ctx.fillStyle = "#999999"
ctx.fillText droptext, textpos.left, textpos.top - 1
ctx.fillStyle = "#cccccc"
ctx.fillText droptext, textpos.left, textpos.top

##################################################

#####################
## Töltés képernyő ##
#####################

modal = document.getElementById "modal"
items = modal.getElementsByTagName "li"

# Számlálás animáció
counter = 1
interFunc = ->
	items[counter - 1].style.opacity = 0
	items[counter].style.opacity = 1
	counter++
	if counter == items.length
		counter = 1
		items[0].style.opacity = 1
		items[items.length - 1].style.opacity = 0
cnt = setInterval interFunc, 1000

# Töltés képernyő megjelenítés és elrejtés
showModal = ->
	modal.style.display = "block"

hideModal = ->
	modal.style.display = "none"

##################################################

##########################
## Worker kiegészítések ##
##########################

Worker::sendPacket = (packet) ->
	showModal()
	@postMessage JSON.stringify packet
	return

Worker::sendCommand = (command) ->
	c =
		type: command
	@sendPacket c
	return

##################################################

# Bájtfolyam alapján canvasra rajzolás
drawRawData = (width, height, raw) ->
	showModal()

	ctx.clearRect 0,0,canvas.width, canvas.height
	setCanvasSize width, height

	# üres képobjektum lesz feltöltve a kapott
	# adatokkal, majd az lesz a canvasra kirajzolva
	imageData = ctx.createImageData width, height
	for i in [0..raw.length]
		imageData.data[i] = raw[i]	
	ctx.putImageData(imageData, 0, 0);

	hideModal()
	return

# Workertől érkező üzenet kezelése
onMessage = (e) ->
	data = JSON.parse e.data

	# ha console függvény érkezett
	if (typeof console[data.type]) == "function"
		console[data.type](data.message)
	else
		switch data.type 
			when "redraw" # kirajzolandó adat érkezett
				drawRawData data.message.width, data.message.height, data.message.pixels
				hideModal()
			when "points" # támpontok listája érkezett
				textarea.value = JSON.stringify data.message
			else # egyébként csak logoljuk ki
				console.log e
	return

handleDragOver = (e) ->
	e.stopPropagation()
	e.preventDefault()
	e.dataTransfer.dropEffect = "copy"
	return

worker = new Worker 'JS/worker.js'
worker.terminate()
handleDrop = (e) ->
	e.stopPropagation()
	e.preventDefault()

	showModal()

	worker.terminate()
	worker = new Worker 'JS/worker.js'

	reader = new FileReader()
	reader.onload = (e) ->
		showModal()
		img = new Image()
		img.onload = ->
			worker.addEventListener "message", onMessage, false

			setCanvasSize img.width, img.height

			ctx.drawImage img, 0, 0, img.width, img.height
			imgdat = ctx.getImageData 0, 0, img.width, img.height

			packet =
				type: "init"
				data:
					width: imgdat.width
					height: imgdat.height
					data: imgdat.data
			worker.sendPacket packet

			textarea.value = ""
			hideModal()
			return

		img.src = e.target.result
		return

	for file in e.dataTransfer.files
		do (file) ->
			reader.readAsDataURL file
	return

container.addEventListener "drop", handleDrop, false
container.addEventListener "dragover", handleDragOver, false

##################################################

onClick = (item, func) =>
	document.getElementById(item).onclick = func
	return

onClick 'binarize', () ->
	showModal()
	worker.sendCommand 'binarize'
	return

onClick 'getbitmap', () ->
	showModal()
	worker.sendCommand 'getbitmap'
	return

onClick 'skeleton', () ->
	showModal()
	worker.sendCommand 'skeleton'
	return

onClick 'mark', () ->
	showModal()
	worker.sendCommand 'mark'
	return

onClick 'close', () ->
	showModal()
	worker.sendCommand 'close'
	return

onClick 'open', () ->
	showModal()
	worker.sendCommand 'open'
	return
