const { pool } = require('../config/database');
const { calculateDistance } = require('../utils/geoUtils');

// Add a new school
exports.addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    
    // Insert school into database
    const [result] = await pool.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    
    res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude
      }
    });
  } catch (error) {
    next(error);
  }
};

// List all schools sorted by proximity
exports.listSchools = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;
    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);
    
    // Get all schools from database
    const [schools] = await pool.query('SELECT * FROM schools');
    
    // Calculate distance for each school and sort by proximity
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(
        userLat, 
        userLng, 
        school.latitude, 
        school.longitude
      );
      
      return {
        ...school,
        distance: parseFloat(distance.toFixed(2)) // Distance in kilometers, rounded to 2 decimal places
      };
    });
    
    // Sort schools by distance (ascending)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    
    res.status(200).json({
      success: true,
      count: schoolsWithDistance.length,
      data: schoolsWithDistance
    });
  } catch (error) {
    next(error);
  }
};