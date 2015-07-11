require "asdf/as"

function love.load()
    x = 0
    y = 0
    t = 0
    love.graphics.getCanvas():setFilter("nearest", "nearest")
    quad = love.graphics.newQuad(50, 0, 50, 25)
    love.graphics.setBackgroundColor(255, 0, 0)
    
    img = love.graphics.newImageFont("dummy.png", "abcd")
end

function love.update(dt)
    if love.keyboard.isDown "w" then y = y - 50 * dt end
    if love.keyboard.isDown "s" then y = y + 50 * dt end
    if love.keyboard.isDown "a" then x = x - 50 * dt end
    if love.keyboard.isDown "d" then x = x + 50 * dt end
    t = t + dt
end

function love.draw()
    love.graphics.setColor({ 255, 0, 255 })
    love.graphics.circle("fill", 300, 300, 100, 5)
    love.graphics.setColor(0, 0, 0)
    love.graphics.line(0, 0, 300, 300)
    
    love.graphics.polygon("fill", { 0, -100, 100, 0, 0, 100, -100, 0 })
end
