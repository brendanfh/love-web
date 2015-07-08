require "asdf/as"

function love.load()
    x = 0
    y = 0
    love.graphics.setBackgroundColor(255, 0, 0)
    print "test!!"
end

function love.update(dt)
    x = x + 1 * dt
    y = y + 1 * dt
end

function love.draw()
    love.graphics.setColor({ 255, 0, 255 })
    love.graphics.shear(x, y)
    love.graphics.rectangle("fill", 0, 0, 300, 300)
end