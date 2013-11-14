class Color
	constructor: (@r, @g, @b, @a) ->
		if @a == 0
			@r = 255
			@g = 255
			@b = 255
		return

	getRGBA: ->
		item =
			r: @r
			g: @g
			b: @b
			a: @a

	getLuminance: ->
		0.2126*@r + 0.7152*@g + 0.0722*@b