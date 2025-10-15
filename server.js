const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for crop recommendations (future enhancement)
app.get('/api/crop-recommendations', (req, res) => {
    const { farmSize, currentCrop, soilType } = req.query;

    // Simple recommendation logic (can be enhanced with database)
    const recommendations = {
        farmSize: farmSize || '1',
        currentCrop: currentCrop || 'wheat',
        soilType: soilType || 'loam',
        recommendations: ['legumes', 'root_crops'],
        estimatedYieldIncrease: '15-25%'
    };

    res.json(recommendations);
});

// API endpoint for weather data (placeholder)
app.get('/api/weather', (req, res) => {
    const weatherData = {
        temperature: 25,
        humidity: 65,
        rainfall: 2.5,
        soilMoisture: 45,
        forecast: 'Favorable for planting'
    };

    res.json(weatherData);
});

// Error handling
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
    console.log(`🌾 Crop Rotation Hub server running on http://localhost:${PORT}`);
    console.log(`📱 Access from mobile: http://YOUR_IP_ADDRESS:${PORT}`);
    console.log('✅ Ready to help farmers worldwide!');
});

module.exports = app;
