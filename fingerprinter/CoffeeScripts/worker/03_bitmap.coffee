class Bitmap

	# A kapott bájtsort 2D-s tömbbé alakítja
	constructor: (@width, @height, @data, @limit = 128) ->
		@pixels = []
		for x in [0...@width]
			row = []
			for y in [0...@height]
				i = (x + y*@width) * 4
				row.push new Color @data[i],@data[i+1],@data[i+2],@data[i+3]
			@pixels.push row

	# Koordináta érvényességének ellenőrzése
	checkCoords: (x, y) ->
		x >= 0 && y >= 0 && x < @width && y < @height

	getPixel: (x, y) =>
		if @checkCoords x,y
			return @pixels[x][y]
		else
			return undefined

	getPartData: (x, y) =>
		if @checkCoords x,y
			return @matrix[x][y]
		else
			return -1

	# A 2D-s tömbből megfelelő bájtfolyamot generálunk
	getBitmapData: =>
		data = []
		for y in [0...@height]
			for x in [0...@width]
				rgba = (@getPixel x,y).getRGBA()
				data.push rgba.r
				data.push rgba.g
				data.push rgba.b
				data.push rgba.a
		return data

	# binarizálás luminance alapján
	binarize: => 
		@matrix = []
		for x in [0...@pixels.length]
			row = []
			for y in [0...@pixels[x].length]
				pixel = @pixels[x][y]
				luminance = pixel.getLuminance()
				value = if pixel.a == 0 then 255 else if luminance < @limit then  0 else 255
				@pixels[x][y] = new Color value, value, value, 255
				row.push if value == 255 then 0 else 1
			@matrix.push row
		return

	# binarizációs mátrixból kép előállítása
	bitmapFromMatrix: =>
		@pixels = []
		for x in [0...@matrix.length]
			orow = @matrix[x]
			row = []
			for y in [0...orow.length]
				value = if orow[y] == 1 then 0 else 255;
				row.push (new Color value, value, value, 255 )
			@pixels.push row

	# kép részlet kinyerése
	getSubData: (x,y,mx=1,my=1) =>
		data = []
		for lx in [-mx..mx]
			row = []
			for ly in [-my..my]
				row.push @getPartData x+lx,y+ly
			data.push row
		return data

	# kernel futtatása a kép pixelein
	_applyKern: (k, id, appval = 1) =>
		otherval = if appval == 1 then 0 else 1
		newmatrix = []
		for x in [0...@matrix.length]
			row = @matrix[x]
			nrow = []
			for y in [0...row.length]
				i = true
				if row[y] == appval
					data = @getSubData x,y
					i = k.execute data,id
				v = if i then row[y] else otherval
				nrow.push v
			newmatrix.push nrow
		return newmatrix

	# szkeletonizáció
	skeleton: =>
		k = new Skeleton()
		changed = true
		id = 0
		w = 5
		while changed # amíg volt pixel eltávolítás, futtatjuk
			newmatrix = @_applyKern k, id
			changed = false
			i = 0
			di = 0
			for x in [0...newmatrix.length]
				for y in [0...newmatrix[x].length]
					if newmatrix[x][y] == 1
						@matrix[x][y] = 0
						changed = true
						w = 5
			if not changed and w > 0
				changed = true
				w--
			id = if (id == k.kernel.length - 1) then 0 else (id + 1)

		# tisztítás: párszor eltávolítjuk a vonalvég
		# pixeleket
		k = new Endline()
		for i in [0...5]
			for id in [0...k.kernel.length]
				newmatrix = @_applyKern k, id
				for x in [0...newmatrix.length]
					row = newmatrix[x]
					for y in [0...row.length]
						if newmatrix[x][y] == 1
							@matrix[x][y] = 0

		# tisztítás
		k = new Clearing()
		for id in [0...k.kernel.length]
			newmatrix = @_applyKern k, id
			for x in [0...newmatrix.length]
				row = newmatrix[x]
				for y in [0...row.length]
					if newmatrix[x][y] == 1
						@matrix[x][y] = 0
		
		@bitmapFromMatrix()

	# kernelnek megfelelő képpontok megjelölése
	_markParts: (k, color) =>
		points = []
		for i in [0...k.kernel.length]
			marks = @_applyKern k, i
			for x in [0...marks.length]
				for y in [0...marks[x].length]
					if marks[x][y] == 1
						item =
							x: x
							y: y
						points.push item
						for lx in [-2..2]
							for ly in [-2..2]
								if not (Math.abs(lx) + Math.abs(ly) == 4)
									cx = x + lx
									cy = y + ly
									if @checkCoords cx,cy
										@pixels[cx][cy] = color
		points

	# vonalvégek és elágazások megjelölése és visszaküldése
	mark: =>
		@ndl = @_markParts((new Endline()), (new Color 0, 0, 255, 255))
		@yns = @_markParts((new Yns()), (new Color 255, 0, 0, 255))
		item = 
			ndl: @ndl
			yns: @yns
		sendMessage item, "points"

	# dilatáció
	close: =>
		k = new Close()
		m = []
		for x in [0...@matrix.length]
			row = @matrix[x]
			nr = []
			for y in [0...row.length]
				if row[y] == 0
					data = @getSubData x,y
					val = if (k.executeAll data) then 1 else 0
					nr.push val
				else
					nr.push 1
			m.push nr

		@matrix = m
		@bitmapFromMatrix()

	# erodáció
	open: =>
		k = new Open()
		m = []
		for x in [0...@matrix.length]
			row = @matrix[x]
			nr = []
			for y in [0...row.length]
				if row[y] == 1
					data = @getSubData x,y
					val = if (k.executeAll data) then 0 else 1
					nr.push val
				else
					nr.push 0
			m.push nr

		@matrix = m
		@bitmapFromMatrix()

