require "asdf/as"

function love.load()
    x = 0
    y = 0
    t = 0
    asdf()
    --love.graphics.getCanvas():setFilter("nearest", "nearest")
    quad = love.graphics.newQuad(50, 0, 50, 25, 100, 50)
    love.graphics.setBackgroundColor(255, 0, 0)
    
    love.window.setFullscreen(true)
    
    love.mouse.setVisible(false)
    love.mouse.setCursor(love.mouse.getSystemCursor("ibeam"))
    
    print(love.system.getPowerInfo())
    img = love.graphics.newImage("dummy.png")
    
    snd = love.audio.newSource("band_movement1.mp3")
end

function love.update(dt)
    if love.keyboard.isDown "w" then y = y - 50 * dt end
    if love.keyboard.isDown "s" then y = y + 50 * dt end
    if love.keyboard.isDown "a" then x = x - 50 * dt end
    if love.keyboard.isDown "d" then x = x + 50 * dt end
    t = t + dt
end

function love.mousepressed(x, y, button)
    if button == "l" then
        love.mouse.setVisible(false)
    elseif button == "r" then
        love.mouse.setVisible(true)
    end
end

function love.mousemoved(x1, y1)
    x = x1
    y = y1    
end

function love.draw()
    love.graphics.setColor({ 255, 0, 255 })
    love.graphics.circle("fill", 300, 300, 100, 5)
    love.graphics.setColor(123, 234, 21)
    love.graphics.line(0, 0, 300, 300)

    love.graphics.translate(x, y)
    love.graphics.draw(img, 100, 100, 3.14159256 / 4);
    
    love.graphics.polygon("fill", { 0, -100, 100, 0, 0, 100, -100, 0 })
end
