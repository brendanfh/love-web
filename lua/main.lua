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
    love.graphics.setColor(0, 0, 0)
    love.graphics.line(0, 0, 300, 300)
    
    love.graphics.translate(400, 100)
    love.graphics.polygon("fill", { 0, -100, 100, 0, 0, 100, -100, 0 })
end