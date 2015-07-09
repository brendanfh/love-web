require "asdf/as"

function love.load()
    x = 0
    y = 0
    love.graphics.setBackgroundColor(255, 0, 0)
    print "test!!"
end

function love.update(dt)
    x = x + 0.01 * dt
    y = y + 0.01 * dt
end

function love.draw()
    love.graphics.setColor({ 255, 0, 255 })
    love.graphics.circle("fill", 300, 300, 100, 5)
end