require "asdf/as"

function love.load()
    x = 0
    y = 0
    love.graphics.setBackgroundColor(255, 0, 0)
    print "test!!"
end

function love.update(dt)
    x = x + 10 * dt
    y = y + 10 * dt
end

function love.draw()
    love.graphics.setColor({ 0, 0, 255 })
    love.graphics.rectangle("fill", x, y, 50, 50)
end